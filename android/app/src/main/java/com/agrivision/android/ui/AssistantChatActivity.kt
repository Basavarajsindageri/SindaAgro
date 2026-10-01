package com.agrivision.android.ui

import android.content.Intent
import android.os.Bundle
import android.speech.RecognizerIntent
import android.speech.tts.TextToSpeech
import android.view.Gravity
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.lifecycle.lifecycleScope
import com.agrivision.android.R
import com.agrivision.android.data.api.RetrofitClient
import com.agrivision.android.data.model.AssistantChatRequest
import com.agrivision.android.data.model.AssistantChatResponse
import com.agrivision.android.data.model.PesticideGuideDto
import com.agrivision.android.data.model.TechnologyGuideDto
import com.agrivision.android.databinding.ActivityAssistantChatBinding
import com.google.android.material.card.MaterialCardView
import kotlinx.coroutines.launch
import java.util.Locale

class AssistantChatActivity : AppCompatActivity(), TextToSpeech.OnInitListener {

    private lateinit var binding: ActivityAssistantChatBinding
    private var tts: TextToSpeech? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAssistantChatBinding.inflate(layoutInflater)
        setContentView(binding.root)

        tts = TextToSpeech(this, this)

        val initialQuery = intent.getStringExtra("EXTRA_INITIAL_QUERY")
        if (!initialQuery.isNullOrEmpty()) {
            sendMessage(initialQuery)
        } else {
            addAiMessage("🌾 Welcome to SindaAgro AI Agronomist! Ask me anything about crop suitability, best eco-friendly pesticides, or smart farm technologies.")
        }

        setupClickListeners()
    }

    private fun setupClickListeners() {
        binding.btnSendMessage.setOnClickListener {
            val text = binding.etChatMessage.text.toString().trim()
            if (text.isNotEmpty()) {
                sendMessage(text)
                binding.etChatMessage.setText("")
            }
        }

        binding.btnVoiceInput.setOnClickListener {
            startVoiceInput()
        }

        binding.btnQuickPesticides.setOnClickListener {
            sendMessage("What are the best eco-friendly pesticides and dosages for my crop?")
        }

        binding.btnQuickTech.setOnClickListener {
            sendMessage("What modern low-cost technologies like solar traps or drip fertigation should I use?")
        }

        binding.btnQuickFertilizer.setOnClickListener {
            sendMessage("Explain split NPK fertilizer schedule and land preparation.")
        }
    }

    private fun startVoiceInput() {
        try {
            val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
                putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
                putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault())
                putExtra(RecognizerIntent.EXTRA_PROMPT, "Speak to AI Agronomist...")
            }
            startActivityForResult(intent, 101)
        } catch (e: Exception) {
            Toast.makeText(this, "Voice Input not supported on this device", Toast.LENGTH_SHORT).show()
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode: Int, resultCode: Int, data: Intent?)
        if (requestCode == 101 && resultCode == RESULT_OK) {
            val results = data?.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS)
            if (!results.isNullOrEmpty()) {
                val spokenText = results[0]
                binding.etChatMessage.setText(spokenText)
                sendMessage(spokenText)
            }
        }
    }

    private fun sendMessage(query: String) {
        addUserMessage(query)

        lifecycleScope.launch {
            try {
                val req = AssistantChatRequest(message = query)
                val res = RetrofitClient.apiService.chatWithAssistant(req)

                if (res.isSuccessful && res.body()?.success == true) {
                    val data = res.body()?.data
                    if (data != null) {
                        addAiResponse(data)
                        speakReply(data.reply)
                    }
                } else {
                    addAiMessage("Sorry, I could not fetch guidance at the moment. Please try again.")
                }
            } catch (e: Exception) {
                addAiMessage("Offline Mode: Unable to connect to AI server.")
            }
        }
    }

    private fun addUserMessage(text: String) {
        val container = LinearLayout(this).apply {
            gravity = Gravity.END
            layoutParams = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply { setMargins(64, 0, 0, 16) }
        }

        val tv = TextView(this).apply {
            this.text = text
            textSize = 14f
            setTextColor(ContextCompat.getColor(context, R.color.white))
            setBackgroundColor(ContextCompat.getColor(context, R.color.primary_emerald))
            setPadding(32, 24, 32, 24)
        }

        container.addView(tv)
        binding.layoutChatMessages.addView(container)
        scrollToBottom()
    }

    private fun addAiMessage(text: String) {
        val container = LinearLayout(this).apply {
            gravity = Gravity.START
            layoutParams = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply { setMargins(0, 0, 64, 16) }
        }

        val tv = TextView(this).apply {
            this.text = text
            textSize = 14f
            setTextColor(ContextCompat.getColor(context, R.color.text_primary))
            setBackgroundColor(ContextCompat.getColor(context, R.color.bg_card))
            setPadding(32, 24, 32, 24)
        }

        container.addView(tv)
        binding.layoutChatMessages.addView(container)
        scrollToBottom()
    }

    private fun addAiResponse(resp: AssistantChatResponse) {
        addAiMessage(resp.reply)

        // Render recommended pesticides cards
        resp.recommendedPesticides?.forEach { p ->
            val pText = "🛡️ BEST PESTICIDE: ${p.pesticideName}\n" +
                    "• Target Pest: ${p.targetPest}\n" +
                    "• Dosage/Acre: ${p.dosagePerAcre}\n" +
                    "• Application: ${p.applicationMethod}\n" +
                    "• Safety: ${p.safetyPrecaution}"
            addAiMessage(pText)
        }

        // Render recommended technologies cards
        resp.recommendedTechnologies?.forEach { t ->
            val tText = "💡 SMART TECH: ${t.techName}\n" +
                    "• Category: ${t.category}\n" +
                    "• Benefit: ${t.benefit}\n" +
                    "• Est. Cost: ₹${t.estCostInr}\n" +
                    "• How to Use: ${t.usageProcedure}"
            addAiMessage(tText)
        }
    }

    private fun speakReply(text: String) {
        val cleanText = text.replace("*", "").replace("•", "")
        tts?.speak(cleanText, TextToSpeech.QUEUE_FLUSH, null, "UTT_ID")
    }

    private fun scrollToBottom() {
        binding.scrollChat.post { binding.scrollChat.fullScroll(android.view.View.FOCUS_DOWN) }
    }

    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            tts?.language = Locale.getDefault()
        }
    }

    override fun onDestroy() {
        tts?.stop()
        tts?.shutdown()
        super.onDestroy()
    }
}
