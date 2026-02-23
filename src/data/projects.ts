import type { Project } from '../types';

export const projects: Project[] = [

    {
        id: 'editorial-short',
        title: 'Editorial // Short Film',
        category: 'director',
        thumbnailUrl: '/projects/editorial.jpg',
        videoEmbedUrl: 'https://player.vimeo.com/video/1069658930',
        year: '2024',
        client: 'Fashion Lifestyle',
        description: 'Fashion lifestyle editorial. With a twist.',
        credits: [
            { role: 'Written and Directed by', name: 'Riccardo Fusetti', instagram: 'riccardo.fusetti', url: 'https://www.riccardofusetti.com' },
            { role: 'Starring', name: 'Victoria Valcheva', instagram: 'victoriazval' },
            { role: 'Dop', name: 'Toby Goodger', instagram: 'tobygoodgerdop' },
            { role: 'First AC', name: 'Jay W. Whittington Barrette', instagram: 'jaywhittington' },
            { role: 'Gaffer', name: 'Alex Styles', instagram: 'alex_____styles' },
            { role: 'Music, sound design, and mix by', name: 'Alexander Wells', instagram: 'alexanderwellsstudio' },
            { role: 'Production Company', name: 'Wild Island Films', instagram: 'wildislandfilms' },
            { role: 'Colourist', name: 'Francis Qureshi', instagram: 'francisqureshi' },
            { role: 'Edit and VFX by', name: 'Riccardo Fusetti', instagram: 'riccardo.fusetti' }
        ],
        press: [
            { label: "Director's Notes Premiere and Interview", url: 'https://directorsnotes.com/2025/04/08/riccardo-fusetti-editorial/' },
            { label: 'Runway AIFF 2025 - Official Selection', url: 'https://aiff.runwayml.com/' },
            { label: 'BIFAN 2025 - Bucheon International Fantastic Film Festival', url: 'https://www.bifan.kr/eng/program/program_view.asp?pk_seq=8023' }
        ],
        gallery: [
            '/assets/projects/1744234263325-6QG5UQ2PXRVNPFARYLU5_Editorial_Stills_0.png',
            '/assets/projects/1744234266904-608RLPBKD4CH44TWKZQ7_Editorial_Stills_2.png',
            '/assets/projects/1744234488120-W4FFIDSC4O57RXRQ0GK7_Editorial_Stills_48.png',
            '/assets/projects/1744234475337-WH7ER3GQCXHGXGUNDP0A_Editorial_Stills_51.png',
            '/assets/projects/1744234275369-NPSPOTKQHL7JKDKNRFAT_Editorial_Stills_92.png',
            '/assets/projects/1744234447722-E03WXKYIYBM95RX9G391_Editorial_Stills_105.png',
            '/assets/projects/1744234288120-U8RGJO6JRWZAK2O4YTIZ_Editorial_Stills_127.png',
            '/assets/projects/1744234295385-3RQD44TXPSLDMLJ08T5U_Editorial_Stills_163.png',
            '/assets/projects/1744234306203-8VJBX93CJ5HS12L1629S_Editorial_Stills_165.png',
            '/assets/projects/1744234311036-8M3KIJOFQKDA1W4RWKIG_Editorial_Stills_177.png',
            '/assets/projects/1744234316702-9ATXFLRJSNP4JP73WVGE_Editorial_Stills_182.png',
            '/assets/projects/1744234323133-6CYO3BSWJQG1O8VJ0NJK_Editorial_Stills_186.png',
            '/assets/projects/1744234328758-N9NZWBY9LZ051UQCHB0R_Editorial_Stills_187.png',
            '/assets/projects/1744234461434-XIH51IJUJ3P07QAYJ0E7_Editorial_Stills_223.png',
            '/assets/projects/1744234341086-8N1C3O874C2UUS5LGACZ_Editorial_Stills_261.png'
        ],
        posterUrl: '/assets/posters/editorial_poster.jpg'
    },
    {
        id: 'motivational-short',
        title: 'Motivational // Short Film',
        category: 'director',
        thumbnailUrl: '/projects/motivational_thumbnail.jpg',
        posterUrl: '/assets/posters/motivational_poster.jpg',
        videoEmbedUrl: 'https://player.vimeo.com/video/915514135',
        year: '2024',
        client: 'A DadBod Films Production',
        description: 'Life coach Fitzroy Cunningham’s self-assurance shatters when his ex-wife calls him before his biggest convention yet, sending him spiralling into a surreal vortex of anxiety and self-doubt.',
        credits: [
            { role: 'Written and Directed by', name: 'Riccardo Fusetti', instagram: 'riccardo.fusetti', url: 'https://www.riccardofusetti.com' },
            { role: 'With', name: 'Fed Zanni, Beatriz Saramago, Tai Hilferink' },
            { role: 'Director Of Photography', name: 'Aaron Adrian Rogers' },
            { role: 'Producer', name: 'Pete Wilson' },
            { role: 'Executive Producers', name: 'Rob Wildsmith, Harry Barber' },
            { role: 'Casting Directors', name: 'Hannah Ashby Ward, Priyanka Patel • Lane Casting' },
            { role: 'Production Assistant', name: 'Victoria Gong' },
            { role: 'Production Runner', name: 'Zara Bloom' },
            { role: 'First Ad', name: 'Kimane Erskine' },
            { role: 'Second Ad', name: 'Rory Purdy' },
            { role: 'Focus Puller', name: 'Oscar Harrison' },
            { role: 'Clapper Loader', name: 'Eve Gabarre' },
            { role: 'Sound Recordist', name: 'Michal Kuligowski' },
            { role: 'Gaffer', name: 'Harry Buck' },
            { role: 'Electricians', name: 'Amir Moulfi, Mackenzie Stretch, Lena Jan' },
            { role: 'Production Designer', name: 'Hara Spirou' },
            { role: 'Art Assistant', name: 'Joe Harrison' },
            { role: 'Hair & Make Up', name: 'Sunny Cradock' },
            { role: 'Original Score, Sound Design And Mix', name: 'Alexander Wells' },
            { role: 'Make-up Artist', name: 'Albane De La Casinière' },
            { role: 'Art Director', name: 'Laura Little' },
            { role: 'Colourist', name: 'Paul Harrison' },
            { role: 'Catering', name: 'Aidan Siu' },
            { role: 'Camera Equipment Provided By', name: 'Wild Island Films' },
            { role: 'Special Thanks', name: 'Ed Duffield, Everybody At Wild Island, Teodosia Dobriyanova, Guido Medici, Panalux' }
        ],
        gallery: [
            '/assets/projects/Motivational_Stills_05.png',
            '/assets/projects/Motivational_Stills_00.jpg',
            '/assets/projects/Motivational_Stills_19.png',
            '/assets/projects/Motivational_Stills_13.png',
            '/assets/projects/Motivational_Stills_33.png',
            '/assets/projects/Motivational_Stills_23.png'
        ]
    },
    {
        id: 'generation-short',
        title: 'Generation // Short Film',
        category: 'director',
        thumbnailUrl: '/assets/projects/1677749757527-X2HXVOBM0FUTCQ24ZE4K_GENERATION_Thumb_With+Laurels_Wide.jpg',
        posterUrl: '/assets/posters/generation_poster.jpg',
        videoEmbedUrl: 'https://player.vimeo.com/video/750931199',
        year: '2022',
        client: 'Wild Island Films',
        description: 'A brief journey through the human experience as seen by the eyes of an Artificial Intelligence.',
        credits: [
            { role: 'Written, directed, edit and VFX by', name: 'Riccardo Fusetti', instagram: 'riccardo.fusetti', url: 'https://www.riccardofusetti.com' },
            { role: 'Producer', name: 'Teodosia Dobriyanova', instagram: 'teodosiadob' },
            { role: 'Performance and Choreography by', name: 'Evie Webzell', instagram: 'ewebzell' },
            { role: 'Narrator', name: 'Paul Thompson' },
            { role: 'Director of photography', name: 'Natalja Safronova', instagram: 'nsafronova' },
            { role: 'Focus Puller', name: 'Dominika Besińska', instagram: 'dbesinska' },
            { role: 'Gaffer', name: 'Dorothy Dee', instagram: 'fulltimeliability' },
            { role: 'Original score and sound design by', name: 'SINK', instagram: 'iamsink.music' },
            { role: 'Mix', name: "Alex O'Donovan", instagram: 'od_alex' },
            { role: 'Colourist', name: 'Stef Colosi', instagram: 'stefcolosi' },
            { role: 'Special thanks', name: 'Brendan Cox', instagram: 'brendanmcox' },
            { role: 'Production Company', name: 'Wild Island Films', instagram: 'wildislandfilms' }
        ],
        press: [
            { label: 'AI FILM FESTIVAL 2023 - Grand Prix Winner', url: 'https://aiff.runwayml.com/2023-finalists' },
            { label: '1.4 Awards 2023 - In The Making - VFX Gold Winner', url: 'https://www.onepointfour.co/nominated-entry/riccardo-fusetti-generation/' },
            { label: 'Short Of The Week', url: 'https://www.shortoftheweek.com/2022/09/22/generation/' },
            { label: 'Directors Notes Interview', url: 'https://directorsnotes.com/2022/10/07/riccardo-fusetti-generation/' },
            { label: 'Shots.net article', url: 'https://www.shots.net/news/view/life-the-universe-and-everything-in-120-seconds' },
            { label: 'Stash', url: 'https://www.stashmedia.tv/generation-short-film-by-riccardo-fusetti/' }
        ],
        gallery: [
            '/assets/projects/3c8924d1-17cb-4ab9-a26f-4bc633e37a98_Generation_Delivery_2x1_.00_00_28_11.Still227.png',
            '/assets/projects/2b672551-1a8f-4352-9089-9231d8aac666_Generation_Delivery_2x1_.00_00_38_06.Still239.png',
            '/assets/projects/a49038e0-e8b1-4d6f-8f29-beb0f2c137f2_Generation_Delivery_2x1_.00_01_51_07.Still262.png',
            '/assets/projects/b0457aff-9669-434a-9124-552733b58a4e_Generation_Delivery_2x1_.00_01_29_16.Still304.png',
            '/assets/projects/56526e7c-ad5e-4be8-9340-ed72079d8a1f_Generation_Delivery_2x1_.00_00_57_22.Still276.png',
            '/assets/projects/1b74f4ca-8201-46d1-ad63-2562254af7d2_Generation_Delivery_2x1_.00_01_04_09.Still295.png'
        ]
    },
    {
        id: 'deliverance',
        title: 'Hobbie Stuart // Deliverance',
        category: 'director',
        thumbnailUrl: '/projects/deliverance.jpg',
        videoEmbedUrl: 'https://player.vimeo.com/video/597116248',
        year: '2021',
        client: 'Hobbie Stuart',
        description: 'Official Music Video for Hobbie Stuart',
        credits: [
            { role: 'Directed by', name: 'Riccardo Fusetti', instagram: 'riccardo.fusetti', url: 'https://www.riccardofusetti.com' },
            { role: 'Producer', name: 'Teodosia Dobriyanova', instagram: 'teodosiadob' },
            { role: 'DoP', name: 'Brandon Lee Weston' },
            { role: '1st AC', name: 'Blerta Kambo' },
            { role: '2nd AC', name: 'Yinghe Lou' },
            { role: 'Gaffer', name: 'Morgan Shaw' },
            { role: 'Production Assistant', name: 'Brendan Cox', instagram: 'brendanmcox' },
            { role: 'Colour Grade', name: 'Guido Medici' },
            { role: 'Production company', name: 'Wild Island Films', instagram: 'wildislandfilms' },
            { role: 'Makeup artist', name: 'Elina Balint' },
            { role: 'Extras', name: 'Lydia Tolhurst, Niall Perera & Hash Patel' }
        ],
        gallery: [
            '/assets/projects/1630749111826-OCC07KRF83W7UBV9O26T_Deliverance+STILL.jpg',
            '/assets/projects/1630677355932-O9VE4JD4VND2GN6OAS85_Deliverance_Music+Promo_ProRes+MASTER.00_02_12_10.Still018.png',
            '/assets/projects/1630677658778-S9A2AAO8JBA7KT77YC6J_Deliverance_Music+Promo_ProRes+MASTER.00_01_26_05.Still007.png',
            '/assets/projects/1630677527069-5T814V2OAJGGW0Y0S711_Deliverance_Music+Promo_ProRes+MASTER.00_02_58_02.Still030.png'
        ]
    },
    {
        id: 'circus-of-bones',
        title: 'Circus of Bones // Una and the Lion',
        category: 'director',
        thumbnailUrl: '/assets/projects/1627248623953-1OSOE8W3AQ9S4OQKBIGY_Una+and+The+Lion_MASTER_ProRes.00_01_52_13.Still026.png',
        videoEmbedUrl: 'https://player.vimeo.com/video/578480693',
        year: '2021',
        client: 'Circus of Bones',
        description: 'Official music video for Una and the Lion by Circus of Bones.',
        credits: [
            { role: 'Directed by', name: 'Riccardo Fusetti', instagram: 'riccardo.fusetti', url: 'https://www.riccardofusetti.com' },
            { role: 'DoP', name: 'Brandon Lee Weston' },
            { role: 'Producer', name: 'Teodosia Dobriyanova', instagram: 'teodosiadob' },
            { role: 'Production Company', name: 'Wild Island Films', instagram: 'wildislandfilms' }
        ],
        gallery: [
            '/assets/projects/1627050591823-H01MIP02FQA5SXAP45N1_Una+and+The+Lion_MASTER_ProRes.00_00_24_14.Still003.png',
            '/assets/projects/1627248623953-1OSOE8W3AQ9S4OQKBIGY_Una+and+The+Lion_MASTER_ProRes.00_01_52_13.Still026.png',
            '/assets/projects/1627050708953-SV0AYB6DEUY605O488NE_Una+and+The+Lion_MASTER_ProRes.00_03_09_07.Still053.png'
        ]
    },
    {
        id: 'phobophobes',
        title: 'Phobophobes // Moustache Mike',
        category: 'director',
        thumbnailUrl: '/assets/projects/phobophobes_thumbnail.jpg',
        videoEmbedUrl: 'https://player.vimeo.com/video/280802758',
        year: '2018',
        client: 'Phobophobes',
        description: 'Official music video for Moustache Mike by Phobophobes',
        credits: [
            { role: 'Directed by', name: 'Riccardo Fusetti', instagram: 'riccardo.fusetti', url: 'https://www.riccardofusetti.com' },
            { role: 'DoP', name: 'Brandon Lee Weston' },
            { role: 'Producer', name: 'Amy Bilsby' },
            { role: 'Production Coordinator', name: 'Teodosia Dobriyanova', instagram: 'teodosiadob' },
            { role: 'Production Company', name: 'Wild Island Films', instagram: 'wildislandfilms' },
            { role: 'Gaffer', name: 'Morgan Shaw' }
        ],
        gallery: [
            '/assets/projects/phobophobes_thumbnail.jpg'
        ]
    }
];
