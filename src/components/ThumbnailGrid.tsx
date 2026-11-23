import { Link } from 'react-router';
import type { CSSProperties } from 'react';
import type { Project } from '../types';
import Img, { preloadImage } from './Img';
import { HERO_SIZES } from './sizes';

interface Props {
    projects: Project[];
}

const CARD_SIZES = '(min-width: 1680px) 550px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw';

export default function ThumbnailGrid({ projects }: Props) {
    return (
        <div className="w-full max-w-[1680px] mx-auto px-4 md:px-6 pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
                {projects.map((project, index) => (
                    <Link
                        key={project.id}
                        to={`/project/${project.id}`}
                        viewTransition
                        prefetch="intent"
                        // Start fetching the project's hero image as soon as the visitor shows intent.
                        onPointerEnter={() => preloadImage(project.thumbnailUrl, HERO_SIZES)}
                        onFocus={() => preloadImage(project.thumbnailUrl, HERO_SIZES)}
                        style={{ '--i': index, '--reveal-duration': '0.8s' } as CSSProperties}
                        className={`reveal group block relative rounded-xl overflow-hidden focus-visible:ring-2 focus-visible:ring-[#D6D3C9] focus-visible:ring-offset-4 focus-visible:ring-offset-primary outline-none ${project.posterThumbUrl
                                ? 'aspect-[3/4]'
                                : 'aspect-video md:aspect-[4/5] lg:aspect-video'
                            }`}
                    >
                        {/* Ambience Glow Effect */}
                        <div className="absolute -inset-4 bg-white/5 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700 pointer-events-none" />

                        <div className="absolute inset-0 overflow-hidden rounded-xl">
                            <Img
                                src={project.posterThumbUrl || project.thumbnailUrl}
                                sizes={CARD_SIZES}
                                priority={index < 3}
                                alt={project.title}
                                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.005] group-hover:blur-[0.5px]"
                            />

                            {/* Title on hover — extremely subtle frosted glass effect */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] bg-black/20">
                                <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-white font-heading text-center px-4">
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
