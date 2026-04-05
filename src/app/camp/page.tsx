"use client";

import { useState, useEffect, Suspense } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Code,  
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TeamCard from '@/components/TeamCard';
import HandoverHUD from '@/components/HandoverHUD';
import { getStorage, setStorage, STORAGE_KEYS } from '@/lib/storage';

const POSITIONS = ['Frontend', 'Backend', 'Designer', 'PM', 'AI/ML'];

// Separate component to handle query params so wrapping with Suspense works cleanly
const CampContent = () => {
  const searchParams = useSearchParams();
  const hackathonQuery = searchParams.get('hackathon');
  const createQuery = searchParams.get('create');

  const [activeFilter, setActiveFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  
  const [rawTeams, setRawTeams] = useState<any[]>([]);
  const [hackathonsList, setHackathonsList] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [intro, setIntro] = useState('');
  const [selectedHackathon, setSelectedHackathon] = useState('');
  const [lookingFor, setLookingFor] = useState<string[]>([]);
  const [contactUrl, setContactUrl] = useState('');

  useEffect(() => {
    // Load from local storage
    const loadedTeams = getStorage(STORAGE_KEYS.TEAMS, []);
    const loadedHackathons = getStorage(STORAGE_KEYS.HACKATHONS, []);
    setRawTeams(loadedTeams);
    setHackathonsList(loadedHackathons);

    if (hackathonQuery) {
      // Try to find the hackathon's title
      const h = loadedHackathons.find((hack: any) => hack.slug === hackathonQuery);
      if (h) {
        setActiveFilter(h.title);
        setSelectedHackathon(h.slug);
      }
    }

    if (createQuery === 'true') {
      setIsModalOpen(true);
    }
  }, [hackathonQuery, createQuery]);

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !intro || !selectedHackathon) return;

    const newTeam = {
      teamCode: Math.floor(Math.random() * 1000).toString(),
      name,
      hackathonSlug: selectedHackathon,
      intro,
      memberCount: 1, // Maker is the first member
      lookingFor,
      contact: {
        type: 'openchat',
        url: contactUrl
      }
    };

    const updatedTeams = [newTeam, ...rawTeams];
    setStorage(STORAGE_KEYS.TEAMS, updatedTeams);
    setRawTeams(updatedTeams);
    setIsModalOpen(false);
    
    // Reset form
    setName('');
    setIntro('');
    setLookingFor([]);
    setContactUrl('');
  };

  const toggleRole = (role: string) => {
    setLookingFor(prev => 
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  // Map to format suitable for team card
  const displayTeams = rawTeams.map((t, idx) => {
    const hackathon = hackathonsList.find((h: any) => h.slug === t.hackathonSlug);
    return {
      id: idx + 1,
      name: t.name,
      description: t.intro,
      hackathon: hackathon ? hackathon.title : t.hackathonSlug,
      currentMembers: t.memberCount,
      maxMembers: 5,
      icon: <Users className="w-8 h-8" />,
      roles: t.lookingFor.map((role: string) => ({
        name: role,
        icon: <Code className="w-3 h-3" />,
        color: 'bg-primary/10 text-primary'
      })),
      members: Array.from({ length: t.memberCount }).map((_, i) => ({
        avatar: `https://i.pravatar.cc/100?u=${t.teamCode || idx}${i}`
      }))
    };
  });

  const filteredTeams = displayTeams.filter(team => {
    const hackathonMatch = activeFilter === 'All' || team.hackathon === activeFilter;
    const roleMatch = roleFilter === 'All' || team.roles.some((r: any) => r.name === roleFilter);
    return hackathonMatch && roleMatch;
  });

  // Extract unique filter names safely
  const availableHackathonFilters = ['All', ...Array.from(new Set(displayTeams.map(t => t.hackathon)))];
  const availableRoleFilters = ['All', ...Array.from(new Set(displayTeams.flatMap(t => t.roles.map((r: any) => r.name))))];

  return (
    <>
      <main className="grow pt-16">
        <section className="px-6 py-20 bg-support/5 relative overflow-hidden border-b border-support/10">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 skew-x-12 translate-x-20" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
              <div className="max-w-2xl">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-4 block">Team Recruitment</span>
                <h1 className="text-5xl md:text-7xl font-bebas tracking-wider mb-6 italic uppercase">
                  THE <span className="text-primary italic">CAMP</span>
                </h1>
                <p className="text-lg text-foreground/70 leading-relaxed font-outfit">
                  Don't build alone. Find your perfect architectural partners, join a squad, and master the art of the handover together.
                </p>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95 cursor-pointer border-none shadow-lg shadow-primary/10 uppercase tracking-widest text-sm"
              >
                <Plus className="w-5 h-5" /> Create a Team
              </button>
            </div>
          </div>
        </section>

        <section className="px-6 py-12 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Filters Sidebar */}
            <aside className="w-full lg:w-72 space-y-8 lg:sticky lg:top-24">
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
                      {availableHackathonFilters.map(f => (
                        <button 
                          key={`hqf-${f}`}
                          onClick={() => setActiveFilter(f as string)}
                          className={`text-left px-4 py-2 rounded-xl text-sm font-bold transition-all border-none cursor-pointer ${
                            activeFilter === f ? 'bg-primary text-white shadow-md' : 'text-foreground/50 hover:bg-support/10 bg-transparent'
                          }`}
                        >
                          {f as string}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-4 flex items-center gap-2">
                      <Users className="w-3 h-3" /> Looking For
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {availableRoleFilters.map(r => (
                        <button 
                          key={`hrf-${r}`}
                          onClick={() => setRoleFilter(r as string)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-none cursor-pointer ${
                            roleFilter === r ? 'bg-primary text-white shadow-md' : 'bg-support/10 text-foreground/60 hover:bg-support/20'
                          }`}
                        >
                          {r as string}
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
              {filteredTeams.length === 0 ? (
                 <div className="py-20 text-center bg-support/5 rounded-3xl border-2 border-dashed border-support/20">
                   <Users className="w-12 h-12 text-support/30 mx-auto mb-4" />
                   <h3 className="text-xl font-bebas text-foreground/50 tracking-wider">No teams found</h3>
                   <p className="text-foreground/40 text-sm font-bold uppercase tracking-tight mb-6">There are no teams for this hackathon yet.</p>
                   <button onClick={() => setIsModalOpen(true)} className="bg-primary text-white px-6 py-3 rounded-xl font-bold cursor-pointer border-none uppercase tracking-widest text-xs hover:shadow-lg shadow-primary/20 transition-all">
                     Be the first to create one!
                   </button>
                 </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnimatePresence mode="popLayout">
                    {filteredTeams.map((team) => (
                      <TeamCard key={`tcard-${team.id}`} team={team} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Creation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-surface w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-support/20"
            >
              <div className="p-6 border-b border-support/10 flex justify-between items-center bg-support/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Plus className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bebas tracking-wider uppercase italic">Create New Team</h3>
                    <p className="text-[10px] uppercase font-black tracking-widest text-foreground/40">Gather your architecture squad</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-support/20 transition-colors border-none bg-transparent cursor-pointer text-foreground/50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateTeam} className="p-8 space-y-6">
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Target Hackathon *</label>
                  <select 
                    required
                    value={selectedHackathon}
                    onChange={(e) => setSelectedHackathon(e.target.value)}
                    className="w-full bg-background border border-support/20 rounded-xl p-4 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-foreground appearance-none"
                  >
                    <option value="" disabled>Select a Hackathon</option>
                    {hackathonsList.map((h: any) => (
                      <option key={h.slug} value={h.slug}>{h.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Team Name *</label>
                  <input 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-background border border-support/20 rounded-xl p-4 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-foreground font-bold" 
                    placeholder="Enter your epic team name..." 
                    type="text" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Introduction *</label>
                  <textarea 
                    required 
                    value={intro}
                    onChange={(e) => setIntro(e.target.value)}
                    className="w-full bg-background border border-support/20 rounded-xl p-4 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-foreground" 
                    rows={3} 
                    placeholder="Describe your team's goal and vibe..." 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Looking For</label>
                  <div className="flex flex-wrap gap-2">
                    {POSITIONS.map(pos => (
                      <button
                        key={pos}
                        type="button"
                        onClick={() => toggleRole(pos)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-none cursor-pointer ${
                          lookingFor.includes(pos) 
                            ? 'bg-primary text-white shadow-md' 
                            : 'bg-support/10 text-foreground/60 hover:bg-support/20'
                        }`}
                      >
                        {pos}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Contact Link (Opentalk / Form)</label>
                  <input 
                    value={contactUrl}
                    onChange={(e) => setContactUrl(e.target.value)}
                    className="w-full bg-background border border-support/20 rounded-xl p-4 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-foreground" 
                    placeholder="https://open.kakao.com/o/..." 
                    type="url" 
                  />
                </div>

                <div className="flex justify-end pt-4 gap-4">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-4 rounded-xl font-bebas text-lg tracking-wider text-foreground/50 hover:bg-support/10 transition-all cursor-pointer border-none uppercase"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-primary flex flex-1 max-w-[200px] justify-center text-white px-8 py-4 rounded-xl font-bebas text-lg tracking-wider hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 cursor-pointer border-none uppercase italic"
                  >
                    Create Team
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const CampPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <Suspense fallback={<div className="pt-24 flex justify-center text-primary font-bebas text-4xl">LOADING CAMP...</div>}>
         <CampContent />
      </Suspense>
      <Footer />
      <HandoverHUD />
    </div>
  );
};

export default CampPage;
