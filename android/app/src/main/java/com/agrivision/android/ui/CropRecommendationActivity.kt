package com.agrivision.android.ui

import android.content.Intent
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
import com.agrivision.android.data.model.CropRecommendationDto
import com.agrivision.android.data.model.HighValueAlternativeDto
import com.agrivision.android.databinding.ActivityCropRecommendationBinding
import com.google.android.material.button.MaterialButton
import com.google.android.material.card.MaterialCardView
import kotlinx.coroutines.launch

class CropRecommendationActivity : AppCompatActivity() {

    private lateinit var binding: ActivityCropRecommendationBinding
    private var farmId: Long = 1L

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCropRecommendationBinding.inflate(layoutInflater)
        setContentView(binding.root)

        farmId = intent.getLongExtra("EXTRA_FARM_ID", 1L)

        loadRecommendations()
    }

    private fun loadRecommendations() {
        binding.progressBar.visibility = View.VISIBLE
        lifecycleScope.launch {
            try {
                val response = RetrofitClient.apiService.getRecommendations(farmId)
                binding.progressBar.visibility = View.GONE

                if (response.isSuccessful && response.body()?.success == true) {
                    val recs = response.body()?.data
                    renderCards(recs?.recommendedCrops ?: emptyList(), recs?.highValueAlternativeCrops ?: emptyList())
                } else {
                    Toast.makeText(this@CropRecommendationActivity, "Failed to load recommendations", Toast.LENGTH_SHORT).show()
                }
            } catch (e: Exception) {
                binding.progressBar.visibility = View.GONE
                Toast.makeText(this@CropRecommendationActivity, "Network Error: ${e.localizedMessage}", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun renderCards(crops: List<CropRecommendationDto>, alternatives: List<HighValueAlternativeDto>) {
        binding.layoutRecommendationCards.removeAllViews()

        // 1. Recommended Staples & Primary Crops
        for ((idx, crop) in crops.withIndex()) {
            val card = MaterialCardView(this).apply {
                radius = 24f
                setCardBackgroundColor(ContextCompat.getColor(context, R.color.bg_card))
                strokeWidth = 2
                strokeColor = ContextCompat.getColor(context, R.color.primary_emerald)
                layoutParams = LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.MATCH_PARENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT
                ).apply { setMargins(0, 0, 0, 24) }
            }

            val layout = LinearLayout(this).apply {
                orientation = LinearLayout.VERTICAL
                setPadding(32, 32, 32, 32)
            }

            val tvRank = TextView(this).apply {
                text = "#${idx + 1} RECOMMENDED CROP (${crop.suitabilityScore}% SUITABLE)"
                textSize = 12f
                setTypeface(null, android.graphics.Typeface.BOLD)
                setTextColor(ContextCompat.getColor(context, R.color.primary_emerald))
            }

            val tvTitle = TextView(this).apply {
                text = "🌾 ${crop.cropName} (${crop.scientificName ?: ""})"
                textSize = 18f
                setTypeface(null, android.graphics.Typeface.BOLD)
                setTextColor(ContextCompat.getColor(context, R.color.text_primary))
                setPadding(0, 4, 0, 8)
            }

            val tvReasons = TextView(this).apply {
                text = crop.reasons?.joinToString("\n• ", prefix = "• ") ?: "• Matches soil NPK & pH profile"
                textSize = 13f
                setTextColor(ContextCompat.getColor(context, R.color.text_secondary))
                setPadding(0, 0, 0, 16)
            }

            val btnTimeline = MaterialButton(this).apply {
                text = "View Farming & Protection Timeline ➔"
                setBackgroundColor(ContextCompat.getColor(context, R.color.primary_emerald))
                setTextColor(ContextCompat.getColor(context, R.color.white))
                setOnClickListener {
                    val intent = Intent(this@CropRecommendationActivity, FarmingPlanTimelineActivity::class.java).apply {
                        putExtra("EXTRA_CROP_NAME", crop.cropName)
                    }
                    startActivity(intent)
                }
            }

            layout.addView(tvRank)
            layout.addView(tvTitle)
            layout.addView(tvReasons)
            layout.addView(btnTimeline)
            card.addView(layout)

            binding.layoutRecommendationCards.addView(card)
        }

        // 2. High-Value Commercial Cash Crops
        for (alt in alternatives) {
            val altCard = MaterialCardView(this).apply {
                radius = 24f
                setCardBackgroundColor(ContextCompat.getColor(context, R.color.bg_card))
                strokeWidth = 2
                strokeColor = ContextCompat.getColor(context, R.color.accent_gold)
                layoutParams = LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.MATCH_PARENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT
                ).apply { setMargins(0, 0, 0, 24) }
            }

            val altLayout = LinearLayout(this).apply {
                orientation = LinearLayout.VERTICAL
                setPadding(32, 32, 32, 32)
            }

            val tvBadge = TextView(this).apply {
                text = "💰 HIGH-VALUE CASH OPPORTUNITY (${alt.profitMultiplierVsStaple}x Profit Multiplier)"
                textSize = 12f
                setTypeface(null, android.graphics.Typeface.BOLD)
                setTextColor(ContextCompat.getColor(context, R.color.accent_gold))
            }

            val tvAltTitle = TextView(this).apply {
                text = "🌿 ${alt.cropName}"
                textSize = 18f
                setTypeface(null, android.graphics.Typeface.BOLD)
                setTextColor(ContextCompat.getColor(context, R.color.text_primary))
                setPadding(0, 4, 0, 4)
            }

            val tvAltProfit = TextView(this).apply {
                text = "Est. Net Profit: ₹${alt.estimatedNetProfitPerAcre.toInt()} / Acre\n• Market Price: ₹${alt.marketPricePerQuintal.toInt()} / Quintal"
                textSize = 13f
                setTypeface(null, android.graphics.Typeface.BOLD)
                setTextColor(ContextCompat.getColor(context, R.color.primary_emerald))
                setPadding(0, 0, 0, 12)
            }

            altLayout.addView(tvBadge)
            altLayout.addView(tvAltTitle)
            altLayout.addView(tvAltProfit)
            altCard.addView(altLayout)

            binding.layoutRecommendationCards.addView(altCard)
        }
    }
}
