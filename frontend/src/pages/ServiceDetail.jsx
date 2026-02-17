import React from 'react'; 
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FiClock, FiMapPin, FiStar, FiUser, FiCalendar, FiPhone } from 'react-icons/fi';

export default function ServiceDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [booking, setBooking] = useState({ bookingDate: '', timeSlot: '', address: '', phone: user?.phone || '', notes: '', paymentMethod: 'cash' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get(`/services/${id}`).then(r => setService(r.data));
    api.get(`/reviews/${id}`).then(r => setReviews(r.data));
  }, [id]);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setLoading(true);
    try {
      await api.post('/bookings', { serviceId: id, ...booking });
      toast.success('Booking confirmed! 🎉');
      navigate('/my-bookings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally { setLoading(false); }
  };

  if (!service) return <div className="loading">Loading...</div>;

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
          {/* Left: Service Info */}
          <div style={{ flex: 1 }}>
            <div style={{ height: 280, background: 'linear-gradient(135deg, #1a3c5e, #2563a0)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem', marginBottom: 24 }}>
              {service.category?.icon}
            </div>

            <div className="card" style={{ padding: 28, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <span style={{ background: '#eef2ff', color: '#2563a0', padding: '4px 12px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600 }}>{service.category?.name}</span>
                  <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: '2rem', color: '#1a3c5e', marginTop: 12, marginBottom: 8 }}>{service.name}</h1>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1a3c5e' }}>₹{service.price}</div>
                  <div style={{ fontSize: '0.8rem', color: '#7a7a9a' }}>{service.priceType}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 20, marginBottom: 20, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#e8a020', fontWeight: 600 }}>
                  <FiStar /> {service.rating} ({service.numReviews} reviews)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#7a7a9a' }}>
                  <FiClock /> {service.duration}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#7a7a9a' }}>
                  <FiMapPin /> {service.location}
                </div>
              </div>
              <p style={{ color: '#4a4a6a', lineHeight: 1.8 }}>{service.description}</p>

              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #e0ddd8', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#1a3c5e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><FiUser /></div>
                <div>
                  <div style={{ fontWeight: 600, color: '#1a3c5e' }}>{service.provider?.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#7a7a9a' }}>Service Provider</div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="card" style={{ padding: 28 }}>
              <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.3rem', color: '#1a3c5e', marginBottom: 20 }}>Customer Reviews</h3>
              {reviews.length === 0 ? <p style={{ color: '#7a7a9a' }}>No reviews yet. Be the first to review!</p> :
                reviews.map(r => (
                  <div key={r._id} style={{ borderBottom: '1px solid #e0ddd8', paddingBottom: 16, marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontWeight: 600, color: '#1a3c5e' }}>{r.user?.name}</span>
                      <span style={{ color: '#e8a020' }}>{'★'.repeat(r.rating)}</span>
                    </div>
                    <p style={{ color: '#4a4a6a', fontSize: '0.9rem' }}>{r.comment}</p>
                  </div>
                ))
              }
            </div>
          </div>

          {/* Right: Booking Form */}
          <div style={{ width: 360, flexShrink: 0, position: 'sticky', top: 90 }}>
            <div className="card" style={{ padding: 28 }}>
              <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.3rem', color: '#1a3c5e', marginBottom: 24 }}>Book This Service</h3>
              <form onSubmit={handleBook}>
                <div className="form-group">
                  <label className="form-label"><FiCalendar style={{ marginRight: 6 }} />Select Date</label>
                  <input type="date" className="form-control" required min={new Date().toISOString().split('T')[0]} value={booking.bookingDate} onChange={e => setBooking({ ...booking, bookingDate: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Time Slot</label>
                  <select className="form-control" required value={booking.timeSlot} onChange={e => setBooking({ ...booking, timeSlot: e.target.value })}>
                    <option value="">Select a time</option>
                    {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label"><FiPhone style={{ marginRight: 6 }} />Phone Number</label>
                  <input className="form-control" required placeholder="Your phone number" value={booking.phone} onChange={e => setBooking({ ...booking, phone: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label"><FiMapPin style={{ marginRight: 6 }} />Service Address</label>
                  <textarea className="form-control" rows={3} required placeholder="Full address with area & pincode" value={booking.address} onChange={e => setBooking({ ...booking, address: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Payment Method</label>
                  <select className="form-control" value={booking.paymentMethod} onChange={e => setBooking({ ...booking, paymentMethod: e.target.value })}>
                    <option value="cash">Cash on Service</option>
                    <option value="online">Online Payment</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Special Instructions</label>
                  <textarea className="form-control" rows={2} placeholder="Any special notes..." value={booking.notes} onChange={e => setBooking({ ...booking, notes: e.target.value })} />
                </div>
                <div style={{ background: '#f8f5f0', borderRadius: 10, padding: 16, marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ color: '#4a4a6a' }}>Service Charge</span>
                    <span style={{ fontWeight: 600 }}>₹{service.price}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px dashed #ccc', marginTop: 10 }}>
                    <span style={{ fontWeight: 700, color: '#1a3c5e' }}>Total Amount</span>
                    <span style={{ fontWeight: 800, color: '#1a3c5e', fontSize: '1.1rem' }}>₹{service.price}</span>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem' }} disabled={loading}>
                  {loading ? 'Booking...' : '✓ Confirm Booking'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}