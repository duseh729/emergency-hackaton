"use client";

import Image from 'next/image';

interface ChallengeCardProps {
  status: string;
  endsIn: string;
  title: string;
  description: string;
  teams: string;
  image: string;
  isUpcoming?: boolean;
  onClick: () => void;
}

const ChallengeCard = ({ status, endsIn, title, description, teams, image, isUpcoming, onClick }: ChallengeCardProps) => (
  <div 
    onClick={onClick}
    className="bg-surface rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row group border border-support/10 cursor-pointer hover:shadow-md transition-shadow"
  >
    <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden">
      <img 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        src={image} 
        alt={title}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <div className="md:w-3/5 p-8 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${isUpcoming ? 'bg-support/20 text-primary' : 'bg-primary text-white'}`}>
          {status}
        </span>
        <span className="text-foreground/40 text-xs font-bold">{endsIn}</span>
      </div>
      <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors font-outfit text-foreground">{title}</h4>
      <p className="text-foreground/60 text-sm mb-6 line-clamp-2">{description}</p>
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-support/10">
        <span className="text-xs font-bold text-foreground/40">{teams}</span>
        <button className="text-primary font-bold text-sm hover:underline cursor-pointer border-none bg-transparent p-0">
          {isUpcoming ? 'Register' : 'Join Now'}
        </button>
      </div>
    </div>
  </div>
);

export default ChallengeCard;
