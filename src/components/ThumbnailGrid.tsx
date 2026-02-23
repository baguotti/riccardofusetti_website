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
        <div id="portfolio" ref={containerRef} className="bg-[#050505] pt-12 pb-24 px-4 md:px-8 lg:px-12 max-w-[120rem] mx-auto w-full">
            {/* Tighter gap-2 on mobile, gap-4 on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4">
                {projects.map((project, index) => (
                    <Link
                        key={project.id}
                        to={`/project/${project.id}`}
                        ref={el => { cardsRef.current[index] = el; }}
                        // Dramatically reduced border radius to rounded-md
                        className="group block relative overflow-hidden aspect-[4/5] sm:aspect-video cursor-pointer rounded-md"
                    >
                        {/* Glow Layer: Increased spread and blur for a more dramatic aura */}
                        <div
                            className="absolute -inset-10 bg-cover bg-center opacity-0 group-hover:opacity-50 blur-3xl transition-all duration-700 ease-in-out z-0"
                            style={{ backgroundImage: `url(${project.thumbnailUrl})` }}
                        />

                        {/* Base image always in color, blurred slightly less on hover */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out group-hover:blur-[1px] group-hover:scale-[1.01] z-10"
                            style={{ backgroundImage: `url(${project.thumbnailUrl})` }}
                        />

                        {/* Hover Overlay: Darkens and adds a subtle noise texture to the card itself */}
                        <div className="absolute inset-0 bg-[#050505]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out z-20" />
                        <div className="absolute inset-0 noise-overlay mix-blend-overlay opacity-0 group-hover:opacity-40 transition-opacity duration-500 ease-in-out pointer-events-none z-20" />

                        {/* Text overlay perfectly centered, appearing only on hover */}
                        <div className="absolute inset-0 p-4 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out z-30">
                            <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#FFFFFF] text-center font-['Inter']">{project.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
