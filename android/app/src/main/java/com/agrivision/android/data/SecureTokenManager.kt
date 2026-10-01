package com.agrivision.android.data

import android.content.Context
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import com.agrivision.android.data.api.RetrofitClient

object SecureTokenManager {

    private const val PREF_NAME = "sindaagro_secure_prefs"
    private const val KEY_AUTH_TOKEN = "auth_token"
    private const val KEY_USERNAME = "saved_username"

    fun saveToken(context: Context, token: String, username: String? = null) {
        try {
            val masterKey = MasterKey.Builder(context)
                .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
                .build()

            val prefs = EncryptedSharedPreferences.create(
                context,
                PREF_NAME,
                masterKey,
                EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
                EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
            )

            prefs.edit()
                .putString(KEY_AUTH_TOKEN, token)
                .apply()

            if (username != null) {
                prefs.edit().putString(KEY_USERNAME, username).apply()
            }

            RetrofitClient.setAuthToken(token)
        } catch (e: Exception) {
            // Fallback to standard prefs if crypto master key fails on custom ROMs
            val prefs = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
            prefs.edit().putString(KEY_AUTH_TOKEN, token).apply()
            RetrofitClient.setAuthToken(token)
        }
    }

    fun getToken(context: Context): String? {
        return try {
            val masterKey = MasterKey.Builder(context)
                .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
                .build()

            val prefs = EncryptedSharedPreferences.create(
                context,
                PREF_NAME,
                masterKey,
                EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
                EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
            )

            prefs.getString(KEY_AUTH_TOKEN, null)
        } catch (e: Exception) {
            context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE).getString(KEY_AUTH_TOKEN, null)
        }
    }

    fun clearToken(context: Context) {
        try {
            val masterKey = MasterKey.Builder(context)
                .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
                .build()

            val prefs = EncryptedSharedPreferences.create(
                context,
                PREF_NAME,
                masterKey,
                EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
                EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
            )

            prefs.edit().remove(KEY_AUTH_TOKEN).apply()
        } catch (e: Exception) {
            context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE).edit().remove(KEY_AUTH_TOKEN).apply()
        }
        RetrofitClient.setAuthToken(null)
    }
}
