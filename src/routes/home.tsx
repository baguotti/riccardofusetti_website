import { data } from 'react-router';
import type { Route } from './+types/home';
import DirectorIndex from '../components/DirectorIndex';
import EditorGrid from '../components/EditorGrid';
import { projects } from '../data/projects';
import { seo } from '../seo';
import { ogImageUrl } from '../components/Img';

const CATEGORIES = { director: 'director', editor: 'editor' } as const;
type Category = keyof typeof CATEGORIES;

function categoryOf(params: { category?: string }): Category {
    const c = params.category ?? 'director';
    if (!(c in CATEGORIES)) throw data(null, { status: 404 });
    return c as Category;
}

export function meta({ params }: Route.MetaArgs) {
    const raw = params.category ?? 'director';
    const category: Category = raw in CATEGORIES ? (raw as Category) : 'director';
    const first = projects.find((p) => p.category === category);
    return seo({
        title: `riccardo fusetti — ${CATEGORIES[category]}`,
        path: category === 'director' ? '/' : `/${category}`,
        image: first ? ogImageUrl(first.thumbnailUrl) : undefined,
    });
}

export default function Home({ params }: Route.ComponentProps) {
    const category = categoryOf(params);
    return category === 'editor' ? <EditorGrid /> : <DirectorIndex />;
}
