package com.agrivision.android.ui

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.agrivision.android.R
import com.agrivision.android.data.SecureTokenManager
import com.agrivision.android.data.api.RetrofitClient
import com.agrivision.android.data.model.LoginRequest
import com.agrivision.android.data.model.PhoneLoginRequest
import com.agrivision.android.databinding.ActivityLoginBinding
import kotlinx.coroutines.launch

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private var enteredPhone: String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Check auto-login if token exists
        val savedToken = SecureTokenManager.getToken(this)
        if (!savedToken.isNullOrEmpty()) {
            RetrofitClient.setAuthToken(savedToken)
            navigateToMain()
            return
        }

        setupClickListeners()
    }

    private fun setupClickListeners() {
        // Selection Mode
        binding.btnContinuePhone.setOnClickListener {
            showPhoneInputView()
        }

        binding.btnShowAdvanced.setOnClickListener {
            showAdvancedInputView()
        }

        // Phone Step
        binding.btnPhoneNext.setOnClickListener {
            val phone = binding.etPhone.text.toString().trim()
            if (phone.length < 10) {
                Toast.makeText(this, getString(R.string.invalid_phone), Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }
            enteredPhone = phone
            showPinInputView()
        }

        binding.btnPhoneBack.setOnClickListener {
            showSelectionView()
        }

        // PIN Step
        binding.btnPinSubmit.setOnClickListener {
            val pin = binding.etPin.text.toString().trim()
            if (pin.length < 4) {
                Toast.makeText(this, getString(R.string.invalid_pin), Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }
            performPhonePinLogin(enteredPhone, pin)
        }

        binding.btnPinBack.setOnClickListener {
            showPhoneInputView()
        }

        // Advanced Login Step
        binding.btnLoginAdvanced.setOnClickListener {
            val username = binding.etUsername.text.toString().trim()
            val password = binding.etPassword.text.toString().trim()

            if (username.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "Please enter username and password", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            performAdvancedLogin(username, password)
        }

        binding.btnAdvancedBack.setOnClickListener {
            showSelectionView()
        }
    }

    private fun showSelectionView() {
        binding.layoutMainSelection.visibility = View.VISIBLE
        binding.layoutPhoneContainer.visibility = View.GONE
        binding.layoutPinContainer.visibility = View.GONE
        binding.layoutAdvancedContainer.visibility = View.GONE
    }

    private fun showPhoneInputView() {
        binding.layoutMainSelection.visibility = View.GONE
        binding.layoutPhoneContainer.visibility = View.VISIBLE
        binding.layoutPinContainer.visibility = View.GONE
        binding.layoutAdvancedContainer.visibility = View.GONE
        binding.etPhone.requestFocus()
    }

    private fun showPinInputView() {
        binding.layoutMainSelection.visibility = View.GONE
        binding.layoutPhoneContainer.visibility = View.GONE
        binding.layoutPinContainer.visibility = View.VISIBLE
        binding.layoutAdvancedContainer.visibility = View.GONE
        binding.tvPinPhoneSub.text = "Phone: +91 $enteredPhone"
        binding.etPin.requestFocus()
    }

    private fun showAdvancedInputView() {
        binding.layoutMainSelection.visibility = View.GONE
        binding.layoutPhoneContainer.visibility = View.GONE
        binding.layoutPinContainer.visibility = View.GONE
        binding.layoutAdvancedContainer.visibility = View.VISIBLE
        binding.etUsername.requestFocus()
    }

    private fun setLoading(loading: Boolean) {
        binding.progressBar.visibility = if (loading) View.VISIBLE else View.GONE
        binding.btnPhoneNext.isEnabled = !loading
        binding.btnPinSubmit.isEnabled = !loading
        binding.btnLoginAdvanced.isEnabled = !loading
    }

    private fun performPhonePinLogin(phone: String, pin: String) {
        setLoading(true)
        lifecycleScope.launch {
            try {
                val response = RetrofitClient.apiService.phoneLogin(PhoneLoginRequest(phone, pin))
                setLoading(false)

                if (response.isSuccessful && response.body()?.success == true) {
                    val authData = response.body()?.data
                    if (authData?.accessToken != null) {
                        SecureTokenManager.saveToken(this@LoginActivity, authData.accessToken, authData.username)
                        Toast.makeText(this@LoginActivity, getString(R.string.login_success), Toast.LENGTH_SHORT).show()
                        navigateToMain()
                    } else {
                        Toast.makeText(this@LoginActivity, "Login failed: Missing token", Toast.LENGTH_LONG).show()
                    }
                } else {
                    Toast.makeText(this@LoginActivity, "Login Failed: ${response.message()}", Toast.LENGTH_LONG).show()
                }
            } catch (e: Exception) {
                setLoading(false)
                Toast.makeText(this@LoginActivity, "Network Error: ${e.localizedMessage}", Toast.LENGTH_LONG).show()
            }
        }
    }

    private fun performAdvancedLogin(user: String, pass: String) {
        setLoading(true)
        lifecycleScope.launch {
            try {
                val response = RetrofitClient.apiService.login(LoginRequest(user, pass))
                setLoading(false)

                if (response.isSuccessful && response.body()?.success == true) {
                    val authData = response.body()?.data
                    if (authData?.accessToken != null) {
                        SecureTokenManager.saveToken(this@LoginActivity, authData.accessToken, authData.username)
                        Toast.makeText(this@LoginActivity, getString(R.string.login_success), Toast.LENGTH_SHORT).show()
                        navigateToMain()
                    } else {
                        Toast.makeText(this@LoginActivity, "Login failed: Missing token", Toast.LENGTH_LONG).show()
                    }
                } else {
                    Toast.makeText(this@LoginActivity, "Authentication failed: ${response.message()}", Toast.LENGTH_LONG).show()
                }
            } catch (e: Exception) {
                setLoading(false)
                Toast.makeText(this@LoginActivity, "Network Error: ${e.localizedMessage}", Toast.LENGTH_LONG).show()
            }
        }
    }

    private fun navigateToMain() {
        val intent = Intent(this, MainActivity::class.java)
        startActivity(intent)
        finish()
    }
}
