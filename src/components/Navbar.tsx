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
                    <span className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest text-[#FFFFFF] flex-shrink-0 cursor-default">
                        Riccardo Fusetti
                    </span>

                    <nav className="flex items-center gap-3 sm:gap-5 md:gap-8">
                        <NavLink to="/" className={({ isActive }) => `text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 ${isActive ? 'text-[#D6D3C9]' : 'text-[#FFFFFF] opacity-70 hover:opacity-100'}`} end>Director</NavLink>
                        {/* <NavLink to="/photography" className={({ isActive }) => `text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 ${isActive ? 'text-[#D6D3C9]' : 'text-[#FFFFFF] opacity-70 hover:opacity-100'}`}>Photography</NavLink> */}
                        <NavLink to="/editor" className={({ isActive }) => `text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 ${isActive ? 'text-[#D6D3C9]' : 'text-[#FFFFFF] opacity-70 hover:opacity-100'}`}>Editor</NavLink>
                    </nav>

                    <NavLink
                        to="/contact"
                        className="group relative overflow-hidden flex-shrink-0 inline-flex items-center justify-center rounded-full bg-[#4A4A4A] px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-[9px] sm:text-[10px] md:text-xs font-semibold text-[#D6D3C9] uppercase tracking-widest transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-105"
                    >
                        <span className="absolute inset-0 bg-[#D6D3C9] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></span>
                        <span className="relative z-10 group-hover:text-[#000000] transition-colors duration-300">Contact</span>
                    </NavLink>
                </div>
            </div>
        </header>
    );
}
