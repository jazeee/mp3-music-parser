const NodeID3 = require('node-id3').Promise;
const { processMusicFile} = require("./process-file.js");
const { isMusicFile } = require('./constants');

const [,, ...files] = process.argv;

async function processFile(filename) {
  // if (filename.toLowerCase().endsWith('.mp3')) {
  //   const tags = await NodeID3.read(filename);
  //   console.log(filename);
  //   console.log(tags);
  // } else
  if (isMusicFile(filename)) {
    const tags = await processMusicFile(filename);
    console.log(filename);
    console.log(tags);
  } else {
    console.log(filename);
    console.log("**********Unknown filename********")
  }
}


files.forEach(async (testFile) => await processFile(testFile));