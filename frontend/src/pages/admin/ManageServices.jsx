import React from 'react'; 
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { FiHome, FiGrid, FiCalendar, FiUsers, FiTag, FiTrash2, FiEdit } from 'react-icons/fi';

const Sidebar = () => {
  const links = [
    { to: '/admin', icon: <FiHome />, label: 'Dashboard' },
    { to: '/admin/services', icon: <FiGrid />, label: 'Services' },
    { to: '/admin/bookings', icon: <FiCalendar />, label: 'Bookings' },
    { to: '/admin/users', icon: <FiUsers />, label: 'Users' },
    { to: '/admin/categories', icon: <FiTag />, label: 'Categories' },
  ];
  return (
    <div className="admin-sidebar">
      <div className="sidebar-logo"><h2>🏙️ CityServe</h2><p>Admin Panel</p></div>
      {links.map(l => <Link key={l.to} to={l.to} className="sidebar-link">{l.icon} {l.label}</Link>)}
    </div>
  );
};

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', price: '', priceType: 'fixed', duration: '', category: '', location: 'All Areas' });

  useEffect(() => {
    api.get('/services').then(r => setServices(r.data));
    api.get('/categories').then(r => setCategories(r.data));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/services', form);
      setServices([data, ...services]);
      setShowForm(false);
      setForm({ name: '', description: '', price: '', priceType: 'fixed', duration: '', category: '', location: 'All Areas' });
      toast.success('Service created!');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to create'); }
  };

  const deleteService = async (id) => {
    if (!confirm('Delete this service?')) return;
    try {
      await api.delete(`/services/${id}`);
      setServices(services.filter(s => s._id !== id));
      toast.success('Service deleted');
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.9rem', color: '#1a3c5e' }}>Manage Services</h1>
            <p style={{ color: '#7a7a9a' }}>{services.length} total services</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">+ Add Service</button>
        </div>

        {showForm && (
          <div className="card" style={{ padding: 28, marginBottom: 28 }}>
            <h3 style={{ fontFamily: 'Playfair Display,serif', color: '#1a3c5e', marginBottom: 20 }}>Add New Service</h3>
            <form onSubmit={handleCreate}>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Service Name</label>
                  <input className="form-control" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-control" required value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    <option value="">Select category</option>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.icon} {c.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Price (₹)</label>
                  <input className="form-control" type="number" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Price Type</label>
                  <select className="form-control" value={form.priceType} onChange={e => setForm({ ...form, priceType: e.target.value })}>
                    <option value="fixed">Fixed</option>
                    <option value="hourly">Hourly</option>
                    <option value="starting">Starting From</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <input className="form-control" placeholder="e.g. 1-2 hours" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input className="form-control" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-control" rows={3} required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button type="submit" className="btn btn-primary">Create Service</button>
                <button type="button" onClick={() => setShowForm(false)} className="btn btn-outline">Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f8f5f0' }}>
              <tr>
                {['Service', 'Category', 'Provider', 'Price', 'Rating', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.82rem', fontWeight: 700, color: '#4a4a6a', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {services.map(s => (
                <tr key={s._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#1a3c5e', fontSize: '0.9rem' }}>{s.name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#7a7a9a' }}>{s.duration}</div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '0.88rem' }}>{s.category?.icon} {s.category?.name}</td>
                  <td style={{ padding: '14px 16px', fontSize: '0.88rem', color: '#4a4a6a' }}>{s.provider?.name}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#1a3c5e' }}>₹{s.price}</td>
                  <td style={{ padding: '14px 16px', color: '#e8a020' }}>★ {s.rating} ({s.numReviews})</td>
                  <td style={{ padding: '14px 16px' }}>
                    <button onClick={() => deleteService(s._id)} className="btn btn-danger btn-sm"><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}