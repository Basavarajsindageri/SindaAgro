import React from 'react';
import { Bell, ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function AlertsPage({ masterDecision }) {
  const { t } = useTranslation();

  const alerts = masterDecision?.weatherRiskReport?.alerts || [
    {
      title: 'Unseasonal High Rainfall Warning',
      description: 'Forecasted rainfall exceeding 35mm on Day 2 may cause waterlogging in low-lying clay soil plots.',
      mitigationAction: 'Open field drainage outlets and clear bund channels to allow excess water discharge.'
    },
    {
      title: 'Humidity Pest Warning (Blast Fungus)',
      description: 'High relative humidity (85%) combined with warm night temp creates favorable conditions for paddy blast.',
      mitigationAction: 'Apply prophylactic Tricyclazole spray (0.6g/L water) if leaf spots appear.'
    }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{t('nav.alerts')}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Active agro-weather and pest risk alerts with farmer action steps
        </p>
      </div>

      {alerts.length === 0 ? (
        <div className="agri-card" style={{ textAlign: 'center', padding: '40px' }}>
          <CheckCircle2 size={40} color="var(--primary-green)" style={{ marginBottom: '12px' }} />
          <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-dark)' }}>{t('weather.noAlerts')}</h4>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {alerts.map((alert, idx) => (
            <div key={idx} className="agri-card" style={{ borderLeft: '6px solid var(--danger)', background: '#FEF2F2' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--danger)', fontWeight: 800, fontSize: '1.1rem', marginBottom: '6px' }}>
                <ShieldAlert size={22} />
                <span>{alert.title}</span>
              </div>
              <p style={{ fontSize: '0.92rem', color: '#7F1D1D', marginBottom: '14px', lineHeight: 1.5 }}>
                {alert.description}
              </p>
              <div style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: '10px', border: '1px solid #FCA5A5', fontSize: '0.9rem', color: 'var(--primary-dark)', fontWeight: 700 }}>
                🛠️ <strong>{t('weather.mitigation')}:</strong> {alert.mitigationAction}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
