import React, { useState, useEffect } from 'react';
import { Users, UserCheck, ShieldAlert, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';

import StatCard from '../components/StatCard';
import RecentScansTable from '../components/RecentScansTable';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  const [scans, setScans] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connect Live Socket
    const socket = io('http://localhost:3001');
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
    
    socket.on('new_scan', (data) => {
      setScans(prevScans => {
        if (prevScans.some(s => s.id === data.id)) return prevScans;
        return [data, ...prevScans].slice(0, 100);
      });
    });

    return () => socket.disconnect();
  }, []);

  // Stats calculate directly off local state
  const totalScans = scans.length;
  const uniqueUsers = new Set(scans.filter(s => s.status === 'success').map(s => s.uid)).size;
  const deniedAccess = scans.filter(s => s.status !== 'success').length;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-7xl mx-auto pb-10">
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Live Scanner Overview</h2>
        <p className="text-slate-400">Monitoring real-time access events.</p>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={itemVariants} className="h-full">
          <StatCard title="Total Scans" value={totalScans.toString()} subtext="Session" icon={Users} trend="up" />
        </motion.div>
        <motion.div variants={itemVariants} className="h-full">
          <StatCard title="Unique Users" value={uniqueUsers.toString()} subtext="Granted" icon={UserCheck} trend="up" />
        </motion.div>
        <motion.div variants={itemVariants} className="h-full">
          <StatCard title="Access Denied" value={deniedAccess.toString()} subtext={deniedAccess > 0 ? "Warning" : "All Clear"} icon={ShieldAlert} trend={deniedAccess > 0 ? "down" : "up"} />
        </motion.div>
        <motion.div variants={itemVariants} className="h-full">
          <StatCard title="Active Readers" value={isConnected ? "1 / 1" : "0 / 1"} subtext={isConnected ? "System Online" : "System Offline"} icon={Cpu} trend={isConnected ? "up" : "down"} />
        </motion.div>
      </motion.div>

      {/* Data Table */}
      <motion.div variants={itemVariants}>
        <RecentScansTable scans={scans} isConnected={isConnected} />
      </motion.div>

    </motion.div>
  );
}
