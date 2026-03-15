import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ title, value, subtext, icon: Icon, trend }) {
  const isPositive = trend === 'up';

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="bg-proxi-800 border border-proxi-700/50 p-5 sm:p-6 rounded-xl relative overflow-hidden group min-h-[140px] flex flex-col justify-between shadow-sm card-hover"
    >
      {/* Background Icon Watermark */}
      <div className="absolute -right-4 -top-8 sm:-top-4 opacity-[0.03] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 pointer-events-none">
        <Icon size={120} />
      </div>

      <div className="flex justify-between items-start mb-4 relative z-10 gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-slate-400 text-xs sm:text-sm font-medium tracking-wide mb-1 uppercase truncate" title={title}>
            {title}
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent truncate">
            {value}
          </h3>
        </div>
        <div className="p-2 sm:p-3 bg-proxi-700/30 rounded-xl text-proxi-accent border border-proxi-accent/20 flex-shrink-0">
          <Icon size={24} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-auto relative z-10 pt-2">
        <span className={`text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
          {isPositive ? '↑' : '↓'} {subtext}
        </span>
      </div>
    </motion.div>
  );
}
