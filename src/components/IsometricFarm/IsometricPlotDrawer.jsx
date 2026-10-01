import React from 'react';
import { X, MapPin, TestTube, Sprout, Droplets, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';

export default function IsometricPlotDrawer({ farm, onClose, onOpenSoilModal, onSelectFarm }) {
  const { t } = useTranslation();

  if (!farm) return null;

  const statusColors = {
    'Active Crop': { bg: '#DCFCE7', color: '#15803D', label: t('farm.activeCrop') },
    'Empty Soil': { bg: '#FEF3C7', color: '#B45309', label: t('farm.emptySoil') },
    'Preparing': { bg: '#E0F2FE', color: '#0369A1', label: t('farm.preparing') },
    'Harvest Ready': { bg: '#FEF9C3', color: '#854D0E', label: t('farm.harvestReady') },
    'Risk': { bg: '#FEE2E2', color: '#B91C1C', label: t('farm.atRisk') }
  };

  const statusInfo = statusColors[farm.status] || statusColors['Active Crop'];

  return (
    <div style={{
      position: 'fixed',
      right: '24px',
      top: '90px',
      width: '360px',
      background: '#FFFFFF',
      borderRadius: 'var(--radius-card)',
      boxShadow: '0 20px 40px rgba(5, 46, 28, 0.25)',
      border: '2px solid var(--bright-green)',
      zIndex: 250,
      padding: '24px',
      maxHeight: 'calc(100vh - 120px)',
      overflowY: 'auto'
    }} className="animate-fade-in">
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <span style={{
            background: statusInfo.bg,
            color: statusInfo.color,
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '4px 10px',
            borderRadius: 'var(--radius-pill)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {statusInfo.label}
          </span>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-dark)', marginTop: '8px' }}>
            {farm.farmName}
          </h3>
        </div>
        <button 
          onClick={onClose}
          style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', padding: '6px', cursor: 'pointer', color: 'var(--text-muted)' }}>
          <X size={18} />
        </button>
      </div>

      {/* Grid Specs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
        <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>{t('farm.area')}</span>
          <strong style={{ fontSize: '1.1rem', color: 'var(--primary-dark)' }}>{farm.areaAcres} {t('stats.acres')}</strong>
        </div>

        <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>{t('farm.soilType')}</span>
          <strong style={{ fontSize: '0.95rem', color: 'var(--primary-dark)' }}>{farm.soilType}</strong>
        </div>
      </div>

      {/* Details List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
          <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Droplets size={15} color="var(--primary-green)" />
            {t('farm.irrigation')}
          </span>
          <strong style={{ fontWeight: 600 }}>{farm.irrigationAvailable ? (farm.waterSource || t('farm.irrigationAvailable')) : t('farm.rainfedOnly')}</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
          <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sprout size={15} color="var(--primary-green)" />
            {t('farm.previousCrop')}
          </span>
          <strong style={{ fontWeight: 600 }}>{farm.previousCrop || 'None'}</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
          <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={15} color="var(--primary-green)" />
            {t('farm.waterSource')}
          </span>
          <strong style={{ fontWeight: 600 }}>{farm.waterSource || 'Borewell'}</strong>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button 
          onClick={() => { onSelectFarm(farm); onClose(); }}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}>
          <span>{t('farm.viewDetails')} & AI Advice</span>
          <ArrowRight size={16} />
        </button>

        <button 
          onClick={() => { onOpenSoilModal(farm); onClose(); }}
          className="btn-secondary"
          style={{ width: '100%', justifyContent: 'center' }}>
          <TestTube size={16} color="var(--primary-green)" />
          <span>{t('soil.submitTest')}</span>
        </button>
      </div>
    </div>
  );
}
