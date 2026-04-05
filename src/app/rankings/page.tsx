"use client";

import { useState } from 'react';
import { 
  Trophy, 
  Star, 
  Crown, 
  TrendingUp, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Zap,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HandoverHUD from '@/components/HandoverHUD';

const RankingsPage = () => {
  const [activeTab, setActiveTab] = useState('All Time');
  const [searchQuery, setSearchQuery] = useState('');

  const rankings = [
    {
      rank: 1,
      team: 'Team Code-Red',
      subtitle: 'Architecture Mastery',
      points: 28450,
      progress: 98,
      change: 'up',
      isNew: false,
      avatar: 'https://i.pravatar.cc/100?u=1',
      hackathons: 12,
      winRate: '85%'
    },
    {
      rank: 2,
      team: 'Radiant Docs',
      subtitle: 'Clean Code Kings',
      points: 26120,
      progress: 92,
      change: 'down',
      isNew: false,
      avatar: 'https://i.pravatar.cc/100?u=2',
      hackathons: 15,
      winRate: '72%'
    },
    {
      rank: 3,
      team: 'Handover-Hero',
      subtitle: 'UX Specialists',
      points: 24890,
      progress: 88,
      change: 'up',
      isNew: true,
      avatar: 'https://i.pravatar.cc/100?u=3',
      hackathons: 8,
      winRate: '90%'
    },
    {
      rank: 4,
      team: 'Pixel Architects',
      subtitle: 'Visual Excellence',
      points: 22100,
      progress: 78,
      change: 'none',
      isNew: false,
      avatar: 'https://i.pravatar.cc/100?u=4',
      hackathons: 20,
      winRate: '65%'
    },
    {
      rank: 5,
      team: 'Logic Layers',
      subtitle: 'Backend Wizards',
      points: 21450,
      progress: 75,
      change: 'up',
      isNew: false,
      avatar: 'https://i.pravatar.cc/100?u=5',
      hackathons: 14,
      winRate: '68%'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Hall of Fame Hero */}
        <section className="relative px-6 py-20 md:py-32 overflow-hidden bg-foreground text-background">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 text-center md:text-left">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/30 text-[10px] font-black uppercase tracking-widest mb-6"
                >
                  <Crown className="w-3 h-3" /> Season 4 Hall of Fame
                </motion.div>
                <h1 className="text-6xl md:text-8xl font-bebas tracking-wider mb-6 leading-none italic uppercase">
                  Global <br/> <span className="text-primary italic">Elite</span>
                </h1>
                <p className="text-background/60 text-lg md:text-xl max-w-xl leading-relaxed mb-10 font-outfit">
                  Celebrating the architects who master the art of the handover. Speed, quality, and structural integrity.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-8">
                  <div className="flex flex-col">
                    <span className="text-background/40 text-[10px] font-black uppercase tracking-widest mb-1">Total Architects</span>
                    <span className="text-3xl font-bebas tracking-wide">12,842</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-background/40 text-[10px] font-black uppercase tracking-widest mb-1">Active Projects</span>
                    <span className="text-3xl font-bebas tracking-wide">3,120</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-background/40 text-[10px] font-black uppercase tracking-widest mb-1">Handover Rate</span>
                    <span className="text-3xl font-bebas tracking-wide text-primary">94.2%</span>
                  </div>
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full md:w-1/3 aspect-square relative group"
              >
                <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-2xl group-hover:bg-primary/30 transition-all"></div>
                <div className="relative h-full bg-foreground/90 rounded-[3rem] border border-white/10 p-8 flex flex-col items-center justify-center text-center overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-6 relative border border-primary/30">
                    <Crown className="w-12 h-12 text-primary" />
                    <div className="absolute -top-2 -right-2 bg-white text-foreground w-8 h-8 rounded-full flex items-center justify-center font-black text-sm italic shadow-lg">#1</div>
                  </div>
                  <h3 className="text-2xl font-bebas tracking-wider mb-2 text-white italic uppercase">Team Code-Red</h3>
                  <p className="text-background/40 text-xs font-bold uppercase tracking-tight mb-6">Current Season Champion</p>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="bg-foreground p-4 rounded-2xl border border-white/10 shadow-inner">
                      <div className="text-primary font-bebas text-2xl">28.4k</div>
                      <div className="text-[10px] text-background/40 uppercase font-black tracking-widest">Points</div>
                    </div>
                    <div className="bg-foreground p-4 rounded-2xl border border-white/10 shadow-inner">
                      <div className="text-primary font-bebas text-2xl">85%</div>
                      <div className="text-[10px] text-background/40 uppercase font-black tracking-widest">Win Rate</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="sticky top-[72px] z-40 py-6 bg-background/80 backdrop-blur-md border-b border-support/10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 bg-support/10 p-1 rounded-full border border-support/10">
              {['All Time', 'Past 30 Days', 'Past 7 Days'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border-none ${
                    activeTab === tab ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'text-foreground/50 hover:bg-support/20 bg-transparent'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="relative w-full md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search architects..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-support/10 border-none rounded-full py-3 pl-12 pr-6 text-sm font-bold focus:ring-2 focus:ring-primary/40 outline-none text-foreground placeholder:text-foreground/30"
              />
            </div>
          </div>
        </section>

        {/* Leaderboard Table */}
        <section className="px-6 py-12 max-w-7xl mx-auto">
          <div className="bg-surface rounded-3xl border border-support/10 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-support/5 border-b border-support/10">
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-foreground/40">Rank</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-foreground/40">Architect Team</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-foreground/40">Points Visualizer</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-foreground/40">Change</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-foreground/40 text-right">Total Points</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {rankings.map((item, idx) => (
                      <motion.tr 
                        key={item.team}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group hover:bg-support/5 transition-colors border-b border-support/10 last:border-none"
                      >
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <span className={`text-2xl font-bebas italic ${item.rank <= 3 ? 'text-primary' : 'text-foreground/20'}`}>
                              #{item.rank}
                            </span>
                            {item.rank === 1 && <Crown className="w-4 h-4 text-primary" />}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-support/10 overflow-hidden border border-support/10">
                              <img src={item.avatar} alt={item.team} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-bold text-foreground group-hover:text-primary transition-colors font-outfit">{item.team}</div>
                              <div className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest">{item.subtitle}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="w-full max-w-[200px]">
                            <div className="flex justify-between text-[10px] font-black text-foreground/40 mb-1.5 uppercase tracking-widest">
                              <span>Progress</span>
                              <span>{item.progress}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-support/10 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${item.progress}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full bg-primary rounded-full shadow-sm shadow-primary/20"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            {item.change === 'up' && <ChevronUp className="w-4 h-4 text-green-600" />}
                            {item.change === 'down' && <ChevronDown className="w-4 h-4 text-primary" />}
                            {item.change === 'none' && <div className="w-4 h-0.5 bg-foreground/20 rounded-full" />}
                            <span className={`text-xs font-bold uppercase tracking-tighter ${
                              item.change === 'up' ? 'text-green-600' : 
                              item.change === 'down' ? 'text-primary' : 
                              'text-foreground/40'
                            }`}>
                              {item.change === 'none' ? 'Stable' : item.change === 'up' ? '+2 POS' : '-1 POS'}
                            </span>
                            {item.isNew && (
                              <span className="px-2 py-0.5 rounded bg-primary text-white text-[8px] font-black uppercase tracking-widest shadow-sm shadow-primary/20">New</span>
                            )}
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="text-2xl font-bebas tracking-wide text-foreground italic">{item.points.toLocaleString()}</div>
                          <div className="text-[10px] text-foreground/40 font-black uppercase tracking-widest">{item.hackathons} Hackathons</div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
            
            <div className="px-8 py-6 bg-support/5 border-t border-support/10 flex justify-between items-center">
              <span className="text-[10px] text-foreground/40 font-black uppercase tracking-widest">Showing 1-5 of 12,842 architects</span>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg border border-support/20 bg-surface text-foreground/30 hover:text-primary transition-colors cursor-pointer active:scale-95">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, '...', 12].map((p, i) => (
                    <button 
                      key={i}
                      className={`w-8 h-8 rounded-lg text-xs font-black transition-all cursor-pointer border-none ${
                        p === 1 ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110' : 'text-foreground/40 hover:bg-support/20 bg-transparent'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <button className="p-2 rounded-lg border border-support/20 bg-surface text-foreground/30 hover:text-primary transition-colors cursor-pointer active:scale-95">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Special Mentions */}
        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-support/5 p-10 rounded-3xl border border-support/10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="w-24 h-24 rounded-3xl bg-surface shadow-xl flex items-center justify-center text-primary shrink-0 border border-support/10">
                <Sparkles className="w-12 h-12" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bebas tracking-wider text-foreground mb-2 italic uppercase">The Catalyst Award</h3>
                <p className="text-foreground/60 text-sm leading-relaxed mb-6 font-outfit">Recognizing the team with the most successful handovers in a single season. Structural integrity at its finest.</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-support/20 overflow-hidden border-2 border-surface shadow-md">
                    <img src="https://i.pravatar.cc/100?u=catalyst" alt="Winner" />
                  </div>
                  <span className="text-xs font-black text-foreground uppercase tracking-widest">Winner: Radiant Docs</span>
                </div>
              </div>
            </div>
            
            <div className="bg-foreground p-10 rounded-3xl text-background relative overflow-hidden group border border-foreground">
              <Zap className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform text-primary" />
              <h3 className="text-2xl font-bebas tracking-wider mb-2 italic uppercase text-white">Sprint Masters</h3>
              <p className="text-background/40 text-xs font-bold uppercase tracking-tight mb-8">Fastest deployment from handover to production.</p>
              <div className="text-5xl font-bebas text-primary tracking-widest italic">02:14:45</div>
              <div className="text-[10px] text-background/40 uppercase font-black tracking-widest mt-2">Record Time</div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <HandoverHUD />
    </div>
  );
};

export default RankingsPage;
