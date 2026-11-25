import type { Project } from '../types';
import { projects } from './projects';

export type DirectorEntry = {
    project: Project;
    indexLabel: string;
    title: string;
    subtitle?: string;
    displayTitle: string;
    displaySubtitle?: string;
    format: 'short film' | 'music video';
    isShortFilm: boolean;
    primaryImage: string;
    gallery: string[];
    stripStills: string[];
};

export type EditorEntry = {
    project: Project;
    indexLabel: string;
    title: string;
    displayTitle: string;
};

const DISPLAY_OVERRIDES: Record<
    string,
    {
        displayTitle: string;
        displaySubtitle?: string;
        format: 'short film' | 'music video';
    }
> = {
    'editorial-short': { displayTitle: 'Editorial', format: 'short film' },
    'motivational-short': { displayTitle: 'Motivational', format: 'short film' },
    'generation-short': { displayTitle: 'Generation', format: 'short film' },
    deliverance: { displayTitle: 'Deliverance', displaySubtitle: 'Hobbie Stuart', format: 'music video' },
    'circus-of-bones': { displayTitle: 'Una and the Lion', displaySubtitle: 'Circus of Bones', format: 'music video' },
    phobophobes: { displayTitle: 'Moustache Mike', displaySubtitle: 'Phobophobes', format: 'music video' },
};

const EDITORIAL_STRIP_ORDER = [
    '/assets/director/editorial-short/editorial-short_still_03.png',
    '/assets/director/editorial-short/editorial-short_still_12.png',
    '/assets/director/editorial-short/editorial-short_still_09.png',
    '/assets/director/editorial-short/editorial-short_still_04.png',
    '/assets/director/editorial-short/editorial-short_still_13.png',
    '/assets/director/editorial-short/editorial-short_still_05.png',
    '/assets/director/editorial-short/editorial-short_still_15.png',
    '/assets/director/editorial-short/editorial-short_still_02.png',
    '/assets/director/editorial-short/editorial-short_still_06.png',
    '/assets/director/editorial-short/editorial-short_still_14.png',
    '/assets/director/editorial-short/editorial-short_still_07.png',
    '/assets/director/editorial-short/editorial-short_still_08.png',
    '/assets/director/editorial-short/editorial-short_still_11.png',
    '/assets/director/editorial-short/editorial-short_still_10.png',
    '/assets/director/editorial-short/editorial-short_still_16.png',
];

function dedupe(items: string[]): string[] {
    return Array.from(new Set(items));
}

function cleanEditorTitle(raw: string): string {
    return raw.replace(/\s*\/\/\s*/g, ' — ').trim();
}

export const directorEntries: DirectorEntry[] = projects
    .filter((p) => p.category === 'director')
    .map((project, index) => {
        const override = DISPLAY_OVERRIDES[project.id];
        const displayTitle = override?.displayTitle ?? project.title;
        const displaySubtitle = override?.displaySubtitle;
        const isShortFilm = override ? override.format === 'short film' : project.projectType === 'Narrative';
        const gallery = dedupe(project.gallery ?? []);

        return {
            project,
            indexLabel: String(index + 1).padStart(2, '0'),
            title: displayTitle.toLowerCase(),
            subtitle: displaySubtitle?.toLowerCase(),
            displayTitle,
            displaySubtitle,
            format: override?.format ?? (isShortFilm ? 'short film' : 'music video'),
            isShortFilm,
            primaryImage: project.posterThumbUrl || project.thumbnailUrl,
            gallery,
            stripStills:
                project.id === 'editorial-short'
                    ? EDITORIAL_STRIP_ORDER
                    : project.id === 'phobophobes'
                        ? dedupe([project.thumbnailUrl, ...gallery])
                        : gallery,
        };
    });

export const editorEntries: EditorEntry[] = projects
    .filter((p) => p.category === 'editor')
    .map((project, index) => {
        const displayTitle = cleanEditorTitle(project.title);
        return {
            project,
            indexLabel: String(index + 1).padStart(2, '0'),
            title: displayTitle.toLowerCase(),
            displayTitle,
        };
    });

const directorIds = new Set(directorEntries.map((e) => e.project.id));
const editorIds = new Set(editorEntries.map((e) => e.project.id));

export function getDirectorEntry(id?: string): DirectorEntry | undefined {
    if (!id) return undefined;
    return directorEntries.find((e) => e.project.id === id);
}

export function getEditorEntry(id?: string): EditorEntry | undefined {
    if (!id) return undefined;
    return editorEntries.find((e) => e.project.id === id);
}

export function isEditorRoutePath(pathname: string): boolean {
    const clean = pathname.replace(/\/+$/, '') || '/';
    if (clean === '/editor') return true;
    const match = clean.match(/^\/project\/([^/]+)$/);
    return Boolean(match && editorIds.has(match[1]));
}

export function isDirectorRoutePath(pathname: string): boolean {
    const clean = pathname.replace(/\/+$/, '') || '/';
    if (clean === '/' || clean === '/director') return true;
    const match = clean.match(/^\/project\/([^/]+)$/);
    return Boolean(match && directorIds.has(match[1]));
}

/** True for all public pages using the archival paper theme (everything except private asset portals). */
export function isDirectorThemePath(pathname: string): boolean {
    const clean = pathname.replace(/\/+$/, '') || '/';
    if (clean === '/' || clean === '/director' || clean === '/editor' || clean === '/contact') return true;
    const match = clean.match(/^\/project\/([^/]+)$/);
    return Boolean(match && (directorIds.has(match[1]) || editorIds.has(match[1])));
}
