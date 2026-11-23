# riccardofusetti.com

React Router 7 (framework mode, static pre-rendering) + Tailwind 4, hosted on Vercel.

```bash
npm run dev      # local dev server (private pages work locally too)
npm run build    # optimise images, type-check, pre-render every page into dist/client
npm run images   # only regenerate image variants
```

## Adding or changing images

1. Put the original (JPG/PNG/WebP/GIF, any size) in `public/assets/...`.
2. Reference it in `src/data/projects.ts` by that path, e.g. `/assets/director/foo/foo_still_01.png`.
3. Run `npm run images` and commit the new files in `public/img/` and `src/data/images.json`.

The script makes AVIF + WebP copies at 480/960/1600/2400px, a 1200×630 JPEG for social
previews of each project thumbnail, and animated WebP for GIFs. The site serves those
automatically through `<Img>` (`src/components/Img.tsx`). Variant filenames contain a
content hash, so they are cached forever and replacing an original just produces new files.

## Private project pages

- Passwords and private asset lists live in `server/private-data.ts`. They are never sent to the browser.
- Private files (PDFs etc.) live in `private/<project-id>/` and are served at `/private/<project-id>/...`
  only after the visitor enters the right password (checked by `middleware.ts` on Vercel).
- Mark a project with `hasPrivate: true` in `src/data/projects.ts` to show the password link.
- Optional: set a `PRIVATE_COOKIE_SECRET` environment variable in Vercel to harden the access cookie.

## Adding a page

Add a route in `src/routes.ts`. Public pages should also be added to `prerender()` in
`react-router.config.ts` (projects are added automatically).
