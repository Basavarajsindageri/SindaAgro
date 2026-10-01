import React from 'react';
import { Home, Compass, Sparkles, CloudRain, User } from 'lucide-react';

export default function MobileNav({ activeRoute, onNavigate }) {
  return (
    <nav className="mobile-bottom-nav" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(13, 31, 23, 0.95)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(46, 191, 113, 0.3)',
      display: 'none', // controlled by media query
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '10px 16px',
      zIndex: 400
    }}>
      <button 
        onClick={() => onNavigate('dashboard')}
        style={{
          background: 'transparent',
          border: 'none',
          color: activeRoute === 'dashboard' ? '#65E69A' : '#94A3B8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: '0.72rem',
          fontWeight: 700,
          gap: '2px'
        }}>
        <Home size={22} color={activeRoute === 'dashboard' ? '#2EBF71' : '#94A3B8'} />
        <span>🏠 Home</span>
      </button>

      <button 
        onClick={() => onNavigate('farms')}
        style={{
          background: 'transparent',
          border: 'none',
          color: activeRoute === 'farms' ? '#65E69A' : '#94A3B8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: '0.72rem',
          fontWeight: 700,
          gap: '2px'
        }}>
        <Compass size={22} color={activeRoute === 'farms' ? '#2EBF71' : '#94A3B8'} />
        <span>🌱 My Farm</span>
      </button>

      <button 
        onClick={() => onNavigate('aiAdvice')}
        style={{
          background: 'transparent',
          border: 'none',
          color: activeRoute === 'aiAdvice' ? '#39A8FF' : '#94A3B8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: '0.72rem',
          fontWeight: 700,
          gap: '2px'
        }}>
        <Sparkles size={22} color={activeRoute === 'aiAdvice' ? '#39A8FF' : '#94A3B8'} />
        <span>🤖 AI</span>
      </button>

      <button 
        onClick={() => onNavigate('weather')}
        style={{
          background: 'transparent',
          border: 'none',
          color: activeRoute === 'weather' ? '#C89B55' : '#94A3B8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: '0.72rem',
          fontWeight: 700,
          gap: '2px'
        }}>
        <CloudRain size={22} color={activeRoute === 'weather' ? '#C89B55' : '#94A3B8'} />
        <span>🌦 Weather</span>
      </button>

      <button 
        onClick={() => onNavigate('profile')}
        style={{
          background: 'transparent',
          border: 'none',
          color: activeRoute === 'profile' ? '#65E69A' : '#94A3B8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: '0.72rem',
          fontWeight: 700,
          gap: '2px'
        }}>
        <User size={22} color={activeRoute === 'profile' ? '#2EBF71' : '#94A3B8'} />
        <span>👤 Profile</span>
      </button>
    </nav>
  );
}
