import React from 'react'; 
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Profile() {
  const { user, login } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '', address: user?.address || '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.put('/auth/profile', form);
      login({ ...data });
      toast.success('Profile updated!');
    } catch (err) { toast.error(err.response?.data?.message || 'Update failed'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: 640 }}>
        <h1 className="page-title">My Profile</h1>
        <p className="page-subtitle">Manage your personal information</p>

        <div className="card" style={{ padding: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid #e0ddd8' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #1a3c5e, #2563a0)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.8rem' }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <h3 style={{ fontFamily: 'Inter,sans-serif', fontSize: '1.2rem', fontWeight: 700, color: '#1a3c5e' }}>{user?.name}</h3>
              <p style={{ color: '#7a7a9a', fontSize: '0.88rem' }}>{user?.email}</p>
              <span style={{ background: '#dbeafe', color: '#2563eb', padding: '2px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, textTransform: 'capitalize' }}>{user?.role}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label"><FiUser style={{ marginRight: 6 }} />Full Name</label>
                <input className="form-control" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label"><FiMail style={{ marginRight: 6 }} />Email</label>
                <input className="form-control" disabled value={user?.email} style={{ background: '#f5f5f5', color: '#999' }} />
              </div>
              <div className="form-group">
                <label className="form-label"><FiPhone style={{ marginRight: 6 }} />Phone Number</label>
                <input className="form-control" placeholder="10-digit number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input className="form-control" type="password" placeholder="Leave blank to keep same" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label"><FiMapPin style={{ marginRight: 6 }} />Default Address</label>
              <textarea className="form-control" rows={3} placeholder="Your home address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}