"use client";

import { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Code, 
  Palette, 
  Layout, 
  Terminal 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TeamCard from '@/components/TeamCard';
import HandoverHUD from '@/components/HandoverHUD';

const CampPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');

  const teams = [
    {
      id: 1,
      name: 'Team Code-Red',
      description: 'Building a decentralized emergency response system using React and Solidity. Looking for a lead designer to polish our interface.',
      hackathon: '긴급 인수인계 해커톤',
      currentMembers: 3,
      maxMembers: 4,
      icon: <Terminal className="w-8 h-8" />,
      roles: [
        { name: 'Designer', icon: <Palette className="w-3 h-3" />, color: 'bg-primary/10 text-primary' },
        { name: 'Frontend', icon: <Layout className="w-3 h-3" />, color: 'bg-support/20 text-foreground/80' }
      ],
      members: [
        { avatar: 'https://i.pravatar.cc/100?u=1' },
        { avatar: 'https://i.pravatar.cc/100?u=2' },
        { avatar: 'https://i.pravatar.cc/100?u=3' }
      ]
    },
    {
      id: 2,
      name: 'Radiant Docs',
      description: 'Focusing on the ultimate documentation engine for architectural handovers. Need a backend expert for our indexing system.',
      hackathon: 'Interface Alchemy',
      currentMembers: 2,
      maxMembers: 4,
      icon: <Code className="w-8 h-8" />,
      roles: [
        { name: 'Backend', icon: <Terminal className="w-3 h-3" />, color: 'bg-primary/10 text-primary' },
        { name: 'PM', icon: <Users className="w-3 h-3" />, color: 'bg-support/20 text-foreground/80' }
      ],
      members: [
        { avatar: 'https://i.pravatar.cc/100?u=4' },
        { avatar: 'https://i.pravatar.cc/100?u=5' }
      ]
    },
    {
      id: 3,
      name: 'Handover-Hero',
      description: 'Creating a seamless transition tool for developers. We need a frontend wizard to build our interactive dashboard.',
      hackathon: '긴급 인수인계 해커톤',
      currentMembers: 1,
      maxMembers: 3,
      icon: <Layout className="w-8 h-8" />,
      roles: [
        { name: 'Frontend', icon: <Layout className="w-3 h-3" />, color: 'bg-support/20 text-foreground/80' },
        { name: 'Designer', icon: <Palette className="w-3 h-3" />, color: 'bg-primary/10 text-primary' }
      ],
      members: [
        { avatar: 'https://i.pravatar.cc/100?u=6' }
      ]
    }
  ];

  const filteredTeams = teams.filter(team => {
    const hackathonMatch = activeFilter === 'All' || team.hackathon === activeFilter;
    const roleMatch = roleFilter === 'All' || team.roles.some(r => r.name === roleFilter);
    return hackathonMatch && roleMatch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow pt-24">
        <section className="px-6 py-20 bg-support/5 relative overflow-hidden border-b border-support/10">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 skew-x-12 translate-x-20" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
              <div className="max-w-2xl">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-4 block">Team Recruitment</span>
                <h1 className="text-5xl md:text-7xl font-bebas tracking-wider mb-6 italic">
                  THE <span className="text-primary italic">CAMP</span>
                </h1>
                <p className="text-lg text-foreground/70 leading-relaxed font-outfit">
                  Don't build alone. Find your perfect architectural partners, join a squad, and master the art of the handover together.
                </p>
              </div>
              <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95 cursor-pointer border-none shadow-lg shadow-primary/10 uppercase tracking-widest text-sm">
                <Plus className="w-5 h-5" /> Create a Team
              </button>
            </div>
          </div>
        </section>

        <section className="px-6 py-12 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Filters Sidebar */}
            <aside className="w-full lg:w-72 space-y-8 sticky top-32">
              <div className="bg-surface p-6 rounded-2xl border border-support/10 shadow-sm">
                <div className="flex items-center gap-2 mb-6 bg-support/5 p-3 rounded-xl border border-support/10">
                  <Search className="w-4 h-4 text-foreground/40" />
                  <input 
                    type="text" 
                    placeholder="Search teams..." 
                    className="bg-transparent border-none text-sm font-medium focus:ring-0 w-full outline-none text-foreground"
                  />
                </div>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-4 flex items-center gap-2">
                      <Filter className="w-3 h-3" /> By Hackathon
                    </p>
                    <div className="flex flex-col gap-2">
                      {['All', '긴급 인수인계 해커톤', 'Interface Alchemy', 'Decentralize Everything'].map(f => (
                        <button 
                          key={f}
                          onClick={() => setActiveFilter(f)}
                          className={`text-left px-4 py-2 rounded-xl text-sm font-bold transition-all border-none cursor-pointer ${
                            activeFilter === f ? 'bg-primary text-white shadow-md' : 'text-foreground/50 hover:bg-support/10 bg-transparent'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-4 flex items-center gap-2">
                      <Users className="w-3 h-3" /> Looking For
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['All', 'Frontend', 'Backend', 'Designer', 'PM'].map(r => (
                        <button 
                          key={r}
                          onClick={() => setRoleFilter(r)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-none cursor-pointer ${
                            roleFilter === r ? 'bg-primary text-white shadow-md' : 'bg-support/10 text-foreground/60 hover:bg-support/20'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                <h4 className="font-bebas text-xl text-primary mb-2 tracking-wide uppercase">Need Help?</h4>
                <p className="text-xs text-foreground/60 leading-relaxed">Our matching algorithm can help you find the best team based on your skills and interests.</p>
                <button className="mt-4 text-xs font-bold text-primary hover:underline cursor-pointer border-none bg-transparent p-0 uppercase tracking-widest">Try Auto-Match →</button>
              </div>
            </aside>

            {/* Teams Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredTeams.map((team) => (
                    <TeamCard key={team.id} team={team} />
                  ))}
                </AnimatePresence>
              </div>
              
              {filteredTeams.length === 0 && (
                <div className="py-20 text-center bg-support/5 rounded-3xl border-2 border-dashed border-support/20">
                  <Users className="w-12 h-12 text-support/30 mx-auto mb-4" />
                  <h3 className="text-xl font-bebas text-foreground/50 tracking-wider">No teams found</h3>
                  <p className="text-foreground/40 text-sm font-bold uppercase tracking-tight">Try adjusting your filters or create your own team!</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <HandoverHUD />
    </div>
  );
};

export default CampPage;
