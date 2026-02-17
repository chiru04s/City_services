import React from 'react'; 
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { FiHome, FiGrid, FiCalendar, FiUsers, FiTag } from 'react-icons/fi';

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

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => { api.get('/bookings/all').then(r => setBookings(r.data)); }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/bookings/${id}/status`, { status });
      setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
      toast.success('Status updated!');
    } catch { toast.error('Update failed'); }
  };

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.9rem', color: '#1a3c5e', marginBottom: 8 }}>Manage Bookings</h1>
        <p style={{ color: '#7a7a9a', marginBottom: 24 }}>View and manage all service bookings</p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {['all', 'pending', 'confirmed', 'in-progress', 'completed', 'cancelled'].map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`btn btn-sm ${filter === s ? 'btn-primary' : 'btn-outline'}`} style={{ textTransform: 'capitalize' }}>{s}</button>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f8f5f0' }}>
              <tr>
                {['Customer', 'Service', 'Date & Time', 'Amount', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.82rem', fontWeight: 700, color: '#4a4a6a', textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#1a3c5e', fontSize: '0.9rem' }}>{b.user?.name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#7a7a9a' }}>{b.user?.email}</div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '0.9rem', color: '#4a4a6a' }}>{b.service?.name}</td>
                  <td style={{ padding: '14px 16px', fontSize: '0.85rem', color: '#4a4a6a' }}>
                    {new Date(b.bookingDate).toLocaleDateString('en-IN')}<br />
                    <span style={{ color: '#7a7a9a' }}>{b.timeSlot}</span>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#1a3c5e' }}>₹{b.totalAmount}</td>
                  <td style={{ padding: '14px 16px' }}><span className={`badge badge-${b.status}`}>{b.status}</span></td>
                  <td style={{ padding: '14px 16px' }}>
                    <select onChange={e => updateStatus(b._id, e.target.value)} value={b.status} className="form-control" style={{ fontSize: '0.82rem', padding: '6px 10px' }}>
                      {['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: '#7a7a9a' }}>No bookings found for this filter.</div>}
        </div>
      </div>
    </div>
  );
}