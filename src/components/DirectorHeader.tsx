import { NavLink, Link, useLocation } from 'react-router';
import { isDirectorRoutePath, isEditorRoutePath } from '../data/directorMeta';

export default function DirectorHeader() {
    const { pathname } = useLocation();
    const onDirector = isDirectorRoutePath(pathname);
    const onEditor = isEditorRoutePath(pathname);
    const onInfo = pathname === '/contact';

    return (
        <header className="sticky top-0 z-40 w-full bg-paper/95 backdrop-blur-[2px] border-b border-rule">
            <div className="max-w-[1440px] mx-auto px-6 md:px-10 pt-3.5 pb-2.5 flex items-baseline justify-between gap-6">
                <div className="flex items-baseline gap-2.5 min-w-0">
                    <Link
                        to="/"
                        viewTransition
                        prefetch="intent"
                        className="text-[13px] tracking-[-0.005em] text-ink hover:opacity-65 transition-opacity duration-200 whitespace-nowrap focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
                    >
                        riccardo fusetti
                    </Link>
                    <span className="hidden sm:inline text-[11.5px] italic text-ink-muted">
                        london
                    </span>
                </div>

                <nav aria-label="primary" className="flex items-baseline gap-5 md:gap-7 text-[12px]">
                    <NavLink
                        to="/"
                        viewTransition
                        prefetch="intent"
                        end
                        className={() =>
                            `transition-colors duration-200 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink ${
                                onDirector
                                    ? 'text-ink underline underline-offset-[4px] decoration-ink/60 decoration-[1px]'
                                    : 'text-ink-muted hover:text-ink'
                            }`
                        }
                    >
                        director
                    </NavLink>
                    <NavLink
                        to="/editor"
                        viewTransition
                        prefetch="intent"
                        className={() =>
                            `transition-colors duration-200 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink ${
                                onEditor
                                    ? 'text-ink underline underline-offset-[4px] decoration-ink/60 decoration-[1px]'
                                    : 'text-ink-muted hover:text-ink'
                            }`
                        }
                    >
                        editor
                    </NavLink>
                    <NavLink
                        to="/contact"
                        viewTransition
                        prefetch="intent"
                        className={() =>
                            `transition-colors duration-200 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink ${
                                onInfo
                                    ? 'text-ink underline underline-offset-[4px] decoration-ink/60 decoration-[1px]'
                                    : 'text-ink-muted hover:text-ink'
                            }`
                        }
                    >
                        info
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}
