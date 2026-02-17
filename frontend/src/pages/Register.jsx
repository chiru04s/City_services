import React from 'react'; 
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', role: 'user' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', form);
      login(data);
      toast.success(`Welcome to CityServe, ${data.name}! 🎉`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f5f0 0%, #e8eaf0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 480 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '2.5rem' }}>🏙️</span>
            <h1 style={{ fontFamily: 'Playfair Display,serif', color: '#1a3c5e', fontSize: '1.8rem', marginTop: 8 }}>CityServe</h1>
          </Link>
          <p style={{ color: '#7a7a9a', marginTop: 6 }}>Create your account</p>
        </div>
        <div className="card" style={{ padding: 36 }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-control" required placeholder="John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-control" type="email" required placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input className="form-control" placeholder="10-digit mobile number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="form-group">
              {/* <label className="form-label">I am registering as</label> */}
              <select className="form-control" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                <option value="user">Customer (I need services)</option>
                {/* <option value="provider">Service Provider (I offer services)</option> */}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-control" type="password" required placeholder="Min. 6 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem', marginTop: 8 }} disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          <div style={{ textAlign: 'center', marginTop: 24, color: '#7a7a9a', fontSize: '0.9rem' }}>
            Already have an account? <Link to="/login" style={{ color: '#1a3c5e', fontWeight: 600 }}>Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}