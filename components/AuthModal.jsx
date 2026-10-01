import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldAlert, Phone } from 'lucide-react';
import { api, setAuthToken } from '../services/api';
import { useTranslation } from '../context/LanguageContext';
import PhonePinLoginModal from './PhonePinLoginModal';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const { t } = useTranslation();
  const [authMode, setAuthMode] = useState('phone'); // 'phone' or 'advanced'
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  if (authMode === 'phone') {
    return (
      <PhonePinLoginModal
        isOpen={isOpen}
        onClose={onClose}
        onAuthSuccess={onAuthSuccess}
        onSwitchToAdvanced={() => setAuthMode('advanced')}
      />
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLoginMode) {
        const res = await api.login({ username: formData.username, password: formData.password });
        setAuthToken(res.data.accessToken);
        onAuthSuccess({ username: res.data.username, roles: res.data.roles });
      } else {
        const res = await api.register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName
        });
        setAuthToken(res.data.accessToken);
        onAuthSuccess({ username: res.data.username, roles: res.data.roles });
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed', inset: 0, background: 'rgba(16, 36, 26, 0.75)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px'
    }}>
      <div className="agri-card animate-fade-in" style={{ width: '100%', maxWidth: '440px', position: 'relative', background: '#FFFFFF', borderRadius: '24px', padding: '24px' }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', right: '16px', top: '16px', background: '#F1F5F9', border: 'none', borderRadius: '50%', padding: '8px', cursor: 'pointer', color: 'var(--text-muted)' }}>
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <button
            onClick={() => setAuthMode('phone')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#E8F5E9', border: '1px solid #2F6B3F', color: '#2F6B3F', borderRadius: '12px', padding: '6px 12px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}>
            <Phone size={14} />
            <span>Switch to Phone Login</span>
          </button>
        </div>

        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '6px' }}>
          {isLoginMode ? 'Advanced User Login' : 'Register Farmer Account'}
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px' }}>
          {isLoginMode ? 'Enter username/email credentials to access dashboard' : 'Create your farmer profile for field recommendations'}
        </p>

        {error && (
          <div style={{ background: '#FEE2E2', color: '#991B1B', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', fontSize: '0.85rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '4px' }}>Username or Email</label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
              <input 
                type="text"
                required
                className="agri-input"
                style={{ paddingLeft: '40px' }}
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="e.g. basavaraj_farmer"
              />
            </div>
          </div>

          {!isLoginMode && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '4px' }}>Full Name</label>
                <input 
                  type="text"
                  required
                  className="agri-input"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Basavaraj Sindageri"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '4px' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
                  <input 
                    type="email"
                    required
                    className="agri-input"
                    style={{ paddingLeft: '40px' }}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="farmer@sindaagro.com"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '4px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
              <input 
                type="password"
                required
                className="agri-input"
                style={{ paddingLeft: '40px' }}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button className="btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: '8px', minHeight: '48px' }}>
            {loading ? t('buttons.processing') : (isLoginMode ? 'Login to Dashboard' : 'Create Account')}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {isLoginMode ? "Don't have an account? " : "Already registered? "}
          <button 
            onClick={() => setIsLoginMode(!isLoginMode)}
            style={{ background: 'transparent', border: 'none', color: 'var(--primary-green)', fontWeight: 700, cursor: 'pointer' }}>
            {isLoginMode ? 'Register Now' : 'Login Here'}
          </button>
        </div>
      </div>
    </div>
  );
}
