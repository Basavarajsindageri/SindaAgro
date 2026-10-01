import React, { useState } from 'react';
import { Globe, Plane, ShieldCheck, TrendingUp, ArrowRight } from 'lucide-react';

const TRADE_ROUTES = [
  { id: 'usa', destination: 'United States (FDA Approved)', volume: '18,500 MT / Year', topCommodity: 'Green Cardamom & Salem Turmeric', status: 'ACTIVE ROUTE 🟢', coords: { x: 22, y: 38 } },
  { id: 'uae', destination: 'United Arab Emirates (Jebel Ali)', volume: '24,000 MT / Year', topCommodity: 'Guntur S17 Chilli & Cumin Seeds', status: 'ACTIVE ROUTE 🟢', coords: { x: 55, y: 44 } },
  { id: 'uk', destination: 'United Kingdom (London Gateway)', volume: '12,200 MT / Year', topCommodity: 'Tellicherry Black Pepper & Cloves', status: 'ACTIVE ROUTE 🟢', coords: { x: 44, y: 28 } },
  { id: 'germany', destination: 'Germany & EU Zone (Hamburg)', volume: '15,800 MT / Year', topCommodity: 'Organic Cinnamon & Star Anise', status: 'ACTIVE ROUTE 🟢', coords: { x: 48, y: 30 } },
  { id: 'japan', destination: 'Japan (Yokohama Port)', volume: '9,500 MT / Year', topCommodity: 'High Curcumin Turmeric Powder', status: 'ACTIVE ROUTE 🟢', coords: { x: 82, y: 38 } },
  { id: 'singapore', destination: 'Singapore & ASEAN Hub', volume: '14,100 MT / Year', topCommodity: 'Coriander & Mixed Spice Blends', status: 'ACTIVE ROUTE 🟢', coords: { x: 74, y: 58 } }
];

export default function GlobalTradeMap() {
  const [selectedRoute, setSelectedRoute] = useState(TRADE_ROUTES[0]);

  return (
    <div className="agri-card agri-card-ai" style={{ position: 'relative', overflow: 'hidden', padding: '32px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ background: '#F97316', color: '#FFF', fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              LIVE GLOBAL TRADE MATRIX
            </span>
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFFFFF' }}>
            India to the World: Direct Export Routes
          </h3>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>
            Real-time AI logistics tracking, customs clearance status, and container volume analytics.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '12px 20px', borderRadius: '14px', border: '1px solid rgba(249, 115, 22, 0.3)' }}>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>Annual Export Volume</span>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#F97316' }}>94,100+ Metric Tons</div>
          </div>
          <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '12px 20px', borderRadius: '14px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>Certified Exporters</span>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#F59E0B' }}>1,280+ Verified</div>
          </div>
        </div>
      </div>

      {/* SVG Map Canvas with Glowing Origin Hub (India) & Dynamic Vectors */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '340px',
        background: 'radial-gradient(ellipse at center, #0F172A 0%, #07070C 100%)',
        borderRadius: '20px',
        border: '1px solid rgba(249, 115, 22, 0.3)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>

        <svg viewBox="0 0 100 60" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 12px rgba(249, 115, 22, 0.2))' }}>
          {/* World map grid lines */}
          <path d="M0 20 H100 M0 40 H100 M20 0 V60 M40 0 V60 M60 0 V60 M80 0 V60" stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" strokeDasharray="1 1" />

          {/* India Origin Hub (Central Glowing Marker) */}
          <circle cx="62" cy="42" r="2.5" fill="#F97316" className="pulse-glow" />
          <circle cx="62" cy="42" r="5" fill="none" stroke="#F59E0B" strokeWidth="0.6">
            <animate attributeName="r" values="2.5;8;2.5" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x="62" y="47" fill="#F97316" fontSize="2.2" fontWeight="bold" textAnchor="middle">INDIA (ORIGIN)</text>

          {/* Animated Trade Vectors from India to Destinations */}
          {TRADE_ROUTES.map((route) => {
            const isSelected = selectedRoute.id === route.id;
            return (
              <g key={route.id} onClick={() => setSelectedRoute(route)} style={{ cursor: 'pointer' }}>
                {/* Curved Vector Arc */}
                <path
                  d={`M 62 42 Q ${(62 + route.coords.x) / 2} ${(42 + route.coords.y) / 2 - 12} ${route.coords.x} ${route.coords.y}`}
                  fill="none"
                  stroke={isSelected ? '#F97316' : 'rgba(249, 115, 22, 0.35)'}
                  strokeWidth={isSelected ? '0.9' : '0.4'}
                  strokeDasharray={isSelected ? 'none' : '1.5 1.5'}
                />

                {/* Destination Node */}
                <circle
                  cx={route.coords.x}
                  cy={route.coords.y}
                  r={isSelected ? '2.2' : '1.4'}
                  fill={isSelected ? '#E11D48' : '#F59E0B'}
                />

                {/* Destination Label */}
                <text
                  x={route.coords.x}
                  y={route.coords.y - 3}
                  fill={isSelected ? '#FFFFFF' : '#94A3B8'}
                  fontSize="1.8"
                  fontWeight={isSelected ? 'bold' : 'normal'}
                  textAnchor="middle"
                >
                  {route.id.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Trade Route Detail Card Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          right: '16px',
          background: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(12px)',
          border: '1px solid #F97316',
          borderRadius: '14px',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <span style={{ color: '#F97316', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase' }}>
              SELECTED TRADE ROUTE: INDIA ➔ {selectedRoute.destination}
            </span>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', margin: '2px 0' }}>
              Top Commodity: {selectedRoute.topCommodity}
            </h4>
            <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
              Annual Volume: {selectedRoute.volume} | Status: <strong style={{ color: '#10B981' }}>{selectedRoute.status}</strong>
            </span>
          </div>

          <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <span>Request Export Freight Quote</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
