const NodeID3 = require('node-id3').Promise;
const musicMetadata = require('music-metadata');

async function processMp3File(fileName) {
  const tags = await NodeID3.read(fileName);
  return tags;
}

async function processMusicFile(filename) {
  const tags = await musicMetadata.parseFile(filename);
  return tags;
}

module.exports = { processMp3File, processMusicFile };