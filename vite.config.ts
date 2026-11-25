import { defineConfig, type Plugin } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { join, normalize } from 'node:path';

// Local stand-in for the Vercel middleware: unlock API + gated /private files.
function privateFilesDev(): Plugin {
    return {
        name: 'private-files-dev',
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                const path = (req.url ?? '').split('?')[0];
                if (path !== '/api/unlock' && !path.startsWith('/private/')) return next();

                const { handlePrivateRequest } = await server.ssrLoadModule('/server/private-access.ts');
                const chunks: Buffer[] = [];
                for await (const c of req) chunks.push(c as Buffer);
                const request = new Request(`http://${req.headers.host}${req.url}`, {
                    method: req.method,
                    headers: req.headers as Record<string, string>,
                    body: chunks.length ? Buffer.concat(chunks) : undefined,
                });
                const response: Response | undefined = await handlePrivateRequest(request);
                if (response) {
                    res.statusCode = response.status;
                    response.headers.forEach((v, k) => res.setHeader(k, v));
                    res.end(Buffer.from(await response.arrayBuffer()));
                    return;
                }
                const file = normalize(join(process.cwd(), decodeURIComponent(path)));
                if (!file.startsWith(join(process.cwd(), 'private')) || !existsSync(file) || !statSync(file).isFile()) {
                    res.statusCode = 404;
                    return res.end('Not found');
                }
                if (file.endsWith('.pdf')) res.setHeader('content-type', 'application/pdf');
                if (file.endsWith('.webp')) res.setHeader('content-type', 'image/webp');
                createReadStream(file).pipe(res);
            });
        },
    };
}

export default defineConfig({
    plugins: [tailwindcss(), reactRouter(), privateFilesDev()],
    optimizeDeps: {
        include: ['react', 'react-dom', 'react-dom/client', 'react-router', 'lucide-react'],
    },
});
