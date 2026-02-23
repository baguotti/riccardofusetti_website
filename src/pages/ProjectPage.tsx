import { useRef, useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { projects } from '../data/projects';

export default function ProjectPage() {
    const { id } = useParams<{ id: string }>();
    const project = projects.find(p => p.id === id);
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

    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (project?.gallery && selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex + 1) % project.gallery.length);
        }
    };

    const handlePrev = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (project?.gallery && selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex - 1 + project.gallery.length) % project.gallery.length);
        }
    };

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImageIndex === null) return;
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape') setSelectedImageIndex(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageIndex]);

    // Prevent scroll when lightbox is open
    useEffect(() => {
        if (selectedImageIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedImageIndex]);

    if (!project) return <Navigate to="/" replace />;

    return (
        <div ref={containerRef} className="min-h-screen bg-[#050505] pt-24 pb-12 px-6 max-w-5xl mx-auto">
            <Link
                ref={el => { contentRefs.current[0] = el; }}
                to="/"
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#1A1A1A] font-['Inter'] hover:text-[#D6D3C9] transition-colors duration-300 mb-8"
            >
                <ArrowLeft size={16} />
                Back to Index
            </Link>

            <div
                ref={el => { contentRefs.current[1] = el; }}
                className="aspect-video w-full bg-[#050505] mb-12 rounded-xl overflow-hidden border border-[#1A1A1A] relative"
            >
                {!isPlaying ? (
                    <button
                        onClick={() => setIsPlaying(true)}
                        className="group relative w-full h-full flex items-center justify-center cursor-pointer overflow-hidden"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
                            style={{ backgroundImage: `url(${project.thumbnailUrl})` }}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                        <div className="relative z-10 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                            <Play size={24} fill="currentColor" />
                        </div>
                    </button>
                ) : (
                    <iframe
                        src={`${project.videoEmbedUrl}?autoplay=1`}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={project.title}
                        className="w-full h-full"
                    ></iframe>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_250px] gap-12 lg:gap-20">
                <div>
                    <h1
                        ref={el => { contentRefs.current[2] = el; }}
                        className="text-2xl md:text-3xl font-['Inter'] font-light tracking-tight text-[#FFFFFF] mb-3"
                    >
                        {project.title}
                    </h1>
                    <p
                        ref={el => { contentRefs.current[3] = el; }}
                        className="text-base text-[#FFFFFF]/60 font-['Inter'] leading-relaxed mb-8"
                    >
                        {project.description}
                    </p>

                    {project.credits && (
                        <div ref={el => { contentRefs.current[5] = el; }} className="mb-0">
                            <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A] font-['Inter'] mb-6 border-b border-[#1A1A1A] pb-3">Credits</h2>
                            <div className="flex flex-col gap-y-3">
                                {project.credits.map((credit, i) => (
                                    <div key={i} className="flex justify-between items-baseline gap-4 border-b border-[#1A1A1A]/50 pb-2">
                                        <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A] font-['Inter'] shrink-0">{credit.role}</span>
                                        <span className="text-xs text-[#FFFFFF] text-right font-['Inter']">{credit.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                <div
                    ref={el => { contentRefs.current[4] = el; }}
                    className="md:border-l border-[#1A1A1A] md:pl-8 pt-8 md:pt-0 relative"
                >
                    <div className="md:sticky md:top-24 h-fit flex flex-col">
                        <div className="flex flex-col">
                            <div className="flex flex-col">
                                <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A] font-['Inter'] border-b border-[#1A1A1A] pb-[2px]">Release</h3>
                                <p className="font-['Inter'] font-light text-[#FFFFFF] text-sm pt-[2px]">{project.year}</p>
                            </div>
                            <div className="flex flex-col mt-1">
                                <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A] font-['Inter'] border-b border-[#1A1A1A] pb-[2px]">Role</h3>
                                <p className="font-['Inter'] font-light text-[#FFFFFF] text-sm uppercase tracking-widest pt-[2px]">{project.category}</p>
                            </div>
                        </div>

                        {project.press && (
                            <div className="flex flex-col gap-4 mt-12">
                                <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A] font-['Inter'] border-b border-[#1A1A1A] pb-3">Press & Awards</h3>
                                <div className="space-y-4">
                                    {project.press.map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group block text-[#FFFFFF]/60 hover:text-[#D6D3C9] transition-colors duration-300"
                                        >
                                            <p className="text-xs font-['Inter'] leading-snug">{link.label}</p>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Gallery Section - Tighter mt-8 as requested */}
            {project.gallery && project.gallery.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A] font-['Inter'] mb-6 border-b border-[#1A1A1A] pb-3">Gallery</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2">
                        {project.gallery.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImageIndex(index)}
                                className="w-full bg-[#050505] rounded-sm overflow-hidden border border-[#1A1A1A] cursor-pointer group/still"
                            >
                                <img
                                    src={img}
                                    alt={`${project.title} still ${index + 1}`}
                                    className="w-full h-full object-cover opacity-90 group-hover/still:opacity-100 transition-opacity duration-500 aspect-video md:aspect-auto"
                                    loading="lazy"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Lightbox Overlay */}
            {
                selectedImageIndex !== null && project.gallery && (
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/95 backdrop-blur-sm p-4 md:p-12 animate-in fade-in duration-300"
                        onClick={() => setSelectedImageIndex(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer p-2 z-[110]"
                            onClick={() => setSelectedImageIndex(null)}
                        >
                            <X size={32} />
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-all cursor-pointer p-4 z-[110] hover:scale-110"
                            onClick={handlePrev}
                        >
                            <ChevronLeft size={48} strokeWidth={1} />
                        </button>

                        <button
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-all cursor-pointer p-4 z-[110] hover:scale-110"
                            onClick={handleNext}
                        >
                            <ChevronRight size={48} strokeWidth={1} />
                        </button>

                        <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                            <img
                                key={selectedImageIndex}
                                src={project.gallery[selectedImageIndex]}
                                alt="Full size still"
                                className="max-w-full max-h-full object-contain rounded-md shadow-2xl animate-in zoom-in-95 duration-500 pointer-events-auto"
                            />
                        </div>

                        {/* Image Counter */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-white/30 font-['Inter']">
                            {selectedImageIndex + 1} / {project.gallery.length}
                        </div>
                    </div>
                )
            }
        </div >
    );
}
