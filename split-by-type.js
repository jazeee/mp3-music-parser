const { readFile, writeFile } = require('fs').promises;

async function splitByType(sourceFileName) {
  const data = JSON.parse(await readFile(sourceFileName));
  const byArtist = {};
  const byAlbum = {};
  const byGenre = {};
  const byYear = {};
  const byDecade = {};
  data.forEach((datum, index) => {
    const { artist = 'Unknown', album = 'Unknown', genre = 'Unknown', year } = datum;
    let decade = '-';
    if (year) {
      decade = String(year).replace(/.$/, '0');
    } else {
      year = '-';
    }
    byDecade[decade] = byDecade[decade]?.push(index) ?? [index];
    byYear[year] = byYear[year]?.push(index) ?? [index];
    byArtist[artist] = byArtist[artist]?.push(index) ?? [index];
    byGenre[genre] = byGenre[genre]?.push(index) ?? [index];
    byAlbum[album] = byAlbum[album]?.push(index) ?? [index];
  })
}