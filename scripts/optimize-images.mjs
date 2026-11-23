// Generates responsive AVIF/WebP variants for every image in public/assets
// into public/img, plus src/data/images.json (dimensions, colour, widths).
// Originals stay untouched. Re-running only encodes new or changed files.
//
//   npm run images
import { createHash } from 'node:crypto';
import { readFile, readdir, mkdir, writeFile, access, unlink } from 'node:fs/promises';
import { join, relative, dirname, extname } from 'node:path';
import os from 'node:os';
import sharp from 'sharp';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC_DIR = join(ROOT, 'public/assets');
const OUT_DIR = join(ROOT, 'public/img');
const MANIFEST = join(ROOT, 'src/data/images.json');
const WIDTHS = [480, 960, 1600, 2400];
const OG_WIDTH = 1200;
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

async function walk(dir) {
    const out = [];
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        const p = join(dir, entry.name);
        if (entry.isDirectory()) out.push(...(await walk(p)));
        else if (IMAGE_EXT.has(extname(entry.name).toLowerCase())) out.push(p);
    }
    return out;
}

const exists = (p) => access(p).then(() => true, () => false);

// Images used as a project's main thumbnail get a JPEG for social previews.
const projectsSrc = await readFile(join(ROOT, 'src/data/projects.ts'), 'utf8');
const ogKeys = new Set([...projectsSrc.matchAll(/thumbnailUrl:\s*'([^']+)'/g)].map((m) => m[1]));

const files = await walk(SRC_DIR);
const manifest = {};
let encoded = 0;
const produced = new Set();

async function processFile(file) {
    const key = '/' + relative(join(ROOT, 'public'), file).split('\\').join('/');
    const buf = await readFile(file);
    const hash = createHash('sha1').update(buf).digest('hex').slice(0, 8);
    const base = key.replace(/^\/assets\//, '').replace(/\.[^.]+$/, '');
    const outBase = join(OUT_DIR, base);
    await mkdir(dirname(outBase), { recursive: true });

    const animated = extname(file).toLowerCase() === '.gif';
    const meta = await sharp(buf, { animated }).metadata();
    const width = meta.width;
    const height = animated ? meta.pageHeight ?? meta.height : meta.height;
    const { dominant } = await sharp(buf).stats();
    const color = '#' + [dominant.r, dominant.g, dominant.b].map((v) => v.toString(16).padStart(2, '0')).join('');

    const entry = { w: width, h: height, c: color, v: hash };

    if (animated) {
        // Animated GIF -> single animated WebP at original size.
        const out = `${outBase}.${hash}.webp`;
        produced.add(out);
        if (!(await exists(out))) {
            await sharp(buf, { animated: true }).webp({ quality: 70, effort: 5 }).toFile(out);
            encoded++;
        }
        entry.anim = 1;
    } else {
        let widths = WIDTHS.filter((w) => w < width);
        widths.push(Math.min(width, WIDTHS.at(-1)));
        widths = [...new Set(widths)];
        entry.ws = widths;
        for (const w of widths) {
            for (const fmt of ['avif', 'webp']) {
                const out = `${outBase}-${w}.${hash}.${fmt}`;
                produced.add(out);
                if (await exists(out)) continue;
                const img = sharp(buf).rotate().resize({ width: w, withoutEnlargement: true });
                if (fmt === 'avif') await img.avif({ quality: 52, effort: 4 }).toFile(out);
                else await img.webp({ quality: 78, effort: 4 }).toFile(out);
                encoded++;
            }
        }
        if (ogKeys.has(key)) {
            const out = `${outBase}-og.${hash}.jpg`;
            produced.add(out);
            if (!(await exists(out))) {
                await sharp(buf).rotate().resize({ width: OG_WIDTH, height: 630, fit: 'cover' }).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
                encoded++;
            }
            entry.og = 1;
        }
    }
    manifest[key] = entry;
}

// Encode a few files at a time.
const queue = [...files];
const workers = Array.from({ length: Math.max(2, Math.floor(os.cpus().length / 2)) }, async () => {
    while (queue.length) {
        const f = queue.shift();
        await processFile(f);
        process.stdout.write('.');
    }
});
await Promise.all(workers);

// Remove variants of images that were deleted or replaced.
let pruned = 0;
if (await exists(OUT_DIR)) {
    const walkAll = async (d) => (await Promise.all((await readdir(d, { withFileTypes: true })).map((e) => e.isDirectory() ? walkAll(join(d, e.name)) : [join(d, e.name)]))).flat();
    for (const f of await walkAll(OUT_DIR)) if (!produced.has(f)) { await unlink(f); pruned++; }
}

const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]));
await writeFile(MANIFEST, '{\n' + Object.entries(sorted).map(([k, v]) => ` ${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(',\n') + '\n}\n');
console.log(`\n${files.length} images, ${encoded} new files encoded, ${pruned} stale removed -> public/img`);
