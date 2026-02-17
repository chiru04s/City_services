import React from 'react'; 
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      login(data);
      toast.success(`Welcome back, ${data.name}! 👋`);
      navigate(data.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f5f0 0%, #e8eaf0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '2.5rem' }}>🏙️</span>
            <h1 style={{ fontFamily: 'Playfair Display,serif', color: '#1a3c5e', fontSize: '1.8rem', marginTop: 8 }}>CityServe</h1>
          </Link>
          <p style={{ color: '#7a7a9a', marginTop: 6 }}>Sign in to your account</p>
        </div>
        <div className="card" style={{ padding: 36 }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-control" type="email" required placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-control" type="password" required placeholder="Enter password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem', marginTop: 8 }} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <div style={{ textAlign: 'center', marginTop: 24, color: '#7a7a9a', fontSize: '0.9rem' }}>
            Don't have an account? <Link to="/register" style={{ color: '#1a3c5e', fontWeight: 600 }}>Register here</Link>
          </div>
          <div style={{ marginTop: 20, padding: 14, background: '#f0f4ff', borderRadius: 8, fontSize: '0.82rem', color: '#4a4a6a' }}>
            <strong>Demo Credentials:</strong><br />
            Admin: admin@city.com / admin123<br />
            {/* Provider: ravi@city.com / ravi1234 */}
          </div>
        </div>
      </div>
    </div>
  );
}