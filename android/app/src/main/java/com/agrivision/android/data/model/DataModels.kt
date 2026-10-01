package com.agrivision.android.data.model

import com.google.gson.annotations.SerializedName

data class ApiResponse<T>(
    val success: Boolean,
    val message: String,
    val data: T?
)

data class LoginRequest(
    val username: String,
    val password: String
)

data class PhoneLoginRequest(
    @SerializedName("phoneNumber") val phoneNumber: String,
    @SerializedName("pin") val pin: String
)

data class AuthData(
    val accessToken: String,
    val tokenType: String,
    val username: String,
    val roles: List<String>
)

data class FarmerProfileDto(
    val id: Long?,
    val userId: Long?,
    val username: String?,
    val fullName: String?,
    val phoneNumber: String?,
    val state: String?,
    val district: String?,
    val taluk: String?,
    val village: String?,
    val totalLandAcres: Double?
)

data class FarmDto(
    val id: Long?,
    val farmName: String,
    val areaAcres: Double,
    val soilType: String,
    val irrigationAvailable: Boolean,
    val waterSource: String?,
    val previousCrop: String?
)

data class SoilReportDto(
    val id: Long?,
    val farmId: Long,
    val ph: Double,
    val nitrogen: Double,
    val phosphorus: Double,
    val potassium: Double,
    val organicCarbon: Double?
)

data class SoilTesterDto(
    val id: Long,
    val testerName: String,
    val labName: String,
    val district: String,
    val state: String,
    val priceInInr: Int,
    val turnaroundDays: Int,
    val contactPhone: String,
    val rating: Double,
    val address: String,
    val procedureSteps: List<String>?
)

data class SoilTestOrderRequest(
    val farmId: Long,
    val testerId: Long,
    val collectionType: String = "DOORSTEP",
    val notes: String? = null
)

data class SoilTestOrderResponse(
    val orderId: String,
    val farmId: Long,
    val testerId: Long,
    val testerName: String,
    val labName: String,
    val priceInInr: Int,
    val collectionType: String,
    val orderStatus: String,
    val estimatedCompletionDate: String
)

data class CropRecommendationDto(
    val cropName: String,
    val scientificName: String?,
    val category: String?,
    val suitabilityScore: Int,
    val matchLevel: String?,
    val reasons: List<String>?,
    val riskCautions: List<String>?
)

data class HighValueAlternativeDto(
    val cropName: String,
    val category: String,
    val profitMultiplierVsStaple: Double,
    val estimatedNetProfitPerAcre: Double,
    val estimatedYieldPerAcre: String,
    val marketPricePerQuintal: Double,
    val transitionAdvice: String
)

data class FarmingPlanDto(
    val cropName: String,
    val seedVariety: String,
    val seedRatePerAcre: String,
    val basalFertilizerDose: String,
    val topDressingSchedule: List<String>
)

data class WeatherRiskReportDto(
    val district: String,
    val state: String,
    val overallRiskLevel: String,
    val alerts: List<WeatherAlertDto>?
)

data class WeatherAlertDto(
    val title: String,
    val description: String,
    val mitigationAction: String
)

data class RecommendationResponseDto(
    val farmId: Long,
    val season: String,
    val recommendedCrops: List<CropRecommendationDto>?,
    val highValueAlternativeCrops: List<HighValueAlternativeDto>?
)

data class PesticideGuideDto(
    val pesticideName: String,
    val targetPest: String,
    val dosagePerAcre: String,
    val applicationMethod: String,
    val safetyPrecaution: String,
    val stepByStepInstructions: List<String>?
)

data class TechnologyGuideDto(
    val techName: String,
    val category: String,
    val benefit: String,
    val estCostInr: Int,
    val usageProcedure: String
)

data class AssistantChatRequest(
    val message: String,
    val context: String? = null
)

data class AssistantChatResponse(
    val reply: String,
    val recommendedPesticides: List<PesticideGuideDto>?,
    val recommendedTechnologies: List<TechnologyGuideDto>?
)

data class TechnologyRecommendationDto(
    val techId: String,
    val techName: String,
    val category: String,
    val estimatedCostInr: Double,
    val suitabilityReason: String,
    val implementationStep: String,
    val estimatedWaterOrCostSavingsPercent: Double,
    val keyBenefits: List<String>?
)

data class TechnologyRecommendationResponseDto(
    val farmId: Long,
    val farmName: String,
    val soilType: String,
    val waterSource: String,
    val areaAcres: Double,
    val rankedRecommendations: List<TechnologyRecommendationDto>?
)

