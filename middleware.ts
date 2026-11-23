// Vercel Routing Middleware: guards private project files and handles unlocking.
import { next } from '@vercel/functions';
import { handlePrivateRequest } from './server/private-access';

export const config = { matcher: ['/api/unlock', '/private/:path*'] };

export default async function middleware(request: Request) {
    return (await handlePrivateRequest(request)) ?? next({ headers: { 'cache-control': 'private, no-store' } });
}
