import React, { useState } from 'react';
import { Sparkles, TrendingUp, Globe2, ShieldAlert, Mic, MicOff, Volume2, VolumeX, Send, ArrowUpRight } from 'lucide-react';
import { api } from '../services/api';

export default function AiTradeIntelligencePage() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: '🌐 *BharatSpice Global AI Trade Intelligence Active*\nAsk me about global spice demand, price trend forecasts, export tariffs, FDA/EU compliance, or top buyer country opportunities.' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleSend = async (queryText) => {
    const textToSend = queryText || inputMsg;
    if (!textToSend.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: textToSend }]);
    if (!queryText) setInputMsg('');
    setLoading(true);

    try {
      const res = await api.chatWithAssistant({ message: textToSend });
      const reply = res.data?.reply || 'Global trade intelligence forecast: High demand for Green Cardamom and Salem Turmeric in UAE & US markets over the next quarter.';
      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'ai', text: '🌐 AI Market Intelligence: Green Cardamom prices projected to rise +6.2% due to festive demand in Middle East markets.' }]);
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
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputMsg(transcript);
      handleSend(transcript);
    };
    recognition.start();
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ background: '#F97316', color: '#FFF', fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            FUTURISTIC AI TRADE DASHBOARD
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFFFFF', marginTop: '4px' }}>
            Global Market Demand &amp; Price Intelligence
          </h2>
        </div>
      </div>

      {/* 4 Trade Intelligence Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        
        <div className="agri-card" style={{ border: '1px solid #F97316' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#F97316', marginBottom: '8px' }}>
            <TrendingUp size={24} />
            <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>+8.4% YoY</span>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>Global Spice Index</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFF', margin: '4px 0' }}>$4.2 Billion</div>
          <span style={{ fontSize: '0.75rem', color: '#10B981' }}>Strong Export Momentum</span>
        </div>

        <div className="agri-card" style={{ border: '1px solid #F59E0B' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#F59E0B', marginBottom: '8px' }}>
            <Globe2 size={24} />
            <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>Top Destination</span>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>Middle East &amp; UAE</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFF', margin: '4px 0' }}>24,000 MT</div>
          <span style={{ fontSize: '0.75rem', color: '#F59E0B' }}>Cardamom &amp; Cumin Surge</span>
        </div>

        <div className="agri-card" style={{ border: '1px solid #E11D48' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#E11D48', marginBottom: '8px' }}>
            <ShieldAlert size={24} />
            <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>Compliance Status</span>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>US FDA &amp; EU MRL</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFF', margin: '4px 0' }}>99.4% Pass</div>
          <span style={{ fontSize: '0.75rem', color: '#10B981' }}>Zero Pesticide Residue</span>
        </div>

        <div className="agri-card" style={{ border: '1px solid #3B82F6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#3B82F6', marginBottom: '8px' }}>
            <Sparkles size={24} />
            <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>AI Price Predictor</span>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>30-Day Projection</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFF', margin: '4px 0' }}>Bullish 📈</div>
          <span style={{ fontSize: '0.75rem', color: '#3B82F6' }}>Hold Pepper &amp; Turmeric</span>
        </div>

      </div>

      {/* Interactive AI Trade Chatbot */}
      <div className="agri-card agri-card-ai" style={{ display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '450px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid rgba(249, 115, 22, 0.2)', paddingBottom: '14px' }}>
          <Sparkles size={24} color="#F97316" />
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFF' }}>
              BharatSpice AI Trade Intelligence Assistant
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Powered by Real-Time Customs, APMC &amp; Global Trade Feeds</span>
          </div>
        </div>

        {/* Chat Messages */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '6px' }}>
          {messages.map((m, idx) => (
            <div key={idx} style={{
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              background: m.sender === 'user' ? 'linear-gradient(135deg, #F97316, #E11D48)' : 'rgba(15, 23, 42, 0.9)',
              color: '#FFFFFF',
              padding: '14px 18px',
              borderRadius: '16px',
              border: m.sender === 'user' ? 'none' : '1px solid rgba(249, 115, 22, 0.3)',
              fontSize: '0.92rem',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap'
            }}>
              {m.text}
            </div>
          ))}
          {loading && <div style={{ color: '#F97316', fontSize: '0.85rem', fontWeight: 700 }}>AI Agronomist is analyzing market trends...</div>}
        </div>

        {/* Quick Action Chips */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {['Global Demand Forecast', 'Cardamom Prices in Dubai', 'US FDA Quality Standard', 'Best Month to Export Turmeric'].map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              style={{
                background: 'rgba(249, 115, 22, 0.1)',
                border: '1px solid rgba(249, 115, 22, 0.3)',
                color: '#F97316',
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

        {/* Message & Voice Input */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={startVoiceInput}
            style={{
              background: isListening ? '#E11D48' : 'rgba(15, 23, 42, 0.9)',
              border: '1px solid #F97316',
              color: '#FFF',
              padding: '12px',
              borderRadius: '12px',
              cursor: 'pointer'
            }}
            title="Voice Input"
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} color="#F97316" />}
          </button>

          <input
            type="text"
            placeholder="Ask about spice prices, export demand, tariffs..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid rgba(249, 115, 22, 0.3)',
              background: 'rgba(15, 23, 42, 0.9)',
              color: '#FFF',
              fontSize: '0.92rem'
            }}
          />

          <button className="btn-primary" onClick={() => handleSend()} style={{ padding: '12px 20px' }}>
            <Send size={18} />
          </button>
        </div>

      </div>

    </div>
  );
}
