"use client";

import { Rocket, Users, Trophy } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ActionCard from '@/components/ActionCard';
import ChallengeCard from '@/components/ChallengeCard';
import HandoverHUD from '@/components/HandoverHUD';
import hackathonsData from '@/data/mock/public_hackathons.json';

const HomeHero = () => (
  <section className="relative px-6 py-20 md:py-32 flex flex-col items-center text-center overflow-hidden">
    <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
    <div className="absolute top-1/2 -right-24 w-64 h-64 bg-support/5 rounded-full blur-3xl" />
    
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 max-w-4xl mx-auto"
    >
      <span className="inline-block bg-support/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6 border border-primary/10">
        Built for the Radiant Architect
      </span>
      <h1 className="hero-title mb-6 leading-tight uppercase italic">
        DAKER
      </h1>
      <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed mb-10 font-outfit">
        Mastering the art of the <span className="text-primary font-bold">Emergency Handover</span>. Join high-stakes hackathons where your code survives the transition, built for speed and seamless collaboration.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-primary text-white px-8 py-4 rounded-xl text-base font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all cursor-pointer border-none uppercase tracking-wider">
          Start Building
        </button>
        <button className="bg-surface border-2 border-support/20 text-foreground/70 px-8 py-4 rounded-xl text-base font-bold hover:bg-support/5 transition-all cursor-pointer uppercase tracking-wider">
          Our Methodology
        </button>
      </div>
    </motion.div>
  </section>
);

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="grow pt-24">
        <HomeHero />
        
        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ActionCard 
              icon={Rocket}
              title="Browse Hackathons"
              description="Discover upcoming challenges focused on technical excellence and rapid architectural deployment."
              linkText="EXPLORE EVENTS"
              onClick={() => router.push('/hackathons')}
            />
            <ActionCard 
              icon={Users}
              title="Find Your Team"
              description="Connect with architects, developers, and designers ready for intense collaboration and handovers."
              linkText="GO TO CAMP"
              onClick={() => router.push('/camp')}
            />
            <ActionCard 
              icon={Trophy}
              title="View Rankings"
              description="See who dominates the leaderboard in speed, code quality, and successful project handovers."
              linkText="CHECK STANDINGS"
              onClick={() => router.push('/rankings')}
            />
          </div>
        </section>

        <section className="bg-support/5 py-24 px-6 border-t border-support/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="text-4xl font-bebas text-primary tracking-wider mb-4 uppercase">Current Challenges</h2>
                <p className="text-foreground/50 max-w-md font-bold text-sm uppercase tracking-tight">The most active arenas for the Radiant Architect. Join before the handover window closes.</p>
              </div>
              <button 
                onClick={() => router.push('/hackathons')}
                className="bg-primary/10 text-primary px-6 py-3 rounded-lg font-bold text-sm hover:bg-primary/20 transition-all uppercase tracking-widest cursor-pointer border-none"
              >
                See All Challenges
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {hackathonsData.slice(0, 2).map((h) => (
                <ChallengeCard 
                  key={h.slug}
                  status={h.status === 'ongoing' ? 'Active' : h.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                  endsIn={`Ends: ${new Date(h.period.endAt).toLocaleDateString()}`}
                  title={h.title}
                  description={`Tags: ${h.tags.join(', ')}`}
                  teams="Join to see teams"
                  image={h.thumbnailUrl || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"}
                  isUpcoming={h.status === 'upcoming'}
                  onClick={() => router.push(`/hackathons/${h.slug}`)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <HandoverHUD />
    </div>
  );
}
