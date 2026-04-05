import Link from 'next/link';

const Footer = () => (
  <footer className="w-full py-12 mt-auto bg-support/5 border-t border-support/10">
    <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 gap-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <span className="text-xl font-bebas text-primary tracking-wider uppercase">Daker Platform</span>
        <p className="text-foreground/50 text-[10px] tracking-widest font-bold uppercase">© 2026 DAKER. Built for the Radiant Architect.</p>
      </div>
      <div className="flex gap-8">
        {['Terms', 'Privacy', 'Contact', 'Support'].map(item => (
          <Link key={item} className="text-foreground/40 hover:text-primary text-[10px] uppercase tracking-widest font-bold hover:translate-y-[-1px] transition-transform duration-200 no-underline" href="#">
            {item}
          </Link>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
