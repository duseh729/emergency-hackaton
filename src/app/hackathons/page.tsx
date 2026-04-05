"use client";

import { useState } from 'react';
import { Calendar, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HandoverHUD from '@/components/HandoverHUD';

const HackathonListPage = () => {
  const router = useRouter();
  const [filter, setFilter] = useState('all');
  
  const hackathons = [
    {
      id: 1,
      status: 'Active',
      title: '긴급 인수인계 해커톤',
      date: 'Oct 12 - Oct 14, 2026',
      participants: 120,
      tags: ['#AI', '#Python'],
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      status: 'Upcoming',
      title: 'Decentralize Everything',
      date: 'Nov 05 - Nov 07, 2026',
      participants: 45,
      tags: ['#Web3', '#Solidity'],
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      status: 'Active',
      title: 'Interface Alchemy',
      date: 'Oct 20 - Oct 22, 2026',
      participants: 88,
      tags: ['#UI/UX', '#Design'],
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 4,
      status: 'Upcoming',
      title: 'React Revolution',
      date: 'Dec 01 - Dec 03, 2026',
      participants: 212,
      tags: ['#React', '#Frontend'],
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 5,
      status: 'Completed',
      title: 'Hardware Horizon',
      date: 'Sep 10 - Sep 12, 2026',
      participants: 74,
      tags: ['#IoT', '#Hardware'],
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const filteredHackathons = filter === 'all' ? hackathons : hackathons.filter(h => h.status.toLowerCase() === filter);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="max-w-7xl mx-auto px-8">
          <section className="pt-20 pb-16 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
              <div className="w-full md:w-3/5">
                <span className="text-[10px] uppercase tracking-widest text-primary font-bold mb-4 block">Ignite Your Innovation</span>
                <h1 className="font-bebas text-6xl md:text-8xl tracking-wider text-foreground mb-6 leading-tight uppercase italic">
                  CHALLENGE <br/> <span className="text-primary italic">YOURSELF</span>
                </h1>
                <p className="text-foreground/60 text-xl max-w-xl leading-relaxed font-outfit">
                  The Kinetic Atelier for builders. Join the world's most creative hackathons and turn your wildest ideas into functional prototypes.
                </p>
              </div>
              <div className="w-full md:w-2/5 aspect-square bg-support/10 rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 group border border-support/20">
                <img 
                  alt="Builders collaborating" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                />
              </div>
            </div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          </section>

          <div className="sticky top-[72px] z-40 py-6 bg-background/80 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 bg-support/10 p-1 rounded-full border border-support/10">
                {['All', 'Active', 'Upcoming', 'Completed'].map((s) => (
                  <button 
                    key={s}
                    onClick={() => setFilter(s.toLowerCase())}
                    className={`px-6 py-2 rounded-full font-bold transition-all cursor-pointer border-none text-sm ${
                      filter === s.toLowerCase() ? 'bg-primary text-white shadow-lg scale-105' : 'text-foreground/50 hover:bg-support/20 bg-transparent'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
                <span className="text-foreground/40 text-[10px] font-black uppercase tracking-widest mr-2">Tags:</span>
                <div className="flex gap-2">
                  {['Web3', 'AI/ML', 'Design', 'Open Source'].map(tag => (
                    <button key={tag} className="px-4 py-1.5 rounded-md bg-support/10 text-foreground/70 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-colors cursor-pointer border-none">
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <section className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredHackathons.map((h) => (
                  <motion.div 
                    key={h.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => router.push(`/hackathons/${h.id}`)}
                    className="group bg-surface rounded-2xl overflow-hidden flex flex-col hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(255,99,71,0.1)] transition-all duration-300 border border-support/10 cursor-pointer"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        alt={h.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        src={h.image}
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          h.status === 'Active' ? 'bg-primary text-white' : 
                          h.status === 'Upcoming' ? 'bg-support text-white' : 
                          'bg-foreground/40 text-white'
                        }`}>
                          {h.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="font-outfit text-2xl font-bold text-foreground mb-2">{h.title}</h3>
                      <p className="text-foreground/50 text-xs font-bold uppercase tracking-tighter mb-6 flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-primary" /> {h.date}
                      </p>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-surface bg-support/10 overflow-hidden">
                              <img src={`https://i.pravatar.cc/100?u=${h.id + i}`} alt="User" />
                            </div>
                          ))}
                          <div className="w-8 h-8 rounded-full border-2 border-surface bg-support/5 flex items-center justify-center text-[10px] font-bold text-primary">
                            +{h.participants - 3}
                          </div>
                        </div>
                        <span className="text-foreground/40 text-[10px] font-black uppercase tracking-widest">{h.participants} Participants</span>
                      </div>
                      <div className="mt-auto flex flex-wrap gap-2">
                        {h.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-support/5 text-foreground/40 rounded-md text-[10px] font-bold uppercase tracking-wider border border-support/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}

                <motion.div 
                  layout
                  className="group relative rounded-2xl overflow-hidden flex flex-col justify-center items-center text-center p-12 bg-primary border-none hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-primary/20"
                >
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
                  <h3 className="font-bebas text-3xl font-black text-white mb-4 leading-tight tracking-wider uppercase italic">Host Your Own <br/> Hackathon</h3>
                  <p className="text-white/80 mb-8 text-xs font-bold uppercase tracking-tight">Ready to inspire the next generation of builders? Start your journey here.</p>
                  <button className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-support/10 transition-colors shadow-lg cursor-pointer flex items-center gap-2 border-none text-xs uppercase tracking-widest">
                    <Plus className="w-4 h-4" /> Get Started
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <HandoverHUD />
    </div>
  );
};

export default HackathonListPage;
