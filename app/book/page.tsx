'use client';
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { Calendar, CreditCard } from 'lucide-react';

export default function BookPage() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const slots = [
    '10 Mar • 10:00', '11 Mar • 14:00', '12 Mar • 09:30',
    '13 Mar • 15:00', '14 Mar • 11:00', '15 Mar • 16:30'
  ];

  const handleBook = () => {
    if (!selectedSlot) return;
    setShowPayment(true);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="logo-font text-6xl font-bold mb-4">Book Your Lesson</h1>
        <p className="text-zinc-400 text-xl mb-12">45-minute private online violin lesson • $85 AUD</p>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Calendar */}
          <div className="lg:col-span-8 bg-zinc-900 rounded-3xl p-10">
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
              <Calendar className="text-amber-400" /> March 2026 Availability
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {slots.map(slot => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-6 rounded-3xl text-center font-medium transition-all ${
                    selectedSlot === slot
                      ? 'bg-amber-500 text-black shadow-xl scale-105'
                      : 'bg-zinc-800 hover:bg-zinc-700'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4 bg-zinc-900 rounded-3xl p-10 h-fit sticky top-24">
            <h3 className="font-semibold text-xl mb-6">Booking Summary</h3>
            
            {selectedSlot ? (
              <>
                <div className="text-3xl font-bold text-amber-400 mb-1">{selectedSlot}</div>
                <div className="text-zinc-400 mb-8">With Ms. Sophia Li • Zoom</div>

                <button
                  onClick={handleBook}
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold py-6 rounded-3xl text-xl flex items-center justify-center gap-3 hover:scale-105 transition"
                >
                  <CreditCard className="w-6 h-6" />
                  PAY $85 SECURELY
                </button>
                <p className="text-center text-[10px] text-zinc-500 mt-6">🔒 Stripe • SSL Encrypted</p>
              </>
            ) : (
              <p className="text-zinc-400">Select a time slot above</p>
            )}
          </div>
        </div>
      </div>

      {/* Fake Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-3xl w-full max-w-md p-10">
            <h2 className="text-3xl font-bold mb-2">Complete Payment</h2>
            <p className="text-amber-400 text-2xl mb-8">$85 • 45-min Lesson</p>

            <button
              onClick={() => {
                alert('✅ Payment Successful! Your lesson is booked.');
                setShowPayment(false);
              }}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-6 rounded-3xl text-xl"
            >
              PAY WITH TEST CARD
            </button>

            <button onClick={() => setShowPayment(false)} className="mt-6 text-zinc-400 mx-auto block">
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}