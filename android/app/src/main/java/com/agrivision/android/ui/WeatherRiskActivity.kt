package com.agrivision.android.ui

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
import com.agrivision.android.databinding.ActivityWeatherRiskBinding
import com.google.android.material.card.MaterialCardView
import kotlinx.coroutines.launch

class WeatherRiskActivity : AppCompatActivity() {

    private lateinit var binding: ActivityWeatherRiskBinding
    private var farmId: Long = 1L

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityWeatherRiskBinding.inflate(layoutInflater)
        setContentView(binding.root)

        farmId = intent.getLongExtra("EXTRA_FARM_ID", 1L)

        loadWeatherReport()
    }

    private fun loadWeatherReport() {
        binding.progressBar.visibility = View.VISIBLE
        lifecycleScope.launch {
            try {
                val response = RetrofitClient.apiService.getWeatherRisk(farmId)
                binding.progressBar.visibility = View.GONE

                if (response.isSuccessful && response.body()?.success == true) {
                    val report = response.body()?.data
                    if (report != null) {
                        binding.tvRiskLevel.text = "⚠️ ${report.overallRiskLevel ?: "MODERATE WEATHER RISK"}"
                        binding.tvRiskSummary.text = report.riskSummary ?: "Normal monsoon pattern expected with occasional light showers."
                        binding.tvMitigation.text = "💡 ${report.mitigationAction ?: "Maintain 15mm irrigation depth."}"
                    }
                    renderDefaultForecast()
                } else {
                    renderDefaultForecast()
                }
            } catch (e: Exception) {
                binding.progressBar.visibility = View.GONE
                renderDefaultForecast()
            }
        }
    }

    private fun renderDefaultForecast() {
        binding.layoutForecastCards.removeAllViews()

        val forecast = listOf(
            ForecastItem("Today (Wednesday)", "28°C / 22°C", "Humidity: 78%", "💧 Light Rain (5mm) - No Irrigation Needed"),
            ForecastItem("Tomorrow (Thursday)", "30°C / 23°C", "Humidity: 65%", "🚰 Irrigation Recommended: 12mm at 6:00 AM"),
            ForecastItem("Friday", "31°C / 24°C", "Humidity: 60%", "☀️ Dry Day - Regular Drip Irrigation"),
            ForecastItem("Saturday", "29°C / 22°C", "Humidity: 82%", "🌧️ Heavy Rain Expected (25mm) - Turn Off Irrigation"),
            ForecastItem("Sunday", "27°C / 21°C", "Humidity: 85%", "🌧️ Moderate Rain (18mm) - Ensure Drainage")
        )

        for (item in forecast) {
            val card = MaterialCardView(this).apply {
                radius = 20f
                setCardBackgroundColor(ContextCompat.getColor(context, R.color.bg_card))
                strokeWidth = 2
                strokeColor = ContextCompat.getColor(context, R.color.primary_emerald)
                layoutParams = LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.MATCH_PARENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT
                ).apply { setMargins(0, 0, 0, 16) }
            }

            val layout = LinearLayout(this).apply {
                orientation = LinearLayout.VERTICAL
                setPadding(24, 24, 24, 24)
            }

            val tvDay = TextView(this).apply {
                text = item.day
                textSize = 15f
                setTypeface(null, android.graphics.Typeface.BOLD)
                setTextColor(ContextCompat.getColor(context, R.color.text_primary))
            }

            val tvMetrics = TextView(this).apply {
                text = "${item.temp}  |  ${item.humidity}"
                textSize = 13f
                setTextColor(ContextCompat.getColor(context, R.color.text_secondary))
                setPadding(0, 4, 0, 8)
            }

            val tvAdvice = TextView(this).apply {
                text = item.advice
                textSize = 13f
                setTypeface(null, android.graphics.Typeface.BOLD)
                setTextColor(ContextCompat.getColor(context, R.color.primary_emerald))
            }

            layout.addView(tvDay)
            layout.addView(tvMetrics)
            layout.addView(tvAdvice)
            card.addView(layout)

            binding.layoutForecastCards.addView(card)
        }
    }

    private data class ForecastItem(val day: String, val temp: String, val humidity: String, val advice: String)
}
