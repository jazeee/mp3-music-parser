const NodeID3 = require('node-id3').Promise;

const [,, ...files] = process.argv;

async function processFile(fileName) {
  const tags = await NodeID3.read(fileName);
  console.log(fileName);
  console.log(tags);
}


files.forEach(async (testFile) => await processFile(testFile));