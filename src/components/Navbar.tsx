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
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full max-w-7xl px-4 flex justify-center">
            <div
                ref={navRef}
                className={`pointer-events-auto flex items-center justify-between w-full md:w-fit md:gap-12 px-6 py-3 rounded-[3rem] transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${scrolled ? 'bg-[#050505]/60 backdrop-blur-xl border border-[#1A1A1A]' : 'bg-transparent border border-transparent'
                    }`}
            >
                <NavLink
                    to="/"
                    className="text-xs uppercase tracking-widest text-[#FFFFFF] flex-shrink-0 opacity-100 hover:opacity-70 transition-opacity duration-300"
                >
                    Riccardo Fusetti
                </NavLink>

                <nav className="hidden md:flex items-center gap-8">
                    <NavLink to="/director" className={({ isActive }) => `text-xs uppercase tracking-widest transition-all duration-300 ${isActive ? 'text-[#D6D3C9]' : 'text-[#FFFFFF] opacity-70 hover:opacity-100'}`}>Director</NavLink>
                    <NavLink to="/editor" className={({ isActive }) => `text-xs uppercase tracking-widest transition-all duration-300 ${isActive ? 'text-[#D6D3C9]' : 'text-[#FFFFFF] opacity-70 hover:opacity-100'}`}>Editor</NavLink>
                </nav>

                <a
                    href="mailto:contact@riccardofusetti.com"
                    className="group relative overflow-hidden inline-flex items-center justify-center rounded-full bg-[#1A1A1A] px-6 py-2.5 text-xs font-semibold text-[#D6D3C9] uppercase tracking-widest transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-105"
                >
                    <span className="absolute inset-0 bg-[#D6D3C9] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></span>
                    <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Contact</span>
                </a>
            </div>
        </header>
    );
}
