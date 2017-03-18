var text,
    playBlockIndex = 0,
    playMaxIndex,
    maxBlockLength = 12,
    waitLength = 500,
    timer,
    isPlaying = false;

var testText = "Sample text. The wind was a torrent of darkness among the gusty trees. The moon was a ghostly galleon tossed upon cloudy seas. The road was a ribbon of moonlight over the purple moor, And the highwayman came riding, Riding, riding, The highwayman came riding, up to the old inn-door."

function start() {
  $('#btn-play-pause').removeClass('hidden');
  pause();
  restartIndex();

  // get user input max chunk length
  inputMaxChunk = $('#input-max-chunk').val();
  if( inputMaxChunk.length > 0 ) {
    maxBlockLength = inputMaxChunk;
  }

  rawText = $('#input-text-area').val() == '' ? testText : $('#input-text-area').val();
  text = chunk(rawText, maxBlockLength);

  // get user input speed
  inputWordsPerMinute = $('#input-wpm').val();
  if( inputMaxChunk.length > 0 ) {
    waitLength = calcWaitLength(rawText.split(" ").length, text.length, inputWordsPerMinute);
  }

  playMaxIndex = text.length;
  play();
}

function printBlock() {
  $('#reader').text(text[playBlockIndex]);
}

function loop() {
  printBlock(); // show next line

  timer = setTimeout(function(){
    if(indexInBounds(playBlockIndex+1)) {
      playBlockIndex++;
      loop();
    } else {
      // stop loop
    }
  }, waitLength);
}

function playPause() {
  if(isPlaying) {
    $('#btn-play-pause').html('Play')
    pause();
  } else {
    $('#btn-play-pause').html('Pause')
    play();
  }
}
function play() {
  isPlaying = true;
  loop();
}
function pause() {
  isPlaying = false;
  if(timer) {
    clearTimeout(timer);
    timer = 0;
  }
}
function moveForward() {
  playBlockIndex = Math.min( (playBlockIndex+1), playMaxIndex )
  printBlock();
}
function moveBack() {
  playBlockIndex = Math.max( (playBlockIndex-1), 0 )
  printBlock();
}
function restartIndex() {
  playBlockIndex = 0;
}
function indexInBounds(index) {
  return index < playMaxIndex;
}
function updateTextColor() {
  var color = '#' + $('#color-txt').val();
  $('#reader').css('color', color);
}
function updateBackgroundColor() {
  var color = '#' + $('#color-bg').val();
  $('.reader-area').css('background-color', color);
}