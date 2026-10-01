package com.agrivision.android.ui

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.View
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.lifecycle.lifecycleScope
import com.agrivision.android.R
import com.agrivision.android.data.api.RetrofitClient
import com.agrivision.android.data.model.SoilReportDto
import com.agrivision.android.data.model.SoilTestOrderRequest
import com.agrivision.android.data.model.SoilTesterDto
import com.agrivision.android.databinding.ActivitySoilEntryBinding
import com.google.android.material.button.MaterialButton
import com.google.android.material.card.MaterialCardView
import kotlinx.coroutines.launch

class SoilEntryActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySoilEntryBinding
    private var farmId: Long = 1L

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySoilEntryBinding.inflate(layoutInflater)
        setContentView(binding.root)

        farmId = intent.getLongExtra("EXTRA_FARM_ID", 1L)

        setupTabs()
        setupSubmitListeners()
    }

    private fun setupTabs() {
        binding.btnTabManual.setOnClickListener {
            binding.layoutManualForm.visibility = View.VISIBLE
            binding.layoutTesterContainer.visibility = View.GONE
            binding.btnTabManual.setBackgroundColor(ContextCompat.getColor(this, R.color.primary_emerald))
            binding.btnTabManual.setTextColor(ContextCompat.getColor(this, R.color.white))
            binding.btnTabTester.setBackgroundColor(ContextCompat.getColor(this, android.R.color.transparent))
            binding.btnTabTester.setTextColor(ContextCompat.getColor(this, R.color.text_primary))
        }

        binding.btnTabTester.setOnClickListener {
            binding.layoutManualForm.visibility = View.GONE
            binding.layoutTesterContainer.visibility = View.VISIBLE
            binding.btnTabTester.setBackgroundColor(ContextCompat.getColor(this, R.color.primary_emerald))
            binding.btnTabTester.setTextColor(ContextCompat.getColor(this, R.color.white))
            binding.btnTabManual.setBackgroundColor(ContextCompat.getColor(this, android.R.color.transparent))
            binding.btnTabManual.setTextColor(ContextCompat.getColor(this, R.color.text_primary))

            loadSoilTesters()
        }
    }

    private fun setupSubmitListeners() {
        binding.btnSubmitSoilReport.setOnClickListener {
            val phStr = binding.etPh.text.toString().trim()
            val nStr = binding.etNitrogen.text.toString().trim()
            val pStr = binding.etPhosphorus.text.toString().trim()
            val kStr = binding.etPotassium.text.toString().trim()

            if (phStr.isEmpty() || nStr.isEmpty() || pStr.isEmpty() || kStr.isEmpty()) {
                Toast.makeText(this, "Please fill all required soil fields (pH, N, P, K)", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val report = SoilReportDto(
                id = null,
                farmId = farmId,
                ph = phStr.toDoubleOrNull() ?: 6.8,
                nitrogen = nStr.toDoubleOrNull() ?: 140.0,
                phosphorus = pStr.toDoubleOrNull() ?: 42.0,
                potassium = kStr.toDoubleOrNull() ?: 185.0,
                organicCarbon = 0.65
            )

            submitManualReport(report)
        }
    }

    private fun submitManualReport(report: SoilReportDto) {
        binding.progressBar.visibility = View.VISIBLE
        binding.btnSubmitSoilReport.isEnabled = false

        lifecycleScope.launch {
            try {
                val response = RetrofitClient.apiService.submitSoilReport(report)
                binding.progressBar.visibility = View.GONE
                binding.btnSubmitSoilReport.isEnabled = true

                if (response.isSuccessful && response.body()?.success == true) {
                    Toast.makeText(this@SoilEntryActivity, "Soil Report Submitted Successfully!", Toast.LENGTH_SHORT).show()
                    finish()
                } else {
                    Toast.makeText(this@SoilEntryActivity, "Failed to submit report: ${response.message()}", Toast.LENGTH_LONG).show()
                }
            } catch (e: Exception) {
                binding.progressBar.visibility = View.GONE
                binding.btnSubmitSoilReport.isEnabled = true
                Toast.makeText(this@SoilEntryActivity, "Network Error: ${e.localizedMessage}", Toast.LENGTH_LONG).show()
            }
        }
    }

    private fun loadSoilTesters() {
        binding.progressBar.visibility = View.VISIBLE
        lifecycleScope.launch {
            try {
                val response = RetrofitClient.apiService.getSoilTesters()
                binding.progressBar.visibility = View.GONE

                if (response.isSuccessful && response.body()?.success == true) {
                    val testers = response.body()?.data ?: emptyList()
                    renderTesterCards(testers)
                } else {
                    Toast.makeText(this@SoilEntryActivity, "Failed to fetch soil testers", Toast.LENGTH_SHORT).show()
                }
            } catch (e: Exception) {
                binding.progressBar.visibility = View.GONE
                Toast.makeText(this@SoilEntryActivity, "Network Error: ${e.localizedMessage}", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun renderTesterCards(testers: List<SoilTesterDto>) {
        binding.layoutTesterCards.removeAllViews()

        for (tester in testers) {
            val card = MaterialCardView(this).apply {
                radius = 24f
                setCardBackgroundColor(ContextCompat.getColor(context, R.color.bg_card))
                strokeWidth = 2
                strokeColor = ContextCompat.getColor(context, R.color.primary_emerald)
                layoutParams = LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.MATCH_PARENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT
                ).apply {
                    setMargins(0, 0, 0, 24)
                }
            }

            val layout = LinearLayout(this).apply {
                orientation = LinearLayout.VERTICAL
                setPadding(32, 32, 32, 32)
            }

            val tvTitle = TextView(this).apply {
                text = "${tester.labName}\n(${tester.testerName})"
                textSize = 16f
                setTypeface(null, android.graphics.Typeface.BOLD)
                setTextColor(ContextCompat.getColor(context, R.color.text_primary))
            }

            val tvInfo = TextView(this).apply {
                text = "📍 ${tester.district}, ${tester.state}\n💰 Testing Fee: ₹${tester.priceInInr}  |  ⏱️ Results in ${tester.turnaroundDays} Days  |  ⭐ ${tester.rating}"
                textSize = 13f
                setTextColor(ContextCompat.getColor(context, R.color.primary_emerald))
                setPadding(0, 8, 0, 16)
            }

            val btnCall = MaterialButton(this, null, com.google.android.material.R.attr.borderlessButtonStyle).apply {
                text = getString(R.string.btn_call_tester)
                setTextColor(ContextCompat.getColor(context, R.color.primary_emerald))
                setOnClickListener {
                    val dialIntent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:${tester.contactPhone}"))
                    startActivity(dialIntent)
                }
            }

            val btnBook = MaterialButton(this).apply {
                text = getString(R.string.btn_book_doorstep)
                setBackgroundColor(ContextCompat.getColor(context, R.color.primary_emerald))
                setTextColor(ContextCompat.getColor(context, R.color.white))
                setOnClickListener {
                    orderDoorstepSamplePickup(tester)
                }
            }

            layout.addView(tvTitle)
            layout.addView(tvInfo)
            layout.addView(btnCall)
            layout.addView(btnBook)
            card.addView(layout)

            binding.layoutTesterCards.addView(card)
        }
    }

    private fun orderDoorstepSamplePickup(tester: SoilTesterDto) {
        binding.progressBar.visibility = View.VISIBLE
        lifecycleScope.launch {
            try {
                val req = SoilTestOrderRequest(farmId = farmId, testerId = tester.id, collectionType = "DOORSTEP")
                val res = RetrofitClient.apiService.orderSoilTest(req)
                binding.progressBar.visibility = View.GONE

                if (res.isSuccessful && res.body()?.success == true) {
                    val order = res.body()?.data
                    val orderId = order?.orderId ?: "ST-1002"
                    Toast.makeText(this@SoilEntryActivity, getString(R.string.order_success, orderId), Toast.LENGTH_LONG).show()
                } else {
                    Toast.makeText(this@SoilEntryActivity, "Failed to place soil test order", Toast.LENGTH_SHORT).show()
                }
            } catch (e: Exception) {
                binding.progressBar.visibility = View.GONE
                Toast.makeText(this@SoilEntryActivity, "Network Error: ${e.localizedMessage}", Toast.LENGTH_SHORT).show()
            }
        }
    }
}
