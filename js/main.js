var hand1Rhythm = [ 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0 ];
var hand2Rhythm = [ 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0 ];
var noteDuration = 200;

var hand1;
var hand2;
var clapTrigger = 0;
var note = 0;
var bar = 0;
var barLength = 2;
var phase = 0;
var shift = -1;

function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);

  hand1 = new Hands(noteDuration, 'sine', 440);
  hand2 = new Hands(noteDuration, 'sine', 466);
}

function draw() {
  background(127.5, 30);
  if (millis() > clapTrigger) {
    if (hand1Rhythm[note] === 1) {
      hand1.clap();
      fill(127.5 + phase);
      ellipse(windowWidth / 2 - windowWidth / 2 * phase / 127.5, windowHeight / 2, windowWidth / 4, windowWidth / 4);
    }

    if (hand2Rhythm[note] === 1) {
      hand2.clap();
      fill(127.5 - phase);
      ellipse(windowWidth / 2 + windowWidth / 2 * phase / 127.5, windowHeight / 2, windowWidth / 4, windowWidth / 4);
    }

    clapTrigger = millis() + noteDuration;
    if (note >= hand1Rhythm.length - 1) {
      note = 0;
      bar++;
    } else note++;
    // note = note >= hand1Rhythm.length - 1 ? 0 : note + 1;

    if (bar === barLength) {
      var shiftToRight = hand2Rhythm.pop();
      hand2Rhythm.unshift(shiftToRight);
      bar = 0;
      if (phase === 127.5 || phase === 0) {
        shift = -shift;
      }
      phase = phase + 127.5 / 6 * shift;
      console.log(phase, shift);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function playClaps(note) {
}

function Hands(tempo, soundType, frequency) {
  this.tempo = tempo;
  var osc = this.osc = new p5.Oscillator(soundType);
  osc.freq(frequency);
  osc.amp(0);
  osc.start();

  this.clap = function() {
    osc.amp(0.02);

    setTimeout(function() {
      osc.fade(0, 0.1);
    }, tempo - tempo * 0.5);
  };

  this.changeSoundType = function(newSoundType) {
    this.osc.setType(newSoundType);
  };

  this.volume = function() {

  };
}
