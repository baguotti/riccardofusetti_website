const fs = require('fs');
const https = require('https');
const path = require('path');

const projectFile = path.resolve('src/data/projects.ts');
let content = fs.readFileSync(projectFile, 'utf8');

const regex = /https:\/\/images\.squarespace-cdn\.com[^\s'"]+/g;
const matches = [...new Set(content.match(regex) || [])];

const outDir = path.resolve('public/assets/projects');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

async function download(url, dest) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
                return;
            }
            const file = fs.createWriteStream(dest);
            res.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
}

(async () => {
    for (const url of matches) {
        const urlObj = new URL(url);
        // SquareSpace URLs have unique structure, let's use the last two path segments to avoid collision
        const parts = urlObj.pathname.split('/').filter(Boolean);
        let filename = parts.length > 1 ? `${parts[parts.length - 2]}_${parts[parts.length - 1]}` : path.basename(urlObj.pathname);

        // clean query Strings if any
        filename = decodeURIComponent(filename);

        const localPathParam = `/assets/projects/${filename}`;
        const dest = path.join(outDir, filename);

        console.log(`Downloading \n  url: ${url} \n  to:  ${dest}...`);
        try {
            await download(url, dest);
            content = content.split(url).join(localPathParam);
        } catch (e) {
            console.error(`Failed to download ${url}:`, e);
        }
    }

    fs.writeFileSync(projectFile, content, 'utf8');
    console.log('Finished downloading all assets and updated projects.ts.');
})();
