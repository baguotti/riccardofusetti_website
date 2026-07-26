import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const navRef = useRef<HTMLDivElement>(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                if (!scrolled) setScrolled(true);
            } else {
                if (scrolled) setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full flex justify-center px-6">
            <div
                ref={navRef}
                className={`pointer-events-auto relative flex items-center justify-between w-full md:w-auto px-3 md:px-5 py-2.5 md:py-3 rounded-[1.75rem] md:rounded-[2rem] transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] overflow-hidden ${scrolled ? 'bg-primary/40 backdrop-blur-xl border border-[#4A4A4A] shadow-[0_0_25px_rgba(214,211,201,0.04)]' : 'bg-transparent backdrop-blur-none border border-transparent shadow-none'
                    }`}
            >
                {/* Noise Layer */}
                <div className={`absolute inset-0 z-0 bg-noise mix-blend-overlay pointer-events-none transition-opacity duration-500 ${scrolled ? 'opacity-[0.06]' : 'opacity-0'}`} />

                <div className="relative z-10 flex w-full items-center justify-between gap-3 sm:gap-6 md:gap-10">
                    <span className="hidden xs:inline-block text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest text-white flex-shrink-0 cursor-default font-medium">
                        Riccardo Fusetti
                    </span>

                    <nav className="flex items-center gap-4 sm:gap-6 md:gap-8">
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => `text-[10px] sm:text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 rounded focus-visible:ring-2 focus-visible:ring-[#D6D3C9] focus-visible:ring-offset-2 focus-visible:ring-offset-black outline-none ${isActive ? 'text-[#D6D3C9] font-medium' : 'text-white/80 hover:text-white'}`} 
                            end
                        >
                            Director
                        </NavLink>
                        <NavLink 
                            to="/editor" 
                            className={({ isActive }) => `text-[10px] sm:text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 rounded focus-visible:ring-2 focus-visible:ring-[#D6D3C9] focus-visible:ring-offset-2 focus-visible:ring-offset-black outline-none ${isActive ? 'text-[#D6D3C9] font-medium' : 'text-white/80 hover:text-white'}`}
                        >
                            Editor
                        </NavLink>
                    </nav>

                    <NavLink
                        to="/contact"
                        className="group relative overflow-hidden flex-shrink-0 inline-flex items-center justify-center rounded-full bg-[#52525B] border border-[#71717A]/40 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-[9px] sm:text-[10px] md:text-xs font-semibold text-[#E4E4E7] uppercase tracking-widest transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#D6D3C9] focus-visible:ring-offset-2 focus-visible:ring-offset-black outline-none"
                    >
                        <span className="absolute inset-0 bg-[#D6D3C9] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></span>
                        <span className="relative z-10 group-hover:text-black transition-colors duration-300">Contact</span>
                    </NavLink>
                </div>
            </div>
        </header>
    );
}
