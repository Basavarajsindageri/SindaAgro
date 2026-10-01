import React, { useState, useEffect } from 'react';
import { Sprout, Sparkles, ShieldCheck } from 'lucide-react';

export default function CinematicLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Agricultural Intelligence...');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete && onComplete(), 400);
          return 100;
        }
        if (prev === 30) setStatusText('Analyzing Soil NPK & Chemical Test Matrix...');
        if (prev === 65) setStatusText('Loading 3D Isometric Farm Terrain & Climate Risk...');
        if (prev === 90) setStatusText('SindaAgro AI Agronomist Engine Ready');
        return prev + 5;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'radial-gradient(ellipse at center, #0D1F17 0%, #080B0A 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF',
      padding: '24px',
      fontFamily: 'var(--font-heading)'
    }}>
      {/* 3D Animated Glowing Logo */}
      <div style={{
        position: 'relative',
        width: '120px',
        height: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '32px'
      }}>
        {/* Outer Rotating Emerald Ring */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '3px solid transparent',
          borderTopColor: '#2EBF71',
          borderRightColor: '#65E69A',
          animation: 'spin 1.5s linear infinite'
        }} />

        {/* Inner Gold Dash Ring */}
        <div style={{
          position: 'absolute',
          inset: '12px',
          borderRadius: '50%',
          border: '2px dashed #C89B55',
          animation: 'spinReverse 3s linear infinite'
        }} />

        <Sprout size={48} color="#2EBF71" style={{ filter: 'drop-shadow(0 0 18px #2EBF71)' }} />
      </div>

      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 900,
        letterSpacing: '0.1em',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #2EBF71 50%, #65E69A 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center',
        marginBottom: '8px'
      }}>
        SINDAAGRO
      </h1>

      <p style={{
        color: '#C89B55',
        fontSize: '1rem',
        fontWeight: 700,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        marginBottom: '40px',
        textAlign: 'center'
      }}>
        AI-Powered Smart Farming for Every Farmer
      </p>

      {/* Progress Bar Container */}
      <div style={{
        width: '100%',
        maxWidth: '380px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '999px',
        height: '8px',
        padding: '2px',
        border: '1px solid rgba(46, 191, 113, 0.3)',
        marginBottom: '16px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #2EBF71, #65E69A, #C89B55)',
          borderRadius: '999px',
          boxShadow: '0 0 16px #2EBF71',
          transition: 'width 0.1s ease-out'
        }} />
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.88rem',
        color: '#94A3B8',
        fontWeight: 600
      }}>
        <Sparkles size={16} color="#C89B55" />
        <span>{statusText} ({progress}%)</span>
      </div>

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes spinReverse { 100% { transform: rotate(-360deg); } }
      `}</style>
    </div>
  );
}
