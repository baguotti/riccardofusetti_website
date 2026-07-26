import { useRef, useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Play, X, ChevronLeft, ChevronRight, Lock, FileText, ExternalLink, Maximize2 } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { projects } from '../data/projects';
import type { PrivateAsset } from '../types';

export default function PrivateProjectPage() {
    const { id, token } = useParams<{ id: string; token: string }>();
    const project = projects.find(p => p.id === id);

    const containerRef = useRef<HTMLDivElement>(null);
    const contentRefs = useRef<(HTMLElement | null)[]>([]);
    
    // Lightbox state
    const [lightboxData, setLightboxData] = useState<{ urls: string[], index: number } | null>(null);
    const [playingVideos, setPlayingVideos] = useState<Record<string, boolean>>({});

    useGSAP(() => {
        gsap.from(contentRefs.current, {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
        });
    }, { scope: containerRef });

    // Validation: Redirect if no project, no private data, or token mismatch
    if (!project || !project.privateData || project.privateData.token !== token) {
        return <Navigate to={project ? `/project/${id}` : '/'} replace />;
    }

    const { assets } = project.privateData;

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (lightboxData) {
            setLightboxData({
                ...lightboxData,
                index: (lightboxData.index + 1) % lightboxData.urls.length
            });
        }
    };

    const handlePrev = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (lightboxData) {
            setLightboxData({
                ...lightboxData,
                index: (lightboxData.index - 1 + lightboxData.urls.length) % lightboxData.urls.length
            });
        }
    };

    // Keyboard support for lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxData) {
                if (e.key === 'ArrowRight') handleNext();
                if (e.key === 'ArrowLeft') handlePrev();
                if (e.key === 'Escape') setLightboxData(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxData]);

    // Prevent scroll when lightbox is open
    useEffect(() => {
        if (lightboxData) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }
        return () => { document.body.style.overflow = 'visible'; };
    }, [lightboxData]);

    const renderAsset = (asset: PrivateAsset, index: number) => {
        switch (asset.type) {
            case 'video':
                const isPlaying = playingVideos[asset.id] || false;
                return (
                    <div className="mb-16" key={asset.id} ref={el => { contentRefs.current[index + 3] = el; }}>
                        <div className="flex justify-between items-baseline mb-4">
                            <h3 className="text-xl font-['Inter'] font-light text-white tracking-wide">{asset.title}</h3>
                            <span className="text-[10px] uppercase tracking-widest text-[#D6D3C9]/50 font-['Inter'] px-2 py-0.5 rounded border border-[#4A4A4A]/40 bg-white/[0.02]">
                                Video
                            </span>
                        </div>
                        {asset.description && <p className="text-sm text-white/60 font-['Inter'] mb-6 leading-relaxed max-w-2xl">{asset.description}</p>}
                        
                        <div className="aspect-video w-full border border-[#4A4A4A]/60 hover:border-[#D6D3C9]/40 transition-colors duration-500 rounded-xl overflow-hidden relative bg-[#141416] shadow-xl group">
                            {!isPlaying ? (
                                <button
                                    onClick={() => setPlayingVideos(prev => ({ ...prev, [asset.id]: true }))}
                                    className="absolute inset-0 z-20 w-full h-full flex items-center justify-center cursor-pointer group/btn"
                                    aria-label={`Play ${asset.title}`}
                                >
                                    {asset.thumbnailUrl && (
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out brightness-[0.55] group-hover/btn:brightness-90 group-hover/btn:scale-[1.02]"
                                            style={{ backgroundImage: `url(${asset.thumbnailUrl})` }}
                                        />
                                    )}
                                    <div className="relative z-10 w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:bg-white/20 group-hover/btn:text-white group-hover/btn:border-white/40 shadow-2xl">
                                        <Play size={28} fill="currentColor" className="ml-1" />
                                    </div>
                                </button>
                            ) : (
                                <iframe
                                    src={asset.embedUrl ? (asset.embedUrl.includes('vimeo.com') || asset.embedUrl.includes('youtube.com') ? `${asset.embedUrl}${asset.embedUrl.includes('?') ? '&' : '?'}autoplay=1` : asset.embedUrl) : ''}
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                    title={`${asset.title} - Video player`}
                                    className="w-full h-full relative z-0"
                                ></iframe>
                            )}
                        </div>
                    </div>
                );

            case 'pdf':
                const rawDocUrl = asset.embedUrl || asset.url;
                // Add viewer parameters to clean up PDF browser toolbar where applicable
                const docUrl = rawDocUrl ? (rawDocUrl.endsWith('.pdf') ? `${rawDocUrl}#toolbar=0&navpanes=0&scrollbar=1` : rawDocUrl) : '';
                return (
                    <div className="mb-16" key={asset.id} ref={el => { contentRefs.current[index + 3] = el; }}>
                        <div className="flex justify-between items-baseline mb-4">
                            <h3 className="text-xl font-['Inter'] font-light text-white tracking-wide">{asset.title}</h3>
                            <span className="text-[10px] uppercase tracking-widest text-[#D6D3C9]/50 font-['Inter'] px-2.5 py-0.5 rounded-full border border-[#4A4A4A]/40 bg-white/[0.02]">
                                Production PDF
                            </span>
                        </div>
                        {asset.description && <p className="text-sm text-white/60 font-['Inter'] mb-6 leading-relaxed max-w-2xl">{asset.description}</p>}
                        
                        <div className="border border-[#4A4A4A]/60 rounded-xl overflow-hidden bg-[#141416] transition-all duration-500 hover:border-[#D6D3C9]/40 shadow-2xl group">
                            {/* Custom Integrated App Control Header */}
                            <div className="px-4 py-3 bg-[#1A1A1E] border-b border-[#4A4A4A]/40 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5 mr-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                                    </div>
                                    <div className="w-7 h-7 rounded bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#D6D3C9]">
                                        <FileText size={15} />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-['Inter'] text-white/90 font-medium tracking-wide">{asset.title}</span>
                                        <span className="hidden sm:inline-block text-[10px] font-['Inter'] text-white/40 uppercase tracking-widest px-2 py-0.5 rounded bg-black/30">PDF</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <a
                                        href={asset.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white/80 hover:text-white transition-all text-xs font-['Inter']"
                                        aria-label={`Open ${asset.title} in new tab`}
                                    >
                                        <span>Open Fullscreen</span>
                                        <ExternalLink size={13} className="text-[#D6D3C9]" />
                                    </a>
                                </div>
                            </div>

                            {docUrl && (
                                <div className="aspect-[1533/1046] w-full relative bg-[#0D0D0E]">
                                    <iframe
                                        src={docUrl}
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        allowFullScreen
                                        title={`${asset.title} - Integrated Document Reader`}
                                        className="w-full h-full"
                                    ></iframe>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'gallery':
                if (!asset.urls || asset.urls.length === 0) return null;
                return (
                    <div className="mb-16" key={asset.id} ref={el => { contentRefs.current[index + 3] = el; }}>
                        <div className="flex justify-between items-baseline mb-4">
                            <h3 className="text-xl font-['Inter'] font-light text-white tracking-wide">{asset.title}</h3>
                            <span className="text-[10px] uppercase tracking-widest text-[#D6D3C9]/50 font-['Inter'] px-2 py-0.5 rounded border border-[#4A4A4A]/40 bg-white/[0.02]">
                                Gallery ({asset.urls.length})
                            </span>
                        </div>
                        {asset.description && <p className="text-sm text-white/60 font-['Inter'] mb-6 leading-relaxed max-w-2xl">{asset.description}</p>}
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {asset.urls.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setLightboxData({ urls: asset.urls!, index: i })}
                                    className="w-full bg-[#141416] rounded-lg overflow-hidden border border-[#4A4A4A]/50 hover:border-[#D6D3C9]/60 cursor-pointer group/still outline-none focus:ring-1 focus:ring-[#D6D3C9] aspect-video relative shadow-md transition-all duration-300"
                                    aria-label={`Open image ${i + 1} of ${asset.title}`}
                                >
                                    <img
                                        src={img}
                                        alt={`${asset.title} image ${i + 1}`}
                                        className="w-full h-full object-cover opacity-85 group-hover/still:opacity-100 group-hover/still:scale-[1.03] transition-all duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/still:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white/90">
                                        <Maximize2 size={20} className="drop-shadow-md" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-primary pt-24 pb-16 px-6 max-w-5xl mx-auto">
            <Link
                ref={el => { contentRefs.current[0] = el; }}
                to={`/project/${id}`}
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#D6D3C9]/60 font-['Inter'] hover:text-white transition-colors duration-300 mb-12"
            >
                <ArrowLeft size={16} />
                Back to {project.title}
            </Link>

            <div ref={el => { contentRefs.current[1] = el; }} className="mb-16 pb-8 border-b border-[#4A4A4A]/50">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-[#D6D3C9]/20 bg-white/[0.02]">
                    <Lock size={13} className="text-[#D6D3C9]" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#D6D3C9] font-['Inter'] font-medium">Private Access</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-['Inter'] font-light tracking-tight text-white mb-4">
                    {project.title}
                </h1>
                <p className="text-base md:text-lg text-white/60 font-['Inter'] leading-relaxed max-w-2xl">
                    Confidential project assets and production materials. Please do not share this link without permission.
                </p>
            </div>

            <div className="space-y-12">
                {assets.map((asset, index) => renderAsset(asset, index))}
            </div>

            {/* Lightbox Overlay */}
            {lightboxData && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/95 backdrop-blur-md p-4 md:p-12 animate-in fade-in duration-300"
                    onClick={() => setLightboxData(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image gallery lightbox"
                >
                    <button
                        className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors cursor-pointer p-3 z-[110] rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/10"
                        onClick={() => setLightboxData(null)}
                        aria-label="Close image lightbox"
                    >
                        <X size={24} />
                    </button>

                    <button
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all cursor-pointer p-3 z-[110] rounded-full bg-black/40 hover:bg-white/10 border border-white/10 hover:scale-110"
                        onClick={handlePrev}
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={36} strokeWidth={1.5} />
                    </button>

                    <button
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all cursor-pointer p-3 z-[110] rounded-full bg-black/40 hover:bg-white/10 border border-white/10 hover:scale-110"
                        onClick={handleNext}
                        aria-label="Next image"
                    >
                        <ChevronRight size={36} strokeWidth={1.5} />
                    </button>

                    <div className="relative w-full h-full flex items-center justify-center pointer-events-none p-4">
                        <img
                            key={lightboxData.index}
                            src={lightboxData.urls[lightboxData.index]}
                            alt={`Gallery image ${lightboxData.index + 1}`}
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300 pointer-events-auto border border-white/10"
                        />
                    </div>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.25em] text-white/50 font-['Inter'] px-3 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm">
                        {lightboxData.index + 1} / {lightboxData.urls.length}
                    </div>
                </div>
            )}
        </div>
    );
}

