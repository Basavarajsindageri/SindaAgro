package com.agrivision.android.data.api

import com.agrivision.android.data.model.*
import retrofit2.Response
import retrofit2.http.*

interface SindaAgroApiService {

    @POST("api/v1/auth/login")
    suspend fun login(@Body request: LoginRequest): Response<ApiResponse<AuthData>>

    @POST("api/v1/auth/phone-login")
    suspend fun phoneLogin(@Body request: PhoneLoginRequest): Response<ApiResponse<AuthData>>

    @GET("api/v1/farmers/me")
    suspend fun getFarmerProfile(): Response<ApiResponse<FarmerProfileDto>>

    @GET("api/v1/farms")
    suspend fun getFarms(): Response<ApiResponse<List<FarmDto>>>

    @POST("api/v1/farms")
    suspend fun createFarm(@Body farm: FarmDto): Response<ApiResponse<FarmDto>>

    @POST("api/v1/soil")
    suspend fun submitSoilReport(@Body report: SoilReportDto): Response<ApiResponse<SoilReportDto>>

    @GET("api/v1/soil/testers")
    suspend fun getSoilTesters(@Query("district") district: String? = null): Response<ApiResponse<List<SoilTesterDto>>>

    @POST("api/v1/soil/orders")
    suspend fun orderSoilTest(@Body request: SoilTestOrderRequest): Response<ApiResponse<SoilTestOrderResponse>>

    @GET("api/v1/recommendations/farm/{farmId}")
    suspend fun getRecommendations(
        @Path("farmId") farmId: Long,
        @Query("season") season: String = "KHARIF"
    ): Response<ApiResponse<RecommendationResponseDto>>

    @POST("api/v1/assistant/chat")
    suspend fun chatWithAssistant(@Body request: AssistantChatRequest): Response<ApiResponse<AssistantChatResponse>>

    @GET("api/v1/weather/risk/farm/{farmId}")
    suspend fun getWeatherRisk(@Path("farmId") farmId: Long): Response<ApiResponse<WeatherRiskReportDto>>

    @GET("api/v1/market/alternatives/farm/{farmId}")
    suspend fun getMarketReport(@Path("farmId") farmId: Long): Response<ApiResponse<MarketOpportunityReportDto>>

    @GET("api/v1/technology/farm/{farmId}")
    suspend fun getTechnologyRecommendations(@Path("farmId") farmId: Long): Response<ApiResponse<TechnologyRecommendationResponseDto>>
}
