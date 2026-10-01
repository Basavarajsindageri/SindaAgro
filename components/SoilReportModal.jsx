import React, { useState } from 'react';
import { X, TestTube } from 'lucide-react';
import { api } from '../services/api';
import { useTranslation } from '../context/LanguageContext';

export default function SoilReportModal({ isOpen, onClose, farm, onReportSubmitted }) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    ph: 6.8,
    nitrogen: 130.0,
    phosphorus: 38.0,
    potassium: 190.0,
    organicCarbon: 0.75
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !farm) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        farmId: farm.id,
        ph: parseFloat(formData.ph),
        nitrogen: parseFloat(formData.nitrogen),
        phosphorus: parseFloat(formData.phosphorus),
        potassium: parseFloat(formData.potassium),
        organicCarbon: parseFloat(formData.organicCarbon)
      };
      await api.submitSoilReport(payload);
      onReportSubmitted();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to submit soil test report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="agri-card animate-fade-in" style={{ width: '100%', maxWidth: '500px', position: 'relative' }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', right: '16px', top: '16px', background: '#F1F5F9', border: 'none', borderRadius: '50%', padding: '6px', cursor: 'pointer', color: 'var(--text-muted)' }}>
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <div style={{ background: 'var(--light-green)', padding: '10px', borderRadius: '12px', color: 'var(--primary-green)' }}>
            <TestTube size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
              {t('soil.submitTest')} ({farm.farmName})
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{t('soil.subtitle')}</p>
          </div>
        </div>

        {error && (
          <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '14px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '4px' }}>
                {t('soil.ph')} (0 - 14)
              </label>
              <input 
                type="number"
                step="0.1"
                required
                className="agri-input"
                value={formData.ph}
                onChange={(e) => setFormData({ ...formData, ph: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '4px' }}>
                {t('soil.organicCarbon')}
              </label>
              <input 
                type="number"
                step="0.01"
                className="agri-input"
                value={formData.organicCarbon}
                onChange={(e) => setFormData({ ...formData, organicCarbon: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#15803D', marginBottom: '4px' }}>
                {t('soil.nitrogen')}
              </label>
              <input 
                type="number"
                step="1"
                required
                className="agri-input"
                value={formData.nitrogen}
                onChange={(e) => setFormData({ ...formData, nitrogen: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1D4ED8', marginBottom: '4px' }}>
                {t('soil.phosphorus')}
              </label>
              <input 
                type="number"
                step="1"
                required
                className="agri-input"
                value={formData.phosphorus}
                onChange={(e) => setFormData({ ...formData, phosphorus: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#B45309', marginBottom: '4px' }}>
                {t('soil.potassium')}
              </label>
              <input 
                type="number"
                step="1"
                required
                className="agri-input"
                value={formData.potassium}
                onChange={(e) => setFormData({ ...formData, potassium: e.target.value })}
              />
            </div>
          </div>

          <button className="btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
            {loading ? t('soil.analyzing') : t('soil.calculateBtn')}
          </button>
        </form>
      </div>
    </div>
  );
}
