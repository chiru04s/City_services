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

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => { api.get('/admin/users').then(r => setUsers(r.data)); }, []);

  const updateRole = async (id, role) => {
    try {
      await api.put(`/admin/users/${id}/role`, { role });
      setUsers(users.map(u => u._id === id ? { ...u, role } : u));
      toast.success('Role updated!');
    } catch { toast.error('Update failed'); }
  };

  const toggleStatus = async (id) => {
    try {
      await api.put(`/admin/users/${id}/toggle`);
      setUsers(users.map(u => u._id === id ? { ...u, isActive: !u.isActive } : u));
      toast.success('Status toggled!');
    } catch { toast.error('Failed'); }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.9rem', color: '#1a3c5e', marginBottom: 8 }}>Manage Users</h1>
        <p style={{ color: '#7a7a9a', marginBottom: 24 }}>{users.length} total users</p>

        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f8f5f0' }}>
              <tr>
                {['User', 'Phone', 'Role', 'Status', 'Joined', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.82rem', fontWeight: 700, color: '#4a4a6a', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#1a3c5e', fontSize: '0.9rem' }}>{u.name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#7a7a9a' }}>{u.email}</div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '0.88rem', color: '#4a4a6a' }}>{u.phone || 'N/A'}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <select value={u.role} onChange={e => updateRole(u._id, e.target.value)} className="form-control" style={{ fontSize: '0.82rem', padding: '6px 10px' }}>
                      <option value="user">User</option>
                      {/* <option value="provider">Provider</option> */}
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span className={`badge ${u.isActive ? 'badge-completed' : 'badge-cancelled'}`}>{u.isActive ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '0.85rem', color: '#7a7a9a' }}>{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <button onClick={() => toggleStatus(u._id)} className={`btn btn-sm ${u.isActive ? 'btn-danger' : 'btn-primary'}`}>
                      {u.isActive ? 'Deactivate' : 'Activate'}
                    </button>
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