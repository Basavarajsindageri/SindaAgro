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
import com.agrivision.android.data.model.FarmDto
import com.agrivision.android.databinding.ActivityFarmListBinding
import com.google.android.material.button.MaterialButton
import com.google.android.material.card.MaterialCardView
import kotlinx.coroutines.launch

class FarmListActivity : AppCompatActivity() {

    private lateinit var binding: ActivityFarmListBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityFarmListBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnAddFarm.setOnClickListener {
            Toast.makeText(this, "Add Farm Plot form launched", Toast.LENGTH_SHORT).show()
        }

        loadFarms()
    }

    override fun onResume() {
        super.onResume()
        loadFarms()
    }

    private fun loadFarms() {
        binding.progressBar.visibility = View.VISIBLE
        lifecycleScope.launch {
            try {
                val response = RetrofitClient.apiService.getFarms()
                binding.progressBar.visibility = View.GONE

                if (response.isSuccessful && response.body()?.success == true) {
                    val farms = response.body()?.data ?: emptyList()
                    renderFarmCards(farms)
                } else {
                    Toast.makeText(this@FarmListActivity, "Failed to load farms", Toast.LENGTH_SHORT).show()
                }
            } catch (e: Exception) {
                binding.progressBar.visibility = View.GONE
                Toast.makeText(this@FarmListActivity, "Network Error: ${e.localizedMessage}", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun renderFarmCards(farms: List<FarmDto>) {
        binding.layoutFarmCards.removeAllViews()

        if (farms.isEmpty()) {
            val emptyTv = TextView(this).apply {
                text = "No farm plots registered yet. Tap '+ Add New Farm Plot' below."
                textSize = 14f
                setTextColor(ContextCompat.getColor(context, R.color.text_muted))
                setPadding(16, 32, 16, 32)
            }
            binding.layoutFarmCards.addView(emptyTv)
            return
        }

        for (farm in farms) {
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
                text = "🚜 ${farm.farmName}"
                textSize = 18f
                setTypeface(null, android.graphics.Typeface.BOLD)
                setTextColor(ContextCompat.getColor(context, R.color.text_primary))
            }

            val tvDetails = TextView(this).apply {
                text = "• ${getString(R.string.farm_area, farm.areaAcres)}\n• ${getString(R.string.soil_type, farm.soilType)}\n• ${getString(R.string.water_source, farm.waterSource ?: "Borewell")}"
                textSize = 14f
                setTextColor(ContextCompat.getColor(context, R.color.text_secondary))
                setPadding(0, 8, 0, 16)
            }

            val btnAction = MaterialButton(this).apply {
                text = getString(R.string.soil_entry_title)
                setBackgroundColor(ContextCompat.getColor(context, R.color.primary_emerald))
                setTextColor(ContextCompat.getColor(context, R.color.white))
                setOnClickListener {
                    val intent = Intent(this@FarmListActivity, SoilEntryActivity::class.java).apply {
                        putExtra("EXTRA_FARM_ID", farm.id ?: 1L)
                    }
                    startActivity(intent)
                }
            }

            layout.addView(tvTitle)
            layout.addView(tvDetails)
            layout.addView(btnAction)
            card.addView(layout)

            binding.layoutFarmCards.addView(card)
        }
    }
}
