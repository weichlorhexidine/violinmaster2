'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Upload, Play, Star, User, LogOut, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

type Submission = {
  id: number;
  student: string;
  title: string;
  date: string;
  videoUrl: string;
  status: 'pending' | 'graded';
  tech?: number;
  music?: number;
  total?: number;
};

export default function ViolinMaster() {
  const [currentUser, setCurrentUser] = useState('Emma Chen');
  const [currentRole, setCurrentRole] = useState<'student' | 'teacher'>('student');
  const [activePage, setActivePage] = useState<'home' | 'book' | 'dashboard'>('home');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Submission | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([
    { id: 1, student: 'Emma Chen', title: 'Bach Minuet in G', date: '2026-03-12', videoUrl: '', status: 'graded', tech: 8, music: 9, total: 17 },
    { id: 2, student: 'Emma Chen', title: 'Twinkle Twinkle Variation', date: '2026-03-10', videoUrl: '', status: 'pending' },
  ]);

  const [uploadedVideos, setUploadedVideos] = useState<Submission[]>([]);

  const allSubmissions = [...submissions, ...uploadedVideos];

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const newVideo: Submission = {
      id: Date.now(),
      student: currentUser,
      title: file.name.replace(/\.[^/.]+$/, ''),
      date: format(new Date(), 'yyyy-MM-dd'),
      videoUrl: url,
      status: 'pending',
    };

    setUploadedVideos(prev => [...prev, newVideo]);
    alert('✅ Video uploaded successfully! Teacher will review it soon.');
  };

  const openVideo = (sub: Submission) => {
    setCurrentVideo(sub);
    setShowVideoModal(true);
  };

  const submitGrade = (tech: number, music: number) => {
    if (!currentVideo) return;

    const updated = allSubmissions.map(s => {
      if (s.id === currentVideo.id) {
        return { ...s, status: 'graded' as const, tech, music, total: tech + music };
      }
      return s;
    });

    // Update correct state
    if (submissions.find(s => s.id === currentVideo.id)) {
      setSubmissions(updated.filter(s => !uploadedVideos.find(u => u.id === s.id)));
    } else {
      setUploadedVideos(updated.filter(s => uploadedVideos.find(u => u.id === s.id)));
    }

    setShowVideoModal(false);
    alert(`✅ Grade saved! (${tech + music}/20)`);
  };

  const bookClass = () => {
    if (!selectedSlot) return alert('Please select a time slot');
    setShowPayment(true);
  };

  const completePayment = () => {
    setShowPayment(false);
    alert('🎉 Payment successful! Your class on 13 March 15:00 is confirmed.');
    setActivePage('dashboard');
  };

  return (
    <div className="min-h-screen violin-bg">
      {/* Navbar */}
      <nav className="bg-black/90 backdrop-blur-lg border-b border-amber-900 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-amber-500 rounded-full flex items-center justify-center text-4xl shadow-xl">🎻</div>
            <div className="logo-font text-4xl font-bold tracking-tighter text-amber-400">ViolinMaster</div>
          </div>

          <div className="flex items-center gap-10 text-sm font-medium">
            <button onClick={() => setActivePage('home')} className={`hover:text-amber-400 transition ${activePage === 'home' ? 'text-amber-400' : ''}`}>Home</button>
            <button onClick={() => setActivePage('book')} className={`hover:text-amber-400 transition ${activePage === 'book' ? 'text-amber-400' : ''}`}>Book Class</button>
            <button onClick={() => setActivePage('dashboard')} className={`hover:text-amber-400 transition ${activePage === 'dashboard' ? 'text-amber-400' : ''}`}>Dashboard</button>

            <div className="flex items-center gap-4 pl-8 border-l border-amber-900">
              <div className="flex items-center gap-3 bg-zinc-900 px-5 py-2.5 rounded-3xl border border-amber-700">
                <User className="w-5 h-5" />
                <span className="font-semibold">{currentUser}</span>
              </div>
              <button
                onClick={() => setCurrentRole(currentRole === 'student' ? 'teacher' : 'student')}
                className="bg-zinc-900 hover:bg-zinc-800 px-6 py-2.5 rounded-3xl text-xs font-mono border border-amber-700 flex items-center gap-2"
              >
                {currentRole.toUpperCase()} MODE <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="h-20" />

      {/* HOME */}
      {activePage === 'home' && (
        <div className="pt-20 pb-32 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 bg-amber-900/60 text-amber-300 px-8 py-3 rounded-full text-sm mb-8">
              <Star className="w-4 h-4" /> 2026 SEASON OPEN – SYDNEY TEACHERS
            </div>
            <h1 className="logo-font text-7xl md:text-8xl font-bold leading-none tracking-tighter mb-8">
              Master the Violin.<br />
              <span className="text-amber-400">Book • Upload • Improve</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-lg mx-auto mb-12">
              Private online lessons with expert feedback. Upload your playing videos and receive detailed marks.
            </p>
            <div className="flex gap-5 justify-center">
              <button onClick={() => setActivePage('book')}
                className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-12 py-5 rounded-3xl text-xl flex items-center gap-3 transition-all">
                Book Your Lesson <Calendar className="w-6 h-6" />
              </button>
              <button onClick={() => setActivePage('dashboard')}
                className="border-2 border-amber-400 hover:bg-amber-400/10 font-semibold px-12 py-5 rounded-3xl text-xl transition-all">
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOOKING PAGE */}
      {activePage === 'book' && (
        <div className="max-w-6xl mx-auto px-8 py-16">
          <h2 className="logo-font text-6xl font-bold mb-10">Book a Private Lesson</h2>

          <div className="grid lg:grid-cols-12 gap-10">
            {/* Calendar */}
            <div className="lg:col-span-8 bg-zinc-900 rounded-3xl p-10">
              <div className="flex items-center gap-3 mb-8">
                <Calendar className="w-6 h-6 text-amber-400" />
                <h3 className="text-2xl font-semibold">March 2026 Availability</h3>
              </div>

              <div className="grid grid-cols-7 gap-3 text-center text-sm mb-6">
                {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="text-zinc-500 font-medium">{d}</div>)}
              </div>

              <div className="grid grid-cols-7 gap-3">
                {Array.from({ length: 21 }).map((_, i) => {
                  const time = i % 2 === 0 ? '10:00' : '15:00';
                  const date = 10 + Math.floor(i / 3);
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedSlot(`${date} Mar • ${time}`)}
                      className={`h-20 rounded-2xl text-sm font-medium transition-all ${
                        selectedSlot === `${date} Mar • ${time}`
                          ? 'bg-amber-500 text-black scale-105'
                          : 'bg-zinc-800 hover:bg-amber-600 hover:text-black'
                      }`}
                    >
                      {date} Mar<br />{time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-4 bg-zinc-900 rounded-3xl p-10 flex flex-col">
              <h3 className="font-semibold text-xl mb-8">Booking Summary</h3>
              <div className="flex-1">
                <div className="text-zinc-400 text-sm">45-minute Private Lesson</div>
                <div className="text-5xl font-bold text-amber-400 mt-2">$85</div>
                <div className="text-xs text-zinc-500 mt-1">AUD • Sydney Time</div>
              </div>

              {selectedSlot && (
                <div className="bg-black/50 p-5 rounded-2xl mb-8">
                  <div className="font-medium">Selected:</div>
                  <div className="text-amber-400 text-xl">{selectedSlot}</div>
                </div>
              )}

              <button
                onClick={bookClass}
                disabled={!selectedSlot}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 disabled:from-zinc-700 disabled:to-zinc-700 text-black font-bold py-6 rounded-3xl text-2xl transition-all flex items-center justify-center gap-3"
              >
                Pay $85 Securely
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD */}
      {activePage === 'dashboard' && (
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="flex justify-between items-end mb-12">
            <h2 className="logo-font text-6xl font-bold">
              {currentRole === 'student' ? 'Student Dashboard' : 'Teacher Dashboard'}
            </h2>
            <div className="text-amber-400 text-sm font-mono tracking-widest">
              {currentRole.toUpperCase()} MODE
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Student Panel */}
            {currentRole === 'student' && (
              <div className="lg:col-span-7 space-y-8">
                {/* Upload Area */}
                <div className="bg-zinc-900 rounded-3xl p-10 border-2 border-dashed border-amber-700 hover:border-amber-400 transition-colors">
                  <label className="flex flex-col items-center justify-center cursor-pointer">
                    <Upload className="w-16 h-16 text-amber-400 mb-6" />
                    <div className="text-2xl font-medium mb-2">Upload Practice Video</div>
                    <div className="text-zinc-400">MP4 • Max 200MB</div>
                    <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                  </label>
                </div>

                {/* My Submissions */}
                <div className="bg-zinc-900 rounded-3xl p-10">
                  <h3 className="font-semibold text-xl mb-6">My Submissions</h3>
                  <div className="space-y-4">
                    {allSubmissions.filter(s => s.student === currentUser).map(sub => (
                      <div
                        key={sub.id}
                        onClick={() => openVideo(sub)}
                        className="flex items-center gap-6 bg-zinc-800 hover:bg-zinc-700 p-6 rounded-2xl cursor-pointer transition-all"
                      >
                        <Play className="w-10 h-10 text-amber-400" />
                        <div className="flex-1">
                          <div className="font-medium">{sub.title}</div>
                          <div className="text-xs text-zinc-400">{sub.date}</div>
                        </div>
                        {sub.status === 'graded' ? (
                          <div className="text-right">
                            <div className="text-emerald-400 text-3xl font-bold">{sub.total}</div>
                            <div className="text-[10px] text-zinc-500">/20</div>
                          </div>
                        ) : (
                          <div className="px-6 py-2 bg-amber-900 text-amber-400 rounded-full text-xs font-medium">Pending Review</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Teacher Panel */}
            {currentRole === 'teacher' && (
              <div className="lg:col-span-12 bg-zinc-900 rounded-3xl p-10">
                <h3 className="font-semibold text-xl mb-8 flex items-center gap-3">
                  <Star className="w-6 h-6" /> Videos Awaiting Grading
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {allSubmissions.map(sub => (
                    <div
                      key={sub.id}
                      onClick={() => openVideo(sub)}
                      className="bg-zinc-800 hover:bg-zinc-700 p-6 rounded-3xl cursor-pointer transition-all flex gap-5"
                    >
                      <div className="w-20 h-20 bg-black rounded-2xl flex-shrink-0 flex items-center justify-center text-5xl">🎥</div>
                      <div className="flex-1">
                        <div className="font-medium">{sub.title}</div>
                        <div className="text-sm text-zinc-400">{sub.student} • {sub.date}</div>
                        {sub.status === 'graded' ? (
                          <div className="mt-4 text-emerald-400 font-mono text-2xl">{sub.total}/20</div>
                        ) : (
                          <div className="mt-6 inline-block bg-emerald-600 text-white text-xs font-bold px-8 py-3 rounded-3xl">GRADE NOW</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIDEO MODAL */}
      {showVideoModal && currentVideo && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-6">
          <div className="bg-zinc-900 rounded-3xl max-w-5xl w-full overflow-hidden">
            <div className="px-8 py-6 border-b border-zinc-700 flex justify-between items-center">
              <div>
                <div className="font-semibold text-xl">{currentVideo.title}</div>
                <div className="text-zinc-400 text-sm">{currentVideo.student} — {currentVideo.date}</div>
              </div>
              <button onClick={() => setShowVideoModal(false)} className="text-4xl text-zinc-400 hover:text-white">×</button>
            </div>

            <div className="p-8">
              <video
                src={currentVideo.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny_720p.mp4"}
                controls
                autoPlay
                className="w-full rounded-2xl bg-black"
              />
            </div>

            {currentRole === 'teacher' && currentVideo.status === 'pending' && (
              <div className="p-8 border-t border-zinc-700 bg-zinc-950">
                <h4 className="font-medium mb-6 text-lg">Give Marks</h4>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-xs text-zinc-400 mb-2">TECHNIQUE (1–10)</div>
                    <input id="tech" type="range" min="1" max="10" defaultValue="8" className="w-full accent-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400 mb-2">MUSICALITY (1–10)</div>
                    <input id="music" type="range" min="1" max="10" defaultValue="9" className="w-full accent-amber-400" />
                  </div>
                </div>
                <button
                  onClick={() => {
                    const tech = parseInt((document.getElementById('tech') as HTMLInputElement).value);
                    const music = parseInt((document.getElementById('music') as HTMLInputElement).value);
                    submitGrade(tech, music);
                  }}
                  className="mt-10 w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-5 rounded-3xl text-xl"
                >
                  SUBMIT GRADE
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PAYMENT MODAL */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-3xl w-full max-w-md p-10">
            <h3 className="text-3xl font-bold mb-2">Complete Payment</h3>
            <p className="text-amber-400 text-5xl font-bold mb-8">$85</p>

            <div className="space-y-6 mb-10">
              <div>
                <div className="text-xs text-zinc-400 mb-1">Card Number</div>
                <input type="text" defaultValue="4242 4242 4242 4242" className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-lg" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-xs text-zinc-400 mb-1">Expiry Date</div>
                  <input type="text" defaultValue="04/28" className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4" />
                </div>
                <div>
                  <div className="text-xs text-zinc-400 mb-1">CVC</div>
                  <input type="text" defaultValue="424" className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4" />
                </div>
              </div>
            </div>

            <button onClick={completePayment} className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-6 rounded-3xl text-xl">
              PAY $85 SECURELY
            </button>
            <button onClick={() => setShowPayment(false)} className="text-zinc-400 mt-6 block mx-auto">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}