 import React from 'react'; 
 import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import { FiFilter, FiSearch } from 'react-icons/fi';

export default function Services() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    sort: '',
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => { api.get('/categories').then(r => setCategories(r.data)); }, []);

  useEffect(() => {
    setLoading(true);
    const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v));
    api.get('/services', { params }).then(r => { setServices(r.data); setLoading(false); });
  }, [filters]);

  const handleFilter = (key, val) => setFilters(prev => ({ ...prev, [key]: val }));

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <h1 className="page-title">All Services</h1>
        <p className="page-subtitle">Find the perfect professional for any job</p>

        <div style={{ display: 'flex', gap: 24 }}>
          {/* Sidebar Filters */}
          <div style={{ width: 260, flexShrink: 0 }}>
            <div className="card" style={{ padding: 24, position: 'sticky', top: 80 }}>
              <h3 style={{ fontFamily: 'Inter,sans-serif', fontSize: '1rem', fontWeight: 700, marginBottom: 20, color: '#1a3c5e' }}><FiFilter style={{ marginRight: 8 }} />Filters</h3>

              <div className="form-group">
                <label className="form-label">Search</label>
                <div style={{ position: 'relative' }}>
                  <FiSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#7a7a9a' }} />
                  <input className="form-control" style={{ paddingLeft: 36 }} placeholder="Search service..." value={filters.search} onChange={e => handleFilter('search', e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-control" value={filters.category} onChange={e => handleFilter('category', e.target.value)}>
                  <option value="">All Categories</option>
                  {categories.map(c => <option key={c._id} value={c._id}>{c.icon} {c.name}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Sort By</label>
                <select className="form-control" value={filters.sort} onChange={e => handleFilter('sort', e.target.value)}>
                  <option value="">Latest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Price Range (₹)</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input className="form-control" placeholder="Min" type="number" value={filters.minPrice} onChange={e => handleFilter('minPrice', e.target.value)} />
                  <input className="form-control" placeholder="Max" type="number" value={filters.maxPrice} onChange={e => handleFilter('maxPrice', e.target.value)} />
                </div>
              </div>

              <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => setFilters({ search: '', category: '', sort: '', minPrice: '', maxPrice: '' })}>Clear Filters</button>
            </div>
          </div>

          {/* Services Grid */}
          <div style={{ flex: 1 }}>
            {loading ? <div className="loading">Loading services...</div> : (
              <>
                <p style={{ color: '#7a7a9a', marginBottom: 20 }}>{services.length} services found</p>
                <div className="grid-3">
                  {services.map(svc => (
                    <Link key={svc._id} to={`/services/${svc._id}`} className="card" style={{ textDecoration: 'none' }}>
                      <div style={{ height: 150, background: 'linear-gradient(135deg, #1a3c5e, #2563a0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                        {svc.category?.icon}
                      </div>
                      <div style={{ padding: 18 }}>
                        <span style={{ fontSize: '0.72rem', background: '#eef2ff', color: '#2563a0', padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>{svc.category?.name}</span>
                        <h3 style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.95rem', fontWeight: 600, color: '#1a3c5e', margin: '10px 0 6px' }}>{svc.name}</h3>
                        <p style={{ color: '#7a7a9a', fontSize: '0.8rem', marginBottom: 14 }}>By {svc.provider?.name}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#e8a020' }}>{'★'.repeat(Math.round(svc.rating))} <span style={{ color: '#7a7a9a', fontSize: '0.78rem' }}>({svc.numReviews})</span></span>
                          <span style={{ fontWeight: 700, color: '#1a3c5e', fontSize: '1rem' }}>₹{svc.price}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                {services.length === 0 && <div style={{ textAlign: 'center', padding: 60, color: '#7a7a9a' }}><div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>No services found. Try different filters.</div>}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
 