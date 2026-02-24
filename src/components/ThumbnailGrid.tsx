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

    useGSAP(() => {
        gsap.from(".project-card", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        });
    }, { scope: containerRef, dependencies: [projects] });

    return (
        <div ref={containerRef} className="w-full max-w-[1440px] mx-auto px-4 md:px-6 pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
                {projects.map((project) => (
                    <Link
                        key={project.id}
                        to={`/project/${project.id}`}
                        className="project-card group block relative rounded-xl aspect-video md:aspect-[4/5] lg:aspect-video"
                    >
                        {/* Ambience Glow Effect */}
                        <div className="absolute -inset-4 bg-white/5 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700 pointer-events-none" />

                        <div className="absolute inset-0 overflow-hidden rounded-xl">
                            <img
                                src={project.thumbnailUrl}
                                alt={project.title}
                                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.02] group-hover:blur-[0.5px]"
                            />

                            {/* Title on hover — opacity only, no color overlays */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ backgroundColor: 'rgba(5,5,5,0.5)' }}>
                                <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-white font-['Inter'] text-center px-4">
                                    {project.title}
                                </h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
