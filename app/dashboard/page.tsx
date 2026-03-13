'use client';
import Navbar from '@/components/Navbar';
import VideoModal from '@/components/VideoModal';
import { useState, useEffect } from 'react';
import { Upload, Play, Star } from 'lucide-react';

type Submission = {
  id: number;
  title: string;
  date: string;
  videoUrl: string;
  status: 'pending' | 'graded';
  tech?: number;
  music?: number;
  total?: number;
};

export default function Dashboard() {
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [submissions, setSubmissions] = useState<Submission[]>([
    { id: 1, title: 'Bach Minuet in G', date: '12 Mar 2026', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny_720p.mp4', status: 'graded', tech: 8, music: 9, total: 17 },
    { id: 2, title: 'Twinkle Variation', date: '10 Mar 2026', videoUrl: '', status: 'pending' },
  ]);
  const [uploaded, setUploaded] = useState<Submission[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Submission | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const newVideo: Submission = {
      id: Date.now(),
      title: file.name,
      date: new Date().toLocaleDateString('en-AU'),
      videoUrl: url,
      status: 'pending',
    };
    setUploaded([...uploaded, newVideo]);
  };

  const giveGrade = (tech: number, music: number) => {
    if (!selectedVideo) return;
    const total = tech + music;

    setSubmissions(prev =>
      prev.map(s => s.id === selectedVideo.id ? { ...s, status: 'graded', tech, music, total } : s)
    );
    setUploaded(prev =>
      prev.map(s => s.id === selectedVideo.id ? { ...s, status: 'graded', tech, music, total } : s)
    );

    setSelectedVideo(null);
    alert(`Grade saved! ${total}/20`);
  };

  const allVideos = [...submissions, ...uploaded];

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="logo-font text-6xl font-bold">
            {role === 'student' ? 'Student Dashboard' : 'Teacher Dashboard'}
          </h1>

          <button
            onClick={() => setRole(role === 'student' ? 'teacher' : 'student')}
            className="bg-zinc-900 border border-amber-700 px-8 py-3 rounded-3xl flex items-center gap-3 hover:bg-zinc-800 transition"
          >
            Switch to {role === 'student' ? 'Teacher' : 'Student'} Mode
            <Star className="text-amber-400" />
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Student Side */}
          {role === 'student' && (
            <div className="lg:col-span-7 space-y-10">
              <div className="bg-zinc-900 rounded-3xl p-10">
                <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-amber-700 rounded-3xl py-16 hover:border-amber-400 transition">
                  <Upload className="w-16 h-16 text-amber-400 mb-4" />
                  <p className="font-medium text-xl">Upload Practice Video</p>
                  <p className="text-zinc-500 text-sm mt-2">MP4 • Max 150MB</p>
                  <input type="file" accept="video/*" onChange={handleUpload} className="hidden" />
                </label>
              </div>

              <div className="bg-zinc-900 rounded-3xl p-10">
                <h3 className="font-semibold text-2xl mb-6">My Submissions</h3>
                {[...submissions, ...uploaded].map(v => (
                  <div key={v.id} className="flex justify-between items-center bg-zinc-800 p-6 rounded-2xl mb-4">
                    <div>
                      <p className="font-medium">{v.title}</p>
                      <p className="text-xs text-zinc-400">{v.date}</p>
                    </div>
                    {v.status === 'graded' ? (
                      <div className="text-emerald-400 font-bold text-2xl">{v.total}/20</div>
                    ) : (
                      <div className="px-6 py-2 bg-amber-900 text-amber-400 rounded-3xl text-sm">Pending Review</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Teacher Side */}
          {role === 'teacher' && (
            <div className="lg:col-span-12 bg-zinc-900 rounded-3xl p-10">
              <h3 className="font-semibold text-2xl mb-8">Videos to Grade ({allVideos.length})</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {allVideos.map(v => (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVideo(v)}
                    className="bg-zinc-800 rounded-3xl p-6 hover:bg-zinc-700 cursor-pointer transition flex gap-6 items-center"
                  >
                    <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center text-4xl">🎥</div>
                    <div className="flex-1">
                      <p className="font-medium">{v.title}</p>
                      <p className="text-sm text-zinc-400">{v.date}</p>
                    </div>
                    {v.status === 'graded' ? (
                      <div className="text-emerald-400 font-mono text-3xl">{v.total}</div>
                    ) : (
                      <div className="text-amber-400 font-bold">GRADE →</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          onGrade={giveGrade}
          isTeacher={role === 'teacher'}
        />
      )}
    </>
  );
}