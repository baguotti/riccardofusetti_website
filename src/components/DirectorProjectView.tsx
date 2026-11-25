import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { directorEntries, type DirectorEntry } from '../data/directorMeta';
import { CreditsColophon, FootnoteRef } from './EditorialParts';
import Img from './Img';
import { FULLSCREEN_SIZES, GALLERY_SIZES, HERO_SIZES, POSTER_SIZES } from './sizes';

export default function DirectorProjectView({ entry }: { entry: DirectorEntry }) {
    const { project, gallery } = entry;
    const navigate = useNavigate();

    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [isPosterOpen, setIsPosterOpen] = useState(false);
    const [showAllCredits, setShowAllCredits] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const enterBtnRef = useRef<HTMLButtonElement>(null);

    const currentIdx = directorEntries.findIndex((e) => e.project.id === project.id);
    const prevEntry = directorEntries[(currentIdx - 1 + directorEntries.length) % directorEntries.length];
    const nextEntry = directorEntries[(currentIdx + 1) % directorEntries.length];

    const hasCredits = Boolean(project.credits && project.credits.length > 0);
    const hasPress = Boolean(project.press && project.press.length > 0);
    const hasPoster = Boolean(project.posterUrl);
    const hasGallery = gallery.length > 0;

    // Sequential footnote numbers for bottom notes (credits, stills).
    let fnCounter = 0;
    const creditsFn = hasCredits ? ++fnCounter : null;
    const stillsFn = hasGallery ? ++fnCounter : null;

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (gallery.length > 0 && selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex + 1) % gallery.length);
        }
    };

    const handlePrev = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (gallery.length > 0 && selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex - 1 + gallery.length) % gallery.length);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImageIndex !== null) {
                if (e.key === 'ArrowRight') {
                    setSelectedImageIndex((i) => (i === null ? null : (i + 1) % gallery.length));
                }
                if (e.key === 'ArrowLeft') {
                    setSelectedImageIndex((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length));
                }
                if (e.key === 'Escape') setSelectedImageIndex(null);
            }
            if (isPosterOpen && e.key === 'Escape') setIsPosterOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageIndex, isPosterOpen, gallery.length]);

    useEffect(() => {
        if (selectedImageIndex !== null || isPosterOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedImageIndex, isPosterOpen]);

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = passwordInput.trim();
        if (!project.hasPrivate || !token) return;
        const res = await fetch('/api/unlock', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id: project.id, token }),
        }).catch(() => null);
        if (res?.ok) {
            navigate(`/project/${project.id}/assets/${encodeURIComponent(token)}`, { viewTransition: true });
        } else {
            enterBtnRef.current?.animate(
                [0, -4, 4, -4, 4, 0].map((x) => ({ transform: `translateX(${x}px)` })),
                { duration: 360, easing: 'ease-in-out' },
            );
        }
    };

    const collapsibleCredits = project.id === 'motivational-short' && (project.credits?.length ?? 0) > 10;
    const visibleCredits = collapsibleCredits && !showAllCredits
        ? project.credits!.slice(0, 10)
        : (project.credits ?? []);

    const overviewGridClass = hasPress && hasPoster
        ? 'grid grid-cols-1 md:grid-cols-[minmax(0,1.15fr)_180px_minmax(0,1fr)] gap-8 md:gap-10 items-start'
        : hasPoster
            ? 'grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_180px] gap-8 md:gap-14 items-start'
            : hasPress
                ? 'grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start'
                : 'max-w-[620px]';

    return (
        <article className="w-full max-w-[1040px] mx-auto px-6 md:px-10 pt-4 md:pt-5 pb-16 paper-fade">
            {/* Top monograph bar */}
            <div className="pb-3 flex items-baseline justify-between gap-4 text-[11px]">
                <Link
                    to="/"
                    viewTransition
                    prefetch="intent"
                    className="text-ink-muted hover:text-ink transition-colors duration-200 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
                >
                    index
                </Link>
                <span className="tabular-nums text-ink-subtle">
                    {entry.indexLabel} / {String(directorEntries.length).padStart(2, '0')}
                </span>
            </div>

            {/* Frameless screening frame */}
            <div className="mt-5 aspect-video w-full bg-[#111110] relative overflow-hidden ring-1 ring-ink/[0.08]">
                {!isPlaying ? (
                    <button
                        type="button"
                        onClick={() => setIsPlaying(true)}
                        className="group relative w-full h-full block text-left cursor-pointer overflow-hidden focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink"
                        aria-label={`play ${entry.title}`}
                    >
                        <Img
                            src={project.thumbnailUrl}
                            sizes={HERO_SIZES}
                            priority
                            alt={entry.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 pt-10 pb-2.5 px-3 bg-gradient-to-t from-[#111110]/60 via-[#111110]/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 ease-out">
                            <span className="block text-[12px] leading-none text-[#F4F3EF]">
                                play film
                            </span>
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
                        title={entry.title}
                        className="w-full h-full"
                    />
                )}
            </div>

            {/* 3-column encyclopedia overview: summary | press | poster */}
            <section aria-label="entry overview" className={`mt-8 md:mt-10 ${overviewGridClass}`}>
                {/* Column 1: Summary */}
                <div className="min-w-0">
                    <p className="text-[10.5px] italic text-ink-subtle pb-2 border-b border-rule mb-5">
                        summary
                    </p>

                    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                        <h1 className="text-[19px] md:text-[21px] leading-[1.2] tracking-[-0.01em] font-normal text-ink">
                            {entry.displayTitle}
                        </h1>
                        {entry.displaySubtitle && (
                            <span className="text-[13px] italic text-ink-muted">
                                — {entry.displaySubtitle}
                            </span>
                        )}
                    </div>

                    <p className="mt-2 text-[12px] leading-[1.6] text-ink-muted lowercase">
                        {project.year && <span className="tabular-nums">{project.year}</span>}
                        {project.year && <span aria-hidden="true"> · </span>}
                        <span>{entry.format}</span>
                        {project.client && (
                            <>
                                <span aria-hidden="true"> · </span>
                                <span>{project.client}</span>
                            </>
                        )}
                        {creditsFn && (
                            <>
                                <span aria-hidden="true"> · </span>
                                <span>
                                    credits<FootnoteRef n={creditsFn} target="fn-credits" />
                                </span>
                            </>
                        )}
                        {stillsFn && (
                            <>
                                <span aria-hidden="true"> · </span>
                                <span>
                                    stills<FootnoteRef n={stillsFn} target="fn-stills" />
                                </span>
                            </>
                        )}
                    </p>

                    {project.description && (
                        <p className="mt-4 text-[13.5px] md:text-[14px] leading-[1.7] text-ink/85">
                            {project.description}
                        </p>
                    )}
                </div>

                {/* Column 2: Poster */}
                {hasPoster && project.posterUrl && (
                    <div className="min-w-0">
                        <p className="text-[10.5px] italic text-ink-subtle pb-2 border-b border-rule mb-5">
                            poster
                        </p>
                        <button
                            type="button"
                            onClick={() => setIsPosterOpen(true)}
                            className="group block w-40 md:w-full text-left cursor-pointer focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
                            aria-label={`view ${entry.title} poster fullscreen`}
                        >
                            <div className="overflow-hidden ring-1 ring-ink/[0.08] bg-paper-inset">
                                <Img
                                    src={project.posterUrl}
                                    sizes={POSTER_SIZES}
                                    alt={`${entry.title} poster`}
                                    className="w-full h-auto object-cover group-hover:opacity-90 transition-opacity duration-200"
                                />
                            </div>
                        </button>
                    </div>
                )}

                {/* Column 3: Press & selections */}
                {hasPress && (
                    <div className="min-w-0">
                        <p className="text-[10.5px] italic text-ink-subtle pb-2 border-b border-rule mb-5">
                            press &amp; selections
                        </p>
                        <ul className="list-none m-0 p-0 space-y-2">
                            {project.press!.map((item, i) => (
                                <li key={i}>
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[12px] leading-[1.5] text-ink hover:underline underline-offset-4 decoration-[1px] decoration-ink/60 lowercase focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>

            {/* Printed-encyclopedia footnotes */}
            {(hasCredits || hasGallery) && (
                <section aria-label="notes" className="mt-12 pt-5 border-t border-rule">
                    <ol className="list-none m-0 p-0 space-y-10 text-[11.5px] leading-[1.6] text-ink-muted">
                        {/* Footnote: Credits */}
                        {hasCredits && creditsFn && (
                            <li id="fn-credits" className="grid grid-cols-[1.5rem_1fr] items-baseline gap-2">
                                <span className="tabular-nums text-[10.5px] text-ink-subtle">{creditsFn}.</span>
                                <div className="min-w-0">
                                    <p className="text-[10.5px] italic text-ink-subtle mb-3">credits</p>
                                    <CreditsColophon credits={visibleCredits} />
                                    {collapsibleCredits && (
                                        <button
                                            type="button"
                                            onClick={() => setShowAllCredits((v) => !v)}
                                            className="mt-3 text-[11px] italic text-ink-muted hover:text-ink underline underline-offset-4 decoration-rule hover:decoration-ink transition-colors cursor-pointer"
                                        >
                                            {showAllCredits
                                                ? 'fewer credits'
                                                : `all credits (${project.credits!.length})`}
                                        </button>
                                    )}
                                </div>
                            </li>
                        )}

                        {/* Footnote: Stills contact sheet */}
                        {hasGallery && stillsFn && (
                            <li id="fn-stills" className="grid grid-cols-[1.5rem_1fr] items-baseline gap-2">
                                <span className="tabular-nums text-[10.5px] text-ink-subtle">{stillsFn}.</span>
                                <div className="min-w-0">
                                    <p className="text-[10.5px] italic text-ink-subtle mb-3">stills</p>
                                    <div
                                        className={`grid gap-2.5 ${
                                            gallery.length === 1
                                                ? 'grid-cols-1 max-w-lg'
                                                : gallery.length === 2
                                                    ? 'grid-cols-2'
                                                    : 'grid-cols-2 md:grid-cols-3'
                                        }`}
                                    >
                                        {gallery.map((img, index) => (
                                            <button
                                                key={img}
                                                type="button"
                                                onClick={() => setSelectedImageIndex(index)}
                                                className="group block w-full overflow-hidden bg-paper-inset ring-1 ring-ink/[0.06] cursor-pointer focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink"
                                                aria-label={`open still ${index + 1} of ${gallery.length}`}
                                            >
                                                <Img
                                                    src={img}
                                                    sizes={GALLERY_SIZES}
                                                    alt={`${entry.title} still ${index + 1}`}
                                                    className="w-full h-full object-cover aspect-video group-hover:opacity-88 transition-opacity duration-200"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </li>
                        )}
                    </ol>
                </section>
            )}

            {/* Next / previous entry */}
            <nav
                aria-label="adjacent works"
                className="mt-14 pt-4 grid grid-cols-2 gap-6"
            >
                <Link
                    to={`/project/${prevEntry.project.id}`}
                    viewTransition
                    prefetch="intent"
                    className="group flex flex-col items-start gap-0.5 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
                >
                    <span className="text-[10.5px] italic text-ink-subtle">previous</span>
                    <span className="text-[12.5px] text-ink group-hover:italic">
                        {prevEntry.title}
                    </span>
                </Link>

                <Link
                    to={`/project/${nextEntry.project.id}`}
                    viewTransition
                    prefetch="intent"
                    className="group flex flex-col items-end gap-0.5 text-right focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
                >
                    <span className="text-[10.5px] italic text-ink-subtle">next</span>
                    <span className="text-[12.5px] text-ink group-hover:italic">
                        {nextEntry.title}
                    </span>
                </Link>
            </nav>

            {/* Discreet private materials link */}
            {project.hasPrivate && (
                <div className="mt-12 flex justify-center">
                    {!showPasswordForm ? (
                        <button
                            type="button"
                            onClick={() => setShowPasswordForm(true)}
                            className="text-[10.5px] italic text-ink-subtle/50 hover:text-ink-muted transition-colors duration-300 cursor-pointer focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink"
                        >
                            private materials
                        </button>
                    ) : (
                        <form onSubmit={handlePasswordSubmit} className="flex items-baseline gap-3 paper-fade">
                            <input
                                type="password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                placeholder="password"
                                aria-label="private access password"
                                className="bg-transparent border-b border-rule focus:border-ink text-[11.5px] text-ink px-1 py-0.5 outline-none w-36 text-center transition-colors placeholder:italic placeholder:text-ink-subtle/60"
                                autoFocus
                            />
                            <button
                                ref={enterBtnRef}
                                type="submit"
                                className="text-[11px] italic text-ink-muted hover:text-ink transition-colors cursor-pointer"
                            >
                                enter
                            </button>
                        </form>
                    )}
                </div>
            )}

            {/* Archival Lightbox — Stills */}
            {selectedImageIndex !== null && gallery[selectedImageIndex] && (
                <ArchivalLightbox
                    title={entry.title}
                    caption={`${String(selectedImageIndex + 1).padStart(2, '0')} / ${String(gallery.length).padStart(2, '0')}`}
                    src={gallery[selectedImageIndex]}
                    alt={`${entry.title} still ${selectedImageIndex + 1}`}
                    onClose={() => setSelectedImageIndex(null)}
                    onPrev={handlePrev}
                    onNext={handleNext}
                />
            )}

            {/* Archival Lightbox — Poster */}
            {isPosterOpen && project.posterUrl && (
                <ArchivalLightbox
                    title={entry.title}
                    caption="poster"
                    src={project.posterUrl}
                    alt={`${entry.title} poster`}
                    onClose={() => setIsPosterOpen(false)}
                />
            )}
        </article>
    );
}

function ArchivalLightbox({
    title,
    caption,
    src,
    alt,
    onClose,
    onPrev,
    onNext,
}: {
    title: string;
    caption: string;
    src: string;
    alt: string;
    onClose: () => void;
    onPrev?: (e: React.MouseEvent) => void;
    onNext?: (e: React.MouseEvent) => void;
}) {
    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            className="fixed inset-0 z-[100] bg-paper/97 flex flex-col justify-between p-6 md:p-10 lightbox-in"
            onClick={onClose}
        >
            <div className="flex items-baseline justify-between gap-4 text-[11.5px] text-ink-muted">
                <span>
                    <span className="text-ink">{title}</span>
                    <span className="mx-2 text-ink-subtle">—</span>
                    <span className="italic tabular-nums">{caption}</span>
                </span>
                <button
                    type="button"
                    onClick={onClose}
                    className="text-ink hover:underline underline-offset-4 decoration-[1px] cursor-pointer focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
                >
                    close
                </button>
            </div>

            <div className="flex-1 min-h-0 flex items-center justify-center py-6 pointer-events-none">
                <Img
                    key={src}
                    sizes={FULLSCREEN_SIZES}
                    priority
                    src={src}
                    alt={alt}
                    className="max-w-full max-h-full w-auto h-auto object-contain ring-1 ring-ink/[0.08] lightbox-img-in pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>

            {onPrev && onNext ? (
                <div className="flex items-baseline justify-between text-[11.5px]">
                    <button
                        type="button"
                        onClick={onPrev}
                        className="text-ink-muted hover:text-ink transition-colors cursor-pointer focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
                    >
                        prev
                    </button>
                    <button
                        type="button"
                        onClick={onNext}
                        className="text-ink-muted hover:text-ink transition-colors cursor-pointer focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
                    >
                        next
                    </button>
                </div>
            ) : (
                <div className="h-4" aria-hidden="true" />
            )}
        </div>
    );
}
