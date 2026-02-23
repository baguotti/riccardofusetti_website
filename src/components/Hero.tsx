import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRefs = useRef<(HTMLElement | null)[]>([]);

    useGSAP(() => {
        // Reveal animation matching the spec: y: 40 -> 0, opacity: 0 -> 1, staggered
        gsap.from(textRefs.current, {
            y: 40,
            opacity: 0,
            duration: 1.2,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.2
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden bg-[#000000]">
            {/* Background with subtle architecture mood */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 shrink-0"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2400&auto=format&fit=crop")' }}
            ></div>

            {/* Heavy unified black gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent"></div>

            {/* Content layout pushed to bottom-left third */}
            <div className="relative h-full flex flex-col justify-end p-6 md:p-12 lg:p-20 pb-24 md:pb-32 w-full max-w-7xl mx-auto">
                <h1 className="flex flex-col gap-2 relative z-10">
                    <span
                        ref={el => { textRefs.current[0] = el; }}
                        className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-[#FFFFFF] uppercase"
                    >
                        Raw emotion meets
                    </span>
                    <span
                        ref={el => { textRefs.current[1] = el; }}
                        className="text-[12vw] md:text-[8vw] leading-[0.85] text-[#D6D3C9] uppercase tracking-tighter font-bold"
                    >
                        Precision.
                    </span>
                </h1>

                <div
                    ref={el => { textRefs.current[2] = el as HTMLSpanElement | null; }}
                    className="mt-12 group"
                >
                    <a
                        href="#portfolio"
                        className="inline-flex overflow-hidden relative items-center justify-center rounded-full border border-[#1A1A1A] px-8 py-4 text-xs font-semibold text-[#FFFFFF] uppercase tracking-widest transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.03]"
                    >
                        <span className="absolute inset-0 bg-[#D6D3C9] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></span>
                        <span className="relative z-10 group-hover:text-[#000000] transition-colors duration-300">View Selected Work</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
