import React from 'react'; 
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { FiHome, FiGrid, FiCalendar, FiUsers, FiTag, FiTrash2 } from 'react-icons/fi';

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

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', icon: '🔧', description: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { api.get('/categories').then(r => setCategories(r.data)); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/categories', form);
      setCategories([...categories, data]);
      setForm({ name: '', icon: '🔧', description: '' });
      setShowForm(false);
      toast.success('Category created!');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const deleteCategory = async (id) => {
    if (!confirm('Delete this category?')) return;
    try {
      await api.delete(`/categories/${id}`);
      setCategories(categories.filter(c => c._id !== id));
      toast.success('Category deleted');
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.9rem', color: '#1a3c5e' }}>Categories</h1>
            <p style={{ color: '#7a7a9a' }}>{categories.length} categories</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">+ Add Category</button>
        </div>

        {showForm && (
          <div className="card" style={{ padding: 28, marginBottom: 28 }}>
            <h3 style={{ fontFamily: 'Playfair Display,serif', color: '#1a3c5e', marginBottom: 20 }}>New Category</h3>
            <form onSubmit={handleCreate}>
              <div className="grid-3">
                <div className="form-group">
                  <label className="form-label">Category Name</label>
                  <input className="form-control" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Icon (Emoji)</label>
                  <input className="form-control" value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} placeholder="🔧" />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <input className="form-control" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button type="submit" className="btn btn-primary">Create</button>
                <button type="button" onClick={() => setShowForm(false)} className="btn btn-outline">Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="grid-4">
          {categories.map(c => (
            <div key={c._id} className="card" style={{ padding: 24, textAlign: 'center', position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{c.icon}</div>
              <h3 style={{ fontFamily: 'Inter,sans-serif', fontWeight: 600, color: '#1a3c5e', marginBottom: 6 }}>{c.name}</h3>
              <p style={{ color: '#7a7a9a', fontSize: '0.82rem', marginBottom: 16 }}>{c.description}</p>
              <button onClick={() => deleteCategory(c._id)} className="btn btn-danger btn-sm"><FiTrash2 /> Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}