import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, Link } from 'react-router';
import type { Route } from './+types/root';
import stylesheet from './index.css?url';
import interFont from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const links: Route.LinksFunction = () => [
    { rel: 'preload', href: interFont, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
    { rel: 'stylesheet', href: stylesheet },
    // Vimeo player starts faster when the connection is already open.
    { rel: 'preconnect', href: 'https://player.vimeo.com' },
    { rel: 'preconnect', href: 'https://i.vimeocdn.com' },
    { rel: 'preconnect', href: 'https://f.vimeocdn.com' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#050505" />
                <meta name="color-scheme" content="dark" />
                <meta name="darkreader-lock" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return (
        <>
            <div className="noise-overlay" aria-hidden="true" />
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

// Shown while a page that wasn't pre-rendered (e.g. a private page) loads.
export function HydrateFallback() {
    return <div className="min-h-screen" />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    const notFound = isRouteErrorResponse(error) && error.status === 404;
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
            <title>{notFound ? 'Not found — Riccardo Fusetti' : 'Error — Riccardo Fusetti'}</title>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#A1A1AA]">{notFound ? '404' : 'Something went wrong'}</p>
            <Link to="/" className="text-xs uppercase tracking-widest text-white/80 hover:text-white">Back to index</Link>
        </div>
    );
}
