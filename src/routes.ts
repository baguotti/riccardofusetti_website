import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
    index('routes/home.tsx'),
    route('project/:id', 'pages/ProjectPage.tsx'),
    route('project/:id/assets/:token', 'pages/PrivateProjectPage.tsx'),
    route('contact', 'pages/ContactPage.tsx'),
    route(':category', 'routes/home.tsx', { id: 'category' }),
] satisfies RouteConfig;
