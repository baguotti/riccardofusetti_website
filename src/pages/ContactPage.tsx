import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function ContactPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!contentRef.current) return;

        const children = contentRef.current.children;

        gsap.from(children, {
            y: 40,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out"
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative min-h-screen bg-black pt-40 pb-24 px-6 md:px-12 overflow-hidden selection:bg-[#D6D3C9] selection:text-black">
            {/* Global Noise Overlay */}
            <div className="noise-overlay" />

            <div className="max-w-[480px] mx-auto relative z-10">
                <div ref={contentRef} className="space-y-16">
                    {/* Header Label */}
                    <div className="flex items-center gap-4">
                        <span className="w-8 h-[1px] bg-[#1A1A1A]" />
                        <h2 className="text-[10px] tracking-[0.3em] uppercase text-[#333] font-['JetBrains_Mono']">
                            Info / Contact
                        </h2>
                    </div>

                    {/* Main Statement */}
                    <div className="space-y-6">
                        <p className="text-3xl md:text-4xl text-white leading-[1.1] tracking-tight">
                            <span className="font-['Playfair_Display'] italic pr-2">Freelance</span>
                            <span className="font-['Inter'] font-light">Director & Editor</span>
                        </p>
                        <p className="text-sm font-['JetBrains_Mono'] text-[#555] uppercase tracking-widest">
                            Italy — London — Worldwide
                        </p>
                    </div>

                    {/* Representation */}
                    <div className="space-y-4 font-['Inter'] text-[11px] uppercase tracking-[0.2em] text-[#888]">
                        <div className="flex flex-col gap-1">
                            <span className="text-[#333] text-[9px] tracking-widest mb-1">Director Representation</span>
                            <p className="text-white">DADBOD FILMS (Non-Exclusive)</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[#333] text-[9px] tracking-widest mb-1">Editor Roster</span>
                            <p className="text-white font-medium">Wild Island Films</p>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="pt-8">
                        <a
                            href="mailto:fusetti.riccardo@gmail.com"
                            className="group relative overflow-hidden inline-block w-full border border-[#1A1A1A] px-10 py-6 text-center transition-all duration-500 hover:border-[#D6D3C9]"
                        >
                            {/* Sliding Background */}
                            <span className="absolute inset-x-0 bottom-0 h-0 bg-[#D6D3C9] transition-all duration-500 ease-out group-hover:h-full"></span>

                            <div className="relative z-10 flex flex-col items-center gap-2">
                                <span className="text-[9px] text-[#444] tracking-[0.4em] uppercase group-hover:text-black transition-colors duration-300">
                                    Start a conversation
                                </span>
                                <span className="text-sm text-white font-['JetBrains_Mono'] group-hover:text-black transition-colors duration-300">
                                    fusetti.riccardo@gmail.com
                                </span>
                            </div>

                            {/* Corner Accents */}
                            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#1A1A1A] group-hover:border-[#D6D3C9] transition-colors duration-300" />
                            <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#1A1A1A] group-hover:border-[#D6D3C9] transition-colors duration-300" />
                            <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#1A1A1A] group-hover:border-[#D6D3C9] transition-colors duration-300" />
                            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#1A1A1A] group-hover:border-[#D6D3C9] transition-colors duration-300" />
                        </a>
                    </div>

                    {/* Footer Status */}
                    <div className="pt-12 flex items-center justify-between border-t border-[#111]">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[9px] font-['JetBrains_Mono'] text-[#333] uppercase tracking-widest">System Operational</span>
                        </div>
                        <span className="text-[9px] font-['JetBrains_Mono'] text-[#1A1A1A] uppercase">©2024 RF</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
