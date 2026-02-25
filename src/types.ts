export type Credit = {
    role: string;
    name: string;
    instagram?: string;
    url?: string;
};

export type PressLink = {
    label: string;
    url: string;
};

export type Project = {
    id: string;
    title: string;
    category: 'director' | 'editor';
    projectType?: 'Narrative' | 'Music Video' | string;
    thumbnailUrl: string;
    videoEmbedUrl: string;
    videoEmbedUrls?: string[];
    isVertical?: boolean;
    year?: string;
    client?: string;
    description?: string;
    credits?: Credit[];
    press?: PressLink[];
    gallery?: string[];
    posterUrl?: string;
};
