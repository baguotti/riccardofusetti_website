import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { photographyList } from '../data/photography';

gsap.registerPlugin(ScrollTrigger);

export default function PhotographyPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const photosRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            photosRef.current.forEach((photo) => {
                if (!photo) return;

                // Set initial state: slightly lower, transparent, zoomed out
                gsap.set(photo, {
                    opacity: 0,
                    y: 80,
                    scale: 0.85,
                });

                // ScrollTrigger animation for each photo as it enters the viewport
                gsap.to(photo, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: photo,
                        start: 'top 85%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse',
                    },
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen pt-32 pb-48 px-6 overflow-hidden" ref={containerRef}>
            <div className="max-w-[1000px] mx-auto relative flex flex-col items-center">

                <div className="mb-24 text-center">
                    <h1 className="text-4xl md:text-5xl font-drama italic text-white opacity-80">Photography</h1>
                </div>

                {photographyList.map((photo, index) => {
                    // Alternate alignments: left, right, center
                    const alignClass = index % 3 === 0
                        ? 'self-start ml-[5%] md:ml-[10%]'
                        : index % 3 === 1
                            ? 'self-end mr-[5%] md:mr-[10%]'
                            : 'self-center';

                    // Strong negative margin to make them overlap like a messy pile of photos
                    const marginClass = index === 0 ? 'mt-0' : '-mt-16 md:-mt-[120px]';

                    // Apply the random rotation and translation
                    const transformStyle = {
                        transform: `rotate(${photo.rotation}deg) translate(${photo.xOffset}%, ${photo.yOffset}%)`,
                    };

                    return (
                        <div
                            key={photo.id}
                            ref={el => { photosRef.current[index] = el }}
                            className={`w-full max-w-[160px] md:max-w-[260px] relative z-10 ${alignClass} ${marginClass}`}
                            style={transformStyle}
                        >
                            {/* The "Physical Photo" container without borders */}
                            <div className="relative shadow-2xl rounded-sm transition-transform duration-500 hover:z-50 cursor-crosshair group transform-gpu">

                                {/* Photo */}
                                <img
                                    src={photo.url}
                                    alt={photo.alt}
                                    className="w-full h-auto object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100 rounded-sm outline outline-1 outline-transparent backface-hidden"
                                    loading="lazy"
                                />

                                {/* Grain Overlay Layer */}
                                <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none rounded-sm"></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
