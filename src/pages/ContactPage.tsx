import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function ContactPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRefs = useRef<(HTMLElement | null)[]>([]);

    useGSAP(() => {
        gsap.from(contentRefs.current, {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="min-h-screen bg-[#000000] pt-32 pb-24 px-6 md:px-12 lg:px-20">
            <div className="max-w-4xl mx-auto">
                <h2
                    ref={el => { contentRefs.current[0] = el; }}
                    className="text-sm tracking-widest uppercase text-[#1A1A1A] font-['Inter'] mb-12"
                >
                    Identity
                </h2>
                <div className="space-y-8">
                    <p
                        ref={el => { contentRefs.current[1] = el; }}
                        className="text-2xl md:text-3xl text-[#FFFFFF] leading-tight font-light max-w-2xl"
                    >
                        Freelance director and editor from Italy, based in London.
                    </p>
                    <div
                        ref={el => { contentRefs.current[2] = el; }}
                        className="pt-4 space-y-4 text-sm text-[#D6D3C9] font-['Inter'] leading-relaxed uppercase tracking-widest"
                    >
                        <p>
                            Director representation (non-exclusive): Dadbod Films
                        </p>
                        <p>
                            Part of Wild Island Films Editing Roster
                        </p>
                    </div>
                    <div
                        ref={el => { contentRefs.current[3] = el; }}
                        className="pt-8"
                    >
                        <a href="mailto:fusetti.riccardo@gmail.com" className="group relative overflow-hidden inline-flex items-center justify-center rounded-full border border-[#1A1A1A] px-8 py-4 text-xs font-semibold text-[#FFFFFF] uppercase tracking-widest transition-transform duration-300 hover:scale-[1.03]">
                            <span className="absolute inset-0 bg-[#D6D3C9] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></span>
                            <span className="relative z-10 group-hover:text-[#000000] transition-colors duration-300">fusetti.riccardo@gmail.com</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
