import React from 'react';
import { MapPin, Plus, TestTube, CheckCircle2, ChevronRight, Droplets } from 'lucide-react';

export default function FarmList({ farms, selectedFarm, onSelectFarm, onOpenAddFarm, onOpenSoilModal }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Your Farm Plots</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Select a farm plot to view personalized AI crop recommendations</p>
        </div>
        <button className="gradient-btn" onClick={onOpenAddFarm} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
          <Plus size={16} />
          Add Farm Plot
        </button>
      </div>

      {farms.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <MapPin size={40} color="var(--text-muted)" style={{ marginBottom: '12px' }} />
          <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>No Farm Plots Registered</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>Add your first land plot to generate AI crop decisions</p>
          <button className="gradient-btn" onClick={onOpenAddFarm}>
            <Plus size={16} />
            Add First Farm Plot
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {farms.map((farm) => {
            const isSelected = selectedFarm?.id === farm.id;
            return (
              <div 
                key={farm.id}
                onClick={() => onSelectFarm(farm)}
                className="glass-card"
                style={{
                  cursor: 'pointer',
                  padding: '18px',
                  borderColor: isSelected ? 'var(--primary)' : 'var(--border-glass)',
                  boxShadow: isSelected ? '0 0 20px var(--primary-glow)' : 'none',
                  position: 'relative'
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{farm.farmName}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{farm.areaAcres} Acres • {farm.soilType}</span>
                  </div>
                  {isSelected && <CheckCircle2 size={20} color="var(--primary)" />}
                </div>

                <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Droplets size={14} color="#60A5FA" />
                    {farm.irrigationAvailable ? (farm.waterSource || 'Irrigated') : 'Rainfed'}
                  </span>
                  <span>Previous: {farm.previousCrop || 'None'}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onOpenSoilModal(farm); }}
                    style={{
                      background: 'rgba(59, 130, 246, 0.15)',
                      color: '#60A5FA',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      borderRadius: '8px',
                      padding: '6px 10px',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                    <TestTube size={13} />
                    Soil Test
                  </button>

                  <span style={{ fontSize: '0.8rem', color: isSelected ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                    {isSelected ? 'Active Plot' : 'Select'}
                    <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
