import React from 'react';
import { Compass, MapPin, Sprout, Sparkles } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';

export default function SummaryCards({ farms = [], masterDecision }) {
  const { t } = useTranslation();

  const totalFarms = farms.length;
  const totalArea = farms.reduce((acc, f) => acc + (parseFloat(f.areaAcres) || 0), 0).toFixed(1);
  const activeCropsCount = farms.filter(f => f.previousCrop || f.status === 'Active Crop').length || (totalFarms > 0 ? 1 : 0);
  const aiAdviceCount = masterDecision ? 4 : 0;

  const cards = [
    {
      id: 'farms',
      icon: Compass,
      color: '#1F9D63',
      bg: '#EAF7EF',
      value: totalFarms,
      label: t('stats.totalFarms'),
      illustration: '🌾',
      unit: ''
    },
    {
      id: 'area',
      icon: MapPin,
      color: '#3B82F6',
      bg: '#EFF6FF',
      value: totalArea,
      label: t('stats.totalArea'),
      illustration: '📍',
      unit: t('stats.acres')
    },
    {
      id: 'crops',
      icon: Sprout,
      color: '#D97706',
      bg: '#FEF3C7',
      value: activeCropsCount,
      label: t('stats.activeCrops'),
      illustration: '🌱',
      unit: ''
    },
    {
      id: 'advice',
      icon: Sparkles,
      color: '#8B5CF6',
      bg: '#F3E8FF',
      value: aiAdviceCount,
      label: t('stats.aiAdvice'),
      illustration: '🤖',
      unit: 'Insights'
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '20px',
      marginBottom: '28px'
    }}>
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.id} className="agri-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{
                background: card.bg,
                color: card.color,
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px'
              }}>
                <Icon size={22} />
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>
                {card.label}
              </span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-dark)', lineHeight: 1.2, marginTop: '2px' }}>
                {card.value} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>{card.unit}</span>
              </div>
            </div>

            <div style={{ fontSize: '2.5rem', opacity: 0.85 }}>
              {card.illustration}
            </div>
          </div>
        );
      })}
    </div>
  );
}
