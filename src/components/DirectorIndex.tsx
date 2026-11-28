import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { directorEntries, type DirectorEntry } from '../data/directorMeta';
import Img, { preloadImage } from './Img';
import { HERO_SIZES } from './sizes';

const HERO_PREVIEW_SIZES = '(min-width: 1280px) 340px, (min-width: 1024px) 28vw, 100vw';
const STRIP_STILL_SIZES = '(min-width: 1024px) 640px, 85vw';

export default function DirectorIndex() {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [visitedIds, setVisitedIds] = useState<Set<string>>(() => new Set());
    const stripRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // Reset horizontal scroll and wire vertical mouse-wheel -> horizontal scroll on the active strip.
    useEffect(() => {
        if (!activeId) return;
        const el = stripRefs.current[activeId];
        if (!el) return;
        el.scrollLeft = 0;

        const handleWheel = (e: WheelEvent) => {
            if (el.scrollWidth <= el.clientWidth) return;
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                el.scrollLeft += e.deltaY;
            }
        };

        el.addEventListener('wheel', handleWheel, { passive: false });
        return () => el.removeEventListener('wheel', handleWheel);
    }, [activeId]);

    const activateRow = (entry: DirectorEntry, isHover: boolean) => {
        const id = entry.project.id;
        if (id !== activeId) {
            setActiveId(id);
            setVisitedIds((prev) => {
                if (prev.has(id)) return prev;
                const next = new Set(prev);
                next.add(id);
                return next;
            });
        }
        if (isHover) setHoveredId(id);
        preloadImage(entry.project.thumbnailUrl, HERO_SIZES);
    };

    return (
        <div className="flex-1 flex flex-col paper-fade">
            {/* Top 3-column encyclopedia band: table | poster/hero | notes */}
            <section
                aria-label="filmography index"
                className="w-full max-w-[1440px] mx-auto px-6 md:px-10 pt-8 md:pt-12 pb-16 md:pb-24"
            >
                <p className="mb-5 text-[11.5px] text-ink-muted">selected works</p>

                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_225px_minmax(0,1fr)] lg:gap-8 xl:gap-10 items-stretch">
                    {/* Column 1: filmography table */}
                    <div
                        className="w-full"
                        onPointerLeave={() => setHoveredId(null)}
                    >
                        <div className="pb-2 border-b border-rule grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_5.5rem_2.75rem] gap-3 items-baseline text-[10.5px] italic text-ink-subtle">
                            <span>title</span>
                            <span className="hidden sm:block">format</span>
                            <span className="text-right">year</span>
                        </div>

                        <ol className="list-none m-0 p-0">
                            {directorEntries.map((entry) => {
                                const isActive = activeId === entry.project.id;
                                const isHovered = hoveredId === entry.project.id;
                                const dimmed = hoveredId !== null && !isHovered;

                                return (
                                    <li key={entry.project.id} className="border-b border-rule">
                                        <Link
                                            to={`/project/${entry.project.id}`}
                                            viewTransition
                                            prefetch="intent"
                                            onPointerEnter={() => activateRow(entry, true)}
                                            onFocus={() => activateRow(entry, false)}
                                            className={`group py-3.5 grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_5.5rem_2.75rem] gap-x-3 gap-y-2 items-baseline transition-opacity duration-200 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                                                dimmed ? 'opacity-35' : 'opacity-100'
                                            }`}
                                        >
                                            <div className="min-w-0 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                                                <span
                                                    className={`text-[14px] md:text-[14.5px] leading-[1.3] tracking-[-0.005em] text-ink transition-all duration-150 ${
                                                        isActive && isHovered ? 'italic' : 'group-hover:italic'
                                                    }`}
                                                >
                                                    {entry.title}
                                                </span>
                                                {entry.subtitle && (
                                                    <span className="text-[11.5px] italic text-ink-muted">
                                                        {entry.subtitle}
                                                    </span>
                                                )}
                                            </div>

                                            <span className="hidden sm:block text-[11px] italic text-ink-muted">
                                                {entry.format}
                                            </span>

                                            <span className="text-[11px] text-ink-muted tabular-nums text-right">
                                                {entry.project.year}
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>

                    {/* Column 2 (desktop): stacked crossfade vertical posters for short films only */}
                    <aside
                        aria-label="selected work preview"
                        className="hidden lg:block relative self-stretch min-w-0"
                    >
                        {directorEntries.map((entry, idx) => {
                            if (!entry.isShortFilm || !entry.project.posterThumbUrl) return null;
                            const isActive = entry.project.id === activeId;
                            return (
                                <Link
                                    key={entry.project.id}
                                    to={`/project/${entry.project.id}`}
                                    viewTransition
                                    prefetch="intent"
                                    tabIndex={isActive ? 0 : -1}
                                    aria-hidden={!isActive}
                                    className={`absolute inset-0 flex items-start justify-start transition-opacity duration-200 ease-out focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink ${
                                        isActive
                                            ? 'opacity-100 z-10'
                                            : 'opacity-0 z-0 pointer-events-none'
                                    }`}
                                >
                                    <Img
                                        src={entry.project.posterThumbUrl}
                                        sizes={HERO_PREVIEW_SIZES}
                                        priority={idx < 3}
                                        alt={entry.title}
                                        className="max-h-full w-auto max-w-full object-contain ring-1 ring-ink/[0.07]"
                                    />
                                </Link>
                            );
                        })}
                    </aside>

                    {/* Column 3 (desktop): crossfading encyclopedia entry notes for short films only */}
                    <aside
                        aria-label="selected work notes"
                        className="hidden lg:block relative self-stretch min-w-0"
                    >
                        {directorEntries.map((entry) => {
                            if (!entry.isShortFilm) return null;
                            const isActive = entry.project.id === activeId;
                            const { project } = entry;
                            const hasPress = Boolean(project.press && project.press.length > 0);

                            return (
                                <div
                                    key={entry.project.id}
                                    aria-hidden={!isActive}
                                    className={`absolute inset-0 flex flex-col overflow-hidden transition-opacity duration-200 ease-out ${
                                        isActive
                                            ? 'opacity-100 z-10'
                                            : 'opacity-0 z-0 pointer-events-none'
                                    }`}
                                >
                                    <p className="pb-2 border-b border-rule text-[10.5px] italic text-ink-subtle">
                                        notes
                                    </p>

                                    {project.description && (
                                        <p className="mt-3.5 text-[12.5px] leading-[1.6] text-ink/85">
                                            {project.description}
                                        </p>
                                    )}

                                    {hasPress && (
                                        <div className="mt-4 pt-3 border-t border-rule/70 min-h-0">
                                            <p className="text-[10.5px] italic text-ink-subtle mb-2">
                                                press &amp; selections
                                            </p>
                                            <ul className="list-none m-0 p-0 space-y-1 text-[11.5px] leading-[1.45] text-ink-muted">
                                                {project.press!.slice(0, 5).map((item, i) => (
                                                    <li key={i} className="truncate">
                                                        <a
                                                            href={item.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            tabIndex={isActive ? 0 : -1}
                                                            className="hover:text-ink hover:underline underline-offset-4 decoration-[1px] decoration-ink/50 lowercase transition-colors"
                                                        >
                                                            {item.label}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </aside>
                </div>
            </section>

            {/* Bottom full-bleed horizontal stills strips — stacked crossfade, edge to edge */}
            <section aria-label="film stills" className="w-full overflow-hidden grid">
                    {directorEntries.map((entry) => {
                        if (!visitedIds.has(entry.project.id) || entry.stripStills.length === 0) return null;
                        const isActive = entry.project.id === activeId;

                        return (
                            <div
                                key={entry.project.id}
                                ref={(node) => {
                                    stripRefs.current[entry.project.id] = node;
                                }}
                                aria-hidden={!isActive}
                                className={`col-start-1 row-start-1 flex flex-nowrap gap-0 overflow-x-auto no-scrollbar w-full transition-opacity duration-200 ease-out ${
                                    isActive
                                        ? 'opacity-100 z-10'
                                        : 'opacity-0 z-0 pointer-events-none'
                                }`}
                            >
                                {entry.stripStills.map((src, idx) => (
                                    <Link
                                        key={src}
                                        to={`/project/${entry.project.id}`}
                                        viewTransition
                                        prefetch="intent"
                                        tabIndex={isActive ? 0 : -1}
                                        className="block h-[256px] sm:h-[297px] lg:h-[338px] shrink-0 bg-paper-inset overflow-hidden focus-visible:outline-1 focus-visible:outline-ink"
                                    >
                                        <Img
                                            src={src}
                                            sizes={STRIP_STILL_SIZES}
                                            priority={idx < 3}
                                            alt={`${entry.title} still ${idx + 1}`}
                                            className="h-full w-auto object-cover block"
                                        />
                                    </Link>
                                ))}
                            </div>
                        );
                    })}
            </section>
        </div>
    );
}
