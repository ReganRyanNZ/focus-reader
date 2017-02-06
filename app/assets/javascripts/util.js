
// Splits text into chunks.
//
// Each sentence is a chunk, unless it is too big (bigger than maxBlockLength)
// If the sentence is longer, it is divided into small enough pieces.
//
// returns an array of chunks (strings)

function chunk(text, maxBlockLength) {
  var result = [];
  var sentenceArray = text.match( /[^\.!\?]+([\.!\?]+["'”]?|$)/g ); // get all sentences
  var count = sentenceArray.length;

  for(var i=0; i < count; i++) {
    var sentence = sentenceArray[i].split(" ");
    var len = sentence.length;

    if(len < maxBlockLength) {
      result.push(sentence.join(" ")); // add sentence to chunks array

    } else { // sentence is too big, need to split
      splitNum = Math.ceil( len / maxBlockLength ); // number of blocks to split this sentence into
      splitLen = Math.ceil( len / splitNum ); // length of words each block should be

      for(var j=0; j < splitNum; j++) {
        var block = sentence.slice(j*splitLen, (j+1)*splitLen);
        result.push(block.join(" "));
      }
    }
  }
  return result;
}

function calcWaitLength(wordCount, chunkCount, wordsPerMinute) {
  var totalMinutes = wordCount / wordsPerMinute;
  var minutesPerChunk = totalMinutes / chunkCount;
  var millisecondsPerChunk = minutesPerChunk * 60 * 1000;
  return millisecondsPerChunk;
}