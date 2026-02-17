import React from 'react'; 
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { FiSearch, FiStar, FiCheckCircle, FiShield, FiClock } from 'react-icons/fi';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/categories').then(r => setCategories(r.data));
    api.get('/services/featured').then(r => setFeatured(r.data));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/services?search=${search}`);
  };

  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1a3c5e 0%, #2563a0 100%)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(232,160,32,0.15)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(232,160,32,0.2)', border: '1px solid rgba(232,160,32,0.4)', borderRadius: 20, padding: '6px 20px', marginBottom: 24 }}>
            <span style={{ color: '#f5c842', fontSize: '0.85rem', fontWeight: 600 }}>⭐ Trusted by 50,000+ Families</span>
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3.5rem', color: '#fff', marginBottom: 16, lineHeight: 1.2 }}>
            Expert Home Services,<br /><span style={{ color: '#f5c842' }}>Right at Your Doorstep</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', marginBottom: 40, maxWidth: 560, margin: '0 auto 40px' }}>
            Book verified, background-checked professionals for all your home service needs. Quality guaranteed.
          </p>
          <form onSubmit={handleSearch} style={{ maxWidth: 600, margin: '0 auto', display: 'flex', background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}>
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search for plumber, electrician, cleaner..."
              style={{ flex: 1, padding: '18px 24px', border: 'none', fontSize: '1rem', outline: 'none', fontFamily: 'Inter, sans-serif' }}
            />
            <button type="submit" className="btn btn-accent" style={{ borderRadius: 0, padding: '18px 28px', fontSize: '1rem' }}>
              <FiSearch /> Search
            </button>
          </form>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 40, flexWrap: 'wrap' }}>
            {[['50K+', 'Happy Customers'], ['500+', 'Service Providers'], ['20+', 'Service Categories'], ['4.8★', 'Average Rating']].map(([v, l]) => (
              <div key={l} style={{ color: '#fff', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#f5c842' }}>{v}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '72px 0', background: '#f8f5f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="page-title" style={{ textAlign: 'center' }}>Our Services</h2>
            <p style={{ color: '#7a7a9a' }}>Choose from a wide range of professional home services</p>
          </div>
          <div className="grid-4">
            {categories.map(cat => (
              <Link key={cat._id} to={`/services?category=${cat._id}`} className="card" style={{ padding: 28, textAlign: 'center', textDecoration: 'none', cursor: 'pointer' }}>
                <div style={{ fontSize: '2.8rem', marginBottom: 14 }}>{cat.icon}</div>
                <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 600, color: '#1a3c5e', marginBottom: 8 }}>{cat.name}</h3>
                <p style={{ color: '#7a7a9a', fontSize: '0.82rem' }}>{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section style={{ padding: '72px 0', background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
            <div>
              <h2 className="page-title">Top Rated Services</h2>
              <p style={{ color: '#7a7a9a' }}>Our most loved services by customers</p>
            </div>
            <Link to="/services" className="btn btn-outline">View All</Link>
          </div>
          <div className="grid-4">
            {featured.map(svc => (
              <Link key={svc._id} to={`/services/${svc._id}`} className="card" style={{ textDecoration: 'none' }}>
                <div style={{ height: 160, background: 'linear-gradient(135deg, #1a3c5e, #2563a0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem' }}>
                  {svc.category?.icon || '🔧'}
                </div>
                <div style={{ padding: 18 }}>
                  <span style={{ fontSize: '0.75rem', background: '#eef2ff', color: '#2563a0', padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>{svc.category?.name}</span>
                  <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 600, color: '#1a3c5e', margin: '10px 0 6px' }}>{svc.name}</h3>
                  <p style={{ color: '#7a7a9a', fontSize: '0.82rem', marginBottom: 12, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{svc.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span className="stars">{'★'.repeat(Math.round(svc.rating))}</span>
                      <span style={{ fontSize: '0.8rem', color: '#7a7a9a' }}>({svc.numReviews})</span>
                    </div>
                    <span style={{ fontWeight: 700, color: '#1a3c5e' }}>₹{svc.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section style={{ padding: '72px 0', background: '#1a3c5e' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#fff', textAlign: 'center', marginBottom: 48 }}>Why Choose CityServe?</h2>
          <div className="grid-3">
            {[
              { icon: <FiShield size={28} />, title: 'Verified Professionals', desc: 'All providers are background-checked, trained, and certified for quality service.' },
              { icon: <FiStar size={28} />, title: 'Quality Guaranteed', desc: 'Not happy? We will re-do the service or give you a full refund. No questions asked.' },
              { icon: <FiClock size={28} />, title: 'On-Time Service', desc: 'Our professionals arrive on time, every time. Punctuality is our promise to you.' },
            ].map(item => (
              <div key={item.title} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 16, padding: 32, textAlign: 'center', border: '1px solid rgba(255,255,255,0.12)' }}>
                <div style={{ color: '#f5c842', marginBottom: 16, display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: '1.2rem', marginBottom: 12 }}>{item.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}