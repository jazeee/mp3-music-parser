const musicFileExtensions = [
  'ogg',
  'mp3',
  'flac',
  'wav',
]

function isMusicFile(filename) {
  return musicFileExtensions.some((extension) => {
    return filename.toLowerCase().endsWith(`.${extension}`);
  })
}

module.exports = { 
  isMusicFile,
  musicFileExtensions,
};
