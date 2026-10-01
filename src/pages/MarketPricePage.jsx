import React from 'react';
import { TrendingUp, TrendingDown, Minus, Info, ShieldAlert, Truck, AlertTriangle } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function MarketPricePage({ masterDecision }) {
  const { t } = useTranslation();

  const marketAlternatives = masterDecision?.marketAlternatives || [
    {
      cropName: 'TURMERIC',
      marketPricePerQuintal: 7500,
      estimatedYieldPerAcre: '90 quintals / acre',
      estimatedNetProfitPerAcre: 525000,
      profitMultiplierVsStaple: 3.4,
      marketDemandStatus: 'RISING',
      perishability: 'LOW_RISK (Storable after boiling/drying)',
      dataSource: 'REFERENCE_DATA',
      transitionAdvice: 'High-value commercial cash crop requiring raised beds, good soil drainage, and 9-month crop duration.'
    },
    {
      cropName: 'TOMATO',
      marketPricePerQuintal: 1800,
      estimatedYieldPerAcre: '180 quintals / acre',
      estimatedNetProfitPerAcre: 239000,
      profitMultiplierVsStaple: 2.1,
      marketDemandStatus: 'HIGH',
      perishability: 'HIGH_RISK (Requires immediate market transport within 24-48h)',
      dataSource: 'REFERENCE_DATA',
      transitionAdvice: 'Short-duration (90-110 days) horticultural crop with high turnover. Requires drip irrigation.'
    },
    {
      cropName: 'GROUNDNUT',
      marketPricePerQuintal: 6500,
      estimatedYieldPerAcre: '12 quintals / acre',
      estimatedNetProfitPerAcre: 50000,
      profitMultiplierVsStaple: 1.4,
      marketDemandStatus: 'STABLE',
      perishability: 'LOW_RISK (Dry oilseed with long shelf life)',
      dataSource: 'REFERENCE_DATA',
      transitionAdvice: 'Leguminous oilseed crop requiring low water; fixes soil nitrogen for subsequent crops.'
    }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Disclaimer Banner */}
      <div style={{
        background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: '16px',
        padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px', color: '#92400E'
      }}>
        <Info size={22} style={{ flexShrink: 0 }} />
        <div>
          <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>
            Reference Agronomic Data Notice (Not Live APMC Mandi Streaming)
          </div>
          <div style={{ fontSize: '0.82rem', marginTop: '2px' }}>
            Figures below represent baseline seasonal benchmark estimates for crop planning. Always verify local mandi spot prices before selling produce.
          </div>
        </div>
      </div>

      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-dark)', margin: 0 }}>
          Crop Demand &amp; Market Opportunity Analysis
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Evaluate high-value alternative cash crops by market demand, profit multiplier, and perishability risk.
        </p>
      </div>

      {/* Alternative Crop Opportunities Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {marketAlternatives.map((alt, idx) => (
          <div key={idx} className="agri-card" style={{
            background: '#FFFFFF', borderRadius: '20px', padding: '24px',
            border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '1.3rem', fontWeight: 900, color: '#1E293B' }}>{alt.cropName}</span>
                <span style={{
                  background: alt.marketDemandStatus === 'RISING' ? '#DCFCE7' : alt.marketDemandStatus === 'HIGH' ? '#FEF3C7' : '#F1F5F9',
                  color: alt.marketDemandStatus === 'RISING' ? '#15803D' : alt.marketDemandStatus === 'HIGH' ? '#B45309' : '#475569',
                  fontWeight: 800, fontSize: '0.78rem', padding: '4px 10px', borderRadius: '12px'
                }}>
                  Demand: {alt.marketDemandStatus}
                </span>
              </div>

              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2F6B3F', marginBottom: '6px' }}>
                ₹{alt.marketPricePerQuintal?.toLocaleString('en-IN')} <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500 }}>/ quintal</span>
              </div>

              <div style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '12px' }}>
                Est. Net Profit: <strong>₹{alt.estimatedNetProfitPerAcre?.toLocaleString('en-IN')} / acre</strong> ({alt.profitMultiplierVsStaple}x staple baseline)
              </div>

              {/* Perishability Risk */}
              <div style={{
                background: alt.perishability?.includes('HIGH') ? '#FEE2E2' : '#F8FAFC',
                color: alt.perishability?.includes('HIGH') ? '#991B1B' : '#334155',
                padding: '10px 12px', borderRadius: '12px', fontSize: '0.82rem',
                display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontWeight: 600
              }}>
                <Truck size={16} />
                <span>{alt.perishability}</span>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: '1.45', margin: 0 }}>
                {alt.transitionAdvice}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
