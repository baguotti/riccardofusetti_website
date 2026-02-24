import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-end p-6 md:p-10 pointer-events-none">
            <div className="pointer-events-auto">
                <NavLink
                    to="/"
                    className="text-lg md:text-xl font-bold tracking-tight uppercase hover:opacity-70 transition-opacity duration-300"
                >
                    Riccardo Fusetti
                </NavLink>
                <div className="text-xs md:text-sm text-[var(--color-text-muted)] tracking-wider mt-1 uppercase">
                    director + editor
                </div>
            </div>

            <nav className="flex gap-6 pointer-events-auto">
                <NavLink
                    to="/director"
                    className={({ isActive }) =>
                        `text-sm font-medium uppercase tracking-widest transition-all duration-300 hover:text-white ${isActive ? 'text-white border-b border-white pb-1' : 'text-[var(--color-text-muted)]'
                        }`
                    }
                >
                    Director
                </NavLink>
                <NavLink
                    to="/editor"
                    className={({ isActive }) =>
                        `text-sm font-medium uppercase tracking-widest transition-all duration-300 hover:text-white ${isActive ? 'text-white border-b border-white pb-1' : 'text-[var(--color-text-muted)]'
                        }`
                    }
                >
                    Editor
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        `text-sm font-medium uppercase tracking-widest transition-all duration-300 hover:text-white ${isActive ? 'text-white border-b border-white pb-1' : 'text-[var(--color-text-muted)]'
                        }`
                    }
                >
                    About
                </NavLink>
            </nav>
        </header>
    );
}
