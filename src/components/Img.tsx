import type { CSSProperties, ImgHTMLAttributes } from 'react';
import manifest from '../data/images.json';

type Entry = { w: number; h: number; c: string; v: string; ws?: number[]; anim?: number; og?: number };
const images = manifest as Record<string, Entry>;

const base = (src: string) => '/img/' + src.replace(/^\/assets\//, '').replace(/\.[^.]+$/, '');
const variant = (src: string, e: Entry, w: number, fmt: 'avif' | 'webp') => `${base(src)}-${w}.${e.v}.${fmt}`;

export const imageInfo = (src: string): Entry | undefined => images[src];

/** Best single URL for a width — used for preloading and social previews. */
export function imageUrl(src: string, width = 1600, fmt: 'avif' | 'webp' = 'avif'): string {
    const e = images[src];
    if (!e) return src;
    if (e.anim) return `${base(src)}.${e.v}.webp`;
    const ws = e.ws!;
    return variant(src, e, ws.find((w) => w >= width) ?? ws.at(-1)!, fmt);
}

export function ogImageUrl(src: string): string | undefined {
    const e = images[src];
    return e?.og ? `${base(src)}-og.${e.v}.jpg` : undefined;
}

/** Warm the browser cache for an image before it is shown (e.g. on hover). */
export function preloadImage(src: string, sizes: string) {
    const e = images[src];
    if (!e || typeof window === 'undefined') return;
    const img = new Image();
    if (e.ws) {
        img.sizes = sizes;
        img.srcset = e.ws.map((w) => `${variant(src, e, w, 'avif')} ${w}w`).join(', ');
    }
    img.src = imageUrl(src);
}

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> & {
    src: string;
    sizes: string;
    /** Above-the-fold image: load eagerly with high priority. */
    priority?: boolean;
};

export default function Img({ src, sizes, priority, style, alt = '', ...rest }: Props) {
    const e = images[src];
    const loading = priority ? 'eager' : 'lazy';
    const fetchPriority = priority ? 'high' : undefined;

    if (!e) {
        return <img src={src} alt={alt} loading={loading} fetchPriority={fetchPriority} decoding="async" style={style} {...rest} />;
    }

    const placeholder: CSSProperties = { backgroundColor: e.c, ...style };

    if (e.anim) {
        return <img src={imageUrl(src)} alt={alt} width={e.w} height={e.h} loading={loading} decoding="async" style={placeholder} {...rest} />;
    }

    const set = (fmt: 'avif' | 'webp') => e.ws!.map((w) => `${variant(src, e, w, fmt)} ${w}w`).join(', ');

    return (
        <picture>
            <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
            <img
                src={imageUrl(src, 1600, 'webp')}
                srcSet={set('webp')}
                sizes={sizes}
                alt={alt}
                width={e.w}
                height={e.h}
                loading={loading}
                fetchPriority={fetchPriority}
                decoding={priority ? 'sync' : 'async'}
                style={placeholder}
                {...rest}
            />
        </picture>
    );
}
