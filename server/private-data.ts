// Server-only. Never import this from src/ — it would ship the passwords to the browser.
// Change a project's password by editing its `token` below.
// Files referenced as /private/<project-id>/... live in the repo's private/ folder
// and are only served to visitors who unlocked that project.
import type { PrivateSection } from '../src/types';

export const privateProjects: Record<string, PrivateSection> = {
    'editorial-short': {
            token: 'password',
            assets: [
                {
                    id: 'treatment',
                    title: 'Director\'s Treatment',
                    type: 'pdf',
                    url: 'https://indd.adobe.com/view/e1511376-a18c-4246-bdb2-610d4ccc6696',
                    embedUrl: 'https://indd.adobe.com/view/e1511376-a18c-4246-bdb2-610d4ccc6696',
                    description: 'Original pitch deck and visual references.'
                }
            ]
        },
    'motivational-short': {
            token: 'password',
            assets: [
                {
                    id: 'treatment',
                    title: 'Director\'s Treatment',
                    type: 'pdf',
                    url: '/private/motivational-short/Motivational_Treatment_V7.0.pdf',
                    embedUrl: '/private/motivational-short/Motivational_Treatment_V7.0.pdf',
                    description: 'Original pitch deck and visual references.'
                },
                {
                    id: 'animatic',
                    title: 'Animatic',
                    type: 'video',
                    embedUrl: 'https://drive.google.com/file/d/1SInnFsgbBl78r9iDZJxHCrncU-Ny0roj/preview',
                    thumbnailUrl: '/private/motivational-short/motivational_animatic_thumb.webp',
                    description: 'Early animatic.'
                },
                {
                    id: 'script',
                    title: 'Script',
                    type: 'pdf',
                    url: '/private/motivational-short/Motivational_Script.pdf',
                    embedUrl: '/private/motivational-short/Motivational_Script.pdf',
                    description: 'Shooting script.'
                }
            ]
        },
    'generation-short': {
            token: 'password',
            assets: [
                {
                    id: 'treatment',
                    title: 'Director\'s Treatment',
                    type: 'pdf',
                    url: '/private/generation-short/Generation_Treatment_v8.pdf',
                    embedUrl: '/private/generation-short/Generation_Treatment_v8.pdf',
                    description: 'Original pitch deck and visual references.'
                }
            ]
        }
};
