import React, { useState, useEffect } from 'react';
import { Bell, Search, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Topbar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-24 w-full flex items-center justify-between px-8 z-20">
      {/* Left side: Search */}
      <div className="flex items-center gap-4 text-slate-400">
        <div className="glass-panel px-4 py-2.5 rounded-xl flex items-center gap-3 w-80">
          <Search size={18} className="opacity-50" />
          <input 
            type="text" 
            placeholder="Search scans, students..." 
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-500 text-white"
          />
        </div>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <Cpu size={14} className="animate-pulse" />
          <span>SYSTEM ONLINE</span>
        </div>

        <div className="font-mono text-sm tracking-widest text-slate-300">
          {time.toLocaleTimeString('en-US', { hour12: false })}
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass-panel p-2.5 rounded-full relative"
        >
          <Bell size={18} className="text-slate-300 group-hover:text-white transition-colors" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-proxi-neon rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
        </motion.button>
      </div>
    </div>
  );
}
