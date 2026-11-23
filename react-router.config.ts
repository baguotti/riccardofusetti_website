import type { Config } from '@react-router/dev/config';
import { projects } from './src/data/projects';

// Static site: every public page is pre-rendered to HTML at build time.
// Anything else (e.g. private pages) falls back to the client-rendered shell.
export default {
    appDirectory: 'src',
    buildDirectory: 'dist',
    ssr: false,
    async prerender() {
        return ['/', '/editor', '/contact', ...projects.map((p) => `/project/${p.id}`)];
    },
} satisfies Config;
