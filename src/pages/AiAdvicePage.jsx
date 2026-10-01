import React, { useState } from 'react';
import { Sparkles, Volume2, VolumeX, HelpCircle, ChevronDown, ChevronUp, Sprout, CloudRain, TrendingUp, Mic, MicOff, Send } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { speakText, stopSpeech } from '../utils/voice';
import { api } from '../services/api';

export default function AiAdvicePage({ masterDecision }) {
  const { lang, t } = useTranslation();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: '🤖 *SINDAAGRO AI Agronomist Active*\nAsk me anything about soil NPK fertilizers, eco-friendly pesticides (Neem Oil, Chlorantraniliprole), low-cost smart technology (Solar Insect Traps), sowing windows, or weather risk.' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const aiSummaryText = masterDecision?.masterAiSummary || 
    "SindaAgro AI platform recommends growing Chilli or Paddy on your farm based on soil pH 6.8 and nitrogen levels. Micro-weather indicates rain tomorrow; defer chemical spraying for 48 hours.";

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
    } else {
      const success = speakText(aiSummaryText, lang);
      if (success) setIsPlayingAudio(true);
    }
  };

  const handleSend = async (textQuery) => {
    const query = textQuery || inputMsg;
    if (!query.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    if (!textQuery) setInputMsg('');
    setLoading(true);

    try {
      const res = await api.chatWithAssistant({ message: query });
      const reply = res.data?.reply || 'SindaAgro AI Advice: For best yields, apply split NPK dose (25 kg Urea + 15 kg MOP at Day 25) and use Neem Oil 1500 PPM for eco-friendly pest control.';
      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'ai', text: '🤖 SindaAgro AI: Recommended eco-friendly pesticide: Neem Oil 1500 PPM @ 3-5 ml/L water or Chlorantraniliprole 18.5% SC @ 0.3 ml/L for stem borer protection.' }]);
    } finally {
      setLoading(false);
    }
  };

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInputMsg(transcript);
      handleSend(transcript);
    };
    recognition.start();
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div>
        <span style={{ background: '#2EBF71', color: '#FFF', fontSize: '0.75rem', fontWeight: 900, padding: '4px 10px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          24/7 SINDAAGRO AI AGRONOMIST
        </span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFFFFF', marginTop: '4px' }}>
          Smart Farming AI Voice &amp; Text Assistant
        </h2>
      </div>

      {/* Main AI Orb & Voice Banner */}
      <div className="agri-card agri-card-ai" style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
        
        {/* Animated AI Glowing Orb */}
        <div style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #65E69A 0%, #2EBF71 60%, #0D1F17 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--glow-green)',
          position: 'relative',
          flexShrink: 0
        }} className="pulse-glow">
          <Sparkles size={42} color="#FFFFFF" />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFFFFF' }}>
              SINDAAGRO Master Decision Summary
            </h3>

            <button 
              onClick={handleToggleAudio}
              className="btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.88rem' }}>
              {isPlayingAudio ? <VolumeX size={18} /> : <Volume2 size={18} />}
              <span>{isPlayingAudio ? 'Stop Speech' : 'Listen Voice AI'}</span>
            </button>
          </div>

          <p style={{ fontSize: '0.92rem', color: '#94A3B8', marginBottom: '12px' }}>
            AI-computed agronomic recommendation based on your soil NPK test and local micro-weather forecasts.
          </p>

          <div style={{ background: 'rgba(13, 31, 23, 0.9)', padding: '16px', borderRadius: '12px', border: '1px solid #2EBF71', fontSize: '0.95rem', lineHeight: 1.6, color: '#F8FAFC', fontWeight: 600 }}>
            "{aiSummaryText}"
          </div>
        </div>

      </div>

      {/* Interactive AI Chat Box with Voice Input */}
      <div className="agri-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '400px', border: '1px solid rgba(46, 191, 113, 0.3)' }}>
        <div style={{ borderBottom: '1px solid rgba(46, 191, 113, 0.2)', paddingBottom: '12px', fontWeight: 800, color: '#FFFFFF', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} color="#2EBF71" />
          <span>Interactive AI Agronomist Chatbot</span>
        </div>

        {/* Chat History */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '6px' }}>
          {messages.map((m, idx) => (
            <div key={idx} style={{
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              background: m.sender === 'user' ? 'linear-gradient(135deg, #2EBF71, #1F9D63)' : 'rgba(13, 31, 23, 0.9)',
              color: '#FFFFFF',
              padding: '14px 18px',
              borderRadius: '16px',
              border: m.sender === 'user' ? 'none' : '1px solid rgba(46, 191, 113, 0.3)',
              fontSize: '0.92rem',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap'
            }}>
              {m.text}
            </div>
          ))}
          {loading && <div style={{ color: '#2EBF71', fontSize: '0.85rem', fontWeight: 700 }}>AI Agronomist is computing response...</div>}
        </div>

        {/* Quick Suggestion Chips */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {['Best Eco-Friendly Pesticides', 'Solar Insect Traps', 'Day 0 Fertilizer Dosage', 'Rainfall Warning Tomorrow'].map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              style={{
                background: 'rgba(46, 191, 113, 0.15)',
                border: '1px solid rgba(46, 191, 113, 0.3)',
                color: '#65E69A',
                padding: '6px 12px',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Message Input & Voice Controls */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={startVoiceInput}
            style={{
              background: isListening ? '#EF4444' : 'rgba(13, 31, 23, 0.9)',
              border: '1px solid #2EBF71',
              color: '#FFF',
              padding: '12px',
              borderRadius: '12px',
              cursor: 'pointer'
            }}
            title="Voice Input"
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} color="#2EBF71" />}
          </button>

          <input
            type="text"
            placeholder="Ask AI about fertilizers, crops, pests, weather risk..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="agri-input"
            style={{ flex: 1 }}
          />

          <button className="btn-primary" onClick={() => handleSend()} style={{ padding: '12px 20px' }}>
            <Send size={18} />
          </button>
        </div>

      </div>

    </div>
  );
}
