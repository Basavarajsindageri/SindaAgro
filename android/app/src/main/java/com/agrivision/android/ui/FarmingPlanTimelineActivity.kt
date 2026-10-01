package com.agrivision.android.ui

import android.content.Intent
import android.os.Bundle
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.agrivision.android.R
import com.agrivision.android.databinding.ActivityFarmingPlanTimelineBinding
import com.google.android.material.card.MaterialCardView

class FarmingPlanTimelineActivity : AppCompatActivity() {

    private lateinit var binding: ActivityFarmingPlanTimelineBinding
    private var cropName: String = "Paddy"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityFarmingPlanTimelineBinding.inflate(layoutInflater)
        setContentView(binding.root)

        cropName = intent.getStringExtra("EXTRA_CROP_NAME") ?: "Paddy"
        binding.tvTimelineTitle.text = "🌱 $cropName Farming & Protection Plan"

        binding.btnAskAssistant.setOnClickListener {
            val intent = Intent(this, AssistantChatActivity::class.java).apply {
                putExtra("EXTRA_INITIAL_QUERY", "Best pesticides and modern technology for $cropName")
            }
            startActivity(intent)
        }

        renderTimelineSteps()
    }

    private fun renderTimelineSteps() {
        binding.layoutTimelineSteps.removeAllViews()

        val steps = listOf(
            StepData("1. Land Preparation & Soil Treatment", "Plough 15-20cm deep. Incorporate 10 tonnes of FYM manure + 1kg Trichoderma Viride per acre 10 days before sowing to protect against root rot."),
            StepData("2. Certified Seed Variety & Seed Rate", "Variety: Certified High-Yield $cropName Seed. Seed Rate: 10-12 kg per acre. Treat seed with Azospirillum for root nitrogen fixation."),
            StepData("3. Sowing & Line Spacing", "Maintain 30cm row-to-row and 15cm plant-to-plant spacing. Ensure 2-3 cm soil moisture depth."),
            StepData("4. Split NPK Nutrition Schedule", "• Day 0 (Basal): 50% N + 100% P + 50% K\n• Day 30 (Top Dressing 1): 25% Nitrogen (Urea)\n• Day 55 (Top Dressing 2): 25% Nitrogen + 50% Potash"),
            StepData("5. 🛡️ Crop Protection & Best Pesticides", "• Bio-Pesticide: Neem Oil 1500 PPM (500ml/200L water) against sucking aphids & thrips.\n• Chemical Control: Chlorantraniliprole 18.5% SC (60ml/200L water) for stem borer.\n• Application Step: Spray in early morning using flat-fan nozzle."),
            StepData("6. 💡 Smart Modern Technologies", "• Solar Insect Traps: Install 4 traps/acre to capture nocturnal pests.\n• Drip Fertigation: Inject liquid NPK through Venturi kit.\n• Wireless Soil Moisture Sensors: Real-time root zone probes.")
        )

        for (step in steps) {
            val card = MaterialCardView(this).apply {
                radius = 24f
                setCardBackgroundColor(ContextCompat.getColor(context, R.color.bg_card))
                strokeWidth = 2
                strokeColor = ContextCompat.getColor(context, R.color.primary_emerald)
                layoutParams = LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.MATCH_PARENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT
                ).apply { setMargins(0, 0, 0, 20) }
            }

            val layout = LinearLayout(this).apply {
                orientation = LinearLayout.VERTICAL
                setPadding(32, 32, 32, 32)
            }

            val tvTitle = TextView(this).apply {
                text = step.title
                textSize = 16f
                setTypeface(null, android.graphics.Typeface.BOLD)
                setTextColor(ContextCompat.getColor(context, R.color.primary_emerald))
            }

            val tvDesc = TextView(this).apply {
                text = step.desc
                textSize = 13f
                setTextColor(ContextCompat.getColor(context, R.color.text_primary))
                setPadding(0, 8, 0, 0)
            }

            layout.addView(tvTitle)
            layout.addView(tvDesc)
            card.addView(layout)

            binding.layoutTimelineSteps.addView(card)
        }
    }

    private data class StepData(val title: String, val desc: String)
}
