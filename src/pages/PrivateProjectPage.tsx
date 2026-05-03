import { useRef, useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Play, X, ChevronLeft, ChevronRight, Lock, FileText, ExternalLink } from 'lucide-react';
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
                            <h3 className="text-xl font-['Inter'] font-light text-[#FFFFFF]">{asset.title}</h3>
                            <span className="text-[10px] uppercase tracking-widest text-[#4A4A4A] font-['Inter']">Video</span>
                        </div>
                        {asset.description && <p className="text-sm text-[#FFFFFF]/60 font-['Inter'] mb-6">{asset.description}</p>}
                        
                        <div className="aspect-video w-full border border-[#4A4A4A] rounded-xl overflow-hidden relative bg-[#1A1A1A]">
                            {!isPlaying ? (
                                <button
                                    onClick={() => setPlayingVideos(prev => ({ ...prev, [asset.id]: true }))}
                                    className="absolute inset-0 z-20 w-full h-full flex items-center justify-center cursor-pointer group"
                                >
                                    {asset.thumbnailUrl && (
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out brightness-[0.6] group-hover:brightness-100"
                                            style={{ backgroundImage: `url(${asset.thumbnailUrl})` }}
                                        />
                                    )}
                                    <div className="relative z-10 text-white opacity-60 transition-all duration-300 group-hover:scale-125 group-hover:opacity-100">
                                        <Play size={48} fill="currentColor" />
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
                                    title={asset.title}
                                    className="w-full h-full relative z-0"
                                ></iframe>
                            )}
                        </div>
                    </div>
                );

            case 'pdf':
                const docUrl = asset.embedUrl || asset.url;
                return (
                    <div className="mb-16" key={asset.id} ref={el => { contentRefs.current[index + 3] = el; }}>
                        <div className="flex justify-between items-baseline mb-4">
                            <h3 className="text-xl font-['Inter'] font-light text-[#FFFFFF]">{asset.title}</h3>
                            <span className="text-[10px] uppercase tracking-widest text-[#4A4A4A] font-['Inter']">Document</span>
                        </div>
                        {asset.description && <p className="text-sm text-[#FFFFFF]/60 font-['Inter'] mb-6">{asset.description}</p>}
                        
                        <div className="flex flex-col gap-4">
                            {docUrl && (
                                <div className="aspect-[1533/1046] w-full border border-[#4A4A4A] rounded-xl overflow-hidden">
                                    <iframe
                                        src={docUrl}
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        allowFullScreen
                                        title={asset.title}
                                        className="w-full h-full"
                                    ></iframe>
                                </div>
                            )}
                            
                            <a 
                                href={asset.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between p-6 border border-[#4A4A4A] rounded-xl hover:border-[#D6D3C9] transition-colors duration-300 bg-[#1A1A1A]/50 mt-2"
                            >
                                <div className="flex items-center gap-4">
                                    <FileText size={20} className="text-[#D6D3C9]" />
                                    <div>
                                        <h4 className="text-[#FFFFFF] font-['Inter'] text-sm">Open in Full Screen</h4>
                                        <p className="text-[#FFFFFF]/40 text-[10px] font-['Inter'] uppercase tracking-widest">Opens in new tab</p>
                                    </div>
                                </div>
                                <ExternalLink size={16} className="text-[#4A4A4A] group-hover:text-[#D6D3C9] transition-colors duration-300" />
                            </a>
                        </div>
                    </div>
                );

            case 'gallery':
                if (!asset.urls || asset.urls.length === 0) return null;
                return (
                    <div className="mb-16" key={asset.id} ref={el => { contentRefs.current[index + 3] = el; }}>
                        <div className="flex justify-between items-baseline mb-4">
                            <h3 className="text-xl font-['Inter'] font-light text-[#FFFFFF]">{asset.title}</h3>
                            <span className="text-[10px] uppercase tracking-widest text-[#4A4A4A] font-['Inter']">Gallery</span>
                        </div>
                        {asset.description && <p className="text-sm text-[#FFFFFF]/60 font-['Inter'] mb-6">{asset.description}</p>}
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {asset.urls.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setLightboxData({ urls: asset.urls!, index: i })}
                                    className="w-full bg-primary rounded-[3px] overflow-hidden border border-[#4A4A4A] cursor-pointer group/still outline-none focus:outline-none aspect-video"
                                >
                                    <img
                                        src={img}
                                        alt={`${asset.title} - ${i + 1}`}
                                        className="w-full h-full object-cover opacity-90 group-hover/still:opacity-100 transition-opacity duration-500"
                                        loading="lazy"
                                    />
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
        <div ref={containerRef} className="min-h-screen bg-primary pt-24 pb-12 px-6 max-w-5xl mx-auto">
            <Link
                ref={el => { contentRefs.current[0] = el; }}
                to={`/project/${id}`}
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#4A4A4A] font-['Inter'] hover:text-[#D6D3C9] transition-colors duration-300 mb-12"
            >
                <ArrowLeft size={16} />
                Back to {project.title}
            </Link>

            <div ref={el => { contentRefs.current[1] = el; }} className="mb-16 pb-8 border-b border-[#4A4A4A]">
                <div className="flex items-center gap-3 mb-4">
                    <Lock size={16} className="text-[#D6D3C9]" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#D6D3C9] font-['Inter']">Private Access</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-['Inter'] font-light tracking-tight text-[#FFFFFF] mb-4">
                    {project.title}
                </h1>
                <p className="text-lg text-[#FFFFFF]/60 font-['Inter'] leading-relaxed max-w-2xl">
                    Confidential project assets and production materials. Please do not share this link without permission.
                </p>
            </div>

            <div className="space-y-12">
                {assets.map((asset, index) => renderAsset(asset, index))}
            </div>

            {/* Lightbox Overlay */}
            {lightboxData && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/95 backdrop-blur-sm p-4 md:p-12 animate-in fade-in duration-300"
                    onClick={() => setLightboxData(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer p-2 z-[110]"
                        onClick={() => setLightboxData(null)}
                    >
                        <X size={32} />
                    </button>

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
                            key={lightboxData.index}
                            src={lightboxData.urls[lightboxData.index]}
                            alt="Full size still"
                            className="max-w-full max-h-full object-contain rounded-md shadow-2xl animate-in zoom-in-95 duration-500 pointer-events-auto"
                        />
                    </div>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-white/30 font-['Inter']">
                        {lightboxData.index + 1} / {lightboxData.urls.length}
                    </div>
                </div>
            )}
        </div>
    );
}
