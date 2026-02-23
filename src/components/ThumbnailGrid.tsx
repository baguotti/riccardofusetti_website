import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { Project } from '../types';



interface Props {
    projects: Project[];
}

export default function ThumbnailGrid({ projects }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

    // Clear stale refs
    cardsRef.current = [];

    useGSAP(() => {
        // Staggered reveal matching the 'fade-up' protocol on scroll
        gsap.from(cardsRef.current, {
            y: 60,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out"
        });
    }, { scope: containerRef, dependencies: [projects] });

    return (
        <div id="portfolio" ref={containerRef} className="bg-[#050505] pt-12 pb-24 px-4 md:px-8 lg:px-12 max-w-[120rem] mx-auto w-full overflow-hidden">
            {/* Tighter gap-2 on mobile, gap-4 on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4 overflow-visible">
                {projects.map((project, index) => (
                    <div key={project.id} className="relative group">
                        {/* Glow Layer: Subtle luminous aura bleeding behind the card */}
                        <div
                            className="absolute -inset-2 bg-cover bg-center opacity-0 group-hover:opacity-30 blur-xl transition-all duration-1000 ease-in-out z-0 pointer-events-none"
                            style={{ backgroundImage: `url(${project.thumbnailUrl})` }}
                        />

                        <Link
                            to={`/project/${project.id}`}
                            ref={el => { cardsRef.current[index] = el; }}
                            className="block relative overflow-hidden aspect-[4/5] sm:aspect-video cursor-pointer rounded-md z-10"
                        >
                            {/* Base image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out group-hover:scale-[1.01] group-hover:blur-[2px]"
                                style={{ backgroundImage: `url(${project.thumbnailUrl})` }}
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-[#050505]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
                            <div
                                className="absolute inset-0 mix-blend-overlay opacity-0 group-hover:opacity-40 transition-opacity duration-500 ease-in-out pointer-events-none"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.0' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                            />

                            {/* Text overlay */}
                            <div className="absolute inset-0 p-4 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#FFFFFF] text-center font-['Inter']">{project.title}</h3>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
