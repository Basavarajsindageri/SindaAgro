import React from 'react';
import { Compass, Plus, TestTube, MapPin, Droplets, ArrowRight } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function FarmsPage({ farms, selectedFarm, onSelectFarm, onOpenAddFarm, onOpenSoilModal }) {
  const { t } = useTranslation();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{t('nav.myFarms')}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('farm.noFarmsDesc')}</p>
        </div>
        <button className="btn-primary" onClick={onOpenAddFarm}>
          <Plus size={18} />
          <span>{t('farm.addFarm')}</span>
        </button>
      </div>

      {farms.length === 0 ? (
        <div className="agri-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ background: 'var(--light-green)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Compass size={32} color="var(--primary-green)" />
          </div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '8px' }}>{t('farm.noFarms')}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>{t('farm.noFarmsDesc')}</p>
          <button className="btn-primary" onClick={onOpenAddFarm}>
            <Plus size={18} />
            <span>{t('farm.addFirstFarm')}</span>
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {farms.map((farm) => {
            const isSelected = selectedFarm?.id === farm.id;
            return (
              <div 
                key={farm.id}
                onClick={() => onSelectFarm(farm)}
                className="agri-card"
                style={{
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--bright-green)' : '#E6ECE8',
                  boxShadow: isSelected ? 'var(--glow-green)' : 'var(--shadow-md)',
                  position: 'relative'
                }}>
                
                {/* 3D Farm Visual Header Preview */}
                <div style={{
                  background: 'linear-gradient(135deg, #EAF7EF 0%, #D8F2E3 100%)',
                  padding: '16px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <div style={{ fontSize: '2.4rem' }}>🌱</div>
                  <span className="agri-badge badge-success">
                    {farm.areaAcres} {t('stats.acres')}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '4px' }}>
                  {farm.farmName}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  🟫 {farm.soilType}
                </p>

                <div style={{ display: 'flex', gap: '14px', fontSize: '0.82rem', color: 'var(--text-main)', marginBottom: '16px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Droplets size={14} color="var(--primary-green)" />
                    {farm.irrigationAvailable ? (farm.waterSource || t('farm.irrigationAvailable')) : t('farm.rainfedOnly')}
                  </span>
                  <span>Prev: {farm.previousCrop || 'None'}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onOpenSoilModal(farm); }}
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                    <TestTube size={14} color="var(--primary-green)" />
                    <span>{t('farm.submitSoilTest')}</span>
                  </button>

                  <span style={{ fontSize: '0.85rem', color: isSelected ? 'var(--primary-green)' : 'var(--text-muted)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {isSelected ? t('farm.activePlot') : t('farm.selectPlot')}
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
