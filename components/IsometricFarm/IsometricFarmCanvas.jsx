import React, { useState } from 'react';
import { Home, Sprout, Droplets, Compass, TestTube, AlertTriangle, Layers, Info } from 'lucide-react';
import IsometricPlotDrawer from './IsometricPlotDrawer';
import { useTranslation } from '../../context/LanguageContext';

export default function IsometricFarmCanvas({ farms, selectedFarm, onSelectFarm, onOpenSoilModal, onOpenAddFarm }) {
  const { t } = useTranslation();
  const [hoveredPlotId, setHoveredPlotId] = useState(null);
  const [drawerFarm, setDrawerFarm] = useState(null);

  // Default demonstration farm plots if no user farms added yet
  const displayFarms = farms.length > 0 ? farms : [
    { id: 'demo1', farmName: 'North Green Plot', areaAcres: 3.5, soilType: 'Black Soil', irrigationAvailable: true, waterSource: 'Borewell', previousCrop: 'Paddy', status: 'Active Crop' },
    { id: 'demo2', farmName: 'East Soil Plot', areaAcres: 2.0, soilType: 'Red Loamy', irrigationAvailable: false, waterSource: 'Rainfed', previousCrop: 'Cotton', status: 'Empty Soil' },
    { id: 'demo3', farmName: 'Valley Orchard Plot', areaAcres: 4.2, soilType: 'Alluvial Soil', irrigationAvailable: true, waterSource: 'Canal', previousCrop: 'Sugarcane', status: 'Harvest Ready' }
  ];

  // Visual state styling colors for 3D Isometric blocks
  const plotStyles = {
    'Active Crop': { top: '#2FBF71', sideL: '#1F9D63', sideR: '#15803D', icon: '🌱', label: t('farm.activeCrop') },
    'Harvest Ready': { top: '#FBBF24', sideL: '#D97706', sideR: '#B45309', icon: '🌾', label: t('farm.harvestReady') },
    'Empty Soil': { top: '#D97706', sideL: '#B45309', sideR: '#78350F', icon: '🟫', label: t('farm.emptySoil') },
    'Preparing': { top: '#F59E0B', sideL: '#D97706', sideR: '#92400E', icon: '🚜', label: t('farm.preparing') },
    'Risk': { top: '#EF4444', sideL: '#DC2626', sideR: '#991B1B', icon: '⚠️', label: t('farm.atRisk') }
  };

  const handlePlotClick = (farm) => {
    onSelectFarm(farm);
    setDrawerFarm(farm);
  };

  return (
    <div style={{ position: 'relative', width: '100%', marginBottom: '24px' }}>
      
      {/* 3D Farm Visual Container */}
      <div className="agri-card" style={{
        background: 'linear-gradient(180deg, #EBF5F0 0%, #D8EFE4 100%)',
        border: '2px solid #C2E7D5',
        overflow: 'hidden',
        position: 'relative',
        padding: '32px 24px',
        minHeight: '440px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        
        {/* Header Bar */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '24px',
          right: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="agri-badge badge-success" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
              🎨 3D Isometric Farm View
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              ({displayFarms.length} {t('stats.totalFarms')})
            </span>
          </div>

          <button 
            onClick={onOpenAddFarm}
            className="btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            + {t('farm.addFarm')}
          </button>
        </div>

        {/* Isometric 3D Scene Viewport */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '860px',
          height: '340px',
          marginTop: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>

          {/* SVG & Isometric Grid Scene */}
          <svg viewBox="0 0 900 460" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="12" stdDeviation="8" floodColor="#052E1C" floodOpacity="0.15" />
              </filter>
              <linearGradient id="grassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C4E8D5" />
                <stop offset="100%" stopColor="#A8DEC2" />
              </linearGradient>
            </defs>

            {/* Base Farm Land Terrain (Isometric Diamond Base) */}
            <polygon 
              points="450,40 850,220 450,400 50,220" 
              fill="url(#grassGrad)" 
              stroke="#8ED4B1" 
              strokeWidth="4" 
              filter="url(#shadow3d)"
            />

            {/* Farm Perimeter Fence & Road */}
            <polygon 
              points="450,55 820,220 450,385 80,220" 
              fill="none" 
              stroke="#D4ECE0" 
              strokeWidth="2" 
              strokeDasharray="8 6" 
            />

            {/* Tractor Road Path */}
            <path 
              d="M 450,380 Q 420,280 450,65" 
              fill="none" 
              stroke="#D97706" 
              strokeWidth="14" 
              strokeOpacity="0.3" 
              strokeLinecap="round" 
            />

            {/* Water Source (Borewell / Pond) */}
            <g transform="translate(180, 140)">
              <ellipse cx="40" cy="20" rx="36" ry="20" fill="#60A5FA" opacity="0.85" />
              <ellipse cx="40" cy="20" rx="28" ry="14" fill="#3B82F6" opacity="0.9" />
              <text x="40" y="24" textAnchor="middle" fontSize="16" fill="#FFF">💧</text>
            </g>

            {/* Farm House 🏡 & Barn */}
            <g transform="translate(620, 110)">
              {/* House Base */}
              <polygon points="40,30 70,15 100,30 70,45" fill="#E2E8F0" />
              <polygon points="40,30 70,45 70,75 40,60" fill="#CBD5E1" />
              <polygon points="70,45 100,30 100,60 70,75" fill="#94A3B8" />
              {/* Red Roof */}
              <polygon points="40,30 70,0 100,30 70,45" fill="#EF4444" />
              <text x="70" y="22" textAnchor="middle" fontSize="22">🏡</text>
            </g>

            {/* Trees & Vegetation */}
            <g transform="translate(130, 260)"><text fontSize="26">🌳</text></g>
            <g transform="translate(160, 290)"><text fontSize="22">🌳</text></g>
            <g transform="translate(720, 240)"><text fontSize="26">🌴</text></g>
            <g transform="translate(750, 270)"><text fontSize="22">🌳</text></g>
            <g transform="translate(430, 360)"><text fontSize="24">🚜</text></g>

            {/* Render Dynamic 3D Isometric Plots */}
            {displayFarms.map((farm, index) => {
              const status = farm.status || (index === 0 ? 'Active Crop' : index === 1 ? 'Empty Soil' : 'Harvest Ready');
              const style = plotStyles[status] || plotStyles['Active Crop'];
              const isSelected = selectedFarm?.id === farm.id;
              const isHovered = hoveredPlotId === farm.id;

              // Grid positioning for 3D blocks
              const col = index % 3;
              const row = Math.floor(index / 3);
              const baseX = 320 + (col - row) * 110;
              const baseY = 160 + (col + row) * 60;

              return (
                <g 
                  key={farm.id} 
                  transform={`translate(${baseX}, ${baseY})`}
                  onClick={() => handlePlotClick(farm)}
                  onMouseEnter={() => setHoveredPlotId(farm.id)}
                  onMouseLeave={() => setHoveredPlotId(null)}
                  style={{ cursor: 'pointer', transition: 'transform 0.2s ease' }}>
                  
                  {/* Isometric Top Face */}
                  <polygon 
                    points="0,-25 60,-55 120,-25 60,5" 
                    fill={isHovered || isSelected ? '#7BE08A' : style.top} 
                    stroke={isSelected ? '#2F6B3F' : '#FFFFFF'} 
                    strokeWidth={isSelected ? "3.5" : "1.5"} 
                    filter={isSelected ? 'drop-shadow(0 0 12px rgba(123, 224, 138, 0.9))' : 'drop-shadow(0 8px 12px rgba(5, 46, 28, 0.2))'}
                  />

                  {/* Isometric Left Face */}
                  <polygon 
                    points="0,-25 60,5 60,25 0,-5" 
                    fill={style.sideL} 
                  />

                  {/* Isometric Right Face */}
                  <polygon 
                    points="60,5 120,-25 120,-5 60,25" 
                    fill={style.sideR} 
                  />

                  {/* Crop / Soil Emoji Visual Icon */}
                  <text x="60" y="-12" textAnchor="middle" fontSize="20" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
                    {style.icon}
                  </text>

                  {/* Plot Name Label Pill */}
                  <g transform="translate(60, -45)">
                    <rect x="-45" y="-14" width="90" height="20" rx="10" fill="#052E1C" opacity="0.9" />
                    <text x="0" y="0" textAnchor="middle" fontSize="10" fontWeight="700" fill="#FFF">
                      {farm.farmName.length > 12 ? farm.farmName.substring(0, 10) + '..' : farm.farmName}
                    </text>
                  </g>
                </g>
              );
            })}

          </svg>
        </div>

        {/* Legend Footer */}
        <div style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: '16px',
          fontSize: '0.8rem',
          color: 'var(--text-main)',
          fontWeight: 600
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', background: '#2FBF71', borderRadius: '3px' }}></span>
            🌱 {t('farm.activeCrop')}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', background: '#FBBF24', borderRadius: '3px' }}></span>
            🌾 {t('farm.harvestReady')}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', background: '#D97706', borderRadius: '3px' }}></span>
            🟫 {t('farm.emptySoil')}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', background: '#EF4444', borderRadius: '3px' }}></span>
            ⚠️ {t('farm.atRisk')}
          </span>
        </div>
      </div>

      {/* Side Drawer Popup */}
      {drawerFarm && (
        <IsometricPlotDrawer 
          farm={drawerFarm}
          onClose={() => setDrawerFarm(null)}
          onOpenSoilModal={onOpenSoilModal}
          onSelectFarm={onSelectFarm}
        />
      )}
    </div>
  );
}
