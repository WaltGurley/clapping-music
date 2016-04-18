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
var rotate = 0;
var hyp = 0;
var direction = 1

function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);

  hand1 = new Hands(noteDuration, 'sine', 261.63, 1);
  hand2 = new Hands(noteDuration, 'sine', 329.63, -1);
  hand3 = new Hands(noteDuration, 'sine', 220.00, 1);
  hand4 = new Hands(noteDuration, 'sine', 261.63, -1);
}

function draw() {
  background(0, 20);

  hyp += direction * 0.5;
  // console.log(hyp);
  fill(0);
  if (millis() > clapTrigger) {
    if (hand1Rhythm[note] === 1) {
      hand1.clap();
      hand3.clap();
      fill(127.5, 0, 225);
    }

    for (j = 0; j < 50; j++) {
      for (i = 0; i <= 2*Math.PI; i+=Math.PI / 10) {
        ellipse(
          Math.random() * hyp + windowWidth * j / 49 + Math.cos(i) * hyp,
          Math.random() * hyp + windowHeight / 4 + Math.sin(i) * hyp,
          hyp / 4,
          hyp / 4);
      }
    }

    for (j = 0; j < 50; j++) {
      for (i = 0; i <= 2*Math.PI; i+=Math.PI / 10) {
        ellipse(
          Math.random() * hyp + windowWidth / 4 + Math.cos(i) * hyp,
          Math.random() * hyp + windowHeight * j / 49  + Math.sin(i) * hyp,
          hyp / 4,
          hyp / 4);
      }
    }

    for (j = 0; j < 50; j++) {
      for (i = 0; i <= 2*Math.PI; i+=Math.PI / 10) {
        ellipse(
          Math.random() * hyp + windowWidth / 2 + Math.cos(i) * hyp,
          Math.random() * hyp + windowHeight * j / 49  + Math.sin(i) * hyp,
          hyp / 4,
          hyp / 4);
      }
    }

    fill(0);
    if (hand2Rhythm[note] === 1) {
      hand2.clap();
      hand4.clap();
      fill(255, 0, 127.5);
    }

    for (j = 0; j < 50; j++) {
      for (i = 0; i <= 2*Math.PI; i+=Math.PI / 10) {
        ellipse(
          Math.random() * hyp + windowWidth * j / 49 + Math.cos(i) * hyp,
          Math.random() * hyp + windowHeight * 3 / 4 + Math.sin(i) * hyp,
          hyp / 4,
          hyp / 4);
      }
    }

    for (j = 0; j < 50; j++) {
      for (i = 0; i <= 2*Math.PI; i+=Math.PI / 10) {
        ellipse(
          Math.random() * hyp + windowWidth * j / 49 + Math.cos(i) * hyp,
          Math.random() * hyp + windowHeight * j / 49 + Math.sin(i) * hyp,
          hyp / 4,
          hyp / 4);
      }
    }

    for (j = 0; j < 50; j++) {
      for (i = 0; i <= 2*Math.PI; i+=Math.PI / 10) {
        ellipse(
          Math.random() * hyp + windowWidth * 3 / 4 + Math.cos(i) * hyp,
          Math.random() * hyp + windowHeight * j / 49  + Math.sin(i) * hyp,
          hyp / 4,
          hyp / 4);
      }
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
      direction = -direction;
      console.log(hyp);
      if (phase === 127.5 || phase === 0) {
        shift = -shift;
      }
      phase = phase + 127.5 / 6 * shift;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function playClaps(note) {
}

function Hands(tempo, soundType, frequency, pan) {
  this.tempo = tempo;
  this.frequency = frequency;
  this.pan = pan;
  this.level = 0.05;

  var osc = this.osc = new p5.Oscillator(soundType);
  osc.amp(0);
  osc.start();
  osc.freq(this.frequency);

  this.clap = function() {
    osc.fade(this.level, 0.25);
    osc.pan(pan,0.1);
    setTimeout(function() {
      osc.fade(0, 0.1);
    }, tempo - tempo * 0.25);
  };

  this.changeSoundType = function(newSoundType) {
    osc.setType(newSoundType);
  };

  this.volume = function(newLevel) {
    this.level = newLevel;
  };

  this.setFrequency = function(freq) {
    osc.freq(freq);
  };
}
