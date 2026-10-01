import React from 'react';
import { 
  Home, Compass, TestTube, Sprout, Sparkles, CloudRain, 
  TrendingUp, FileText, User, Cpu
} from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function Sidebar({ activeRoute, onNavigate }) {
  const { t } = useTranslation();

  const navItems = [
    { id: 'dashboard', label: '3D Command Center', icon: Home },
    { id: 'farms', label: 'My Farm Plots', icon: Compass },
    { id: 'soil', label: 'Soil Health Matrix', icon: TestTube },
    { id: 'bestCrop', label: '3D Crop Matcher', icon: Sprout },
    { id: 'tech', label: 'Farm Technology', icon: Cpu, badge: 'NEW' },
    { id: 'aiAdvice', label: 'SINDAAGRO AI Agent', icon: Sparkles, badge: 'AI' },
    { id: 'weather', label: 'Climate Risk', icon: CloudRain },
    { id: 'market', label: 'APMC Mandi Rates', icon: TrendingUp },
    { id: 'plan', label: 'Cultivation Protocol', icon: FileText },
    { id: 'profile', label: 'Farmer Profile', icon: User }
  ];

  return (
    <aside style={{
      width: '270px',
      background: 'rgba(13, 31, 23, 0.95)',
      backdropFilter: 'blur(20px)',
      color: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      borderRight: '1px solid rgba(46, 191, 113, 0.25)',
      boxShadow: '8px 0 32px rgba(0, 0, 0, 0.6)',
      zIndex: 110,
      flexShrink: 0
    }}>
      {/* Top Branding */}
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid rgba(46, 191, 113, 0.25)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #2EBF71, #1F9D63)',
          padding: '10px',
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--glow-green)'
        }}>
          <Sprout size={24} color="#FFF" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#FFF', margin: 0, letterSpacing: '0.04em' }}>
            SINDAAGRO
          </h2>
          <span style={{ fontSize: '0.7rem', color: '#2EBF71', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            AGRICULTURAL INTELLIGENCE
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ padding: '20px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeRoute === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '14px',
                border: isActive ? '1px solid #2EBF71' : '1px solid transparent',
                background: isActive ? 'linear-gradient(135deg, rgba(46, 191, 113, 0.25), rgba(101, 230, 154, 0.15))' : 'transparent',
                color: isActive ? '#FFFFFF' : '#94A3B8',
                fontWeight: isActive ? 800 : 500,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isActive ? '0 4px 16px rgba(46, 191, 113, 0.3)' : 'none'
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Icon size={19} color={isActive ? '#2EBF71' : '#94A3B8'} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span style={{
                  background: isActive ? '#2EBF71' : 'rgba(46, 191, 113, 0.15)',
                  color: isActive ? '#FFFFFF' : '#2EBF71',
                  fontSize: '0.65rem',
                  fontWeight: 900,
                  padding: '2px 8px',
                  borderRadius: '6px',
                  border: '1px solid rgba(46, 191, 113, 0.3)'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer Info */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid rgba(46, 191, 113, 0.25)',
        fontSize: '0.75rem',
        color: '#94A3B8',
        textAlign: 'center'
      }}>
        SINDAAGRO AI Platform v3.0 • Built for Farmers
      </div>
    </aside>
  );
}
