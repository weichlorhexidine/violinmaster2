'use client';
import { useState } from 'react';
import { X } from 'lucide-react';

type VideoModalProps = {
  video: any;
  onClose: () => void;
  onGrade: (tech: number, music: number) => void;
  isTeacher: boolean;
};

export default function VideoModal({ video, onClose, onGrade, isTeacher }: VideoModalProps) {
  const [tech, setTech] = useState(8);
  const [music, setMusic] = useState(9);

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-6">
      <div className="bg-zinc-900 rounded-3xl max-w-4xl w-full overflow-hidden">
        <div className="flex justify-between p-8 border-b border-zinc-700">
          <div>
            <p className="font-semibold text-2xl">{video.title}</p>
            <p className="text-zinc-400">{video.date}</p>
          </div>
          <button onClick={onClose}><X className="w-8 h-8" /></button>
        </div>

        <div className="p-8">
          <video src={video.videoUrl} controls className="w-full rounded-2xl bg-black" />
        </div>

        {isTeacher && video.status !== 'graded' && (
          <div className="p-8 border-t border-zinc-700">
            <h4 className="text-xl font-medium mb-6">Give Feedback</h4>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="text-sm text-zinc-400 block mb-2">Technique ({tech}/10)</label>
                <input type="range" min="1" max="10" value={tech} onChange={e => setTech(+e.target.value)} className="w-full accent-amber-400" />
              </div>
              <div>
                <label className="text-sm text-zinc-400 block mb-2">Musicality ({music}/10)</label>
                <input type="range" min="1" max="10" value={music} onChange={e => setMusic(+e.target.value)} className="w-full accent-amber-400" />
              </div>
            </div>

            <button
              onClick={() => onGrade(tech, music)}
              className="mt-10 w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-5 rounded-3xl text-xl"
            >
              Submit Grade ({tech + music}/20)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}