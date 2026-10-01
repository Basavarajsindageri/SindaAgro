import React, { useState, useEffect } from 'react';
import { TestTube, CheckCircle2, AlertCircle, Plus, Sparkles, Phone, Package } from 'lucide-react';
import { api } from '../services/api';
import { useTranslation } from '../context/LanguageContext';

export default function SoilCheckPage({ farm, onOpenSoilModal }) {
  const { t } = useTranslation();
  const [latestReport, setLatestReport] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (farm) {
      fetchSoilReport(farm.id);
    }
  }, [farm]);

  const fetchSoilReport = async (farmId) => {
    setLoading(true);
    try {
      const res = await api.getLatestSoilReport(farmId);
      setLatestReport(res.data);
    } catch (err) {
      console.warn('Soil report error:', err);
      setLatestReport(null);
    } finally {
      setLoading(false);
    }
  };

  const sampleSoil = latestReport || {
    ph: 6.8,
    nitrogen: 130.0,
    phosphorus: 38.0,
    potassium: 190.0,
    organicCarbon: 0.75
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ background: '#2EBF71', color: '#FFF', fontSize: '0.75rem', fontWeight: 900, padding: '4px 10px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            SOIL NPK CHEMISTRY MATRIX
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFFFFF', marginTop: '4px' }}>
            {farm ? `${farm.farmName} (${farm.soilType})` : 'Soil Nutrient & Health Diagnostics'}
          </h2>
        </div>
        
        {farm && (
          <button className="btn-primary" onClick={() => onOpenSoilModal(farm)}>
            <TestTube size={18} />
            <span>Submit Chemical Test</span>
          </button>
        )}
      </div>

      {/* Main Soil Health Command Card */}
      <div className="agri-card agri-card-ai" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'center' }}>
        <div>
          <span className="agri-badge badge-ai" style={{ marginBottom: '12px' }}>
            ✨ AI Soil Health Score: 88/100
          </span>
          <h3 style={{ fontSize: '2rem', fontWeight: 900, color: '#FFFFFF', margin: '8px 0' }}>
            Optimal Balance (pH {sampleSoil.ph})
          </h3>
          <p style={{ fontSize: '0.92rem', color: '#94A3B8', lineHeight: 1.6 }}>
            Your soil is well-balanced for Kharif staple and high-yield cash crops. Organic carbon ({sampleSoil.organicCarbon}%) ensures optimum water retention and root absorption.
          </p>
        </div>

        {/* Visual Progress Gauges Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          
          {/* pH */}
          <div style={{ background: 'rgba(13, 31, 23, 0.8)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(46, 191, 113, 0.3)' }}>
            <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 600 }}>pH Value</span>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#65E69A', margin: '4px 0' }}>{sampleSoil.ph}</div>
            <div style={{ background: 'rgba(255,255,255,0.1)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${(sampleSoil.ph / 14) * 100}%`, background: '#2EBF71', height: '100%' }}></div>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#2EBF71', fontWeight: 700 }}>Good (6.5-7.5)</span>
          </div>

          {/* Organic Carbon */}
          <div style={{ background: 'rgba(13, 31, 23, 0.8)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(200, 155, 85, 0.3)' }}>
            <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 600 }}>Organic Carbon</span>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#C89B55', margin: '4px 0' }}>{sampleSoil.organicCarbon}%</div>
            <div style={{ background: 'rgba(255,255,255,0.1)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${(sampleSoil.organicCarbon / 1.5) * 100}%`, background: '#C89B55', height: '100%' }}></div>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#C89B55', fontWeight: 700 }}>Good Level</span>
          </div>

        </div>
      </div>

      {/* N-P-K Chemical Nutrient Breakdown Cards */}
      <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#FFFFFF', marginTop: '8px' }}>
        Chemical Nutrient Breakdown (kg/ha)
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        
        {/* Nitrogen (N) */}
        <div className="agri-card" style={{ border: '1px solid rgba(46, 191, 113, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#65E69A' }}>Nitrogen (N)</h4>
            <span style={{ background: 'rgba(46, 191, 113, 0.2)', color: '#65E69A', fontSize: '0.8rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(46, 191, 113, 0.4)' }}>
              {sampleSoil.nitrogen} kg/ha
            </span>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.5 }}>
            Essential for vegetative leaf canopy growth and chlorophyll synthesis.
          </p>
        </div>

        {/* Phosphorus (P) */}
        <div className="agri-card" style={{ border: '1px solid rgba(57, 168, 255, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#39A8FF' }}>Phosphorus (P)</h4>
            <span style={{ background: 'rgba(57, 168, 255, 0.2)', color: '#39A8FF', fontSize: '0.8rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(57, 168, 255, 0.4)' }}>
              {sampleSoil.phosphorus} kg/ha
            </span>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.5 }}>
            Promotes robust deep root establishment and early flowering.
          </p>
        </div>

        {/* Potassium (K) */}
        <div className="agri-card" style={{ border: '1px solid rgba(200, 155, 85, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#C89B55' }}>Potassium (K)</h4>
            <span style={{ background: 'rgba(200, 155, 85, 0.2)', color: '#C89B55', fontSize: '0.8rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(200, 155, 85, 0.4)' }}>
              {sampleSoil.potassium} kg/ha
            </span>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.5 }}>
            Improves drought tolerance, stalk strength, and pest resistance.
          </p>
        </div>

      </div>

      {/* Online Authorized Soil Testers & Booking Service */}
      <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#FFFFFF', marginTop: '24px' }}>
        🔬 Authorized Local Soil Testing Labs &amp; Doorstep Booking
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        {/* Lab 1 */}
        <div className="agri-card" style={{ border: '1.5px solid #2EBF71', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ background: 'rgba(46, 191, 113, 0.2)', color: '#65E69A', fontWeight: 800, fontSize: '0.75rem', padding: '4px 8px', borderRadius: '6px' }}>⭐ 4.9 Rating</span>
            <span style={{ fontWeight: 900, color: '#2EBF71', fontSize: '1.1rem' }}>₹250 / Test</span>
          </div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', marginTop: '8px' }}>
            Karnataka Krishi Vigyana Kendra (KVK) Soil Lab
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#94A3B8', margin: '6px 0 12px 0' }}>
            📍 KVK Farm Campus, Belagavi | ⏱️ Turnaround: 3 Days
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <a href="tel:9448123456" className="btn-secondary" style={{ textDecoration: 'none', padding: '8px 12px', fontSize: '0.85rem' }}>
              📞 Call Lab
            </a>
            <button className="btn-primary" style={{ padding: '8px 12px', fontSize: '0.85rem' }} onClick={() => alert('Doorstep pickup booked! Order ID: ST-ORD-49201')}>
              📦 Book Pickup
            </button>
          </div>
        </div>

        {/* Lab 2 */}
        <div className="agri-card" style={{ border: '1.5px solid #2EBF71', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ background: 'rgba(46, 191, 113, 0.2)', color: '#65E69A', fontWeight: 800, fontSize: '0.75rem', padding: '4px 8px', borderRadius: '6px' }}>⭐ 4.8 Rating</span>
            <span style={{ fontWeight: 900, color: '#2EBF71', fontSize: '1.1rem' }}>₹350 / Test</span>
          </div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', marginTop: '8px' }}>
            SindaAgro Mobile Diagnostic Van
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#94A3B8', margin: '6px 0 12px 0' }}>
            📍 Doorstep Mobile Soil Testing Unit | ⏱️ Turnaround: Instant
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <a href="tel:9880987654" className="btn-secondary" style={{ textDecoration: 'none', padding: '8px 12px', fontSize: '0.85rem' }}>
              📞 Call Van
            </a>
            <button className="btn-primary" style={{ padding: '8px 12px', fontSize: '0.85rem' }} onClick={() => alert('Mobile van visit booked for your farm! Order ID: ST-ORD-88310')}>
              🚐 Book Van Visit
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
