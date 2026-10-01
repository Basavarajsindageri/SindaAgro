import React, { useState } from 'react';
import IsometricFarmCanvas from '../components/IsometricFarm/IsometricFarmCanvas';
import SummaryCards from '../components/Dashboard/SummaryCards';
import DecisionDashboard from '../components/DecisionDashboard';
import FarmList from '../components/FarmList';
import { 
  Sprout, Compass, Droplets, Sun, TrendingUp, Sparkles, 
  TestTube, Mic, MicOff, Send, ArrowRight, ShieldCheck, HelpCircle
} from 'lucide-react';
import { api } from '../services/api';

export default function DashboardPage({
  farms,
  selectedFarm,
  onSelectFarm,
  onOpenAddFarm,
  onOpenSoilModal,
  masterDecision,
  onNavigate
}) {
  const [isListening, setIsListening] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const startVoiceMic = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      showToast('🎤 Speech recognition active! Ask SindaAgro AI your question...');
      setTimeout(() => onNavigate && onNavigate('aiAdvice'), 1200);
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (e) => {
      showToast(`" ${e.results[0][0].transcript} " — Connecting to SindaAgro AI...`);
      setTimeout(() => onNavigate && onNavigate('aiAdvice'), 1200);
    };
    recognition.start();
  };

  const farmerActions = [
    { id: 'farms', label: 'My Farm', icon: '🌱', color: '#2EBF71', desc: 'View 3D Plots & Land Details' },
    { id: 'soil', label: 'Check Soil', icon: '🧪', color: '#C89B55', desc: 'NPK Test & Doorstep Booking' },
    { id: 'bestCrop', label: 'Find Best Crop', icon: '🌾', color: '#65E69A', desc: '94% Suitability Classifier' },
    { id: 'aiAdvice', label: 'Ask AI', icon: '🤖', color: '#39A8FF', desc: '24/7 Agronomist Voice Assistant' },
    { id: 'weather', label: 'Weather Risk', icon: '🌦', color: '#F59E0B', desc: '7-Day Irrigation Forecast' },
    { id: 'market', label: 'Market Rates', icon: '📈', color: '#10B981', desc: 'Live APMC Mandi Price Trends' }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="glass-toast animate-fade-in">
          <Sparkles size={20} color="#2EBF71" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Farmer Header Greeting */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#FFFFFF', marginBottom: '4px' }}>
            Good Morning, Farmer 👋
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#65E69A', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Your Farm is Looking Good Today 🌱</span>
            <span style={{ color: '#94A3B8', fontWeight: 500 }}>• SindaAgro AI Active</span>
          </p>
        </div>

        <button className="btn-primary" onClick={onOpenAddFarm} style={{ padding: '12px 24px', fontSize: '0.95rem' }}>
          + Add New Farm Plot
        </button>
      </div>

      {/* Simple Farmer Status Bar Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        
        <div className="agri-card" style={{ padding: '16px', border: '1.5px solid rgba(46, 191, 113, 0.4)' }}>
          <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>🌱 Soil Health</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#65E69A', marginTop: '2px' }}>Good (pH 6.8)</div>
          <span style={{ fontSize: '0.75rem', color: '#2EBF71', fontWeight: 700 }}>Balanced NPK</span>
        </div>

        <div className="agri-card" style={{ padding: '16px', border: '1.5px solid rgba(57, 168, 255, 0.4)' }}>
          <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>💧 Water Status</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#39A8FF', marginTop: '2px' }}>Sufficient</div>
          <span style={{ fontSize: '0.75rem', color: '#39A8FF', fontWeight: 700 }}>Borewell + Canal</span>
        </div>

        <div className="agri-card" style={{ padding: '16px', border: '1.5px solid rgba(245, 158, 11, 0.4)' }}>
          <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>🌦 Weather</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#F59E0B', marginTop: '2px' }}>Safe (Sunny)</div>
          <span style={{ fontSize: '0.75rem', color: '#F59E0B', fontWeight: 700 }}>28°C • Low Risk</span>
        </div>

        <div className="agri-card" style={{ padding: '16px', border: '1.5px solid rgba(200, 155, 85, 0.4)' }}>
          <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>🌶 Best Crop</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#C89B55', marginTop: '2px' }}>Chilli / Paddy</div>
          <span style={{ fontSize: '0.75rem', color: '#C89B55', fontWeight: 700 }}>High Yield Cash Crop</span>
        </div>

        <div className="agri-card agri-card-ai" style={{ padding: '16px', border: '1.5px solid #39A8FF' }}>
          <span style={{ fontSize: '0.78rem', color: '#39A8FF', fontWeight: 700, textTransform: 'uppercase' }}>🤖 AI Match</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFFFFF', marginTop: '2px' }}>94% Suitable</div>
          <span style={{ fontSize: '0.75rem', color: '#65E69A', fontWeight: 700 }}>Optimal Score</span>
        </div>

      </div>

      {/* Interactive 3D Isometric Farm View */}
      <IsometricFarmCanvas 
        farms={farms}
        selectedFarm={selectedFarm}
        onSelectFarm={onSelectFarm}
        onOpenSoilModal={onOpenSoilModal}
        onOpenAddFarm={onOpenAddFarm}
      />

      {/* Main Farmer Actions Grid (Large, Touch-Friendly Buttons) */}
      <div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFFFFF', marginBottom: '16px' }}>
          ⚡ Main Farmer Actions
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {farmerActions.map((action) => (
            <div
              key={action.id}
              onClick={() => onNavigate && onNavigate(action.id)}
              className="agri-card"
              style={{
                cursor: 'pointer',
                border: `1.5px solid ${action.color}`,
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '20px',
                background: 'rgba(13, 31, 23, 0.85)'
              }}
            >
              <div style={{
                fontSize: '2.5rem',
                background: 'rgba(255, 255, 255, 0.08)',
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {action.icon}
              </div>

              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
                  {action.label}
                </h4>
                <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '2px', lineHeight: 1.4 }}>
                  {action.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating SindaAgro AI Assistant Orb Panel */}
      <div className="agri-card agri-card-ai" style={{
        padding: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Glowing Floating Orb */}
          <div
            className="float-orb pulse-glow"
            onClick={() => onNavigate && onNavigate('aiAdvice')}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #39A8FF 0%, #2EBF71 60%, #0D1F17 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--glow-green)',
              flexShrink: 0
            }}
          >
            <Sparkles size={36} color="#FFFFFF" />
          </div>

          <div>
            <span style={{ color: '#39A8FF', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              24/7 SINDAAGRO AI ASSISTANT
            </span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFFFFF', margin: '2px 0' }}>
              Ask SindaAgro AI
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#94A3B8' }}>
              Get instant voice recommendations on NPK fertilizer dosage, eco-pesticides, and climate risk.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            onClick={startVoiceMic}
            style={{
              background: isListening ? '#EF4444' : 'rgba(57, 168, 255, 0.2)',
              border: '1.5px solid #39A8FF',
              color: '#FFFFFF',
              padding: '14px 20px',
              borderRadius: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.95rem',
              fontWeight: 800
            }}
          >
            <Mic size={20} color="#39A8FF" />
            <span>{isListening ? 'Listening...' : 'Voice Search'}</span>
          </button>

          <button
            className="btn-primary"
            onClick={() => onNavigate && onNavigate('aiAdvice')}
            style={{ padding: '14px 24px', fontSize: '0.95rem' }}
          >
            <span>Open AI Chat</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>

      {/* Summary KPI Cards & Registered Plots */}
      <SummaryCards farms={farms} masterDecision={masterDecision} />

      <FarmList 
        farms={farms} 
        selectedFarm={selectedFarm}
        onSelectFarm={onSelectFarm}
        onOpenAddFarm={onOpenAddFarm}
        onOpenSoilModal={onOpenSoilModal}
      />

      <DecisionDashboard 
        masterDecision={masterDecision}
        loading={false}
      />

    </div>
  );
}
