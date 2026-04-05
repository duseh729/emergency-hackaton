"use client";

import { motion } from 'motion/react';
import { type ReactNode } from 'react';

interface TeamCardProps {
  team: {
    id: number;
    name: string;
    description: string;
    hackathon: string;
    currentMembers: number;
    maxMembers: number;
    icon: ReactNode;
    roles: Array<{
      name: string;
      icon: ReactNode;
      color: string;
    }>;
    members: Array<{
      avatar: string;
    }>;
  };
}

const TeamCard = ({ team }: TeamCardProps) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-surface rounded-2xl p-8 border border-support/10 hover:shadow-xl hover:shadow-primary/5 transition-all group flex flex-col h-full"
  >
    <div className="flex justify-between items-start mb-6">
      <div className="w-14 h-14 rounded-2xl bg-support/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
        {team.icon}
      </div>
      <span className="text-[10px] font-bold border border-support/10 px-2 py-1 rounded uppercase tracking-widest text-foreground/40">
        {team.hackathon}
      </span>
    </div>
    <h3 className="text-2xl font-bold mb-3 font-outfit group-hover:text-primary transition-colors text-foreground">{team.name}</h3>
    <p className="text-foreground/60 text-sm leading-relaxed mb-8 flex-grow">{team.description}</p>
    
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-3">Looking For</p>
        <div className="flex flex-wrap gap-2">
          {team.roles.map((role: any) => (
            <span 
              key={role.name} 
              className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${role.color}`}
            >
              {role.icon} {role.name}
            </span>
          ))}
        </div>
      </div>
      
      <div className="pt-6 border-t border-support/10 flex items-center justify-between">
        <div className="flex -space-x-2">
          {team.members.map((m: any, i: number) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-surface bg-support/5 overflow-hidden">
              <img src={m.avatar} alt="Member" className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="w-8 h-8 rounded-full border-2 border-surface bg-support/10 flex items-center justify-center text-[10px] font-bold text-primary">
            {team.currentMembers}/{team.maxMembers}
          </div>
        </div>
        <button className="bg-primary/10 text-primary px-5 py-2 rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-all cursor-pointer border-none shadow-sm shadow-primary/5">
          View Team
        </button>
      </div>
    </div>
  </motion.div>
);

export default TeamCard;
