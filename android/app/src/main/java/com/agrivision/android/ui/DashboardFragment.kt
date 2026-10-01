package com.agrivision.android.ui

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import com.agrivision.android.R
import com.agrivision.android.data.api.RetrofitClient
import com.agrivision.android.databinding.FragmentDashboardBinding
import kotlinx.coroutines.launch

class DashboardFragment : Fragment() {

    private var _binding: FragmentDashboardBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentDashboardBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupTileClickListeners()
        loadHomeData()
    }

    private fun setupTileClickListeners() {
        binding.cardMyFarm.setOnClickListener {
            val intent = android.content.Intent(requireContext(), FarmListActivity::class.java)
            startActivity(intent)
        }

        binding.cardCheckSoil.setOnClickListener {
            val intent = android.content.Intent(requireContext(), SoilEntryActivity::class.java)
            startActivity(intent)
        }

        binding.cardCropRecommendation.setOnClickListener {
            val intent = android.content.Intent(requireContext(), CropRecommendationActivity::class.java)
            startActivity(intent)
        }

        binding.cardWeather.setOnClickListener {
            val intent = android.content.Intent(requireContext(), WeatherRiskActivity::class.java)
            startActivity(intent)
        }

        binding.cardMarket.setOnClickListener {
            val intent = android.content.Intent(requireContext(), MarketRatesActivity::class.java)
            startActivity(intent)
        }

        binding.cardAssistant.setOnClickListener {
            val intent = android.content.Intent(requireContext(), AssistantChatActivity::class.java)
            startActivity(intent)
        }
    }

    private fun loadHomeData() {
        lifecycleScope.launch {
            try {
                val response = RetrofitClient.apiService.getFarmerProfile()
                if (response.isSuccessful && response.body()?.success == true) {
                    val profile = response.body()?.data
                    val name = profile?.fullName ?: profile?.username ?: "Farmer"
                    val district = profile?.district ?: "Belagavi"
                    val state = profile?.state ?: "Karnataka"

                    binding.tvGreeting.text = getString(R.string.home_greeting, name)
                    binding.tvLocation.text = getString(R.string.home_location, district, state)
                    binding.tvTodaySummary.text = getString(R.string.home_today_summary, district)
                } else {
                    binding.tvGreeting.text = getString(R.string.home_greeting, "Farmer")
                    binding.tvLocation.text = "SindaAgro Smart Agriculture"
                    binding.tvTodaySummary.text = "Optimal soil moisture & clear weather forecast."
                }
            } catch (e: Exception) {
                binding.tvGreeting.text = getString(R.string.home_greeting, "Farmer")
                binding.tvTodaySummary.text = "Offline Mode: Showing cached farm information."
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
