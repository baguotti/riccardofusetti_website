import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { editorEntries, type EditorEntry } from '../data/directorMeta';
import Img, { preloadImage } from './Img';
import { HERO_SIZES } from './sizes';

const CARD_SIZES = '(min-width: 1440px) 440px, (min-width: 1024px) 31vw, (min-width: 640px) 47vw, 100vw';

function EditorCard({ entry, idx }: { entry: EditorEntry; idx: number }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isVideoReady, setIsVideoReady] = useState(false);
    const previewUrl = entry.project.previewVideoUrl;

    const handleEnter = () => {
        preloadImage(entry.project.thumbnailUrl, HERO_SIZES);
        if (!previewUrl) return;
        if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        setIsHovering(true);
        setShouldLoadVideo(true);
        const video = videoRef.current;
        if (video) {
            video.currentTime = 0;
            video.play().catch(() => {});
        }
    };

    const handleLeave = () => {
        setIsHovering(false);
        videoRef.current?.pause();
    };

    const showVideo = Boolean(previewUrl && isHovering && isVideoReady);

    return (
        <Link
            to={`/project/${entry.project.id}`}
            viewTransition
            prefetch="intent"
            onPointerEnter={handleEnter}
            onPointerLeave={handleLeave}
            onFocus={handleEnter}
            onBlur={handleLeave}
            className="group relative block aspect-video w-full overflow-hidden bg-paper-inset ring-1 ring-ink/[0.06] focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
            <Img
                src={entry.project.thumbnailUrl}
                sizes={CARD_SIZES}
                priority={idx < 6}
                alt={entry.displayTitle}
                className="w-full h-full object-cover"
            />

            {previewUrl && shouldLoadVideo && (
                <video
                    ref={videoRef}
                    src={previewUrl}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="auto"
                    aria-hidden="true"
                    onPlaying={() => setIsVideoReady(true)}
                    className={`pointer-events-none absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out ${
                        showVideo ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            )}

            {/* Subtle bottom-left title revealed on hover / focus */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 pt-10 pb-2.5 px-3 bg-gradient-to-t from-[#111110]/60 via-[#111110]/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 ease-out">
                <span className="block text-[12px] leading-none text-[#F4F3EF] truncate">
                    {entry.title}
                </span>
            </div>
        </Link>
    );
}

export default function EditorGrid() {
    return (
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 pt-8 md:pt-12 pb-8 md:pb-10 paper-fade">
            <p className="mb-5 text-[11.5px] text-ink-muted">selected edits</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-3.5">
                {editorEntries.map((entry, idx) => (
                    <EditorCard key={entry.project.id} entry={entry} idx={idx} />
                ))}
            </div>
        </div>
    );
}
