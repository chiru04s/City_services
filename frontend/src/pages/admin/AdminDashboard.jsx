import React from 'react'; 
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FiUsers, FiGrid, FiCalendar, FiDollarSign, FiHome, FiList, FiTag, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#1a3c5e', '#e8a020', '#22c55e', '#ef4444', '#7c3aed'];

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const links = [
    { to: '/admin', icon: <FiHome />, label: 'Dashboard' },
    { to: '/admin/services', icon: <FiGrid />, label: 'Services' },
    { to: '/admin/bookings', icon: <FiCalendar />, label: 'Bookings' },
    { to: '/admin/users', icon: <FiUsers />, label: 'Users' },
    { to: '/admin/categories', icon: <FiTag />, label: 'Categories' },
  ];
  return (
    <div className="admin-sidebar">
      <div className="sidebar-logo">
        <h2>🏙️ CityServe</h2>
        <p>Admin Control Panel</p>
      </div>
      {links.map(l => (
        <Link key={l.to} to={l.to} className={`sidebar-link ${location.pathname === l.to ? 'active' : ''}`}>
          {l.icon} {l.label}
        </Link>
      ))}
      <div style={{ marginTop: 'auto', padding: '24px 0 0' }}>
        <button className="sidebar-link" style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', color: 'rgba(255,255,255,0.65)' }} onClick={() => { logout(); navigate('/'); }}>
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => { api.get('/admin/dashboard').then(r => setData(r.data)); }, []);

  if (!data) return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content"><div className="loading">Loading dashboard...</div></div>
    </div>
  );

  const statusData = data.bookingsByStatus.map(s => ({ name: s._id, value: s.count }));

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.9rem', color: '#1a3c5e' }}>Dashboard</h1>
          <p style={{ color: '#7a7a9a' }}>Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats */}
        <div className="grid-4" style={{ marginBottom: 32 }}>
          {[
            { icon: '👥', label: 'Total Users', value: data.stats.totalUsers, bg: '#dbeafe', color: '#2563eb' },
            { icon: '🔧', label: 'Total Services', value: data.stats.totalServices, bg: '#dcfce7', color: '#16a34a' },
            { icon: '📋', label: 'Total Bookings', value: data.stats.totalBookings, bg: '#fef3c7', color: '#d97706' },
            { icon: '💰', label: 'Revenue (₹)', value: `₹${data.stats.revenue?.toLocaleString()}`, bg: '#f3e8ff', color: '#7c3aed' },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-icon" style={{ background: s.bg, fontSize: '1.6rem' }}>{s.icon}</div>
              <div className="stat-info">
                <h3 style={{ color: s.color }}>{s.value}</h3>
                <p>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
          {/* Pie Chart */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <h3 style={{ fontFamily: 'Playfair Display,serif', color: '#1a3c5e', marginBottom: 20 }}>Bookings by Status</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {statusData.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Bookings */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <h3 style={{ fontFamily: 'Playfair Display,serif', color: '#1a3c5e', marginBottom: 20 }}>Recent Bookings</h3>
            {data.recentBookings.map(b => (
              <div key={b._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#1a3c5e', fontSize: '0.9rem' }}>{b.user?.name}</div>
                  <div style={{ fontSize: '0.78rem', color: '#7a7a9a' }}>{b.service?.name}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className={`badge badge-${b.status}`}>{b.status}</span>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a3c5e', marginTop: 4 }}>₹{b.service?.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontFamily: 'Playfair Display,serif', color: '#1a3c5e', marginBottom: 20 }}>Quick Actions</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/admin/services" className="btn btn-primary btn-sm">+ Add Service</Link>
            <Link to="/admin/categories" className="btn btn-accent btn-sm">+ Add Category</Link>
            <Link to="/admin/bookings" className="btn btn-outline btn-sm">View All Bookings</Link>
            <Link to="/admin/users" className="btn btn-outline btn-sm">Manage Users</Link>
          </div>
        </div>
      </div>
    </div>
  );
}