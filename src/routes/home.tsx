import { data } from 'react-router';
import type { Route } from './+types/home';
import ThumbnailGrid from '../components/ThumbnailGrid';
import { projects } from '../data/projects';
import { seo } from '../seo';
import { ogImageUrl } from '../components/Img';

const CATEGORIES = { director: 'Director', editor: 'Editor' } as const;
type Category = keyof typeof CATEGORIES;

function categoryOf(params: { category?: string }): Category {
    const c = params.category ?? 'director';
    if (!(c in CATEGORIES)) throw data(null, { status: 404 });
    return c as Category;
}

// Unknown categories (e.g. /foo) become a 404.
export function clientLoader({ params }: Route.ClientLoaderArgs) {
    return { category: categoryOf(params) };
}

export function meta({ params }: Route.MetaArgs) {
    const category = (params.category ?? 'director') as Category;
    const first = projects.find((p) => p.category === category);
    return seo({
        title: `Riccardo Fusetti — ${CATEGORIES[category] ?? 'Director'}`,
        path: category === 'director' ? '/' : `/${category}`,
        image: first ? ogImageUrl(first.thumbnailUrl) : undefined,
    });
}

export default function Home({ params }: Route.ComponentProps) {
    const category = params.category ?? 'director';
    return (
        <div className="pt-32">
            <ThumbnailGrid projects={projects.filter((p) => p.category === category)} />
        </div>
    );
}
