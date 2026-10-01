import React, { useState, useEffect } from 'react';
import { Wrench, Droplets, Sun, Cpu, CheckCircle2, ShieldAlert, Sparkles, ArrowUpRight } from 'lucide-react';
import { api } from '../services/api';
import { useTranslation } from '../context/LanguageContext';

export default function TechRecommendationPage({ selectedFarm }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [techData, setTechData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTechRecommendations();
  }, [selectedFarm]);

  const fetchTechRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const farmId = selectedFarm?.id || 1;
      const res = await api.getTechnologyRecommendations(farmId);
      setTechData(res.data);
    } catch (err) {
      setError(err.message || 'Unable to load technology recommendations');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
        <Wrench className="animate-spin" size={32} style={{ marginBottom: '12px', color: 'var(--primary-green)' }} />
        <p style={{ fontWeight: 600 }}>Analyzing land constraints &amp; matching low-cost farm technologies...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* Page Banner */}
      <div className="agri-card" style={{
        background: 'linear-gradient(135deg, #10241A 0%, #2F6B3F 100%)',
        color: '#FFFFFF', padding: '28px', borderRadius: '24px', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(123, 224, 138, 0.2)', color: '#7BE08A', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 800, marginBottom: '12px' }}>
            <Cpu size={16} />
            <span>Land-Based Cultivation Technology</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 8px 0', color: '#FFFFFF' }}>
            Smart Low-Cost Tools for Your Land
          </h2>
          <p style={{ color: '#A7F3D0', fontSize: '0.95rem', maxWidth: '650px', margin: 0, lineHeight: '1.5' }}>
            Tailored specifically for <strong>{techData?.farmName || 'Your Farm'}</strong> ({techData?.soilType} soil, {techData?.waterSource} water source, {techData?.areaAcres} acres).
          </p>
        </div>
      </div>

      {error && (
        <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '14px 18px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldAlert size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Grid of Ranked Recommendations */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {techData?.rankedRecommendations?.map((tech, idx) => (
          <div key={tech.techId || idx} className="agri-card" style={{
            background: '#FFFFFF', borderRadius: '20px', padding: '24px',
            border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)', position: 'relative'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '16px',
                  background: idx === 0 ? '#E8F5E9' : idx === 1 ? '#FEF3C7' : '#E0F2FE',
                  color: idx === 0 ? '#2F6B3F' : idx === 1 ? '#D97706' : '#0284C7',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {tech.category.includes('Irrigation') ? <Droplets size={24} /> : tech.category.includes('Energy') ? <Sun size={24} /> : <Cpu size={24} />}
                </div>
                <span style={{
                  background: '#F1F5F9', color: '#475569', padding: '4px 10px',
                  borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700
                }}>
                  Rank #{idx + 1}
                </span>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E293B', margin: '0 0 6px 0' }}>
                {tech.techName}
              </h3>
              <div style={{ fontSize: '0.82rem', color: '#2F6B3F', fontWeight: 700, marginBottom: '12px' }}>
                Category: {tech.category}
              </div>

              {/* Constraint Reason (One-line reason tied to farm constraint) */}
              <div style={{
                background: '#F8FAFC', borderLeft: '4px solid #2F6B3F', padding: '10px 14px',
                borderRadius: '0 12px 12px 0', fontSize: '0.88rem', color: '#334155', marginBottom: '14px',
                lineHeight: '1.45', fontWeight: 500
              }}>
                <strong>Why for your farm:</strong> {tech.suitabilityReason}
              </div>

              {/* Benefits Bullet List */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748B', marginBottom: '6px' }}>Key Impact &amp; Savings:</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {tech.keyBenefits?.map((b, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#1E293B' }}>
                      <CheckCircle2 size={16} color="#2F6B3F" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & Step Footer */}
            <div style={{ paddingTop: '16px', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Est. Investment</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10241A' }}>
                  ₹{tech.estimatedCostInr?.toLocaleString('en-IN')}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#E8F5E9', color: '#2F6B3F', padding: '6px 12px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: 800 }}>
                <span>-{tech.estimatedWaterOrCostSavingsPercent}% Savings</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
