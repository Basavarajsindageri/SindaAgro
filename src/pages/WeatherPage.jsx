import React from 'react';
import { CloudRain, Sun, Droplets, Wind, ShieldAlert, AlertTriangle } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function WeatherPage({ masterDecision }) {
  const { t } = useTranslation();

  const weatherReport = masterDecision?.weatherRiskReport || {
    district: 'Belagavi',
    state: 'Karnataka',
    overallRiskLevel: 'MODERATE',
    alerts: [
      {
        title: 'Unseasonal High Rainfall Warning',
        description: 'Forecasted rainfall exceeding 35mm on Day 3 may cause waterlogging in low-lying clay soil plots.',
        mitigationAction: 'Open field drainage outlets and clear bund channels to allow excess water discharge.'
      }
    ],
    forecasts: [
      { date: 'Today', tempMaxC: 28, humidityPercent: 78, rainfallMm: 4 },
      { date: 'Tomorrow', tempMaxC: 27, humidityPercent: 85, rainfallMm: 38 },
      { date: 'Day 3', tempMaxC: 29, humidityPercent: 80, rainfallMm: 12 },
      { date: 'Day 4', tempMaxC: 30, humidityPercent: 72, rainfallMm: 0 },
      { date: 'Day 5', tempMaxC: 31, humidityPercent: 68, rainfallMm: 0 },
      { date: 'Day 6', tempMaxC: 30, humidityPercent: 70, rainfallMm: 2 },
      { date: 'Day 7', tempMaxC: 29, humidityPercent: 75, rainfallMm: 5 }
    ]
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 3. WEATHER FORECAST SECTION Background Panel (45vh, strong rgba(16,36,26,0.8) overlay) */}
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: '45vh',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '32px 28px',
        color: '#FFFFFF'
      }}>
        {/* Background Video (Reuses harvest video with fallback placeholder /videos/weather-background.mp4) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}>
          {/* Preferred sky clip placeholder path */}
          <source src="/videos/weather-background.mp4" type="video/mp4" />
          {/* Primary background video */}
          <source src="/videos/hero-wheat-harvest.mp4" type="video/mp4" />
        </video>

        {/* Stronger Dark Overlay (rgba(16,36,26,0.8)) for text readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'rgba(16, 36, 26, 0.82)',
          backdropFilter: 'blur(2px)'
        }} />

        {/* Panel Content Overlay */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <CloudRain size={28} color="#7BE08A" />
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
              {t('weather.title')}
            </h2>
          </div>
          <p style={{ color: '#A7F3D0', fontSize: '0.95rem', margin: '0 0 20px 0' }}>
            Agro-climatic forecast for <strong>{weatherReport.district}, {weatherReport.state}</strong>
          </p>

          {/* Simple Advisory Tip Box */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(123, 224, 138, 0.3)', borderRadius: '16px',
            padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px'
          }}>
            <div style={{ background: '#7BE08A', padding: '10px', borderRadius: '50%', color: '#10241A', flexShrink: 0 }}>
              <Sun size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 4px 0' }}>Farmer Weather Advisory</h4>
              <p style={{ fontSize: '0.88rem', color: '#E2E8F0', margin: 0 }}>
                "{t('weather.adviceTip')}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Alert Card */}
      {weatherReport.alerts && weatherReport.alerts.length > 0 && (
        <div className="agri-card" style={{ borderColor: 'rgba(239, 68, 68, 0.4)', background: '#FEF2F2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#991B1B', fontWeight: 800, fontSize: '1.1rem', marginBottom: '8px' }}>
            <ShieldAlert size={22} />
            <span>{weatherReport.alerts[0].title}</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#7F1D1D', marginBottom: '12px' }}>
            {weatherReport.alerts[0].description}
          </p>
          <div style={{ background: '#FFFFFF', padding: '12px', borderRadius: '10px', border: '1px solid #FCA5A5', fontSize: '0.88rem', color: 'var(--primary-dark)', fontWeight: 700 }}>
            🛠️ <strong>{t('weather.mitigation')}:</strong> {weatherReport.alerts[0].mitigationAction}
          </div>
        </div>
      )}

      {/* 7-Day Forecast Grid */}
      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{t('weather.forecast')}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
        {weatherReport.forecasts.map((day, idx) => (
          <div key={idx} className="agri-card" style={{ padding: '16px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>{day.date}</span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-dark)', margin: '6px 0' }}>{day.tempMaxC}°C</div>
            <div style={{ fontSize: '0.8rem', color: '#2563EB', fontWeight: 600 }}>💧 {day.humidityPercent}%</div>
            <div style={{ fontSize: '0.8rem', color: '#D97706', fontWeight: 600 }}>🌧️ {day.rainfallMm}mm</div>
          </div>
        ))}
      </div>

    </div>
  );
}
