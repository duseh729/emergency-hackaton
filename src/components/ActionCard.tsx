"use client";

import { motion } from 'motion/react';
import { ArrowRight, type LucideIcon } from 'lucide-react';

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  linkText: string;
  onClick: () => void;
}

const ActionCard = ({ icon: Icon, title, description, linkText, onClick }: ActionCardProps) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="group relative overflow-hidden bg-surface rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 flex flex-col h-full border border-support/10"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
    <div className="mb-8 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-support/10 text-primary">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-2xl font-bold mb-3 tracking-tight text-foreground font-outfit">{title}</h3>
    <p className="text-foreground/60 mb-8 flex-grow leading-relaxed text-sm">{description}</p>
    <button 
      onClick={onClick}
      className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-wide group-hover:gap-3 transition-all cursor-pointer border-none bg-transparent p-0"
    >
      {linkText} <ArrowRight className="w-4 h-4" />
    </button>
  </motion.div>
);

export default ActionCard;
