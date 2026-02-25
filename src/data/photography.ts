export interface Photo {
    id: string;
    url: string;
    alt: string;
    rotation: number;
    scale: number;
    xOffset: number;
    yOffset: number;
}

// Highly stylized, messy pseudo-random values (minimal rotation)
const transforms = [
    { rotation: -2, scale: 0.95, xOffset: -30, yOffset: 25 },
    { rotation: 3, scale: 1.05, xOffset: 45, yOffset: -15 },
    { rotation: -4, scale: 0.85, xOffset: -60, yOffset: 45 },
    { rotation: 1, scale: 1.1, xOffset: 15, yOffset: -35 },
    { rotation: -3, scale: 1.0, xOffset: -45, yOffset: 10 },
    { rotation: 4, scale: 0.9, xOffset: 65, yOffset: 20 },
    { rotation: -1, scale: 1.02, xOffset: -15, yOffset: -50 },
    { rotation: 2, scale: 0.98, xOffset: 55, yOffset: 35 },
    { rotation: -5, scale: 1.08, xOffset: -70, yOffset: -25 },
    { rotation: 3, scale: 0.9, xOffset: 35, yOffset: 60 },
];

export const photographyList: Photo[] = [
    {
        id: 'photo-1',
        url: 'https://images.unsplash.com/photo-1533167649158-6d508895b680?q=80&w=800&auto=format&fit=crop',
        alt: 'Dark moody shot',
        ...transforms[0],
    },
    {
        id: 'photo-2',
        url: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=800&auto=format&fit=crop',
        alt: 'Neon rain',
        ...transforms[1],
    },
    {
        id: 'photo-3',
        url: 'https://images.unsplash.com/photo-1542314831-c6a4d14d8373?q=80&w=800&auto=format&fit=crop',
        alt: 'Night street',
        ...transforms[2],
    },
    {
        id: 'photo-4',
        url: 'https://images.unsplash.com/photo-1517594422361-5e18d0333182?q=80&w=800&auto=format&fit=crop',
        alt: 'Cinematic silhouette',
        ...transforms[3],
    },
    {
        id: 'photo-5',
        url: 'https://images.unsplash.com/photo-1478147424052-bb522db2a24c?q=80&w=800&auto=format&fit=crop',
        alt: 'Dark architecture',
        ...transforms[4],
    },
    {
        id: 'photo-6',
        url: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=800&auto=format&fit=crop',
        alt: 'Abstract dark texture',
        ...transforms[5],
    },
    {
        id: 'photo-7',
        url: 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?q=80&w=800&auto=format&fit=crop',
        alt: 'Moody interior',
        ...transforms[6],
    },
    {
        id: 'photo-8',
        url: 'https://images.unsplash.com/photo-1495312040802-a929cd14a6ab?q=80&w=800&auto=format&fit=crop',
        alt: 'Night lights blur',
        ...transforms[7],
    },
    {
        id: 'photo-9',
        url: 'https://images.unsplash.com/photo-1505322022379-7cf87fbf3bf0?q=80&w=800&auto=format&fit=crop',
        alt: 'Dark portrait outline',
        ...transforms[8],
    },
    {
        id: 'photo-10',
        url: 'https://images.unsplash.com/photo-1511406361295-0a1ff814c0ce?q=80&w=800&auto=format&fit=crop',
        alt: 'Cinematic car shot',
        ...transforms[9],
    },
];
