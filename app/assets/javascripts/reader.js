var text,
    playBlockIndex = 0,
    playMaxIndex,
    maxBlockLength = 12,
    waitLength = 500,
    timer,
    isPlaying = false;

var testText = "This is a test string (you didn't add any text!). The words for 1, 2, 3, 4, 5, 6, 7, 8, 9 and 10 are: one, two, three, four, five, six, seven, eight, nine and ten. The words for 11, 12, 13, 14, 15, 16, 17, 18, 19 and 20 are: eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen and twenty.";

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

function loop() {
  $('#reader').text(text[playBlockIndex]); // show next line

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