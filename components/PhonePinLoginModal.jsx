import React, { useState } from 'react';
import { Phone, Lock, Volume2, ArrowRight, ShieldAlert, UserCheck, RefreshCw, X } from 'lucide-react';
import { api, setAuthToken } from '../services/api';
import { useTranslation } from '../context/LanguageContext';
import { speakText } from '../utils/voice';

export default function PhonePinLoginModal({ isOpen, onClose, onAuthSuccess, onSwitchToAdvanced }) {
  const { lang, setLang, t } = useTranslation();
  const [step, setStep] = useState(1); // 1: Phone, 2: PIN
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const instructions = {
    en: {
      phoneTitle: "Enter 10-digit Phone Number",
      phoneSub: "Use big numbers below or type your phone number",
      pinTitle: "Set or Enter 4-Digit PIN",
      pinSub: "Your secret 4-digit numeric PIN for quick login",
      speakPhone: "Please enter your ten digit mobile phone number.",
      speakPin: "Please enter your four digit PIN number."
    },
    kn: {
      phoneTitle: "10-ಅಂಕೆಗಳ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ",
      phoneSub: "ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಲು ಕೆಳಗಿನ ಬಟನ್‌ಗಳನ್ನು ಬಳಸಿ",
      pinTitle: "4-ಅಂಕೆಗಳ PIN ನಮೂದಿಸಿ",
      pinSub: "ತ್ವರಿತ ಲಾಗಿನ್‌ಗಾಗಿ ನಿಮ್ಮ ರಹಸ್ಯ 4-ಅಂಕೆಗಳ PIN",
      speakPhone: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹತ್ತು ಅಂಕೆಗಳ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",
      speakPin: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ನಾಲ್ಕು ಅಂಕೆಗಳ ಪಿನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ."
    },
    hi: {
      phoneTitle: "10-अंकों का फ़ोन नंबर दर्ज करें",
      phoneSub: "अपना फ़ोन नंबर दर्ज करने के लिए नीचे बड़े बटन का उपयोग करें",
      pinTitle: "4-अंकों का PIN दर्ज करें",
      pinSub: "त्वरित लॉगिन के लिए अपना 4-अंकों का गुप्त PIN",
      speakPhone: "कृपया अपना दस अंकों का मोबाइल नंबर दर्ज करें।",
      speakPin: "कृपया अपना चार अंकों का पिन नंबर दर्ज करें।"
    }
  };

  const currText = instructions[lang] || instructions.en;

  const handleKeypadPress = (val) => {
    setError('');
    if (step === 1) {
      if (val === 'DEL') {
        setPhoneNumber(prev => prev.slice(0, -1));
      } else if (val === 'CLR') {
        setPhoneNumber('');
      } else if (phoneNumber.length < 10) {
        setPhoneNumber(prev => prev + val);
      }
    } else if (step === 2) {
      if (val === 'DEL') {
        setPin(prev => prev.slice(0, -1));
      } else if (val === 'CLR') {
        setPin('');
      } else if (pin.length < 4) {
        const newPin = pin + val;
        setPin(newPin);
        if (newPin.length === 4) {
          submitPhoneLogin(phoneNumber, newPin);
        }
      }
    }
  };

  const handlePhoneNext = () => {
    const cleanDigits = phoneNumber.replace(/[^0-9]/g, '');
    if (cleanDigits.length < 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    setError('');
    setStep(2);
    speakText(currText.speakPin, lang);
  };

  const submitPhoneLogin = async (phoneToUse, pinToUse) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.phoneLogin({
        phoneNumber: phoneToUse,
        pin: pinToUse
      });
      setAuthToken(res.data.accessToken);
      if (onAuthSuccess) {
        onAuthSuccess({
          username: res.data.username,
          roles: res.data.roles,
          fullName: res.data.fullName,
          token: res.data.accessToken
        });
      }
      if (onClose) onClose();
    } catch (err) {
      setError(err.message || 'Login failed. Please check your PIN.');
    } finally {
      setLoading(false);
    }
  };

  const speakInstruction = () => {
    if (step === 1) {
      speakText(currText.speakPhone, lang);
    } else {
      speakText(currText.speakPin, lang);
    }
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed', inset: 0, background: 'rgba(16, 36, 26, 0.75)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px'
    }}>
      <div className="agri-card animate-fade-in" style={{
        width: '100%', maxWidth: '440px', background: '#FFFFFF', borderRadius: '24px',
        padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative'
      }}>
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['en', 'kn', 'hi'].map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '12px',
                  border: lang === l ? '2px solid #2F6B3F' : '1px solid #E2E8F0',
                  background: lang === l ? '#E8F5E9' : '#F8FAFC',
                  color: lang === l ? '#2F6B3F' : '#64748B',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={speakInstruction}
              title="Read Aloud"
              style={{
                width: '40px', height: '40px', borderRadius: '50%', background: '#FEF3C7', border: '1px solid #FCD34D',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B45309', cursor: 'pointer'
              }}>
              <Volume2 size={20} />
            </button>
            {onClose && (
              <button
                onClick={onClose}
                style={{
                  width: '40px', height: '40px', borderRadius: '50%', background: '#F1F5F9', border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', cursor: 'pointer'
                }}>
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Step Indicator */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: step >= 1 ? '#2F6B3F' : '#E2E8F0' }} />
          <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: step >= 2 ? '#2F6B3F' : '#E2E8F0' }} />
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            background: '#FEE2E2', color: '#991B1B', border: '1px solid #FCA5A5',
            borderRadius: '12px', padding: '12px', fontSize: '0.88rem', marginBottom: '16px',
            display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600
          }}>
            <ShieldAlert size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Phone Number */}
        {step === 1 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%', background: '#E8F5E9',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#2F6B3F', marginBottom: '10px'
              }}>
                <Phone size={32} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1E293B', margin: '0 0 4px 0' }}>
                🌾 {currText.phoneTitle}
              </h3>
              <p style={{ color: '#64748B', fontSize: '0.88rem', margin: 0 }}>
                {currText.phoneSub}
              </p>
            </div>

            {/* Display Field */}
            <div style={{
              background: '#F8FAFC', border: '2px solid #CBD5E1', borderRadius: '16px',
              padding: '14px 16px', textAlign: 'center', fontSize: '1.6rem', fontWeight: 800,
              letterSpacing: '2px', color: '#1E293B', marginBottom: '18px', minHeight: '60px',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {phoneNumber ? (
                <span>{phoneNumber.replace(/(\d{5})(\d{5})/, '$1 $2')}</span>
              ) : (
                <span style={{ color: '#94A3B8', fontSize: '1.2rem', fontWeight: 500 }}>98765 43210</span>
              )}
            </div>

            {/* Large 3x4 Touch Keypad */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
              {['1','2','3','4','5','6','7','8','9','CLR','0','DEL'].map((k) => (
                <button
                  key={k}
                  onClick={() => handleKeypadPress(k)}
                  style={{
                    height: '58px', borderRadius: '14px', border: '1px solid #E2E8F0',
                    background: k === 'CLR' || k === 'DEL' ? '#F1F5F9' : '#FFFFFF',
                    color: k === 'CLR' ? '#EF4444' : k === 'DEL' ? '#475569' : '#1E293B',
                    fontSize: k === 'CLR' || k === 'DEL' ? '0.9rem' : '1.4rem',
                    fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '56px'
                  }}>
                  {k === 'DEL' ? '⌫' : k}
                </button>
              ))}
            </div>

            <button
              onClick={handlePhoneNext}
              disabled={phoneNumber.length < 10}
              style={{
                width: '100%', minHeight: '58px', borderRadius: '16px', border: 'none',
                background: phoneNumber.length >= 10 ? '#2F6B3F' : '#94A3B8',
                color: '#FFFFFF', fontSize: '1.1rem', fontWeight: 800, cursor: phoneNumber.length >= 10 ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: phoneNumber.length >= 10 ? '0 4px 14px rgba(47, 107, 63, 0.4)' : 'none'
              }}>
              <span>Next</span>
              <ArrowRight size={22} />
            </button>
          </div>
        )}

        {/* Step 2: 4-Digit PIN */}
        {step === 2 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%', background: '#FEF3C7',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#D97706', marginBottom: '10px'
              }}>
                <Lock size={32} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1E293B', margin: '0 0 4px 0' }}>
                🔑 {currText.pinTitle}
              </h3>
              <p style={{ color: '#64748B', fontSize: '0.88rem', margin: 0 }}>
                {currText.pinSub}
              </p>
            </div>

            {/* PIN Dots (UPI style) */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    border: '3px solid #2F6B3F',
                    background: pin.length > idx ? '#2F6B3F' : 'transparent',
                    transition: 'all 0.15s ease'
                  }}
                />
              ))}
            </div>

            {/* Large 3x4 Touch Keypad for PIN */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
              {['1','2','3','4','5','6','7','8','9','CLR','0','DEL'].map((k) => (
                <button
                  key={k}
                  onClick={() => handleKeypadPress(k)}
                  disabled={loading}
                  style={{
                    height: '58px', borderRadius: '14px', border: '1px solid #E2E8F0',
                    background: k === 'CLR' || k === 'DEL' ? '#F1F5F9' : '#FFFFFF',
                    color: k === 'CLR' ? '#EF4444' : k === 'DEL' ? '#475569' : '#1E293B',
                    fontSize: k === 'CLR' || k === 'DEL' ? '0.9rem' : '1.4rem',
                    fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '56px'
                  }}>
                  {k === 'DEL' ? '⌫' : k}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => { setStep(1); setPin(''); setError(''); }}
                style={{
                  flex: 1, minHeight: '52px', borderRadius: '14px', border: '1px solid #CBD5E1',
                  background: '#F8FAFC', color: '#475569', fontWeight: 700, cursor: 'pointer'
                }}>
                Back to Phone
              </button>

              <button
                onClick={() => submitPhoneLogin(phoneNumber, pin)}
                disabled={pin.length < 4 || loading}
                style={{
                  flex: 2, minHeight: '52px', borderRadius: '14px', border: 'none',
                  background: pin.length === 4 ? '#2F6B3F' : '#94A3B8',
                  color: '#FFFFFF', fontSize: '1rem', fontWeight: 800, cursor: pin.length === 4 ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                }}>
                {loading ? <RefreshCw className="animate-spin" size={20} /> : <UserCheck size={20} />}
                <span>{loading ? 'Verifying...' : 'Login Now'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Link to Advanced Username/Email Login */}
        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #F1F5F9', textAlign: 'center' }}>
          <button
            onClick={() => {
              if (onSwitchToAdvanced) onSwitchToAdvanced();
            }}
            style={{ background: 'transparent', border: 'none', color: '#64748B', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>
            Advanced / Username & Email Login
          </button>
        </div>
      </div>
    </div>
  );
}
