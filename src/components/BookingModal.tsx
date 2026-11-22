import { useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../lib/api';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  defaultTour?: {
    slug: string;
    title: string;
    location: string;
    activityType: string;
    pricePerDay: number;
    travelDate?: string;
  };
}

export function BookingModal({ open, onClose, defaultTour }: BookingModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [travelDate, setTravelDate] = useState(defaultTour?.travelDate || '5 Sep 2025');
  const [travelers, setTravelers] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);

  if (!open) return null;

  const tour = defaultTour || {
    slug: 'bali-indonesia',
    title: 'Bali, Indonesia',
    location: 'Bali, Indonesia',
    activityType: 'Adventure',
    pricePerDay: 59,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.createBooking({
        tourSlug: tour.slug,
        tourTitle: tour.title,
        location: tour.location,
        activityType: tour.activityType,
        travelDate,
        travelers,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        specialRequests,
        pricePerDay: tour.pricePerDay,
      });
      setConfirmedRef(res.booking.bookingRef);
      toast.success(`Tour booked! Reference: ${res.booking.bookingRef}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Unable to complete booking');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#094B53]/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-[#d7ebee] relative">
        <button
          type="button"
          onClick={() => {
            setConfirmedRef(null);
            onClose();
          }}
          className="absolute right-5 top-5 p-1.5 rounded-full hover:bg-[#eef7f8] text-[#094B53]"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedRef ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="w-14 h-14 text-[#84C400] mx-auto" />
            <h3 className="font-display text-2xl font-bold text-[#094B53]">Booking Confirmed!</h3>
            <p className="text-sm text-[#4a656a]">
              Your reservation for <span className="font-semibold text-[#094B53]">{tour.title}</span> is saved.
            </p>
            <div className="bg-[#eef7f8] border border-[#cde4e7] rounded-2xl p-4 inline-block px-8">
              <div className="text-xs uppercase tracking-wider text-[#5d7a7f]">Booking Reference</div>
              <div className="font-display text-xl font-extrabold text-[#094B53] mt-1">{confirmedRef}</div>
            </div>
            <div>
              <button
                type="button"
                onClick={() => {
                  setConfirmedRef(null);
                  onClose();
                }}
                className="bg-[#84C400] hover:bg-[#73ac00] text-white font-semibold px-8 py-3 rounded-full text-sm cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="font-display text-xl font-bold text-[#094B53]">
              Book <span className="text-[#F5A623]">{tour.title}</span>
            </h3>
            <p className="text-xs text-[#5d7a7f] mt-1">
              {tour.location} • {tour.activityType} • ${tour.pricePerDay} Per day
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="rounded-xl border border-[#d7ebee] px-4 py-2.5 text-sm focus:outline-none focus:border-[#094B53]"
                />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="rounded-xl border border-[#d7ebee] px-4 py-2.5 text-sm focus:outline-none focus:border-[#094B53]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="rounded-xl border border-[#d7ebee] px-4 py-2.5 text-sm focus:outline-none focus:border-[#094B53]"
                />
                <input
                  type="text"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  placeholder="Travel Date"
                  className="rounded-xl border border-[#d7ebee] px-4 py-2.5 text-sm focus:outline-none focus:border-[#094B53]"
                />
                <div className="flex items-center justify-between rounded-xl border border-[#d7ebee] px-3 py-2 text-sm">
                  <span className="text-xs text-[#5d7a7f]">Travelers</span>
                  <div className="flex items-center gap-2 font-bold text-[#094B53]">
                    <button
                      type="button"
                      onClick={() => setTravelers((v) => Math.max(1, v - 1))}
                      className="w-6 h-6 rounded-full bg-[#eef7f8]"
                    >
                      -
                    </button>
                    <span>{travelers}</span>
                    <button
                      type="button"
                      onClick={() => setTravelers((v) => v + 1)}
                      className="w-6 h-6 rounded-full bg-[#eef7f8]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <textarea
                rows={3}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Special requests or hotel preferences (optional)"
                className="w-full rounded-xl border border-[#d7ebee] px-4 py-2.5 text-sm focus:outline-none focus:border-[#094B53]"
              />

              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-xs text-[#5d7a7f]">Estimated Total</span>
                  <div className="font-display font-bold text-xl text-[#094B53]">
                    ${tour.pricePerDay * travelers}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#84C400] hover:bg-[#73ac00] text-white font-semibold px-7 py-3 rounded-full text-sm transition-colors cursor-pointer"
                >
                  {submitting ? 'Confirming...' : 'Confirm Reservation'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
