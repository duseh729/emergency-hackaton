"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeftRight, Info, BarChart3, Calendar, Trophy, Users, 
  UploadCloud, ListOrdered, Clock, Lock, BookOpen, X
} from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TeamCard from '@/components/TeamCard';
import EmptyState from '@/components/ui/EmptyState';
import { getStorage, setStorage, STORAGE_KEYS } from '@/lib/storage';

import mockHackathonDetails from '@/data/mock/public_hackathon_detail.json';
import mockTeams from '@/data/mock/public_teams.json';
import mockLeaderboards from '@/data/mock/public_leaderboard.json';

const TABS = ['Overview', 'Eval', 'Schedule', 'Prize', 'Teams', 'Rules', 'Leaderboard'];

const SIDEBAR_ITEMS = [
  { id: 'Overview', icon: Info, label: 'Overview' },
  { id: 'Eval', icon: BarChart3, label: 'Eval' },
  { id: 'Schedule', icon: Calendar, label: 'Schedule' },
  { id: 'Prize', icon: Trophy, label: 'Prize' },
  { id: 'Teams', icon: Users, label: 'Teams' },
  { id: 'Rules', icon: BookOpen, label: 'Rules' },
  { id: 'Leaderboard', icon: ListOrdered, label: 'Leaderboard' },
];

const HackathonDetailPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const [rawTeams, setRawTeams] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  
  // Form State
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submitTeam, setSubmitTeam] = useState('');
  const [submitData, setSubmitData] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setRawTeams(getStorage(STORAGE_KEYS.TEAMS, mockTeams));
    setSubmissions(getStorage(STORAGE_KEYS.SUBMISSIONS, []));
  }, []);
  
  // Find specific detail data
  const detailData: any = mockHackathonDetails.slug === id 
    ? mockHackathonDetails 
    : mockHackathonDetails.extraDetails?.find(d => d.slug === id);

  // ScrollSpy Effect
  useEffect(() => {
    if (!detailData) return;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180; // Offset for stick header
      
      let currentActiveIndex = -1;
      for (let i = TABS.length - 1; i >= 0; i--) {
        const section = document.getElementById(TABS[i]);
        if (section && section.offsetTop <= scrollPosition) {
          currentActiveIndex = i;
          break;
        }
      }

      // Force last tab when scrolled to bottom
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        currentActiveIndex = TABS.length - 1;
      }

      if (currentActiveIndex !== -1 && TABS[currentActiveIndex] !== activeTab) {
        setActiveTab(TABS[currentActiveIndex]);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab, detailData]);

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 140, // Offset to not overlap under the sticky top bar
        behavior: 'smooth'
      });
    }
  };

  if (!detailData) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center pt-24 px-6">
          <EmptyState 
            title="Hackathon Not Found" 
            description="The hackathon you are looking for does not exist or has been removed."
            actionText="Back to List"
            onAction={() => router.push('/hackathons')}
          />
        </main>
        <Footer />
      </div>
    );
  }

  // Filter associated teams
  const hackathonTeams = rawTeams.filter(t => t.hackathonSlug === id).map((t, idx) => ({
    id: idx + 1,
    name: t.name,
    description: t.intro,
    hackathon: detailData.title,
    currentMembers: t.memberCount,
    maxMembers: 5,
    icon: <Users className="w-8 h-8" />,
    roles: (t.lookingFor || []).map((role: string) => ({
      name: role,
      icon: <Users className="w-3 h-3" />,
      color: 'bg-primary/10 text-primary'
    })),
    members: Array.from({ length: t.memberCount || 1 }).map((_, i) => ({
      avatar: `https://i.pravatar.cc/100?u=team${t.teamCode}${i}`
    }))
  }));

  // Leaderboard \u0026 Submissions logic
  const rawLeaderboard = mockLeaderboards.hackathonSlug === id 
    ? mockLeaderboards.entries 
    : mockLeaderboards.extraLeaderboards?.find(lb => lb.hackathonSlug === id)?.entries || [];
  
  let allLeaderboardEntries: any[] = [...rawLeaderboard];
  
  // Ad-hoc merge for just submitted teams that don't have scores yet
  submissions.forEach(sub => {
    if (sub.hackathonSlug === id && !allLeaderboardEntries.some(r => r.teamName === sub.teamName)) {
      allLeaderboardEntries.push({ teamName: sub.teamName, score: 'Pending' });
    }
  });

  const rankedEntries = allLeaderboardEntries.sort((a, b) => {
    const scoreA = typeof a.score === 'number' ? a.score : 0;
    const scoreB = typeof b.score === 'number' ? b.score : 0;
    return scoreB - scoreA; // Pending (0) goes to bot of scored list
  });

  const notSubmittedTeams = hackathonTeams.filter(team => 
    !allLeaderboardEntries.some(r => r.teamName === team.name)
  );

  // Submission items logic
  const submissionItems = detailData?.sections?.submit?.submissionItems || [];
  const visibleSubItems = submissionItems.filter((item: any) => item.format !== 'text');
  const textOnlyItems = submissionItems.filter((item: any) => item.format === 'text');
  const additionalPlaceholder = textOnlyItems.length > 0 
    ? `Provide ${textOnlyItems.map((i: any) => i.title).join(', ')} and other details...`
    : "Provide any additional useful details...";

  // Submit Handler
  const isSubmitDisabled = !submitTeam || !submitData.description || (detailData?.sections?.submit?.allowedArtifactTypes && !((submitData.files as unknown as string[])?.length)) || visibleSubItems.some((item: any) => !submitData[item.key]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;
    const newSub = { id: Date.now(), hackathonSlug: id, teamName: submitTeam, data: submitData, submittedAt: new Date().toISOString() };
    const newSubs = [...submissions, newSub];
    setSubmissions(newSubs);
    setStorage(STORAGE_KEYS.SUBMISSIONS, newSubs);
    alert('Project successfully submitted!');
    setSubmitData({});
    setSubmitTeam('');
    setIsSubmitModalOpen(false);
    scrollToSection('Leaderboard');
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    
    const allowedStr = detailData?.sections?.submit?.allowedArtifactTypes?.map((t: string) => t === 'zip' ? '.zip' : t === 'pdf' ? '.pdf' : t === 'text' ? '.txt,.md' : `.${t}`).join(',') || '';
    const allowed = allowedStr ? allowedStr.split(',') : null;
    
    const validFiles = Array.from(files).filter(f => {
      if (!allowed) return true;
      return allowed.some((ext: string) => f.name.toLowerCase().endsWith(ext));
    }).map(f => f.name);
    
    if (validFiles.length > 0) {
      const currentFiles = (submitData.files as unknown as string[]) || [];
      setSubmitData(prev => ({...prev, files: [...currentFiles, ...validFiles] as any}));
    } else if (files.length > 0) {
      alert(`Invalid file type selection. Please use: ${detailData.sections.submit?.allowedArtifactTypes?.join(', ')}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex flex-1 pt-16">
        {/* SideNavBar */}
        <aside className="hidden lg:flex flex-col h-[calc(100vh-64px)] w-64 fixed left-0 top-16 bg-support/5 p-4 gap-2 border-r border-support/10">
          <div className="mb-6 px-4">
            <div className="text-xl font-bebas tracking-wider text-primary uppercase italic">Hackathon Hub</div>
            <div className="text-[10px] text-foreground/40 uppercase tracking-widest font-black">Radiant Architect</div>
          </div>
          <nav className="flex flex-col gap-1">
            {SIDEBAR_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 border-none cursor-pointer ${
                  activeTab === item.id 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'text-foreground/50 hover:bg-support/10 bg-transparent'
                }`}
              >
                <item.icon className="w-4 h-4" /> {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-8 md:p-12 relative">
          <button 
            onClick={() => router.back()}
            className="mb-8 flex items-center gap-2 text-foreground/40 hover:text-primary transition-colors font-black text-[10px] uppercase tracking-widest cursor-pointer border-none bg-transparent p-0"
          >
            <ArrowLeftRight className="w-3 h-3 rotate-180" /> Back to List
          </button>
          
          {/* Hero Section */}
          <section className="relative rounded-3xl overflow-hidden mb-16 h-[500px] flex items-center border border-support/10 shadow-xl shadow-primary/5">
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200')" }}
            />
            <div className="absolute inset-0 bg-linear-to-r from-foreground via-foreground/60 to-transparent" />
            <div className="relative z-10 px-12 max-w-2xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg shadow-primary/20">Open for Registration</span>
              <h1 className="text-5xl md:text-7xl font-bebas tracking-wider text-white leading-tight mb-6 italic uppercase">
                {detailData.title.split(':').map((part: string, i: number) => (
                  <span key={i} className={i % 2 !== 0 ? "text-primary italic" : ""}>{part} <br/></span>
                ))}
              </h1>
              <p className="text-background/60 text-lg leading-relaxed mb-8 font-outfit">
                {detailData.sections.overview.summary}
              </p>
              <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 cursor-pointer border-none uppercase tracking-widest font-bebas">
                Join Now
              </button>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
            {/* Left Column (Scrolling Sections) */}
            <div className="lg:col-span-8 space-y-24">
              
              <article id="Overview" className="scroll-mt-[180px]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-primary rounded-full" />
                  <h2 className="text-3xl font-bebas tracking-wider text-foreground italic uppercase">Overview</h2>
                </div>
                <div className="bg-surface rounded-3xl p-10 space-y-8 border border-support/10 shadow-sm shadow-primary/5">
                  <div>
                    <h3 className="text-xl font-bebas tracking-wide mb-4 text-primary uppercase">About the Event</h3>
                    <p className="text-foreground/60 leading-relaxed text-lg font-outfit">
                      {detailData.sections.overview.summary}
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-background/50 p-6 rounded-2xl border border-support/10 shadow-sm">
                      <Users className="text-primary w-6 h-6 mb-3" />
                      <h4 className="font-bebas tracking-wide mb-2 uppercase text-foreground">Team Policy</h4>
                      <p className="text-xs text-foreground/50 font-bold uppercase tracking-tight">최대 {detailData.sections.overview.teamPolicy?.maxTeamSize}인 팀 구성이 가능하며, {detailData.sections.overview.teamPolicy?.allowSolo ? "1인 개발(Solo) 참여도 적극 권장합니다." : ""}</p>
                    </div>
                    <div className="bg-background/50 p-6 rounded-2xl border border-support/10 shadow-sm">
                      <Info className="text-primary w-6 h-6 mb-3" />
                      <h4 className="font-bebas tracking-wide mb-2 uppercase text-foreground">Important Notices</h4>
                      <ul className="text-xs text-foreground/50 font-bold tracking-tight list-disc pl-4 space-y-1">
                        {detailData.sections.info?.notice?.map((n: string, i: number) => <li key={i}>{n}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>

              <article id="Eval" className="scroll-mt-[180px]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-primary rounded-full" />
                  <h2 className="text-3xl font-bebas tracking-wider text-foreground italic uppercase">Evaluation Process</h2>
                </div>
                <div className="bg-surface rounded-3xl p-10 space-y-8 border border-support/10 shadow-sm">
                  <div>
                    <h3 className="text-xl font-bebas tracking-wide mb-2 text-primary uppercase">Metric: {detailData.sections.eval?.metricName}</h3>
                    <p className="text-foreground/60 text-lg font-outfit">{detailData.sections.eval?.description}</p>
                  </div>
                  
                  {detailData.sections.eval?.scoreDisplay?.breakdown && (
                    <div className="space-y-4 pt-4 border-t border-support/10">
                      <h4 className="font-bebas text-lg uppercase text-foreground/80">Score Weights</h4>
                      {detailData.sections.eval.scoreDisplay.breakdown.map((b: any, i: number) => (
                        <div key={i} className="flex justify-between items-center p-4 bg-support/5 rounded-2xl border border-support/10">
                          <span className="font-bold text-xs uppercase text-foreground/50 tracking-widest">{b.label}</span>
                          <span className="text-primary font-bebas text-2xl italic">{b.weightPercent}%</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>

              <section id="Schedule" className="scroll-mt-[180px]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-primary rounded-full" />
                  <h2 className="text-3xl font-bebas tracking-wider text-foreground italic uppercase">Timeline & Milestones</h2>
                </div>
                <div className="relative pl-8 border-l-2 border-support/20 ml-4 space-y-12 py-4">
                  {detailData.sections.schedule?.milestones?.map((item: any, idx: number) => {
                    const d = new Date(item.at);
                    const isPassed = d.getTime() < Date.now();
                    const color = idx === 0 ? 'bg-primary' : isPassed ? 'bg-foreground/20' : 'bg-support';
                    return (
                      <div key={idx} className="relative">
                        <div className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full ${color} ring-4 ring-background`} />
                        <div className={isPassed ? "opacity-60" : "opacity-100"}>
                          <h4 className="text-xl font-bebas tracking-wide uppercase text-foreground">{item.name}</h4>
                          <span className="text-primary font-black text-xs uppercase tracking-widest">{d.toLocaleString()}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section id="Prize" className="scroll-mt-[180px]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-primary rounded-full" />
                  <h2 className="text-3xl font-bebas tracking-wider text-foreground italic uppercase">Prize Breakdown</h2>
                </div>
                {detailData.sections.prize?.items ? (
                  <div className="space-y-6">
                    <div className="relative group overflow-hidden rounded-3xl bg-primary px-8 py-10 text-white shadow-xl shadow-primary/20">
                      <Trophy className="absolute -right-4 -bottom-4 w-48 h-48 opacity-10" />
                      <span className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Champion</span>
                      <h3 className="text-6xl font-bebas tracking-wider italic uppercase">
                        {detailData.sections.prize.items[0]?.amountKRW?.toLocaleString()} <span className="text-2xl">KRW</span>
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {detailData.sections.prize.items.slice(1).map((prize: any, idx: number) => (
                        <div key={idx} className="bg-surface border border-support/10 rounded-3xl p-6 shadow-sm">
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary">{prize.place} Place</span>
                          <div className="text-2xl font-bebas tracking-wider mt-2 italic">{prize.amountKRW?.toLocaleString()} KRW</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <EmptyState icon={<Lock />} title="Prizes Hidden" description="Prize details have not been announced yet." />
                )}
              </section>

              <section id="Teams" className="scroll-mt-[180px]">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-1 bg-primary rounded-full" />
                    <h2 className="text-3xl font-bebas tracking-wider text-foreground italic uppercase">Find A Team</h2>
                  </div>
                  <button 
                    onClick={() => router.push(`/camp?hackathon=${detailData.slug}&create=true`)}
                    className="bg-primary text-white border-primary px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg shadow-primary/20 transition-all cursor-pointer border"
                  >
                    + Create Team
                  </button>
                </div>
                {hackathonTeams.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {hackathonTeams.map(t => <TeamCard key={t.id} team={t} />)}
                  </div>
                ) : (
                  <EmptyState title="No Teams Yet" description="Be the first to create a team for this hackathon!" actionText="Go to Camp" onAction={() => router.push(`/camp?hackathon=${detailData.slug}&create=true`)} />
                )}
              </section>

              <section id="Rules" className="scroll-mt-[180px]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-primary rounded-full" />
                  <h2 className="text-3xl font-bebas tracking-wider text-foreground italic uppercase">Rules & Guidelines</h2>
                </div>
                <div className="bg-support/5 rounded-3xl p-10 space-y-8 border border-support/10">
                  <ul className="text-sm text-foreground/70 tracking-tight list-disc pl-4 space-y-4">
                    {detailData.sections.submit?.guide?.map((n: string, i: number) => <li key={i}>{n}</li>) || <li>Please review the detailed rules document.</li>}
                  </ul>
                </div>
              </section>

              <section id="Leaderboard" className="scroll-mt-[180px] pb-32">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-primary rounded-full" />
                  <h2 className="text-3xl font-bebas tracking-wider text-foreground italic uppercase">Leaderboard</h2>
                </div>
                {rankedEntries.length > 0 ? (
                  <div className="bg-surface rounded-3xl overflow-hidden border border-support/10 shadow-sm">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-support/5 border-b border-support/10">
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40">Rank</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40">Team</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40">Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rankedEntries.map((entry: any, i: number) => (
                          <tr key={i} className="border-b border-support/5 last:border-none hover:bg-support/5 transition-colors">
                            <td className="px-6 py-4 text-xl font-bebas tracking-wider">{i + 1}</td>
                            <td className="px-6 py-4 font-bold font-outfit">
                              {entry.teamName}
                              <span className="ml-3 inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest">
                                Submitted
                              </span>
                            </td>
                            <td className={`px-6 py-4 font-bebas text-xl italic ${entry.score === 'Pending' ? 'text-foreground/40' : 'text-primary'}`}>{entry.score}</td>
                          </tr>
                        ))}
                        
                        {/* Not submitted teams listed without ranks */}
                        {notSubmittedTeams.map((team: any, i: number) => (
                          <tr key={`ns-${i}`} className="border-b border-support/5 last:border-none opacity-50 bg-foreground/5 mix-blend-luminosity">
                            <td className="px-6 py-4 text-xl font-bebas tracking-wider">-</td>
                            <td className="px-6 py-4 font-bold font-outfit flex items-center">
                              {team.name}
                              <span className="ml-3 inline-block px-2 py-0.5 rounded-full bg-foreground/20 text-foreground text-[8px] font-black uppercase tracking-widest">
                                Not Submitted
                              </span>
                            </td>
                            <td className="px-6 py-4 font-bebas text-xl italic text-foreground/40">N/A</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <EmptyState title="No Leaders Yet" description="Submit your project to claim the first spot!" />
                )}
              </section>
            </div>

            {/* Right Column (Fixed Preview) */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-40 self-start z-10 hidden lg:block">
              <button 
                onClick={() => setIsSubmitModalOpen(true)}
                className="w-full bg-primary text-white py-6 rounded-3xl text-3xl font-bebas tracking-widest hover:shadow-2xl hover:shadow-primary/30 transition-all uppercase cursor-pointer border-none italic active:scale-95 shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
              >
                <UploadCloud className="w-6 h-6" /> Submit Project
              </button>

              <div className="bg-foreground p-8 rounded-3xl border border-foreground shadow-xl">
                <h3 className="text-xl font-bebas tracking-wider mb-6 uppercase italic text-white flex justify-between items-center">
                  <span>Top 3 Standings</span>
                  <Trophy className="w-5 h-5 text-primary opacity-50" />
                </h3>
                {rankedEntries.length > 0 ? (
                  <div className="space-y-3">
                    {rankedEntries.slice(0, 3).map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-4 bg-background/10 p-4 rounded-2xl border border-white/5">
                        <div className="text-primary font-bebas text-xl italic">#{idx + 1}</div>
                        <div className="flex-1 font-bold text-sm text-white font-outfit truncate">{item.teamName}</div>
                        <div className="text-white/60 font-black text-xs uppercase tracking-widest">{item.score}</div>
                      </div>
                    ))}
                    <button onClick={() => scrollToSection('Leaderboard')} className="w-full mt-4 py-3 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/10 rounded-xl cursor-pointer border-none bg-transparent transition-colors">View All</button>
                  </div>
                ) : (
                  <p className="text-background/40 text-[10px] font-black uppercase tracking-widest text-center py-4">No submissions yet.</p>
                )}
              </div>

              <div className="bg-surface rounded-3xl p-8 border border-support/10 shadow-sm">
                <h3 className="text-xl font-bebas tracking-wider mb-4 uppercase text-foreground">Timeline Recap</h3>
                <div className="space-y-4">
                  {detailData.sections.schedule?.milestones?.slice(0, 3).map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center text-xs border-b border-support/5 pb-2 last:border-0 last:pb-0">
                      <span className="font-bold text-foreground/60 uppercase tracking-tight">{item.name}</span>
                      <span className="text-primary font-bebas tracking-wider">{new Date(item.at).toLocaleDateString()}</span>
                    </div>
                  ))}
                  <button onClick={() => scrollToSection('Schedule')} className="w-full mt-4 py-2 text-[10px] font-black uppercase tracking-widest text-foreground/50 hover:bg-support/10 rounded-xl cursor-pointer border-none bg-transparent transition-colors">See Detailed Schedule</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />

      {/* Detail HUD Overlay */}
      <motion.div 
        initial={{ y: 100, x: '-50%' }}
        animate={{ y: 0, x: '-50%' }}
        className="fixed bottom-8 left-1/2 z-50 px-8 py-4 bg-surface/80 backdrop-blur-xl border border-support/20 rounded-full shadow-2xl items-center gap-6 pointer-events-auto hidden md:flex"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white overflow-hidden shadow-lg shadow-primary/20">
            <img alt="Custodian" className="w-full h-full object-cover" src="https://i.pravatar.cc/100?u=alex" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary/70">Current Custodian</p>
            <p className="font-bebas tracking-wide font-bold text-xl leading-none text-foreground italic uppercase">DAKER PRIME</p>
          </div>
        </div>
        <div className="h-8 w-px bg-support/20"></div>
        <div className="flex flex-col items-end">
          <p className="text-[10px] font-black uppercase tracking-widest text-primary/70">Time Remaining</p>
          <div className="flex items-center gap-2 text-primary">
            <Clock className="w-4 h-4" />
            <p className="font-bebas tracking-widest font-black text-xl italic">02:14:45</p>
          </div>
        </div>
      </motion.div>

      {/* Submit Creation Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-6">
          <div className="bg-surface w-full max-w-2xl rounded-3xl p-8 max-h-[90vh] overflow-y-auto border border-support/20 shadow-2xl relative">
            <button 
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full hover:bg-support/10 transition-colors border-none bg-transparent cursor-pointer text-foreground/50"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-4xl font-bebas tracking-wider text-foreground italic uppercase mb-8 flex items-center gap-3">
              <UploadCloud className="text-primary w-8 h-8" /> Final Submission
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Select Your Team *</label>
                <select 
                  required
                  value={submitTeam}
                  onChange={e => setSubmitTeam(e.target.value)}
                  className="w-full bg-background border border-support/20 rounded-xl p-4 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-foreground"
                >
                  <option value="" disabled>Select your team</option>
                  {hackathonTeams.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                </select>
                {hackathonTeams.length === 0 && (
                  <p className="text-xs text-primary mt-2">You don't have a team in this hackathon yet.</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Description (필수 설명) *</label>
                <input 
                  required
                  value={submitData.description || ''}
                  onChange={e => setSubmitData({...submitData, description: e.target.value})}
                  className="w-full bg-background border border-support/20 rounded-xl p-4 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-foreground font-bold" 
                  placeholder="Summarize your project..." 
                  type="text" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Additional Info (부가내용)</label>
                <textarea 
                  value={submitData.additionalInfo || ''}
                  onChange={e => setSubmitData({...submitData, additionalInfo: e.target.value})}
                  className="w-full bg-background border border-support/20 rounded-xl p-4 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-foreground" 
                  rows={4} 
                  placeholder={additionalPlaceholder} 
                />
              </div>

              {visibleSubItems.map((item: any, i: number) => (
                <div key={i} className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">{item.title} ({item.format}) *</label>
                  {item.format.includes('url') ? (
                    <input 
                      required
                      value={submitData[item.key] || ''}
                      onChange={e => setSubmitData({...submitData, [item.key]: e.target.value})}
                      className="w-full bg-background border border-support/20 rounded-xl p-4 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-foreground" 
                      placeholder={`Enter ${item.format}`} 
                      type="text" 
                    />
                  ) : (
                    <textarea 
                      required
                      value={submitData[item.key] || ''}
                      onChange={e => setSubmitData({...submitData, [item.key]: e.target.value})}
                      className="w-full bg-background border border-support/20 rounded-xl p-4 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-foreground" 
                      rows={4} 
                      placeholder="Enter your additional text submission here..." 
                    />
                  )}
                </div>
              ))}

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Artifact Upload ({detailData.sections.submit?.allowedArtifactTypes?.join(', ') || '*'}) {detailData.sections.submit?.allowedArtifactTypes ? '*' : ''}</label>
                <input 
                  type="file" 
                  multiple
                  accept={detailData.sections.submit?.allowedArtifactTypes?.map((t: string) => t === 'zip' ? '.zip' : t === 'pdf' ? '.pdf' : t === 'text' ? '.txt,.md' : `.${t}`).join(',') || undefined}
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={(e) => handleFiles(e.target.files)} 
                />
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    handleFiles(e.dataTransfer.files);
                  }}
                  className={`border-2 border-dashed rounded-3xl p-10 text-center bg-background transition-colors cursor-pointer group ${isDragging ? 'border-primary bg-primary/10 shadow-inner' : ((submitData.files as unknown as string[])?.length ? 'border-primary bg-primary/5 hover:bg-support/5' : 'border-support/20 hover:bg-support/5')}`}
                >
                  <UploadCloud className={`w-8 h-8 mx-auto mb-3 transition-colors ${isDragging || (submitData.files as unknown as string[])?.length ? 'text-primary' : 'text-foreground/20 group-hover:text-primary'}`} />
                  <p className="text-foreground/50 font-bold uppercase tracking-tight text-sm">
                    {isDragging ? 'Drop your files now!' : <>Drag and drop your files here, or <span className="text-primary">browse</span></>}
                  </p>
                </div>
                
                {((submitData.files as unknown as string[]) || []).length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {((submitData.files as unknown as string[]) || []).map((fileName, idx) => (
                      <li key={idx} className="flex items-center justify-between bg-support/5 border border-support/10 rounded-xl px-4 py-3">
                        <span className="text-sm font-bold text-foreground/70 truncate">{fileName}</span>
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const newFiles = ((submitData.files as unknown as string[]) || []).filter((_, i) => i !== idx);
                            setSubmitData({...submitData, files: newFiles as any});
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          className="text-foreground/40 hover:text-primary transition-colors cursor-pointer p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              <div className="flex justify-end pt-4 gap-4">
                <button 
                  type="button" 
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-6 py-4 rounded-xl font-bebas text-lg tracking-wider text-foreground/50 hover:bg-support/10 transition-all cursor-pointer border-none uppercase"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitDisabled}
                  className={`px-10 py-4 rounded-xl font-bebas text-xl tracking-wider transition-all active:scale-95 border-none uppercase italic shadow-lg shadow-primary/20 ${isSubmitDisabled ? 'bg-primary/50 text-white/50 cursor-not-allowed' : 'bg-primary text-white cursor-pointer hover:shadow-2xl hover:shadow-primary/30'}`}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HackathonDetailPage;
