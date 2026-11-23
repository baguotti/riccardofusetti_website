// Password check for private project pages. Runs as Vercel Routing Middleware
// in production (see /middleware.ts) and inside the Vite dev server locally.
//
//   POST /api/unlock  { id, token }  -> 200 { assets } + access cookie, or 401
//   GET  /private/<id>/<file>         -> passes through only with that cookie
import { privateProjects } from './private-data';

// Optional extra secret so cookies can't be forged even if the source leaks.
const SECRET = (typeof process !== 'undefined' && process.env?.PRIVATE_COOKIE_SECRET) || 'rf-private-v1';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

async function sign(id: string, token: string) {
    const data = new TextEncoder().encode(`${id}:${token}:${SECRET}`);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function safeEqual(a: string, b: string) {
    if (a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return diff === 0;
}

const cookieName = (id: string) => `pa_${id.replace(/[^a-z0-9-]/gi, '')}`;

function readCookie(req: Request, name: string) {
    const header = req.headers.get('cookie') ?? '';
    for (const part of header.split(';')) {
        const [k, ...v] = part.trim().split('=');
        if (k === name) return v.join('=');
    }
    return undefined;
}

const json = (body: unknown, status = 200, headers: HeadersInit = {}) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...headers },
    });

/** Returns a Response to send, or undefined to let the request continue. */
export async function handlePrivateRequest(req: Request): Promise<Response | undefined> {
    const url = new URL(req.url);

    if (url.pathname === '/api/unlock') {
        if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
        let body: { id?: unknown; token?: unknown };
        try {
            body = await req.json();
        } catch {
            return json({ error: 'Bad request' }, 400);
        }
        const id = typeof body.id === 'string' ? body.id : '';
        const token = typeof body.token === 'string' ? body.token.trim() : '';
        const project = privateProjects[id];
        if (!project || !token || !safeEqual(token, project.token)) {
            return json({ error: 'Invalid password' }, 401);
        }
        const secure = url.protocol === 'https:' ? '; Secure' : '';
        const cookie = `${cookieName(id)}=${await sign(id, project.token)}; Path=/private/${id}/; Max-Age=${MAX_AGE}; HttpOnly; SameSite=Lax${secure}`;
        return json({ assets: project.assets }, 200, { 'set-cookie': cookie });
    }

    const match = url.pathname.match(/^\/private\/([^/]+)\//);
    if (match) {
        const id = decodeURIComponent(match[1]);
        const project = privateProjects[id];
        const cookie = readCookie(req, cookieName(id));
        if (project && cookie && safeEqual(cookie, await sign(id, project.token))) return undefined;
        return new Response('This file is private.', {
            status: 401,
            headers: { 'content-type': 'text/plain', 'cache-control': 'no-store' },
        });
    }

    return undefined;
}
