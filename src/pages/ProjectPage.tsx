import { useParams, Navigate } from 'react-router';
import type { Route } from './+types/ProjectPage';
import { projects } from '../data/projects';
import { getDirectorEntry, getEditorEntry } from '../data/directorMeta';
import DirectorProjectView from '../components/DirectorProjectView';
import EditorProjectView from '../components/EditorProjectView';
import { ogImageUrl } from '../components/Img';
import { seo } from '../seo';

export function meta({ params }: Route.MetaArgs) {
    const project = projects.find((p) => p.id === params.id);
    if (!project) return [{ title: 'riccardo fusetti' }];
    const directorEntry = getDirectorEntry(project.id);
    const editorEntry = getEditorEntry(project.id);
    const title = directorEntry?.title ?? editorEntry?.title ?? project.title.toLowerCase();
    return seo({
        title: `${title} — riccardo fusetti`,
        description: project.description || `${project.title}${project.client ? ` for ${project.client}` : ''} — ${project.category === 'editor' ? 'edited' : 'directed'} by Riccardo Fusetti.`,
        image: ogImageUrl(project.thumbnailUrl),
        path: `/project/${project.id}`,
    });
}

export default function ProjectPage() {
    const { id } = useParams<{ id: string }>();
    const directorEntry = getDirectorEntry(id);
    if (directorEntry) {
        return <DirectorProjectView key={directorEntry.project.id} entry={directorEntry} />;
    }

    const editorEntry = getEditorEntry(id);
    if (editorEntry) {
        return <EditorProjectView key={editorEntry.project.id} entry={editorEntry} />;
    }

    return <Navigate to="/" replace />;
}
