import { useState } from 'react';
import { Link } from 'react-router';
import { editorEntries, type EditorEntry } from '../data/directorMeta';
import { CreditsColophon, FootnoteRef } from './EditorialParts';
import Img from './Img';
import { HERO_HALF_SIZES, HERO_SIZES } from './sizes';

export default function EditorProjectView({ entry }: { entry: EditorEntry }) {
    const { project } = entry;
    const [isPlaying, setIsPlaying] = useState(false);
    const [playingMulti, setPlayingMulti] = useState<Record<number, boolean>>({});

    const currentIdx = editorEntries.findIndex((e) => e.project.id === project.id);
    const prevEntry = editorEntries[(currentIdx - 1 + editorEntries.length) % editorEntries.length];
    const nextEntry = editorEntries[(currentIdx + 1) % editorEntries.length];

    const hasCredits = Boolean(project.credits && project.credits.length > 0);

    return (
        <article className="w-full max-w-[1040px] mx-auto px-6 md:px-10 pt-4 md:pt-5 pb-16 paper-fade">
            {/* Top monograph bar */}
            <div className="pb-3 flex items-baseline justify-between gap-4 text-[11px]">
                <Link
                    to="/editor"
                    viewTransition
                    prefetch="intent"
                    className="text-ink-muted hover:text-ink transition-colors duration-200 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
                >
                    index
                </Link>
                <span className="tabular-nums text-ink-subtle">
                    {entry.indexLabel} / {String(editorEntries.length).padStart(2, '0')}
                </span>
            </div>

            {/* Frameless screening player (single widescreen or dual vertical) */}
            {project.isVertical && project.videoEmbedUrls ? (
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[780px] mx-auto">
                    {project.videoEmbedUrls.map((url, idx) => (
                        <div
                            key={url}
                            className="aspect-[4/5] w-full bg-[#111110] relative overflow-hidden ring-1 ring-ink/[0.08]"
                        >
                            {!playingMulti[idx] ? (
                                <button
                                    type="button"
                                    onClick={() => setPlayingMulti((prev) => ({ ...prev, [idx]: true }))}
                                    className="group relative w-full h-full block text-left cursor-pointer overflow-hidden focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink"
                                    aria-label={`play ${entry.displayTitle} part ${idx + 1}`}
                                >
                                    <Img
                                        src={project.videoThumbnails?.[idx] || project.thumbnailUrl}
                                        sizes={HERO_HALF_SIZES}
                                        priority
                                        alt={`${entry.displayTitle} ${idx + 1}`}
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
                                    src={`${url}${url.includes('?') ? '&' : '?'}autoplay=1&controls=1&title=0&byline=0&portrait=0`}
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                    title={`${entry.displayTitle} — ${idx + 1}`}
                                    className="w-full h-full"
                                />
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="mt-5 aspect-video w-full bg-[#111110] relative overflow-hidden ring-1 ring-ink/[0.08]">
                    {!isPlaying ? (
                        <button
                            type="button"
                            onClick={() => setIsPlaying(true)}
                            className="group relative w-full h-full block text-left cursor-pointer overflow-hidden focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink"
                            aria-label={`play ${entry.displayTitle}`}
                        >
                            <Img
                                src={project.thumbnailUrl}
                                sizes={HERO_SIZES}
                                priority
                                alt={entry.displayTitle}
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
                            title={entry.displayTitle}
                            className="w-full h-full"
                        />
                    )}
                </div>
            )}

            {/* Neat title + footnote reference + optional synopsis */}
            <header className="mt-8 md:mt-10 max-w-[620px]">
                <h1 className="text-[19px] md:text-[21px] leading-[1.2] tracking-[-0.01em] font-normal text-ink">
                    {entry.displayTitle}
                    {hasCredits && <FootnoteRef n={1} target="fn-credits" />}
                </h1>
                {project.description && (
                    <p className="mt-3 text-[13.5px] md:text-[14px] leading-[1.7] text-ink/85">
                        {project.description}
                    </p>
                )}
            </header>

            {/* Footnote: Credits */}
            {hasCredits && (
                <section aria-label="notes" className="mt-10 pt-5 border-t border-rule">
                    <ol className="list-none m-0 p-0 text-[11.5px] leading-[1.6] text-ink-muted">
                        <li id="fn-credits" className="grid grid-cols-[1.5rem_1fr] items-baseline gap-2">
                            <span className="tabular-nums text-[10.5px] text-ink-subtle">1.</span>
                            <div className="min-w-0">
                                <p className="text-[10.5px] italic text-ink-subtle mb-3">credits</p>
                                <CreditsColophon credits={project.credits!} />
                            </div>
                        </li>
                    </ol>
                </section>
            )}

            {/* Previous / next edit */}
            <nav aria-label="adjacent edits" className="mt-14 pt-4 grid grid-cols-2 gap-6">
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
        </article>
    );
}
