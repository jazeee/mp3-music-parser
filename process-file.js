const NodeID3 = require('node-id3').Promise;

async function processFile(fileName) {
  const tags = await NodeID3.read(fileName);
  return tags;
}

module.exports = { processFile };