"use client";

import { useState } from 'react';
import { 
  ArrowLeftRight, 
  Info, 
  BarChart3, 
  Calendar, 
  Trophy, 
  Users, 
  UploadCloud, 
  ListOrdered,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import hackathonDetailRaw from '@/data/mock/public_hackathon_detail.json';

const HackathonDetailPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  
  const detailData: any = hackathonDetailRaw.slug === id 
    ? hackathonDetailRaw 
    : hackathonDetailRaw.extraDetails?.find(d => d.slug === id) || hackathonDetailRaw;

  
  const tabs = ['Overview', 'Eval', 'Schedule', 'Prize', 'Teams', 'Submit', 'Leaderboard'];
  
  const sidebarItems = [
    { id: 'Overview', icon: Info, label: 'Overview' },
    { id: 'Eval', icon: BarChart3, label: 'Eval' },
    { id: 'Schedule', icon: Calendar, label: 'Schedule' },
    { id: 'Prize', icon: Trophy, label: 'Prize' },
    { id: 'Teams', icon: Users, label: 'Teams' },
    { id: 'Submit', icon: UploadCloud, label: 'Submit' },
    { id: 'Leaderboard', icon: ListOrdered, label: 'Leaderboard' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex flex-1 pt-16">
        {/* SideNavBar */}
        <aside className="hidden lg:flex flex-col h-[calc(100vh-64px)] w-64 fixed left-0 top-16 bg-support/5 p-4 gap-2 border-r border-support/10">
          <div className="mb-6 px-4">
            <div className="text-xl font-bebas tracking-wider text-primary uppercase italic">Hackathon Hub</div>
            <div className="text-[10px] text-foreground/40 uppercase tracking-widest font-black">Radiant Architect Edition</div>
          </div>
          <nav className="flex flex-col gap-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
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
        <main className="flex-1 lg:ml-64 p-8 md:p-12">
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

          {/* Tab Interface */}
          <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md -mx-8 px-8 mb-12 py-4 flex overflow-x-auto scrollbar-hide border-b border-support/10">
            <div className="flex gap-2 p-1 bg-support/10 rounded-2xl border border-support/10">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer border-none ${
                    activeTab === tab ? 'bg-primary text-white shadow-lg shadow-primary/10' : 'text-foreground/50 hover:bg-support/10 bg-transparent'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-20">
              <article id="overview">
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

              <section id="schedule">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-primary rounded-full" />
                  <h2 className="text-3xl font-bebas tracking-wider text-foreground italic uppercase">Schedule</h2>
                </div>
                <div className="relative pl-8 border-l-2 border-support/20 ml-4 space-y-12 py-4">
                  {detailData.sections.schedule?.milestones?.map((item: any, idx: number) => {
                    const d = new Date(item.at);
                    const isPassed = d.getTime() < Date.now();
                    const color = idx === 0 ? 'bg-primary' : isPassed ? 'bg-foreground/20' : 'bg-support';
                    return (
                      <div key={idx} className="relative">
                        <div className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full ${color} ring-4 ring-background`} />
                        <div>
                          <h4 className="text-xl font-bebas tracking-wide uppercase text-foreground">{item.name}</h4>
                          <span className="text-primary font-black text-xs uppercase tracking-widest">{d.toLocaleString()}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section id="submit">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-primary rounded-full" />
                  <h2 className="text-3xl font-bebas tracking-wider text-foreground italic uppercase">Submit Project</h2>
                </div>
                <form className="bg-support/5 rounded-3xl p-10 space-y-8 border border-support/10">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Project Name</label>
                      <input className="w-full bg-surface border border-support/20 rounded-xl p-4 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-foreground" placeholder="Enter your project title" type="text" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Github Link</label>
                      <input className="w-full bg-surface border border-support/20 rounded-xl p-4 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-foreground" placeholder="https://github.com/..." type="url" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Presentation (PDF)</label>
                    <div className="border-2 border-dashed border-support/20 rounded-3xl p-12 text-center bg-surface hover:bg-support/5 transition-colors cursor-pointer group">
                      <UploadCloud className="w-10 h-10 text-foreground/20 mx-auto mb-4 group-hover:text-primary transition-colors" />
                      <p className="text-foreground/50 font-bold uppercase tracking-tight text-sm">Drag and drop your PDF here, or <span className="text-primary">browse</span></p>
                      <p className="text-[10px] text-foreground/30 mt-2 italic">Max size: 50MB</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-primary text-white px-12 py-4 rounded-xl font-bebas text-xl tracking-wider hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 cursor-pointer border-none uppercase italic">Final Submit</button>
                  </div>
                </form>
              </section>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-12">
              <div className="bg-surface rounded-3xl p-8 shadow-sm border border-support/10">
                <h3 className="text-xl font-bebas tracking-wide mb-6 flex items-center gap-2 uppercase text-foreground">
                  <BarChart3 className="text-primary w-5 h-5" /> Eval Criteria
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Innovation', val: '40%' },
                    { label: 'Technicality', val: '40%' },
                    { label: 'Usability', val: '20%' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-support/5 rounded-2xl border border-support/10">
                      <span className="font-bold text-xs uppercase tracking-widest text-foreground/60">{item.label}</span>
                      <span className="text-primary font-bebas text-2xl italic tracking-wider">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bebas tracking-wide mb-4 px-2 uppercase text-foreground">Prize Pool</h3>
                {detailData.sections.prize?.items ? (
                  <>
                    <div className="relative group overflow-hidden rounded-3xl bg-primary p-6 text-white shadow-xl shadow-primary/20">
                      <Trophy className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10" />
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-80">{detailData.sections.prize.items[0]?.place} Place</span>
                      <div className="text-3xl font-bebas tracking-wider mt-1 italic uppercase">{detailData.sections.prize.items[0]?.amountKRW?.toLocaleString()} KRW</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {detailData.sections.prize.items.slice(1).map((prize: any, idx: number) => (
                        <div key={idx} className={`${idx === 0 ? 'bg-foreground text-white' : 'bg-support/20 text-foreground'} rounded-3xl p-5 shadow-md`}>
                          <span className={`text-[10px] font-black uppercase tracking-widest ${idx === 0 ? 'opacity-60' : 'text-primary'}`}>{prize.place} Place</span>
                          <div className={`text-xl font-bebas tracking-wider mt-1 italic ${idx === 0 ? '' : 'text-primary'}`}>{prize.amountKRW?.toLocaleString()} KRW</div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="bg-support/10 rounded-3xl p-6 text-center text-foreground/40 font-bold uppercase tracking-tight text-xs">No prize pool specified</div>
                )}
              </div>

              <div className="bg-foreground p-8 rounded-3xl border border-foreground shadow-xl">
                <h3 className="text-xl font-bebas tracking-wider mb-6 uppercase italic text-white">Current Standings</h3>
                <div className="space-y-3">
                  {[
                    { rank: 1, name: 'Team Code-Red', desc: 'Architecture Mastery', score: 98.5, color: 'bg-primary' },
                    { rank: 2, name: 'Radiant Docs', desc: 'Clean Code Kings', score: 94.2, color: 'bg-background/20' },
                    { rank: 3, name: 'Handover-Hero', desc: 'UX Specialists', score: 91.8, color: 'bg-background/20' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-foreground p-4 rounded-2xl border border-white/10 shadow-inner">
                      <div className={`w-8 h-8 rounded-full ${item.color} text-white flex items-center justify-center font-bebas text-sm italic shadow-sm`}>{item.rank}</div>
                      <div className="flex-1">
                        <div className="font-bold text-sm text-white font-outfit">{item.name}</div>
                        <div className="text-[10px] text-background/40 font-black uppercase tracking-widest">{item.desc}</div>
                      </div>
                      <div className="text-primary font-bebas text-xl italic">{item.score}</div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-3 text-[10px] font-black uppercase tracking-widest text-primary hover:underline cursor-pointer border-none bg-transparent">View Full Leaderboard</button>
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
        className="fixed bottom-8 left-1/2 z-50 px-8 py-4 bg-surface/80 backdrop-blur-xl border border-support/20 rounded-full shadow-2xl flex items-center gap-6 pointer-events-auto"
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
    </div>
  );
};

export default HackathonDetailPage;
