import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const serviceLinks = [
    { label: 'Plumbing',   path: '/services?category=plumbing' },
    { label: 'Electrical', path: '/services?category=electrical' },
    { label: 'Cleaning',   path: '/services?category=cleaning' },
    { label: 'Carpentry',  path: '/services?category=carpentry' },
    { label: 'AC Repair',  path: '/services?category=ac-repair' },
    { label: 'Painting',   path: '/services?category=painting' },
  ];

  const companyLinks = [
    { label: 'About Us',          path: '/' },
    { label: 'How It Works',      path: '/' },
    { label: 'Become a Provider', path: '/register' },
    { label: 'Careers',           path: '/' },
    { label: 'Blog',              path: '/' },
  ];

  return (
    <footer style={{ background: '#1a3c5e', color: '#fff', padding: '56px 0 24px' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 32, marginBottom: 48
        }}>

          {/* Brand */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: '1.8rem' }}>🏙️</span>
              <span style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.4rem', color: '#f5c842', fontWeight: 700 }}>CityServe</span>
            </Link>
            <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '.9rem', lineHeight: 1.8 }}>
              Connecting citizens with trusted local service professionals across the city.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {['📘', '🐦', '📸', '▶️'].map((icon, i) => (
                <div key={i} style={{
                  width: 36, height: 36, background: 'rgba(255,255,255,.12)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', cursor: 'pointer', fontSize: '.9rem',
                  transition: 'background .2s'
                }}>{icon}</div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{
              fontSize: '.8rem', letterSpacing: 2, textTransform: 'uppercase',
              color: '#f5c842', marginBottom: 20, fontWeight: 700
            }}>Services</h4>
            {serviceLinks.map(link => (
              <Link key={link.label} to={link.path} style={{
                display: 'block', color: 'rgba(255,255,255,.65)',
                textDecoration: 'none', marginBottom: 10, fontSize: '.9rem',
                transition: 'color .2s'
              }}
              onMouseEnter={e => e.target.style.color = '#f5c842'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.65)'}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{
              fontSize: '.8rem', letterSpacing: 2, textTransform: 'uppercase',
              color: '#f5c842', marginBottom: 20, fontWeight: 700
            }}>Company</h4>
            {companyLinks.map(link => (
              <Link key={link.label} to={link.path} style={{
                display: 'block', color: 'rgba(255,255,255,.65)',
                textDecoration: 'none', marginBottom: 10, fontSize: '.9rem',
                transition: 'color .2s'
              }}
              onMouseEnter={e => e.target.style.color = '#f5c842'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.65)'}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontSize: '.8rem', letterSpacing: 2, textTransform: 'uppercase',
              color: '#f5c842', marginBottom: 20, fontWeight: 700
            }}>Contact</h4>
            {[
              { icon: '📞', text: '1800-123-4567', href: 'tel:18001234567' },
              { icon: '✉️', text: 'support@cityserve.in', href: 'mailto:support@cityserve.in' },
              { icon: '📍', text: 'Mumbai, Maharashtra', href: null },
            ].map(item => (
              <div key={item.text} style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span>{item.icon}</span>
                {item.href ? (
                  <a href={item.href} style={{ color: 'rgba(255,255,255,.65)', textDecoration: 'none', fontSize: '.9rem' }}>{item.text}</a>
                ) : (
                  <span style={{ color: 'rgba(255,255,255,.65)', fontSize: '.9rem' }}>{item.text}</span>
                )}
              </div>
            ))}

            {/* Quick links */}
            <div style={{ marginTop: 24 }}>
              <Link to="/near-me" className="btn btn-accent btn-sm" style={{ marginBottom: 8, width: '100%', justifyContent: 'center', textDecoration: 'none', display: 'flex' }}>
                📍 Find Near Me
              </Link>
              {/* <Link to="/register" style={{
                display: 'block', textAlign: 'center', color: '#f5c842',
                textDecoration: 'none', fontSize: '.85rem', fontWeight: 600, marginTop: 8
              }}>
                Become a Provider →
              </Link> */}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,.12)',
          paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12
        }}>
          <p style={{ color: 'rgba(255,255,255,.45)', fontSize: '.85rem' }}>
            © 2025 CityServe. All rights reserved. Built with ❤️ for your city.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Privacy Policy', '/'], ['Terms of Service', '/'], ['Cookie Policy', '/']].map(([label, path]) => (
              <Link key={label} to={path} style={{
                color: 'rgba(255,255,255,.45)', textDecoration: 'none', fontSize: '.82rem'
              }}>{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}