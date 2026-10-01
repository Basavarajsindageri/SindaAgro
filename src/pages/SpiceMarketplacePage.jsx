import React, { useState } from 'react';
import { ShoppingBag, ShieldCheck, Filter, Award, Send, Check, ChevronRight } from 'lucide-react';

const SPICE_PRODUCTS = [
  {
    id: 1,
    name: 'Tellicherry Black Pepper (TGSEB)',
    origin: 'Wayanad, Kerala, India',
    grade: 'Grade TGSEB (Tellicherry Garbled Special Extra Bold)',
    moq: '500 kg',
    price: '$6,800 - $7,200 / MT',
    availability: 'In Stock (Ready for Export)',
    supplier: 'Malabar Spices Exporters (ISO 22000 & Spices Board Certified)',
    rating: '4.9 ⭐ (84 Reviews)',
    curcuminOrPiperine: 'Piperine: 5.8% (High Aroma)',
    image: '🌶️⬛'
  },
  {
    id: 2,
    name: 'Alleppey Green Cardamom (8mm Bold)',
    origin: 'Idukki, Kerala, India',
    grade: '8mm+ Extra Bold (Natural Green)',
    moq: '100 kg',
    price: '$28,000 - $31,000 / MT',
    availability: 'In Stock (Air Cargo & Sea Freight)',
    supplier: 'Cardamom Hills Organic Cooperative',
    rating: '5.0 ⭐ (112 Reviews)',
    curcuminOrPiperine: 'Volatile Oil: 8.5% v/w',
    image: '💚🌱'
  },
  {
    id: 3,
    name: 'Salem Finger Turmeric (Curcumin 5.2%+)',
    origin: 'Salem, Tamil Nadu, India',
    grade: 'Double Polished Finger (Export Grade A)',
    moq: '1,000 kg (1 MT)',
    price: '$1,850 - $2,100 / MT',
    availability: 'In Stock (20ft & 40ft Containers)',
    supplier: 'Deccan Agriculture Exporters',
    rating: '4.8 ⭐ (67 Reviews)',
    curcuminOrPiperine: 'Curcumin: 5.2% Lab Tested',
    image: '🟡✨'
  },
  {
    id: 4,
    name: 'Guntur S17 Teja Red Chilli (Stemless)',
    origin: 'Guntur, Andhra Pradesh, India',
    grade: 'S17 Stemless (High Heat Pungency)',
    moq: '2,000 kg (2 MT)',
    price: '$2,450 - $2,700 / MT',
    availability: 'In Stock (Cold Storage Stored)',
    supplier: 'Andhra Spice Global Traders',
    rating: '4.9 ⭐ (93 Reviews)',
    curcuminOrPiperine: 'Capsaicin: 0.85% (75,000 SHU)',
    image: '🌶️🔥'
  },
  {
    id: 5,
    name: 'Organic Ceylon Cinnamon Quills (C5 Special)',
    origin: 'Kannur, Kerala, India',
    grade: 'Grade C5 Special Alba Equivalent',
    moq: '250 kg',
    price: '$12,500 - $14,000 / MT',
    availability: 'In Stock',
    supplier: 'SpiceGarden Bio Organics',
    rating: '4.7 ⭐ (41 Reviews)',
    curcuminOrPiperine: 'Coumarin: < 0.004% (Ultra Safe)',
    image: '🪵🤎'
  },
  {
    id: 6,
    name: 'Nizamabad Cumin Seeds (99% Purity)',
    origin: 'Telangana, India',
    grade: 'Machine Cleaned 99% Pure',
    moq: '1,000 kg',
    price: '$3,200 - $3,500 / MT',
    availability: 'In Stock',
    supplier: 'Bharat Agro Global Exports',
    rating: '4.8 ⭐ (58 Reviews)',
    curcuminOrPiperine: 'Volatile Oil: 3.2%',
    image: '🌾🟤'
  }
];

export default function SpiceMarketplacePage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = SPICE_PRODUCTS.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.origin.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleRequestQuote = (e) => {
    e.preventDefault();
    setQuoteSuccess(true);
    setTimeout(() => {
      setQuoteSuccess(false);
      setSelectedProduct(null);
    }, 2000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ background: '#F97316', color: '#FFF', fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            INTERNATIONAL B2B SPICE MARKETPLACE
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFFFFF', marginTop: '4px' }}>
            Direct Sourcing from Indian Spice Estates
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>
            Verified Exporters, Spices Board Certified Quality, Global Container Logistics.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            placeholder="Search spice, origin, or grade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px 16px',
              borderRadius: '12px',
              border: '1px solid rgba(249, 115, 22, 0.3)',
              background: 'rgba(15, 23, 42, 0.8)',
              color: '#FFF',
              fontSize: '0.9rem',
              width: '260px'
            }}
          />
        </div>
      </div>

      {/* Grid of 3D Glassmorphism Spice Product Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="agri-card"
            style={{
              border: '1px solid rgba(249, 115, 22, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '2.2rem' }}>{p.image}</span>
                <span style={{ background: 'rgba(249, 115, 22, 0.15)', color: '#F97316', fontWeight: 800, fontSize: '0.75rem', padding: '4px 10px', borderRadius: '999px', border: '1px solid rgba(249, 115, 22, 0.3)' }}>
                  {p.rating}
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
                {p.name}
              </h3>

              <p style={{ color: '#F97316', fontSize: '0.85rem', fontWeight: 700, marginBottom: '12px' }}>
                📍 {p.origin}
              </p>

              <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '12px', borderRadius: '12px', fontSize: '0.85rem', color: '#94A3B8', marginBottom: '16px', lineHeight: 1.6 }}>
                <div><strong>Grade:</strong> {p.grade}</div>
                <div><strong>Active Component:</strong> {p.curcuminOrPiperine}</div>
                <div><strong>MOQ:</strong> {p.moq}</div>
                <div><strong>Supplier:</strong> {p.supplier}</div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#F59E0B' }}>{p.price}</span>
                <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700 }}>{p.availability}</span>
              </div>

              <button
                className="btn-primary"
                onClick={() => setSelectedProduct(p)}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Request B2B Quote</span>
                <Send size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RFQ Modal */}
      {selectedProduct && (
        <div className="modal-overlay">
          <div className="agri-card agri-card-ai animate-fade-in" style={{ maxWidth: '520px', width: '100%', padding: '32px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
              Request Quotation for {selectedProduct.name}
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#94A3B8', marginBottom: '20px' }}>
              Direct inquiry sent to verified supplier: <strong>{selectedProduct.supplier}</strong>
            </p>

            {quoteSuccess ? (
              <div style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10B981', color: '#10B981', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: 700 }}>
                <Check size={28} style={{ display: 'block', margin: '0 auto 8px' }} />
                RFQ Submitted Successfully! Supplier will respond within 4 hours.
              </div>
            ) : (
              <form onSubmit={handleRequestQuote} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>Your Business Name / Importer Name</label>
                  <input type="text" required placeholder="Global Trading LLC" className="agri-input" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>Required Quantity (MT)</label>
                    <input type="number" required placeholder="5" className="agri-input" />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>Destination Port</label>
                    <input type="text" required placeholder="Jebel Ali / Hamburg" className="agri-input" />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>Specifications / Quality Requirements</label>
                  <textarea rows="3" placeholder="Specify packaging (25kg bags / jumbo sacks), lab testing requirements..." className="agri-input" />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                  <button type="button" className="btn-secondary" onClick={() => setSelectedProduct(null)} style={{ flex: 1, justifyContent: 'center' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                    Submit Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
