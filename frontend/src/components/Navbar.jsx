import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiLogOut, FiCalendar, FiMapPin, FiHome } from 'react-icons/fi';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => { logout(); navigate('/'); };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      background: '#fff',
      borderBottom: '2px solid #e0ddd8',
      position: 'sticky', top: 0, zIndex: 200,
      boxShadow: '0 2px 12px rgba(0,0,0,.06)'
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '14px 24px'
      }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '1.8rem' }}>🏙️</span>
          <div>
            <span style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.5rem', fontWeight: 700, color: '#1a3c5e' }}>CityServe</span>
            <span style={{ display: 'block', fontSize: '.65rem', color: '#e8a020', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>Home Services</span>
          </div>
        </Link>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>

          <Link to="/" style={{
            color: isActive('/') ? '#1a3c5e' : '#4a4a6a',
            textDecoration: 'none', fontWeight: isActive('/') ? 700 : 500,
            padding: '8px 14px', borderRadius: 8,
            background: isActive('/') ? '#eef2ff' : 'transparent',
            display: 'flex', alignItems: 'center', gap: 5, fontSize: '.95rem'
          }}>
            <FiHome /> Home
          </Link>

          <Link to="/services" style={{
            color: isActive('/services') ? '#1a3c5e' : '#4a4a6a',
            textDecoration: 'none', fontWeight: isActive('/services') ? 700 : 500,
            padding: '8px 14px', borderRadius: 8,
            background: isActive('/services') ? '#eef2ff' : 'transparent',
            fontSize: '.95rem'
          }}>
            Services
          </Link>

                  <Link to="/near-me" style={{
          display: 'flex', alignItems: 'center', gap: 5,
          textDecoration: 'none', fontWeight: 600,
          background: isActive('/near-me') ? '#1a3c5e' : '#eef2ff',
          color: isActive('/near-me') ? '#fff' : '#1a3c5e',
          padding: '8px 14px', borderRadius: 20, fontSize: '.88rem'
        }}>
          <FiMapPin /> Near Me
        </Link>
          {user ? (
            <>
              <Link to="/my-bookings" style={{
                color: isActive('/my-bookings') ? '#1a3c5e' : '#4a4a6a',
                textDecoration: 'none', fontWeight: 500,
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '8px 14px', borderRadius: 8, fontSize: '.95rem'
              }}>
                <FiCalendar /> Bookings
              </Link>

              {user.role === 'admin' && (
                <Link to="/admin" style={{
                  color: '#e8a020', textDecoration: 'none', fontWeight: 700,
                  padding: '8px 14px', borderRadius: 8, fontSize: '.9rem',
                  background: '#fef3c7'
                }}>
                  ⚙️ Admin
                </Link>
              )}

              <Link to="/profile" style={{
                display: 'flex', alignItems: 'center', gap: 6,
                textDecoration: 'none',
                background: '#f0f4ff', borderRadius: 20,
                padding: '8px 16px', fontSize: '.88rem', fontWeight: 600, color: '#1a3c5e'
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: '#1a3c5e', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '.85rem', fontWeight: 700
                }}>
                  {user.name?.[0]?.toUpperCase()}
                </div>
                {user.name.split(' ')[0]}
              </Link>

              <button onClick={handleLogout} className="btn btn-outline btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}