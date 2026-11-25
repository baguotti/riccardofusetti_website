import { Link } from 'react-router';
import { editorEntries } from '../data/directorMeta';
import Img, { preloadImage } from './Img';
import { HERO_SIZES } from './sizes';

const CARD_SIZES = '(min-width: 1440px) 440px, (min-width: 1024px) 31vw, (min-width: 640px) 47vw, 100vw';

export default function EditorGrid() {
    return (
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 pt-8 md:pt-12 pb-8 md:pb-10 paper-fade">
            <p className="mb-5 text-[11.5px] text-ink-muted">selected edits</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-3.5">
                {editorEntries.map((entry, idx) => (
                    <Link
                        key={entry.project.id}
                        to={`/project/${entry.project.id}`}
                        viewTransition
                        prefetch="intent"
                        onPointerEnter={() => preloadImage(entry.project.thumbnailUrl, HERO_SIZES)}
                        onFocus={() => preloadImage(entry.project.thumbnailUrl, HERO_SIZES)}
                        className="group relative block aspect-video w-full overflow-hidden bg-paper-inset ring-1 ring-ink/[0.06] focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
                    >
                        <Img
                            src={entry.project.thumbnailUrl}
                            sizes={CARD_SIZES}
                            priority={idx < 6}
                            alt={entry.displayTitle}
                            className="w-full h-full object-cover"
                        />

                        {/* Subtle bottom-left title revealed on hover / focus */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 pt-10 pb-2.5 px-3 bg-gradient-to-t from-[#111110]/60 via-[#111110]/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 ease-out">
                            <span className="block text-[12px] leading-none text-[#F4F3EF] truncate">
                                {entry.title}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
