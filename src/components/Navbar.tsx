"use client";

import { Search, Bell, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-support/10">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Link 
            href="/"
            className="text-2xl font-bebas tracking-wider text-primary cursor-pointer border-none bg-transparent no-underline"
          >
            DAKER
          </Link>
          <div className="hidden md:flex gap-6 items-center">
            {[
              { name: 'Hackathons', href: '/hackathons' },
              { name: 'Camp', href: '/camp' },
              { name: 'Rankings', href: '/rankings' }
            ].map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className={`text-sm font-bold tracking-wide transition-colors duration-300 cursor-pointer border-none bg-transparent pb-1 no-underline ${
                  pathname.startsWith(item.href) ? 'text-primary border-b-2 border-primary' : 'text-foreground/70 hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 w-4 h-4" />
            <input 
              className="bg-support/10 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/40 w-48 transition-all outline-none text-foreground" 
              placeholder="Search..." 
              type="text"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="text-foreground/70 hover:text-primary transition-colors cursor-pointer border-none bg-transparent">
              <Bell className="w-5 h-5" />
            </button>
            <button className="text-foreground/70 hover:text-primary transition-colors cursor-pointer border-none bg-transparent">
              <UserCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
