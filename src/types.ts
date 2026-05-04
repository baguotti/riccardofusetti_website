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

export type PrivateAsset = {
    id: string;
    title: string;
    type: 'video' | 'pdf' | 'gallery';
    url?: string;
    urls?: string[];
    embedUrl?: string;
    thumbnailUrl?: string;
    description?: string;
};

export type PrivateSection = {
    token: string;
    assets: PrivateAsset[];
};

export type Project = {
    id: string;
    title: string;
    category: 'director' | 'editor';
    projectType?: 'Narrative' | 'Music Video' | string;
    thumbnailUrl: string;
    videoEmbedUrl?: string;
    videoEmbedUrls?: string[];
    videoThumbnails?: string[];
    isVertical?: boolean;
    posterThumbUrl?: string;
    year?: string;
    client?: string;
    description?: string;
    credits?: Credit[];
    press?: PressLink[];
    gallery?: string[];
    posterUrl?: string;
    privateData?: PrivateSection;
};
