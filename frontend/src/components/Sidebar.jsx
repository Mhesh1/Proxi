import React from 'react';
import { LayoutDashboard, Users, Activity, Settings, LogOut } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-64 h-full glass-panel border-r border-white/5 flex flex-col p-6 z-10 fixed left-0 top-0">
      <div className="flex items-center gap-3 mb-10 px-2 mt-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-proxi-accent to-proxi-neon flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
          <Activity className="text-proxi-900" size={24} />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Proxi<span className="text-proxi-accent">.</span></h1>
      </div>

      <div className="flex-1 space-y-3">
        <div className="px-4 py-3 bg-proxi-accent/10 border border-proxi-accent/20 rounded-xl flex items-center gap-3 text-proxi-neon font-medium shadow-[0_0_15px_rgba(6,182,212,0.1)] cursor-pointer">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </div>
        
        {/* Placeholder inactive links */}
        <div className="px-4 py-3 rounded-xl flex items-center gap-3 font-medium text-slate-400 hover:text-white hover:bg-proxi-800/50 transition-colors cursor-pointer">
          <Users size={20} />
          <span>Students</span>
        </div>
        
        <div className="px-4 py-3 rounded-xl flex items-center gap-3 font-medium text-slate-400 hover:text-white hover:bg-proxi-800/50 transition-colors cursor-pointer">
          <Settings size={20} />
          <span>Settings</span>
        </div>
      </div>

      {/* User profile section placeholder */}
      <div className="mt-auto border-t border-white/10 pt-6">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-proxi-accent/50 flex items-center justify-center">
            <span className="text-sm font-bold text-white">AD</span>
          </div>
          <div>
            <p className="text-sm font-bold text-white">Admin</p>
            <p className="text-xs text-slate-400">System Operator</p>
          </div>
        </div>
      </div>
    </div>
  );
}
