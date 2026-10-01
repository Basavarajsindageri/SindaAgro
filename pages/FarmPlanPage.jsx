import React from 'react';
import { Calendar, CheckCircle2, Clock, FileText, Sprout, ShieldCheck, Lightbulb } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function FarmPlanPage({ masterDecision }) {
  const { t } = useTranslation();

  const farmingPlan = masterDecision?.recommendedFarmingPlan || {
    cropName: 'Paddy (Rice)',
    seedVariety: 'BPT 5204 (Samba Mahsuri / Certified)',
    seedRatePerAcre: '20 - 25 kg / Acre',
    basalFertilizerDose: '50 kg Urea + 100 kg SSP + 35 kg MOP per acre before transplanting',
    topDressingSchedule: [
      'Day 25 (Tillering Stage): 25 kg Urea per acre',
      'Day 50 (Panicle Initiation Stage): 25 kg Urea + 15 kg MOP per acre',
      'Day 75 (Flag Leaf Stage): Micro-nutrient zinc spray (2g/L water)'
    ]
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div>
        <span style={{ background: '#2EBF71', color: '#FFF', fontSize: '0.75rem', fontWeight: 900, padding: '4px 10px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          CULTIVATION PROTOCOL MATRIX
        </span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFFFFF', marginTop: '4px' }}>
          Step-by-step Cultivation Plan for {farmingPlan.cropName}
        </h2>
      </div>

      {/* Plan Details Card */}
      <div className="agri-card agri-card-ai">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ background: 'rgba(46, 191, 113, 0.2)', padding: '12px', borderRadius: '14px', color: '#65E69A', border: '1px solid #2EBF71' }}>
            <Calendar size={28} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFFFFF' }}>
              {farmingPlan.cropName} Agronomic Cultivation Schedule
            </h3>
            <span style={{ fontSize: '0.85rem', color: '#C89B55', fontWeight: 700 }}>Certified SindaAgro Agronomic Protocol</span>
          </div>
        </div>

        {/* Seed & Basal Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <div style={{ background: 'rgba(13, 31, 23, 0.9)', padding: '18px', borderRadius: '14px', border: '1px solid rgba(46, 191, 113, 0.3)' }}>
            <h5 style={{ color: '#65E69A', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>Certified Seed Variety</h5>
            <p style={{ fontSize: '1.1rem', fontWeight: 900, color: '#FFFFFF' }}>{farmingPlan.seedVariety}</p>
            <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Seed Rate: {farmingPlan.seedRatePerAcre}</span>
          </div>

          <div style={{ background: 'rgba(13, 31, 23, 0.9)', padding: '18px', borderRadius: '14px', border: '1px solid rgba(57, 168, 255, 0.3)' }}>
            <h5 style={{ color: '#39A8FF', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>Basal Fertilizer Dose (Day 0)</h5>
            <p style={{ fontSize: '0.95rem', color: '#FFFFFF', fontWeight: 700, lineHeight: 1.5 }}>{farmingPlan.basalFertilizerDose}</p>
          </div>
        </div>

        {/* Split Schedule Timeline */}
        <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#FFFFFF', marginBottom: '12px' }}>
          Split Top Dressing Schedule
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {farmingPlan.topDressingSchedule?.map((schedule, idx) => (
            <div key={idx} style={{
              background: 'rgba(13, 31, 23, 0.9)',
              padding: '16px 20px',
              borderRadius: '12px',
              border: '1px solid rgba(46, 191, 113, 0.3)',
              borderLeft: '4px solid #2EBF71',
              fontSize: '0.95rem',
              color: '#FFFFFF',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <CheckCircle2 size={20} color="#65E69A" style={{ flexShrink: 0 }} />
              <span>{schedule}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Crop Protection & Eco-Friendly Pesticides */}
      <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#FFFFFF', marginTop: '16px' }}>
        🛡️ Crop Protection &amp; Best Eco-Friendly Pesticides
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        <div className="agri-card" style={{ border: '1.5px solid #2EBF71' }}>
          <span style={{ background: 'rgba(46, 191, 113, 0.2)', color: '#65E69A', fontWeight: 800, fontSize: '0.78rem', padding: '4px 10px', borderRadius: '6px' }}>Bio-Pesticide</span>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFFFFF', marginTop: '8px' }}>Neem Oil 1500 PPM</h4>
          <p style={{ fontSize: '0.88rem', color: '#94A3B8', margin: '4px 0' }}>Target: Aphids, Thrips, Sucking Pests</p>
          <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#65E69A', marginTop: '8px' }}>Dosage: 500 ml / 200 Litres Water / Acre</div>
          <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '4px' }}>Safety: 100% Eco-friendly. Spray early morning or dusk.</p>
        </div>

        <div className="agri-card" style={{ border: '1.5px solid #39A8FF' }}>
          <span style={{ background: 'rgba(57, 168, 255, 0.2)', color: '#39A8FF', fontWeight: 800, fontSize: '0.78rem', padding: '4px 10px', borderRadius: '6px' }}>Chemical Insecticide</span>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFFFFF', marginTop: '8px' }}>Chlorantraniliprole 18.5% SC</h4>
          <p style={{ fontSize: '0.88rem', color: '#94A3B8', margin: '4px 0' }}>Target: Stem Borer &amp; Leaf Folder</p>
          <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#39A8FF', marginTop: '8px' }}>Dosage: 60 ml / 200 Litres Water / Acre</div>
          <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '4px' }}>Safety: Observe 14-day pre-harvest interval.</p>
        </div>

      </div>

      {/* Smart Low-Cost Agricultural Technologies */}
      <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#FFFFFF', marginTop: '16px' }}>
        💡 Recommended Smart Low-Cost Farm Technologies
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        <div className="agri-card" style={{ border: '1px solid rgba(200, 155, 85, 0.4)' }}>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFFFFF' }}>Solar Insect Trap</h4>
          <p style={{ fontSize: '0.88rem', color: '#94A3B8', margin: '4px 0' }}>Attracts &amp; traps nocturnal moths without chemical sprays.</p>
          <span style={{ fontWeight: 900, color: '#C89B55', fontSize: '1rem' }}>Est. Cost: ₹1,200</span>
        </div>

        <div className="agri-card" style={{ border: '1px solid rgba(46, 191, 113, 0.4)' }}>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFFFFF' }}>Drip Fertigation &amp; Venturi Kit</h4>
          <p style={{ fontSize: '0.88rem', color: '#94A3B8', margin: '4px 0' }}>Direct root-zone nutrient delivery; cuts water usage by 40%.</p>
          <span style={{ fontWeight: 900, color: '#65E69A', fontSize: '1rem' }}>Est. Cost: ₹4,500</span>
        </div>

      </div>
    </div>
  );
}
