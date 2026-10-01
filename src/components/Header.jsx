import React, { useState } from 'react';
import { Globe, Bell, MapPin, Sun, User, LogOut, Sprout, Sparkles } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function Header({ currentUser, onOpenAuth, onLogout, farmerProfile }) {
  const { lang, setLang, t } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const farmerName = farmerProfile?.fullName || currentUser?.username || 'Basavaraj';
  const locationText = farmerProfile?.district ? `${farmerProfile.district}, ${farmerProfile.state || 'Karnataka'}` : 'Karnataka, India';

  const languages = [
    { code: 'en', label: 'English', native: 'English (US)' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' }
  ];

  return (
    <header style={{
      background: 'rgba(13, 31, 23, 0.75)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(46, 191, 113, 0.25)',
      padding: '16px 28px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: 'var(--shadow-md)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Brand Logo & Tagline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sprout size={24} color="#2EBF71" style={{ filter: 'drop-shadow(0 0 10px #2EBF71)' }} />
              <h1 style={{
                fontSize: '1.4rem',
                fontWeight: 900,
                letterSpacing: '0.04em',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #2EBF71 50%, #65E69A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                SINDAAGRO
              </h1>
              <span style={{ background: 'rgba(46, 191, 113, 0.15)', color: '#65E69A', fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: '999px', border: '1px solid rgba(46, 191, 113, 0.3)' }}>
                AI COMMAND CENTER
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px', fontWeight: 600 }}>
              <MapPin size={13} color="#2EBF71" />
              <span>{locationText}</span>
              <span style={{ color: '#C89B55' }}>•</span>
              <span>AI-Powered Smart Farming for Every Farmer</span>
            </p>
          </div>
        </div>

        {/* Right Tools & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          
          {/* Weather Badge */}
          <div style={{
            background: 'rgba(13, 31, 23, 0.9)',
            border: '1px solid rgba(200, 155, 85, 0.4)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-pill)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.82rem',
            fontWeight: 700,
            color: '#C89B55'
          }}>
            <Sun size={15} color="#C89B55" />
            <span>28°C Sunny • Optimal Soil Moisture</span>
          </div>

          {/* Language Selector Dropdown */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="btn-secondary"
              style={{ padding: '8px 14px', background: 'rgba(13, 31, 23, 0.8)', borderColor: 'rgba(46, 191, 113, 0.3)', color: '#FFF' }}>
              <Globe size={16} color="#2EBF71" />
              <span>{languages.find(l => l.code === lang)?.native || 'English'}</span>
            </button>

            {showLangMenu && (
              <div className="animate-fade-in" style={{
                position: 'absolute',
                right: 0,
                top: '110%',
                background: '#0D1F17',
                border: '1px solid rgba(46, 191, 113, 0.3)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-lg)',
                padding: '8px 0',
                width: '160px',
                zIndex: 200
              }}>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setShowLangMenu(false); }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 16px',
                      background: lang === l.code ? 'rgba(46, 191, 113, 0.2)' : 'transparent',
                      color: lang === l.code ? '#2EBF71' : '#F8FAFC',
                      fontWeight: lang === l.code ? 700 : 500,
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                    <span>{l.native}</span>
                    {lang === l.code && <span style={{ color: '#2EBF71', fontWeight: 800 }}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Profile / Auth Button */}
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2EBF71, #1F9D63)',
                color: '#FFF',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                boxShadow: 'var(--glow-green)'
              }}>
                {farmerName.charAt(0).toUpperCase()}
              </div>
              <button 
                onClick={onLogout}
                style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  color: '#EF4444',
                  border: '1px solid #EF4444',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                <LogOut size={14} />
                Logout
              </button>
            </div>
          ) : (
            <button className="btn-primary" onClick={onOpenAuth}>
              <User size={16} />
              Login / Register
            </button>
          )}

        </div>
      </div>
    </header>
  );
}
