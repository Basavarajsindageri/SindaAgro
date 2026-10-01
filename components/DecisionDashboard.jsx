import React, { useState } from 'react';
import { 
  Sprout, TrendingUp, Calendar, AlertTriangle, CloudRain, 
  HelpCircle, CheckCircle2, ChevronDown, ChevronUp, DollarSign,
  ShieldAlert, Sparkles, TestTube, ArrowUpRight
} from 'lucide-react';

export default function DecisionDashboard({ masterDecision, loading }) {
  const [activeQuestion, setActiveQuestion] = useState(null);

  if (loading) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <Sparkles size={48} className="gradient-text" style={{ animation: 'spin 2s linear infinite', marginBottom: '16px' }} />
        <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Evaluating Soil Chemistry & Running AI Microservice...</h3>
        <p style={{ color: 'var(--text-muted)' }}>Synthesizing agronomic rules, market projections, and weather risk alerts</p>
      </div>
    );
  }

  if (!masterDecision) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '50px 20px' }}>
        <TestTube size={40} color="var(--text-muted)" style={{ marginBottom: '12px' }} />
        <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Select a Farm Plot & Submit Soil Test</h4>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Select a farm plot above to compute percentage crop suitability scores and AI market decisions
        </p>
      </div>
    );
  }

  const { topRecommendedCrop, topHighValueAlternativeCrop, recommendedFarmingPlan, weatherRiskReport, answersTo10CoreQuestions, masterAiSummary } = masterDecision;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Master AI Summary Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(59, 130, 246, 0.10) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px'
      }}>
        <div style={{ background: 'var(--primary)', padding: '10px', borderRadius: '12px', color: '#FFF' }}>
          <Sparkles size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }} className="gradient-text">
            SindaAgro AI Master Decision Synthesis
          </h3>
          <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
            {masterAiSummary}
          </p>
        </div>
      </div>

      {/* Grid: Top Suitable Crop vs High-Value Cash Crop */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        
        {/* Top Suitable Crop Card */}
        {topRecommendedCrop && (
          <div className="glass-card" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span className="badge badge-success" style={{ marginBottom: '8px' }}>#1 Top Suitable Crop</span>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{topRecommendedCrop.cropName}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  {topRecommendedCrop.scientificName} • {topRecommendedCrop.category}
                </span>
              </div>

              {/* Score Ring */}
              <div className="score-ring" style={{ '--score': topRecommendedCrop.suitabilityScore }}>
                <div className="score-ring-inner">
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>
                    {topRecommendedCrop.suitabilityScore}%
                  </span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Match</span>
                </div>
              </div>
            </div>

            <h5 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Agronomic Compatibility Reasons:</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
              {topRecommendedCrop.reasons?.map((reason, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#E2E8F0' }}>
                  <CheckCircle2 size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* High-Value Alternative Cash Crop Card */}
        {topHighValueAlternativeCrop && (
          <div className="glass-card" style={{ position: 'relative', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span className="badge badge-warning" style={{ marginBottom: '8px' }}>High-Value Alternative</span>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{topHighValueAlternativeCrop.cropName}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {topHighValueAlternativeCrop.category}
                </span>
              </div>

              <div style={{
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#FBBF24',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                padding: '8px 14px',
                borderRadius: '12px',
                textAlign: 'right'
              }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>{topHighValueAlternativeCrop.profitMultiplierVsStaple}x</div>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>Profit Multiplier</div>
              </div>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '14px', borderRadius: '12px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Est. Net Profit / Acre:</span>
                <span style={{ fontWeight: 700, color: '#34D399' }}>₹{topHighValueAlternativeCrop.estimatedNetProfitPerAcre?.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <span>Est. Yield: {topHighValueAlternativeCrop.estimatedYieldPerAcre}</span>
                <span>Mandi Price: ₹{topHighValueAlternativeCrop.marketPricePerQuintal}/qtn</span>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              💡 <strong>Transition Advice:</strong> {topHighValueAlternativeCrop.transitionAdvice}
            </p>
          </div>
        )}
      </div>

      {/* Step-by-Step Farming Procedure Plan */}
      {recommendedFarmingPlan && (
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Calendar size={22} color="var(--primary)" />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>
              Step-by-Step Cultivation Protocol ({recommendedFarmingPlan.cropName})
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '14px', borderRadius: '12px' }}>
              <h5 style={{ color: 'var(--primary)', fontSize: '0.85rem', marginBottom: '4px' }}>Certified Seed Selection</h5>
              <p style={{ fontSize: '0.95rem', fontWeight: 600 }}>{recommendedFarmingPlan.seedVariety}</p>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Rate: {recommendedFarmingPlan.seedRatePerAcre}</span>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '14px', borderRadius: '12px' }}>
              <h5 style={{ color: '#60A5FA', fontSize: '0.85rem', marginBottom: '4px' }}>Basal Fertilizer Dose (Day 0)</h5>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{recommendedFarmingPlan.basalFertilizerDose}</p>
            </div>
          </div>

          <h5 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Split Top Dressing Schedule:</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {recommendedFarmingPlan.topDressingSchedule?.map((td, idx) => (
              <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 14px', borderRadius: '8px', borderLeft: '3px solid var(--primary)', fontSize: '0.85rem' }}>
                {td}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weather Risk Assessment & Active Alerts */}
      {weatherRiskReport && (
        <div className="glass-card" style={{ borderColor: weatherRiskReport.overallRiskLevel === 'CRITICAL' ? 'rgba(244, 63, 94, 0.4)' : 'var(--border-glass)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CloudRain size={22} color="#60A5FA" />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>
                7-Day Agro-Weather Forecast & Risk Alerts ({weatherRiskReport.district}, {weatherRiskReport.state})
              </h3>
            </div>
            <span className={`badge ${weatherRiskReport.overallRiskLevel === 'CRITICAL' ? 'badge-danger' : 'badge-warning'}`}>
              Risk: {weatherRiskReport.overallRiskLevel}
            </span>
          </div>

          {/* Active Alerts */}
          {weatherRiskReport.alerts?.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {weatherRiskReport.alerts.map((alert, idx) => (
                <div key={idx} style={{
                  background: 'rgba(244, 63, 94, 0.10)',
                  border: '1px solid rgba(244, 63, 94, 0.3)',
                  padding: '14px',
                  borderRadius: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F87171', fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>
                    <ShieldAlert size={18} />
                    <span>{alert.title}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '8px' }}>{alert.description}</p>
                  <div style={{ fontSize: '0.85rem', color: '#34D399', fontWeight: 600 }}>
                    🛠️ <strong>Mitigation Action:</strong> {alert.mitigationAction}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>No severe weather risk alerts for the upcoming 7 days.</p>
          )}

          {/* Forecast Horizon */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '10px' }}>
            {weatherRiskReport.forecasts?.map((day, idx) => (
              <div key={idx} style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '10px', borderRadius: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{day.date}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, margin: '4px 0' }}>{day.tempMaxC}°C</div>
                <div style={{ fontSize: '0.75rem', color: '#60A5FA' }}>💧 {day.humidityPercent}%</div>
                <div style={{ fontSize: '0.75rem', color: '#FBBF24' }}>🌧️ {day.rainfallMm}mm</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 10 Core Farmer Questions Expandable Accordion */}
      {answersTo10CoreQuestions && (
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <HelpCircle size={22} color="var(--primary)" />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>
              The 10 Core Agricultural Questions Answered
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', divideY: '1px solid var(--border-glass)' }}>
            {Object.entries(answersTo10CoreQuestions).map(([question, answer], idx) => {
              const isOpen = activeQuestion === idx;
              return (
                <div key={idx} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                  <button 
                    className="accordion-header"
                    onClick={() => setActiveQuestion(isOpen ? null : idx)}>
                    <span>{question}</span>
                    {isOpen ? <ChevronUp size={18} color="var(--primary)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                  </button>
                  {isOpen && (
                    <div className="accordion-body animate-fade-in">
                      {answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
