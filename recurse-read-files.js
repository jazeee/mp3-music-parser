const { resolve } = require('path');
const { readdir } = require('fs').promises;
const { processMp3File, processMusicFile } = require('./process-file');
const { isMusicFile } = require('./constants');

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
  for await (const filename of getFiles(givenDir)) {
    console.warn(`Processing ${filename}`);
    const cleanFilename = filename.replace(givenDir, '').replace(/^\//, '')
    // if (filename.toLowerCase().endsWith('.mp3')) {
    //   const tags = await processMp3File(filename);
    //   delete tags.raw;
    //   delete tags.image;
    //   delete tags.private;
    //   results.push({
    //     fileName: cleanFilename,
    //     tags,
    //   });
    // } else
    if (isMusicFile(filename)) {
      const audioMetadata = await processMusicFile(filename);
      const { common } = audioMetadata;
      const { genre } = common;
      const tags = {
        ...common,
        genre: genre?.[0] ?? 'Misc',
        genres: genre,
      };
      results.push({
        fileName: cleanFilename,
        tags,
      });
    }
  }
  console.warn('parsed ', results.length);
  console.log(JSON.stringify(results));
})();