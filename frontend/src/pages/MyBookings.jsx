import React from 'react'; 
import { useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { FiCalendar, FiClock, FiMapPin } from 'react-icons/fi';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/bookings/my').then(r => { setBookings(r.data); setLoading(false); });
  }, []);

  const cancelBooking = async (id) => {
    try {
      await api.put(`/bookings/${id}/cancel`);
      setBookings(bookings.map(b => b._id === id ? { ...b, status: 'cancelled' } : b));
      toast.success('Booking cancelled');
    } catch { toast.error('Failed to cancel'); }
  };

  if (loading) return <div className="loading">Loading bookings...</div>;

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <h1 className="page-title">My Bookings</h1>
        <p className="page-subtitle">Track all your service bookings</p>

        {bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 80 }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>📋</div>
            <h3 style={{ color: '#1a3c5e', marginBottom: 8 }}>No Bookings Yet</h3>
            <p style={{ color: '#7a7a9a' }}>You haven't booked any service yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {bookings.map(b => (
              <div key={b._id} className="card" style={{ padding: 24, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ width: 72, height: 72, background: 'linear-gradient(135deg, #1a3c5e, #2563a0)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>🔧</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <h3 style={{ fontFamily: 'Inter,sans-serif', fontWeight: 600, color: '#1a3c5e', fontSize: '1.05rem' }}>{b.service?.name}</h3>
                    <span className={`badge badge-${b.status}`}>{b.status.replace('-', ' ').toUpperCase()}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 20, color: '#7a7a9a', fontSize: '0.85rem', flexWrap: 'wrap', marginBottom: 8 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiCalendar /> {new Date(b.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiClock /> {b.timeSlot}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiMapPin /> {b.address?.substring(0, 40)}...</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, color: '#1a3c5e', fontSize: '1.1rem' }}>₹{b.totalAmount}</span>
                    {b.status === 'pending' && (
                      <button className="btn btn-danger btn-sm" onClick={() => cancelBooking(b._id)}>Cancel Booking</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}