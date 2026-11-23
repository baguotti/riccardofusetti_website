import type { MetaDescriptor } from 'react-router';

export const SITE_URL = 'https://www.riccardofusetti.com';
const DEFAULT_DESCRIPTION = 'Riccardo Fusetti — director and editor based in London. Short films, commercials and fashion films.';

export function seo({ title, description = DEFAULT_DESCRIPTION, image, path, noindex }: {
    title: string;
    description?: string;
    image?: string;
    path: string;
    noindex?: boolean;
}): MetaDescriptor[] {
    const url = SITE_URL + path;
    const tags: MetaDescriptor[] = [
        { title },
        { name: 'description', content: description },
        { tagName: 'link', rel: 'canonical', href: url },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Riccardo Fusetti' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: url },
        { name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' },
    ];
    if (image) {
        tags.push(
            { property: 'og:image', content: SITE_URL + image },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
        );
    }
    if (noindex) tags.push({ name: 'robots', content: 'noindex, nofollow' });
    return tags;
}
