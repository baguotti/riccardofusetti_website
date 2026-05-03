const handles = ["mitchryan", "crab__abble", "francisqureshi", "amybil", "devonleecarlson", "sydneylynncarlson", "_essencetaylor", "milanonasu", "alizzfromwonderland", "aaronkurlander", "isioma.i", "fizzzlyly", "marie_suter", "taylortindall"];
const https = require("https");
async function getNames() {
  for (const h of handles) {
    await new Promise(resolve => {
      https.get(`https://www.instagram.com/${h}/`, (res) => {
        let data = "";
        res.on("data", chunk => data += chunk);
        res.on("end", () => {
          const match = data.match(/<title>(.*?) \(@/);
          if (match) console.log(h, ":", match[1].replace(/&#x27;/g, "'").trim());
          else console.log(h, ": Not found in title");
          resolve();
        });
      }).on("error", () => resolve());
    });
  }
}
getNames();
