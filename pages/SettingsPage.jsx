import React from 'react';
import { Settings, Globe, Bell, Shield, PhoneCall } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function SettingsPage() {
  const { lang, setLang, t } = useTranslation();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{t('nav.settings')}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>App preferences & assistance options</p>
      </div>

      <div className="agri-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Language Selection */}
        <div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={18} color="var(--primary-green)" />
            <span>Application Language / ಭಾಷೆ / भाषा</span>
          </h4>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setLang('en')}
              className={lang === 'en' ? 'btn-primary' : 'btn-secondary'}>
              English
            </button>
            <button 
              onClick={() => setLang('kn')}
              className={lang === 'kn' ? 'btn-primary' : 'btn-secondary'}>
              ಕನ್ನಡ (Kannada)
            </button>
            <button 
              onClick={() => setLang('hi')}
              className={lang === 'hi' ? 'btn-primary' : 'btn-secondary'}>
              हिंदी (Hindi)
            </button>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0' }} />

        {/* Farmer Helpline Support */}
        <div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PhoneCall size={18} color="var(--primary-green)" />
            <span>Kisan Advisory Helpline</span>
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Call toll-free for voice assistance: <strong>1800-180-1551</strong> (Kisan Call Centre)
          </p>
        </div>

      </div>
    </div>
  );
}
