"use client";

import { motion } from 'motion/react';
import { ArrowLeftRight } from 'lucide-react';

const HandoverHUD = () => (
  <motion.div 
    initial={{ y: 100, x: '-50%' }}
    animate={{ y: 0, x: '-50%' }}
    className="fixed bottom-6 left-1/2 z-50 pointer-events-none"
  >
    <div className="bg-surface/80 backdrop-blur-xl border border-support/20 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-4 pointer-events-auto">
      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
      <div>
        <span className="block text-[10px] uppercase tracking-tighter font-bold text-foreground/50 leading-none mb-0.5">Current Custodian</span>
        <span className="block text-sm font-bold text-primary leading-none font-outfit">DAKER PRIME</span>
      </div>
      <div className="h-6 w-px bg-support/20" />
      <button className="bg-primary text-white p-1.5 rounded-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer border-none shadow-lg shadow-primary/20">
        <ArrowLeftRight className="w-4 h-4" />
      </button>
    </div>
  </motion.div>
);

export default HandoverHUD;
