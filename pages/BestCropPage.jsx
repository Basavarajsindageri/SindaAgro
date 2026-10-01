import React from 'react';
import { Sprout, CheckCircle2, TrendingUp, Droplets, Calendar, ShieldCheck, Sparkles, AlertTriangle } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function BestCropPage({ masterDecision }) {
  const { t } = useTranslation();

  const topCrop = masterDecision?.topRecommendedCrop || {
    cropName: 'Guntur Red Chilli',
    scientificName: 'Capsicum annuum',
    category: 'High-Value Cash Crop',
    suitabilityScore: 94,
    reasons: [
      'Optimal soil pH (6.8) matched with nitrogen availability',
      'Canal + borewell irrigation provides required moisture depth',
      'High historical regional mandi price surge in current district'
    ]
  };

  const highValueCrop = masterDecision?.topHighValueAlternativeCrop || {
    cropName: 'Hybrid Spice Crop (Chilli / Cotton)',
    category: 'Commercial Cash Crop',
    profitMultiplierVsStaple: 2.8,
    estimatedNetProfitPerAcre: 145000,
    estimatedYieldPerAcre: '18 Quintals',
    marketPricePerQuintal: 9200,
    transitionAdvice: 'Shift 1.0 Acre plot to hybrid chilli variety for enhanced market profitability.'
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div>
        <span style={{ background: '#2EBF71', color: '#FFF', fontSize: '0.75rem', fontWeight: 900, padding: '4px 10px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          3D AI CROP CLASSIFIER MATRIX
        </span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFFFFF', marginTop: '4px' }}>
          Best Crop Suitability Decision for Your Farm
        </h2>
        <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>
          AI-calculated crop suitability scores based on chemical lab test reports and micro-climate history.
        </p>
      </div>

      {/* Top Crop Match Display Banner */}
      <div className="agri-card agri-card-ai" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'center' }}>
        
        {/* Left Crop Title & Ranking */}
        <div>
          <span className="agri-badge badge-success" style={{ marginBottom: '12px' }}>
            🥇 BEST CROP MATCH FOR YOUR FARM
          </span>
          <h3 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#FFFFFF', margin: '6px 0' }}>
            🌶️ {topCrop.cropName}
          </h3>
          <span style={{ fontSize: '0.9rem', color: '#C89B55', fontStyle: 'italic', fontWeight: 600 }}>
            {topCrop.scientificName} • {topCrop.category}
          </span>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '10px' }}>
              WHY RECOMMENDED BY SINDAAGRO AI:
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {topCrop.reasons?.map((reason, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#F8FAFC' }}>
                  <CheckCircle2 size={18} color="#2EBF71" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Circular Score Gauge */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(13, 31, 23, 0.8)', padding: '28px', borderRadius: '20px', border: '1px solid #2EBF71' }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'conic-gradient(#2EBF71 94%, rgba(255,255,255,0.1) 0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--glow-green)'
          }}>
            <div style={{
              width: '98px',
              height: '98px',
              borderRadius: '50%',
              background: '#0D1F17',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#65E69A' }}>
                94%
              </span>
              <span style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase' }}>SUITABILITY</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '20px', width: '100%' }}>
            <div style={{ flex: 1, background: 'rgba(13, 31, 23, 0.9)', padding: '8px', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(46, 191, 113, 0.3)' }}>
              <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Water Needed</span>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFF' }}>Medium</div>
            </div>
            <div style={{ flex: 1, background: 'rgba(13, 31, 23, 0.9)', padding: '8px', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(46, 191, 113, 0.3)' }}>
              <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Harvest Time</span>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFF' }}>110 Days</div>
            </div>
          </div>
        </div>

      </div>

      {/* Alternative Crop Ranking Options */}
      <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#FFFFFF', marginTop: '8px' }}>
        Alternative Ranked Crop Options
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        
        <div className="agri-card" style={{ border: '1px solid rgba(200, 155, 85, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF' }}>🌾 Groundnut</h4>
            <span style={{ color: '#C89B55', fontWeight: 900, fontSize: '1.1rem' }}>89% Match</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Excellent nitrogen fixation &amp; drought resistance.</p>
        </div>

        <div className="agri-card" style={{ border: '1px solid rgba(57, 168, 255, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF' }}>🌽 Maize / Corn</h4>
            <span style={{ color: '#39A8FF', fontWeight: 900, fontSize: '1.1rem' }}>86% Match</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>High fodder &amp; grain market demand.</p>
        </div>

        <div className="agri-card" style={{ border: '1px solid rgba(46, 191, 113, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF' }}>🌱 Green Gram Pulses</h4>
            <span style={{ color: '#65E69A', fontWeight: 900, fontSize: '1.1rem' }}>82% Match</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Short 65-day harvest window for quick turnover.</p>
        </div>

      </div>
    </div>
  );
}
