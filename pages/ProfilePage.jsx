import React, { useState, useEffect } from 'react';
import { User, Phone, MapPin, Sprout, Save, CheckCircle2, Mic, Sparkles } from 'lucide-react';
import { api } from '../services/api';
import { useTranslation } from '../context/LanguageContext';
import { listenVoiceInput } from '../utils/voice';

export default function ProfilePage({ onProfileUpdated }) {
  const { lang, t } = useTranslation();

  const [formData, setFormData] = useState({
    fullName: 'Basavaraj Sindageri',
    phone: '9876543210',
    state: 'Karnataka',
    district: 'Belagavi',
    taluka: 'Gokak',
    village: 'Sindageri',
    mainCrop: 'Paddy',
    landHoldingAcres: 7.5
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeVoiceField, setActiveVoiceField] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.getFarmerProfile();
      if (res.data) {
        setFormData(prev => ({
          ...prev,
          fullName: res.data.fullName || prev.fullName,
          phone: res.data.phoneNumber || res.data.phone || prev.phone,
          state: res.data.state || prev.state,
          district: res.data.district || prev.district,
          taluka: res.data.taluk || res.data.taluka || prev.taluka,
          village: res.data.village || prev.village,
          mainCrop: res.data.mainCrop || prev.mainCrop,
          landHoldingAcres: res.data.totalLandAcres ?? res.data.landHoldingAcres ?? prev.landHoldingAcres
        }));
      }
    } catch (err) {
      console.warn('Error fetching farmer profile:', err);
    }
  };

  const calculateCompletion = () => {
    const fields = ['fullName', 'phone', 'state', 'district', 'taluka', 'village', 'mainCrop', 'landHoldingAcres'];
    const filled = fields.filter(f => Boolean(formData[f]));
    return Math.round((filled.length / fields.length) * 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const payload = {
        fullName: formData.fullName,
        phoneNumber: formData.phone,
        phone: formData.phone,
        state: formData.state,
        district: formData.district,
        taluk: formData.taluka,
        taluka: formData.taluka,
        village: formData.village,
        totalLandAcres: parseFloat(formData.landHoldingAcres),
        landHoldingAcres: parseFloat(formData.landHoldingAcres),
        mainCrop: formData.mainCrop
      };
      const res = await api.saveFarmerProfile(payload);
      setSuccessMsg(t('profile.savedSuccess'));
      if (onProfileUpdated) onProfileUpdated(res.data || formData);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save farmer profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceInput = (fieldName) => {
    setActiveVoiceField(fieldName);
    listenVoiceInput(
      lang,
      (text) => {
        setFormData(prev => ({ ...prev, [fieldName]: text }));
        setActiveVoiceField(null);
      },
      (err) => {
        console.warn('Voice error:', err);
        setActiveVoiceField(null);
      },
      () => setActiveVoiceField(null)
    );
  };

  const completion = calculateCompletion();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{t('profile.title')}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('profile.subtitle')}</p>
      </div>

      {/* Completion Indicator Card */}
      <div className="agri-card agri-card-ai" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--bright-green), var(--primary-green))',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.6rem',
            fontWeight: 800
          }}>
            {formData.fullName?.charAt(0) || 'F'}
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{formData.fullName}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {formData.village ? `${formData.village}, ${formData.district}` : 'Farmer Registration'}
            </p>
          </div>
        </div>

        {/* Completion Gauge */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-green)' }}>{completion}%</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>{t('profile.completion')}</span>
        </div>
      </div>

      {/* Messages */}
      {successMsg && (
        <div style={{ background: '#DCFCE7', color: '#15803D', border: '1px solid rgba(31, 157, 99, 0.4)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600 }}>
          <CheckCircle2 size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div style={{ background: '#FEE2E2', color: '#991B1B', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', fontWeight: 600 }}>
          {errorMsg}
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="agri-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Full Name & Phone */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-dark)' }}>{t('profile.fullName')}</label>
              <button 
                type="button" 
                onClick={() => handleVoiceInput('fullName')}
                style={{ background: activeVoiceField === 'fullName' ? '#FEF3C7' : 'var(--light-green)', color: 'var(--primary-green)', border: 'none', borderRadius: 'var(--radius-pill)', padding: '2px 8px', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Mic size={12} />
                <span>{activeVoiceField === 'fullName' ? t('voice.listening') : t('voice.voiceSearch')}</span>
              </button>
            </div>
            <input 
              type="text" 
              required 
              className="agri-input" 
              value={formData.fullName} 
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '6px' }}>{t('profile.phone')}</label>
            <input 
              type="tel" 
              required 
              className="agri-input" 
              value={formData.phone} 
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
            />
          </div>
        </div>

        {/* State, District, Taluka, Village */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '6px' }}>{t('profile.state')}</label>
            <input 
              type="text" 
              className="agri-input" 
              value={formData.state} 
              onChange={(e) => setFormData({ ...formData, state: e.target.value })} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '6px' }}>{t('profile.district')}</label>
            <input 
              type="text" 
              className="agri-input" 
              value={formData.district} 
              onChange={(e) => setFormData({ ...formData, district: e.target.value })} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '6px' }}>{t('profile.taluka')}</label>
            <input 
              type="text" 
              className="agri-input" 
              value={formData.taluka} 
              onChange={(e) => setFormData({ ...formData, taluka: e.target.value })} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '6px' }}>{t('profile.village')}</label>
            <input 
              type="text" 
              className="agri-input" 
              value={formData.village} 
              onChange={(e) => setFormData({ ...formData, village: e.target.value })} 
            />
          </div>
        </div>

        {/* Main Crop & Land Holding */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '6px' }}>{t('profile.mainCrop')}</label>
            <input 
              type="text" 
              className="agri-input" 
              value={formData.mainCrop} 
              onChange={(e) => setFormData({ ...formData, mainCrop: e.target.value })} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '6px' }}>{t('profile.landHolding')}</label>
            <input 
              type="number" 
              step="0.1" 
              className="agri-input" 
              value={formData.landHoldingAcres} 
              onChange={(e) => setFormData({ ...formData, landHoldingAcres: parseFloat(e.target.value) })} 
            />
          </div>
        </div>

        {/* Save Button */}
        <button className="btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>
          <Save size={18} />
          <span>{loading ? t('buttons.processing') : t('profile.save')}</span>
        </button>

      </form>
    </div>
  );
}
