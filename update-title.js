const NodeID3 = require('node-id3').Promise;

const [, , testFile, title] = process.argv;
if (!testFile || ! title) {
  throw new Error('No testFile or title');
}

async function updateMp3Title(fileName, title) {
  console.log(`Updating ${fileName}`);
  const tags = await NodeID3.read(fileName);
  tags.title = title;
  await NodeID3.update(tags, fileName);
}


updateMp3Title(testFile, title);