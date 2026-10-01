import React, { useState, useEffect, useRef } from 'react';
import { Bot, Mic, Send, X, Volume2, Sparkles, ChevronRight, Compass, ShieldCheck } from 'lucide-react';
import { api } from '../../services/api';
import { useTranslation } from '../../context/LanguageContext';
import { speakText, listenVoiceInput, stopSpeech } from '../../utils/voice';

const GUIDED_STEPS = [
  { id: 'land_prep', label: '1. Land Prep', icon: '🌱' },
  { id: 'seed', label: '2. Seed', icon: '🌾' },
  { id: 'sowing', label: '3. Sowing', icon: '🚜' },
  { id: 'nutrition', label: '4. Nutrition', icon: '🧪' },
  { id: 'monitoring', label: '5. Monitor', icon: '🔍' },
  { id: 'harvest', label: '6. Harvest', icon: '🌾' },
  { id: 'storage', label: '7. Storage', icon: '📦' }
];

export default function AiAssistantWidget() {
  const { lang, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'guided'
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Namaste! I am your SindaAgro RAG AI Farming Assistant. Ask me anything about crop choices, soil nutrition, pests, or smart technologies!',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = async (textToSend, guidedStepId = null) => {
    const text = textToSend || inputText;
    if (!text.trim() && !guidedStepId) return;

    const userMsg = {
      sender: 'user',
      text: text || `Guided Step: ${GUIDED_STEPS[currentStepIdx]?.label}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setLoading(true);

    try {
      const res = await api.chatWithAssistant({
        message: text || `Provide advice for ${guidedStepId}`,
        guidedStep: guidedStepId,
        language: lang
      });

      const replyText = res?.data?.reply || res?.response || 'I am processing your query with agricultural knowledge base.';
      
      const botMsg = {
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      speakText(replyText, lang);
    } catch (err) {
      const errorMsg = {
        sender: 'bot',
        text: 'Sorry, I had trouble retrieving the agronomic advice. Please check your network connection.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    listenVoiceInput(
      lang,
      (transcript) => {
        setInputText(transcript);
        setIsListening(false);
        sendMessage(transcript);
      },
      (err) => {
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );
  };

  const handleStepClick = (idx) => {
    setCurrentStepIdx(idx);
    const step = GUIDED_STEPS[idx];
    sendMessage(`Tell me what to do for ${step.label}`, step.id);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Assistant"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          height: '60px',
          borderRadius: '30px',
          padding: '0 20px',
          background: 'linear-gradient(135deg, #10241A 0%, #2F6B3F 100%)',
          color: '#7BE08A',
          border: '2px solid #7BE08A',
          boxShadow: '0 10px 25px rgba(16,36,26,0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          fontWeight: 700,
          fontSize: '0.95rem'
        }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(123, 224, 138, 0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Bot size={22} color="#7BE08A" />
        </div>
        <span>Ask Farmer AI</span>
        <Sparkles size={16} color="#C9A84C" />
      </button>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '96px',
          right: '24px',
          zIndex: 9999,
          width: '380px',
          maxWidth: 'calc(100vw - 32px)',
          height: '540px',
          maxHeight: 'calc(100vh - 120px)',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          border: '1px solid #CBD5E1',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'fadeInUp 0.25s ease-out'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #10241A 0%, #2F6B3F 100%)',
            color: '#FFFFFF',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%', background: '#7BE08A',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10241A'
              }}>
                <Bot size={24} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>SindaAgro AI</span>
                  <span style={{ fontSize: '0.65rem', background: '#C9A84C', color: '#10241A', padding: '2px 6px', borderRadius: '8px', fontWeight: 800 }}>RAG</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#A7F3D0' }}>Multilingual Voice Assistant</div>
              </div>
            </div>

            <button
              onClick={() => { stopSpeech(); setIsOpen(false); }}
              style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          </div>

          {/* Mode Tabs */}
          <div style={{ display: 'flex', background: '#F1F5F9', borderBottom: '1px solid #E2E8F0', padding: '4px' }}>
            <button
              onClick={() => setActiveTab('chat')}
              style={{
                flex: 1, padding: '8px', border: 'none', borderRadius: '12px',
                background: activeTab === 'chat' ? '#FFFFFF' : 'transparent',
                fontWeight: 700, fontSize: '0.82rem', color: activeTab === 'chat' ? '#2F6B3F' : '#64748B',
                cursor: 'pointer', boxShadow: activeTab === 'chat' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}>
              💬 Ask Question
            </button>
            <button
              onClick={() => setActiveTab('guided')}
              style={{
                flex: 1, padding: '8px', border: 'none', borderRadius: '12px',
                background: activeTab === 'guided' ? '#FFFFFF' : 'transparent',
                fontWeight: 700, fontSize: '0.82rem', color: activeTab === 'guided' ? '#2F6B3F' : '#64748B',
                cursor: 'pointer', boxShadow: activeTab === 'guided' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'
              }}>
              <Compass size={14} />
              <span>Guided Steps</span>
            </button>
          </div>

          {/* Guided Mode Pills Header */}
          {activeTab === 'guided' && (
            <div style={{ background: '#F8FAFC', padding: '10px', borderBottom: '1px solid #E2E8F0', overflowX: 'auto', display: 'flex', gap: '6px' }}>
              {GUIDED_STEPS.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => handleStepClick(idx)}
                  style={{
                    whiteSpace: 'nowrap',
                    padding: '6px 10px',
                    borderRadius: '16px',
                    border: currentStepIdx === idx ? '2px solid #2F6B3F' : '1px solid #CBD5E1',
                    background: currentStepIdx === idx ? '#E8F5E9' : '#FFFFFF',
                    color: currentStepIdx === idx ? '#2F6B3F' : '#475569',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}>
                  {s.icon} {s.label}
                </button>
              ))}
            </div>
          )}

          {/* Messages Body */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', background: '#FAF9F6' }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: m.sender === 'user' ? '#2F6B3F' : '#FFFFFF',
                  color: m.sender === 'user' ? '#FFFFFF' : '#1E293B',
                  borderRadius: m.sender === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                  padding: '12px 14px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  fontSize: '0.88rem',
                  lineHeight: '1.45',
                  position: 'relative'
                }}>
                <div>{m.text}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.68rem', opacity: 0.7 }}>
                  <span>{m.time}</span>
                  {m.sender === 'bot' && (
                    <button
                      onClick={() => speakText(m.text, lang)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit' }}>
                      <Volume2 size={12} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: 'flex-start', background: '#FFFFFF', padding: '10px 14px', borderRadius: '18px', fontSize: '0.85rem', color: '#64748B' }}>
                🌾 Agronomist is thinking...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Footer */}
          <div style={{ padding: '12px', background: '#FFFFFF', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={handleMicClick}
              title="Voice Input"
              style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: isListening ? '#EF4444' : '#FEF3C7',
                color: isListening ? '#FFFFFF' : '#B45309',
                border: '1px solid #FCD34D',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
              }}>
              <Mic size={20} className={isListening ? 'animate-pulse' : ''} />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask in English, Hindi, Kannada..."
              style={{
                flex: 1, height: '44px', borderRadius: '22px', border: '1px solid #CBD5E1',
                padding: '0 16px', fontSize: '0.88rem', outline: 'none'
              }}
            />

            <button
              onClick={() => sendMessage()}
              disabled={!inputText.trim() || loading}
              style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: inputText.trim() ? '#2F6B3F' : '#94A3B8',
                color: '#FFFFFF', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: inputText.trim() ? 'pointer' : 'default'
              }}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
