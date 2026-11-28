import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, Link, useLocation } from 'react-router';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import type { Route } from './+types/root';
import stylesheet from './index.css?url';
import interFont from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
import newsreaderRegular from '@fontsource-variable/newsreader/files/newsreader-latin-opsz-normal.woff2?url';
import newsreaderItalic from '@fontsource-variable/newsreader/files/newsreader-latin-opsz-italic.woff2?url';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DirectorHeader from './components/DirectorHeader';
import DirectorFooter from './components/DirectorFooter';
import { isDirectorThemePath } from './data/directorMeta';

export const links: Route.LinksFunction = () => [
    { rel: 'preload', href: newsreaderRegular, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
    { rel: 'preload', href: newsreaderItalic, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
    { rel: 'preload', href: interFont, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
    { rel: 'stylesheet', href: stylesheet },
    // Vimeo player starts faster when the connection is already open.
    { rel: 'preconnect', href: 'https://player.vimeo.com' },
    { rel: 'preconnect', href: 'https://i.vimeocdn.com' },
    { rel: 'preconnect', href: 'https://f.vimeocdn.com' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
];

export function Layout({ children }: { children: React.ReactNode }) {
    const { pathname } = useLocation();
    const paper = isDirectorThemePath(pathname);

    return (
        <html lang="en" data-theme={paper ? 'paper' : 'dark'}>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content={paper ? '#111110' : '#050505'} />
                <meta name="color-scheme" content="dark" />
                <meta name="darkreader-lock" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <Analytics />
                <SpeedInsights />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    const { pathname } = useLocation();
    const paper = isDirectorThemePath(pathname);

    if (paper) {
        return (
            <div className="min-h-screen flex flex-col bg-paper text-ink font-editorial">
                <DirectorHeader />
                <main className="flex-1 flex flex-col">
                    <Outlet />
                </main>
                <DirectorFooter />
            </div>
        );
    }

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
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center bg-paper text-ink font-editorial">
            <title>{notFound ? 'not found — riccardo fusetti' : 'error — riccardo fusetti'}</title>
            <p className="text-[13px] italic text-ink-muted">{notFound ? '404 — entry not found' : 'something went wrong'}</p>
            <Link to="/" className="text-[14px] text-ink underline underline-offset-4 decoration-[1px] hover:opacity-65 transition-opacity">
                return to index
            </Link>
        </div>
    );
}
