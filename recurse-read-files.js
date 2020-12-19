const { resolve } = require('path');
const { readdir } = require('fs').promises;
const { processFile } = require('./process-file');

const [,, givenDir] = process.argv;
if (!givenDir) {
  throw new Error('No dir');
}

async function* getFiles(dir) {
  const directoryEntries = await readdir(dir, { withFileTypes: true });
  for (const entry of directoryEntries) {
    const res = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

console.warn(`Parsing dir ${givenDir}`)
;(async () => {
  const results = [];
  for await (const f of getFiles(givenDir)) {
    if (f.toLowerCase().endsWith('.mp3')) {
      const tags = await processFile(f);
      delete tags.raw;
      delete tags.image;
      delete tags.private;
      results.push({
        fileName: f.replace(givenDir, '').replace(/^\//, ''),
        tags,
      });
    }
  }
  console.warn('parsed ', results.length);
  console.log(JSON.stringify(results));
})();