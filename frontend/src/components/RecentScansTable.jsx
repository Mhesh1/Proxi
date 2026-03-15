import React from 'react';
import { CheckCircle2, XCircle, Clock, Inbox } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RecentScansTable({ scans, isConnected }) {
  return (
    <div className="glass-panel rounded-2xl p-6 mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Clock size={18} className="text-proxi-accent" />
          Live RFID Scans
        </h3>
        <div className="flex items-center gap-3">
          <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
            isConnected 
              ? 'bg-proxi-accent/10 border-proxi-accent/30 text-proxi-accent' 
              : 'bg-slate-500/10 border-slate-500/30 text-slate-400'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-proxi-accent animate-pulse' : 'bg-slate-500'}`} />
            {isConnected ? 'Hardware Connected' : 'Hardware Offline'}
          </span>
          <button className="text-sm text-proxi-accent hover:text-proxi-neon transition-colors">
            View All Logs &rarr;
          </button>
        </div>
      </div>

      <div className="overflow-x-auto min-h-[250px] relative w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-proxi-700/50 text-slate-400 text-sm">
              <th className="pb-3 font-medium w-32">Scan Time</th>
              <th className="pb-3 font-medium">Card UID</th>
              <th className="pb-3 font-medium">Student Name</th>
              <th className="pb-3 font-medium">Roll No.</th>
              <th className="pb-3 font-medium text-right">Access Status</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {scans.map((scan) => (
                <motion.tr 
                  key={scan.id}
                  initial={{ opacity: 0, y: -20, backgroundColor: 'rgba(6,182,212,0.1)' }}
                  animate={{ opacity: 1, y: 0, backgroundColor: 'transparent' }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-proxi-800/50 hover:bg-proxi-800/30 transition-colors group"
                >
                  <td className="py-4 text-slate-300 font-medium whitespace-nowrap">
                    {scan.time}
                  </td>
                  <td className="py-4">
                    <span className="font-mono text-xs text-slate-400 bg-proxi-900 px-2 py-1 rounded">
                      {scan.uid || 'UNKNOWN'}
                    </span>
                  </td>
                  <td className="py-4 text-white font-semibold flex items-center gap-2">
                    {scan.name}
                  </td>
                  <td className="py-4 text-slate-400">
                    {scan.branch}
                  </td>
                  <td className="py-4 text-right">
                    {scan.status === 'success' ? (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                        <CheckCircle2 size={14} />
                        Granted
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                        <XCircle size={14} />
                        Denied
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {scans.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="absolute inset-0 flex flex-col items-center pt-20 text-slate-500"
          >
            <div className="w-16 h-16 rounded-full bg-proxi-800 flex items-center justify-center mb-4 border border-proxi-700/50">
              <Inbox className="w-8 h-8 opacity-50" />
            </div>
            <p className="font-medium text-slate-400 mb-1">Waiting for RFID scans...</p>
            <p className="text-sm">Scan a card on the reader to test.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
