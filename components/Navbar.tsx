'use client';
import { useState } from 'react';
import { User, LogOut, Violin } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState<string | null>('Emma Chen');
  const router = useRouter();

  const handleLogin = () => {
    const name = prompt('Enter your name (demo)', 'Emma Chen');
    if (name) setUser(name);
  };

  return (
    <nav className="bg-black/90 backdrop-blur-lg border-b border-amber-900 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
          <div className="w-11 h-11 bg-amber-500 rounded-full flex items-center justify-center text-4xl">
            🎻
          </div>
          <span className="logo-font text-4xl font-bold tracking-tighter text-amber-400">ViolinMaster</span>
        </div>

        <div className="flex items-center gap-10 text-sm font-medium">
          <button onClick={() => router.push('/')} className="hover:text-amber-400 transition">Home</button>
          <button onClick={() => router.push('/book')} className="hover:text-amber-400 transition">Book Class</button>
          <button onClick={() => router.push('/dashboard')} className="hover:text-amber-400 transition">Dashboard</button>

          <div
            onClick={user ? undefined : handleLogin}
            className="flex items-center gap-3 bg-zinc-900 hover:bg-zinc-800 border border-amber-700 px-6 py-2.5 rounded-3xl cursor-pointer transition"
          >
            <User className="w-5 h-5" />
            <span className="font-semibold">{user || 'Login'}</span>
            {user && <LogOut className="w-4 h-4 opacity-60" />}
          </div>
        </div>
      </div>
    </nav>
  );
}