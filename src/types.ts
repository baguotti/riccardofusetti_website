export type Credit = {
    role: string;
    name: string;
};

export type PressLink = {
    label: string;
    url: string;
};

export type Project = {
    id: string;
    title: string;
    category: 'director' | 'editor';
    thumbnailUrl: string;
    videoEmbedUrl: string;
    year: string;
    client: string;
    description: string;
    credits?: Credit[];
    press?: PressLink[];
    gallery?: string[];
};
