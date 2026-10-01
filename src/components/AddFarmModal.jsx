import React, { useState } from 'react';
import { X, MapPin, Droplets, Mic, AlertCircle, ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import { useTranslation } from '../context/LanguageContext';
import { listenVoiceInput } from '../utils/voice';

export default function AddFarmModal({ isOpen, onClose, onFarmCreated, onNavigateToProfile }) {
  const { lang, t } = useTranslation();

  const [formData, setFormData] = useState({
    farmName: 'North Plot 1',
    areaAcres: 2.5,
    soilType: 'Black Soil',
    irrigationAvailable: true,
    waterSource: 'Borewell',
    previousCrop: 'Paddy'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isProfileMissingError, setIsProfileMissingError] = useState(false);
  const [isListening, setIsListening] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setIsProfileMissingError(false);

    try {
      const res = await api.createFarm(formData);
      onFarmCreated(res.data);
      onClose();
    } catch (err) {
      const msg = err.message || 'Failed to create farm plot';
      if (msg.toLowerCase().includes('profile') || msg.toLowerCase().includes('farmer')) {
        setIsProfileMissingError(true);
        setError(t('farm.profileRequired'));
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    listenVoiceInput(
      lang,
      (text) => {
        setFormData((prev) => ({ ...prev, farmName: text }));
        setIsListening(false);
      },
      (err) => {
        console.warn('Voice input error:', err);
        setIsListening(false);
      },
      () => setIsListening(false)
    );
  };

  return (
    <div className="modal-overlay">
      <div className="agri-card animate-fade-in" style={{ width: '100%', maxWidth: '520px', position: 'relative' }}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{ position: 'absolute', right: '16px', top: '16px', background: '#F1F5F9', border: 'none', borderRadius: '50%', padding: '6px', cursor: 'pointer', color: 'var(--text-muted)' }}>
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <div style={{ background: 'var(--light-green)', padding: '10px', borderRadius: '12px', color: 'var(--primary-green)' }}>
            <MapPin size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{t('farm.addFarm')}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{t('ai.tellFarmName')}</p>
          </div>
        </div>

        {/* Error / Profile missing alert */}
        {error && (
          <div style={{
            background: isProfileMissingError ? '#FEF3C7' : '#FEE2E2',
            color: isProfileMissingError ? '#92400E' : '#991B1B',
            border: `1px solid ${isProfileMissingError ? 'rgba(245, 158, 11, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
            borderRadius: 'var(--radius-sm)',
            padding: '14px',
            margin: '16px 0',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>

            {isProfileMissingError && (
              <button 
                onClick={() => { onClose(); onNavigateToProfile(); }}
                className="btn-primary"
                style={{ padding: '6px 12px', fontSize: '0.8rem', flexShrink: 0 }}>
                <span>{t('farm.goToProfile')}</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
          
          {/* Farm Name with Voice Dictation */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-dark)' }}>{t('farm.plotName')}</label>
              <button 
                type="button"
                onClick={handleVoiceInput}
                style={{
                  background: isListening ? '#FEF3C7' : 'var(--light-green)',
                  color: isListening ? '#B45309' : 'var(--primary-green)',
                  border: 'none',
                  borderRadius: 'var(--radius-pill)',
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                <Mic size={13} />
                <span>{isListening ? t('voice.listening') : t('ai.speakDetails')}</span>
              </button>
            </div>
            <input 
              type="text"
              required
              className="agri-input"
              value={formData.farmName}
              onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
              placeholder="e.g. North Plot 1"
            />
          </div>

          {/* Area & Soil Type */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '6px' }}>{t('farm.area')}</label>
              <input 
                type="number"
                step="0.1"
                required
                className="agri-input"
                value={formData.areaAcres}
                onChange={(e) => setFormData({ ...formData, areaAcres: parseFloat(e.target.value) })}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '6px' }}>{t('farm.soilType')}</label>
              <select
                className="agri-input"
                value={formData.soilType}
                onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}>
                <option value="Black Soil">Black Soil</option>
                <option value="Red Loamy Soil">Red Loamy Soil</option>
                <option value="Alluvial Soil">Alluvial Soil</option>
                <option value="Laterite Soil">Laterite Soil</option>
                <option value="Sandy Soil">Sandy Soil</option>
              </select>
            </div>
          </div>

          {/* Irrigation & Water Source */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '6px' }}>{t('farm.irrigation')}</label>
              <select
                className="agri-input"
                value={formData.irrigationAvailable ? 'true' : 'false'}
                onChange={(e) => setFormData({ ...formData, irrigationAvailable: e.target.value === 'true' })}>
                <option value="true">{t('farm.irrigationAvailable')}</option>
                <option value="false">{t('farm.rainfedOnly')}</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '6px' }}>{t('farm.waterSource')}</label>
              <input 
                type="text"
                className="agri-input"
                value={formData.waterSource}
                onChange={(e) => setFormData({ ...formData, waterSource: e.target.value })}
                placeholder="e.g. Borewell, Canal"
              />
            </div>
          </div>

          {/* Previous Crop */}
          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '6px' }}>{t('farm.previousCrop')}</label>
            <input 
              type="text"
              className="agri-input"
              value={formData.previousCrop}
              onChange={(e) => setFormData({ ...formData, previousCrop: e.target.value })}
              placeholder="e.g. Paddy, Maize, Cotton"
            />
          </div>

          {/* Submit Button */}
          <button className="btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
            {loading ? t('buttons.processing') : t('farm.addFarm')}
          </button>
        </form>
      </div>
    </div>
  );
}
