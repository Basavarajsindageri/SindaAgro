import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, RotateCw } from 'lucide-react';

const SPICE_TYPES = [
  { id: 'cardamom', name: 'Green Cardamom', color: '#10B981', accent: '#34D399', particleColor: '#A7F3D0', desc: 'Queen of Spices • Grade A Nizamabad Origin' },
  { id: 'pepper', name: 'Tellicherry Black Pepper', color: '#1E293B', accent: '#F59E0B', particleColor: '#FDE68A', desc: 'King of Spices • High Piperine Content' },
  { id: 'turmeric', name: 'Salem Turmeric (Curcumin 5%+)', color: '#F97316', accent: '#F59E0B', particleColor: '#FED7AA', desc: 'High Curcumin • Export Grade A' },
  { id: 'chilli', name: 'Guntur Red Chilli (S17)', color: '#E11D48', accent: '#FB7185', particleColor: '#FECDD3', desc: 'High SHU Pungency • Deep Red Color' },
  { id: 'cinnamon', name: 'Organic Cinnamon Bark', color: '#B45309', accent: '#F59E0B', particleColor: '#FEF3C7', desc: 'Sweet Aroma • Ceylon & Kerala Grade' }
];

export default function Spice3DVisualizer() {
  const canvasRef = useRef(null);
  const [selectedSpice, setSelectedSpice] = useState(SPICE_TYPES[0]);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let angle = 0;

    // Particle field
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * 400 - 200,
      y: Math.random() * 400 - 200,
      z: Math.random() * 400 - 200,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.02 + 0.005
    }));

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      mousePos.current.targetX = x * 0.4;
      mousePos.current.targetY = y * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      // Smooth lerp mouse tilt
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      const width = canvas.width = canvas.parentElement.offsetWidth || 500;
      const height = canvas.height = 420;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Radial background glow
      const bgGlow = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, 220);
      bgGlow.addColorStop(0, selectedSpice.color + '44');
      bgGlow.addColorStop(0.6, selectedSpice.color + '11');
      bgGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // Draw floating spice particles
      particles.forEach((p) => {
        p.z -= p.speed * 20;
        if (p.z < -200) p.z = 200;

        const scale = 200 / (200 + p.z);
        const px = centerX + (p.x + mousePos.current.x * 100) * scale;
        const py = centerY + (p.y + mousePos.current.y * 100) * scale;

        ctx.beginPath();
        ctx.arc(px, py, p.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = selectedSpice.particleColor;
        ctx.globalAlpha = Math.min(1, Math.max(0.2, scale * 0.6));
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Draw 3D Floating Spice Vessel & Orbiting Elements
      angle += 0.015;
      const tiltX = mousePos.current.y;
      const tiltY = mousePos.current.x + angle;

      ctx.save();
      ctx.translate(centerX, centerY);

      // Shadow pedestal
      ctx.beginPath();
      ctx.ellipse(0, 110, 110, 24, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.fill();

      // Outer Holographic Tech Ring
      ctx.beginPath();
      ctx.ellipse(0, 105, 130 + Math.sin(angle) * 8, 32, tiltX, 0, Math.PI * 2);
      ctx.strokeStyle = selectedSpice.accent;
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 12]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 3D Spice Vessel Body (Layered Polyhedron / Bowl)
      const segments = 8;
      const radius = 90;

      for (let i = 0; i < segments; i++) {
        const segAngle = (i / segments) * Math.PI * 2 + tiltY;
        const nextAngle = ((i + 1) / segments) * Math.PI * 2 + tiltY;

        const x1 = Math.cos(segAngle) * radius;
        const z1 = Math.sin(segAngle) * radius;
        const x2 = Math.cos(nextAngle) * radius;
        const z2 = Math.sin(nextAngle) * radius;

        // Front vs Back face shading
        if (z1 + z2 > -40) {
          ctx.beginPath();
          ctx.moveTo(x1, 0 + tiltX * 20);
          ctx.lineTo(x2, 0 + tiltX * 20);
          ctx.lineTo(x2 * 0.6, 75 + tiltX * 20);
          ctx.lineTo(x1 * 0.6, 75 + tiltX * 20);
          ctx.closePath();

          const brightness = Math.max(0.2, (z1 + z2 + 200) / 400);
          ctx.fillStyle = selectedSpice.color;
          ctx.fill();

          ctx.strokeStyle = selectedSpice.accent;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      // Top Organic Spice Heap / Mounded Powder with Specular Highlight
      ctx.beginPath();
      ctx.ellipse(0, -10 + tiltX * 20, 80, 45, 0, 0, Math.PI * 2);
      const topGrad = ctx.createRadialGradient(-15, -20, 5, 0, -10, 80);
      topGrad.addColorStop(0, '#FFFFFF');
      topGrad.addColorStop(0.3, selectedSpice.accent);
      topGrad.addColorStop(1, selectedSpice.color);
      ctx.fillStyle = topGrad;
      ctx.fill();

      // Floating Accent Gem/Icon above vessel
      const floatY = -120 + Math.sin(angle * 2) * 12;
      ctx.beginPath();
      ctx.arc(0, floatY, 14, 0, Math.PI * 2);
      ctx.fillStyle = selectedSpice.accent;
      ctx.shadowColor = selectedSpice.accent;
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [selectedSpice]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '420px', cursor: 'grab' }} />

      {/* Spice Selector Pills */}
      <div style={{
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '-20px',
        zIndex: 10
      }}>
        {SPICE_TYPES.map((spice) => {
          const isActive = selectedSpice.id === spice.id;
          return (
            <button
              key={spice.id}
              onClick={() => setSelectedSpice(spice)}
              style={{
                background: isActive ? spice.color : 'rgba(15, 23, 42, 0.8)',
                border: `1.5px solid ${isActive ? spice.accent : 'rgba(255, 255, 255, 0.15)'}`,
                color: '#FFFFFF',
                padding: '8px 16px',
                borderRadius: '999px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                boxShadow: isActive ? `0 0 16px ${spice.accent}` : 'none',
                transition: 'all 0.25s ease'
              }}
            >
              {spice.name}
            </button>
          );
        })}
      </div>

      <div style={{
        fontSize: '0.85rem',
        color: '#94A3B8',
        fontWeight: 600,
        marginTop: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <RotateCw size={14} color={selectedSpice.accent} />
        <span>{selectedSpice.desc} (Interactive 3D View - Move Mouse to Tilt)</span>
      </div>
    </div>
  );
}
