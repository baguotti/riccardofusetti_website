import { useRef, useState, useEffect, type CSSProperties } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router';
import { ArrowLeft, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Route } from './+types/ProjectPage';
import { projects } from '../data/projects';
import Img, { ogImageUrl } from '../components/Img';
import { HERO_SIZES, HERO_HALF_SIZES, GALLERY_SIZES, POSTER_SIZES, FULLSCREEN_SIZES } from '../components/sizes';
import { seo } from '../seo';

export function meta({ params }: Route.MetaArgs) {
    const project = projects.find(p => p.id === params.id);
    if (!project) return [{ title: 'Riccardo Fusetti' }];
    return seo({
        title: `${project.title} — Riccardo Fusetti`,
        description: project.description || `${project.title}${project.client ? ` for ${project.client}` : ''} — ${project.category === 'editor' ? 'edited' : 'directed'} by Riccardo Fusetti.`,
        image: ogImageUrl(project.thumbnailUrl),
        path: `/project/${project.id}`,
    });
}

export default function ProjectPage() {
    const { id } = useParams<{ id: string }>();
    const project = projects.find(p => p.id === id);

    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [isPosterOpen, setIsPosterOpen] = useState(false);
    const [showAllCredits, setShowAllCredits] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const navigate = useNavigate();
    const enterBtnRef = useRef<HTMLButtonElement>(null);

    // The password is checked on the server; it never ships to the browser.
    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = passwordInput.trim();
        if (!project?.hasPrivate || !token) return;
        const res = await fetch('/api/unlock', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id, token }),
        }).catch(() => null);
        if (res?.ok) {
            navigate(`/project/${id}/assets/${encodeURIComponent(token)}`, { viewTransition: true });
        } else {
            enterBtnRef.current?.animate(
                [0, -4, 4, -4, 4, 0].map(x => ({ transform: `translateX(${x}px)` })),
                { duration: 400, easing: 'ease-in-out' },
            );
        }
    };

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
            if (selectedImageIndex !== null) {
                if (e.key === 'ArrowRight') handleNext();
                if (e.key === 'ArrowLeft') handlePrev();
                if (e.key === 'Escape') setSelectedImageIndex(null);
            }
            if (isPosterOpen && e.key === 'Escape') setIsPosterOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageIndex, isPosterOpen]);

    // Prevent scroll when lightbox is open
    useEffect(() => {
        if (selectedImageIndex !== null || isPosterOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }
        return () => { document.body.style.overflow = 'visible'; };
    }, [selectedImageIndex, isPosterOpen]);

    if (!project) return <Navigate to="/" replace />;

    return (
        <div className="min-h-screen bg-primary pt-24 pb-12 px-6 max-w-5xl mx-auto">
            <Link
                viewTransition
                prefetch="intent"
                to={project.category === 'editor' ? "/editor" : "/"}
                className="reveal inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#4A4A4A] font-heading hover:text-[#D6D3C9] transition-colors duration-300 mb-8"
            >
                <ArrowLeft size={16} />
                Back to Index
            </Link>

            <div
                style={{ '--i': 1 } as CSSProperties}
                className={`reveal ${project.isVertical ? "grid grid-cols-2 gap-4 mb-16 md:mb-24" : "aspect-video w-full border border-[#4A4A4A] mb-12 rounded-xl overflow-hidden relative"}`}
            >
                {project.isVertical && project.videoEmbedUrls ? (
                    project.videoEmbedUrls.map((url, index) => (
                        <div key={index} className="aspect-[4/5] w-full bg-primary border border-[#4A4A4A] rounded-xl overflow-hidden relative group/video">
                            {!isPlaying ? (
                                <button
                                    onClick={() => setIsPlaying(true)}
                                    className="absolute inset-0 z-20 w-full h-full flex items-center justify-center cursor-pointer"
                                >
                                    <Img
                                        src={project.videoThumbnails?.[index] || project.thumbnailUrl}
                                        sizes={HERO_HALF_SIZES}
                                        priority
                                        alt=""
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out brightness-[0.8] group-hover/video:brightness-100"
                                    />
                                    <div className="relative z-10 text-white opacity-60 transition-all duration-300 group-hover/video:scale-125 group-hover/video:opacity-100">
                                        <Play size={32} fill="currentColor" />
                                    </div>
                                </button>
                            ) : (
                                <iframe
                                    src={`${url}${url.includes('?') ? '&' : '?'}autoplay=1&controls=1&title=0&byline=0&portrait=0`}
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                    title={`${project.title} - Video ${index + 1}`}
                                    className="w-full h-full relative z-0"
                                ></iframe>
                            )}
                        </div>
                    ))
                ) : (
                    !isPlaying ? (
                        <button
                            onClick={() => setIsPlaying(true)}
                            className="group relative w-full h-full flex items-center justify-center cursor-pointer overflow-hidden"
                        >
                            <Img
                                src={project.thumbnailUrl}
                                sizes={HERO_SIZES}
                                priority
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out brightness-[0.8] group-hover:brightness-100"
                            />
                            <div className="relative z-10 text-white opacity-60 transition-all duration-300 group-hover:scale-125 group-hover:opacity-100">
                                <Play size={48} fill="currentColor" />
                            </div>
                        </button>
                    ) : (
                        <iframe
                            src={`${project.videoEmbedUrl}${project.videoEmbedUrl?.includes('?') ? '&' : '?'}autoplay=1&controls=1&title=0&byline=0&portrait=0`}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            title={project.title}
                            className="w-full h-full"
                        ></iframe>
                    )
                )}
            </div>

            <div className={project.category === 'director' ? "grid grid-cols-1 md:grid-cols-[1fr_250px] gap-12 lg:gap-20" : "w-full"}>
                {/* Left Column: Title, Description, Credits */}
                <div>
                    {project.category === 'director' ? (
                        <>
                            <div className="flex justify-between items-start gap-8">
                                <div className="flex-1">
                                    <h1
                                        style={{ '--i': 2 } as CSSProperties}
                                        className="reveal text-2xl md:text-3xl font-heading font-light tracking-tight text-[#FFFFFF] mb-3"
                                    >
                                        {project.title}
                                    </h1>
                                    {project.description && (
                                        <p
                                            style={{ '--i': 3 } as CSSProperties}
                                            className="reveal text-base text-[#FFFFFF]/60 font-heading leading-relaxed"
                                        >
                                            {project.description}
                                        </p>
                                    )}
                                </div>
                                <div className="hidden md:flex flex-col gap-4 shrink-0 pt-1">
                                    <div className="flex flex-col">
                                        <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#4A4A4A] font-heading border-b border-[#4A4A4A] pb-[2px]">Release</h3>
                                        <p className="font-heading font-light text-[#FFFFFF] text-sm pt-[2px]">{project.year}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#4A4A4A] font-heading border-b border-[#4A4A4A] pb-[2px]">Role</h3>
                                        <p className="font-heading font-light text-[#FFFFFF] text-sm uppercase tracking-widest pt-[2px]">{project.category}</p>
                                    </div>
                                    {project.projectType && (
                                        <div className="flex flex-col">
                                            <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#4A4A4A] font-heading border-b border-[#4A4A4A] pb-[2px]">Project</h3>
                                            <p className="font-heading font-light text-[#FFFFFF] text-sm uppercase tracking-widest pt-[2px]">{project.projectType}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-8"></div>

                            {project.credits && (
                                <div style={{ '--i': 5 } as CSSProperties} className="reveal mb-0">
                                    <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#4A4A4A] font-heading mb-6 border-b border-[#4A4A4A] pb-3">Credits</h2>
                                    <div className="flex flex-col gap-y-3">
                                    {project.credits.map((credit, i) => {
                                        if (project.id === 'motivational-short' && !showAllCredits && i > 5) return null;
                                        const link = credit.url || (credit.instagram ? `https://instagram.com/${credit.instagram}` : null);

                                        const renderName = (name: string) => {
                                            const parts = name.split(/(@[\w._]+)/g);
                                            return parts.map((part, index) => {
                                                if (part.startsWith('@')) {
                                                    const handle = part.substring(1);
                                                    return (
                                                        <a
                                                            key={index}
                                                            href={`https://instagram.com/${handle}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="hover:text-[#D6D3C9] transition-colors duration-300 underline underline-offset-4 decoration-[#4A4A4A] hover:decoration-[#D6D3C9]"
                                                        >
                                                            {part}
                                                        </a>
                                                    );
                                                }
                                                return part;
                                            });
                                        };

                                        return (
                                            <div key={i} className="flex justify-between items-baseline gap-4 border-b border-[#4A4A4A]/50 pb-2">
                                                <span className="text-[10px] uppercase tracking-widest text-[#4A4A4A] font-heading shrink-0">{credit.role}</span>
                                                {link ? (
                                                    <a
                                                        href={link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs text-[#FFFFFF] text-right font-heading hover:text-[#D6D3C9] transition-colors duration-300 underline underline-offset-4 decoration-[#4A4A4A] hover:decoration-[#D6D3C9]"
                                                    >
                                                        {credit.name}
                                                    </a>
                                                ) : (
                                                    <span className="text-xs text-[#FFFFFF] text-right font-heading leading-relaxed">
                                                        {renderName(credit.name)}
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })}
                                    </div>
                                    {project.id === 'motivational-short' && project.credits.length > 6 && (
                                        <button
                                            onClick={() => setShowAllCredits(!showAllCredits)}
                                            className="text-[10px] uppercase tracking-[0.2em] text-[#D6D3C9] font-heading mt-6 text-left hover:text-[#FFFFFF] transition-colors"
                                        >
                                            {showAllCredits ? '- Show Less' : '+ Show More'}
                                        </button>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        /* Editor category: side-by-side title/credits layout */
                        <div className="flex flex-col md:flex-row justify-between items-start gap-12 lg:gap-20">
                            <div className="flex-1">
                                <h1
                                    style={{ '--i': 2 } as CSSProperties}
                                    className="reveal text-2xl md:text-3xl font-heading font-light tracking-tight text-[#FFFFFF] mb-3"
                                >
                                    {project.title}
                                </h1>
                            </div>
                            {project.credits && project.credits.length > 0 && (
                                <div className="flex-1 w-full md:max-w-md lg:max-w-lg md:mt-1">
                                    <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#4A4A4A] font-heading mb-6 border-b border-[#4A4A4A] pb-3">Credits</h2>
                                    <div className="flex flex-col gap-y-3">
                                {project.credits.map((credit, i) => {
                                    const link = credit.url || (credit.instagram ? `https://instagram.com/${credit.instagram}` : null);
                                    
                                    const renderName = (name: string) => {
                                        const parts = name.split(/(@[\w._]+)/g);
                                        return parts.map((part, index) => {
                                            if (part.startsWith('@')) {
                                                const handle = part.substring(1);
                                                return (
                                                    <a
                                                        key={index}
                                                        href={`https://instagram.com/${handle}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:text-[#D6D3C9] transition-colors duration-300 underline underline-offset-4 decoration-[#4A4A4A] hover:decoration-[#D6D3C9]"
                                                    >
                                                        {part}
                                                    </a>
                                                );
                                            }
                                            return part;
                                        });
                                    };

                                    return (
                                        <div key={i} className="flex justify-between items-baseline gap-4 border-b border-[#4A4A4A]/50 pb-2">
                                            <span className="text-[10px] uppercase tracking-widest text-[#4A4A4A] font-heading shrink-0">{credit.role}</span>
                                            {link ? (
                                                <a
                                                    href={link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-[#FFFFFF] text-right font-heading hover:text-[#D6D3C9] transition-colors duration-300 underline underline-offset-4 decoration-[#4A4A4A] hover:decoration-[#D6D3C9]"
                                                >
                                                    {credit.name}
                                                </a>
                                            ) : (
                                                <span className="text-xs text-[#FFFFFF] text-right font-heading leading-relaxed">
                                                    {renderName(credit.name)}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right Column: Press & Awards (Only for Director projects) */}
                {project.category === 'director' && (
                    <div
                        style={{ '--i': 4 } as CSSProperties}
                        className="reveal md:border-l border-[#4A4A4A] md:pl-8 pt-8 md:pt-0 flex flex-col h-fit md:sticky md:top-24"
                    >
                        {/* Mobile-only Release & Role (hidden on desktop since they're next to title) */}
                        <div className="flex flex-col gap-4 md:hidden mb-8">
                            <div className="flex flex-col">
                                <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#4A4A4A] font-heading border-b border-[#4A4A4A] pb-[2px]">Release</h3>
                                <p className="font-heading font-light text-[#FFFFFF] text-sm pt-[2px]">{project.year}</p>
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#4A4A4A] font-heading border-b border-[#4A4A4A] pb-[2px]">Role</h3>
                                <p className="font-heading font-light text-[#FFFFFF] text-sm uppercase tracking-widest pt-[2px]">{project.category}</p>
                            </div>
                            {project.projectType && (
                                <div className="flex flex-col">
                                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#4A4A4A] font-heading border-b border-[#4A4A4A] pb-[2px]">Project</h3>
                                    <p className="font-heading font-light text-[#FFFFFF] text-sm uppercase tracking-widest pt-[2px]">{project.projectType}</p>
                                </div>
                            )}
                        </div>

                        {project.press && (
                            <div className="flex flex-col gap-4 mt-1">
                                <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#4A4A4A] font-heading border-b border-[#4A4A4A] pb-3">Press & Awards</h3>
                                <div className="space-y-4">
                                    {project.press.map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group block text-[#FFFFFF]/60 hover:text-[#D6D3C9] transition-colors duration-300"
                                        >
                                            <p className="text-xs font-heading leading-snug">{link.label}</p>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {project.posterUrl && (
                            <div className={`flex flex-col gap-4 ${project.press && project.press.length > 0 ? 'mt-12' : 'mt-1'}`}>
                                <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#4A4A4A] font-heading border-b border-[#4A4A4A] pb-3">Poster</h3>
                                <div
                                    className="overflow-hidden rounded-lg cursor-pointer group/poster relative"
                                    onClick={() => setIsPosterOpen(true)}
                                >
                                    <Img
                                        src={project.posterUrl}
                                        sizes={POSTER_SIZES}
                                        alt="Project Poster"
                                        className="w-full h-auto object-cover opacity-95 group-hover/poster:opacity-100 transition-opacity duration-300"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Gallery Section - Hidden for Editor category */}
            {
                project.category === 'director' && project.gallery && project.gallery.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#4A4A4A] font-heading mb-6 border-b border-[#4A4A4A] pb-3">Gallery</h2>
                        <div className={`grid gap-1 md:gap-2 ${project.gallery.length === 2 || project.gallery.length === 4 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'}`}>
                            {project.gallery.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImageIndex(index)}
                                    className="w-full bg-primary rounded-[3px] overflow-hidden border border-[#4A4A4A] cursor-pointer group/still outline-none focus:outline-none"
                                >
                                    <Img
                                        src={img}
                                        sizes={GALLERY_SIZES}
                                        alt={`${project.title} still ${index + 1}`}
                                        className="w-full h-full object-cover opacity-90 group-hover/still:opacity-100 transition-opacity duration-500 aspect-video md:aspect-auto"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                )
            }

            {/* Private Access Link */}
            {project.category === 'director' && project.hasPrivate && (
                <div className="mt-24 mb-12 flex justify-center">
                    {!showPasswordForm ? (
                        <button 
                            onClick={() => setShowPasswordForm(true)}
                            className="text-[9px] text-[#FFFFFF]/[0.04] hover:text-[#FFFFFF]/[0.15] transition-colors duration-500 uppercase tracking-[0.2em] font-heading cursor-pointer"
                        >
                            Password protected project link
                        </button>
                    ) : (
                        <form onSubmit={handlePasswordSubmit} className="flex items-center gap-3 lightbox-in">
                            <input 
                                type="password" 
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                placeholder="PASSWORD..."
                                className="bg-transparent border-b border-transparent focus:border-[#FFFFFF]/[0.15] text-[9px] text-[#FFFFFF]/[0.15] font-heading px-2 py-1 outline-none w-48 text-center transition-colors uppercase tracking-[0.2em] placeholder:text-[#FFFFFF]/[0.04]"
                                autoFocus
                            />
                            <button 
                                ref={enterBtnRef}
                                type="submit" 
                                className="text-[9px] text-[#FFFFFF]/[0.04] uppercase tracking-[0.2em] hover:text-[#FFFFFF]/[0.15] transition-colors cursor-pointer"
                            >
                                Enter
                            </button>
                        </form>
                    )}
                </div>
            )}

            {/* Lightbox Overlay */}
            {
                selectedImageIndex !== null && project.gallery && (
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/95 backdrop-blur-sm p-4 md:p-12 lightbox-in"
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
                            <Img
                                key={selectedImageIndex}
                                sizes={FULLSCREEN_SIZES}
                                priority
                                src={project.gallery[selectedImageIndex]}
                                alt="Full size still"
                                className="max-w-full max-h-full object-contain rounded-md shadow-2xl lightbox-img-in pointer-events-auto"
                            />
                        </div>

                        {/* Image Counter */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-white/30 font-heading">
                            {selectedImageIndex + 1} / {project.gallery.length}
                        </div>
                    </div>
                )
            }

            {/* Poster Lightbox */}
            {isPosterOpen && project.posterUrl && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/95 backdrop-blur-sm p-4 md:p-12 lightbox-in"
                    onClick={() => setIsPosterOpen(false)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer p-2 z-[110]"
                        onClick={() => setIsPosterOpen(false)}
                    >
                        <X size={32} />
                    </button>

                    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                        <Img
                            src={project.posterUrl}
                            sizes={FULLSCREEN_SIZES}
                            priority
                            alt="Full size poster"
                            className="max-w-full max-h-full object-contain shadow-2xl pointer-events-auto"
                        />
                    </div>
                </div>
            )}
        </div >
    );
}
