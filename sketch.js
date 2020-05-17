const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
let pitch;
let mic;
let freq = 0;
let threshold = 1;
let changeNote = true;
let currentNote = 0;

let notes = [
  {
    note: 'top E',
    freq: 329.5,
    img: 'img/topE.png'
  },
  {
    note: 'top F',
    freq: 349.5,
    img: 'img/topF.png'
  },
  {
    note: 'top G',
    freq: 391.5,
    img: 'img/topG.png'
  },
  {
    note: 'Bottom A2',
    freq: 220,
    img: 'img/bottomA2-219-221.png'
  },
  {
    note: 'Bottom A1',
    freq: 109.5,
    img: 'img/bottomA108-111.png'
  },
  {
    note: 'Bottom B2',
    freq: 247,
    img: 'img/bottomB2-246-248.png'
  },
  {
    note: 'Bottom B',
    freq: 123,
    img: 'img/bottomB122-124.png'
  },
  {
    note: 'Bottom C',
    freq: 130,
    img: 'img/bottomC129-131.png'
  },
  {
    note: 'Bottom D',
    freq: 146.5,
    img: 'img/bottomD145-148.png'
  },
  {
    note: 'Bottom E',
    freq: 164,
    img: 'img/bottomE163-165.png'
  },
  {
    note: 'Bottom F2',
    freq: 174,
    img: 'img/bottomF2-173-175.png'
  },
  {
    note: 'Bottom F',
    freq: 87.5,
    img: 'img/bottomF86-89.png'
  },
  {
    note: 'Bottom G2',
    freq: 196,
    img: 'img/bottomG2-195-197.png'
  },
  {
    note: 'Bottom G',
    freq: 97.5,
    img: 'img/bottomG96-99.png'
  },
  {
    note: 'Middle C1',
    freq: 261,
    img: 'img/middleC1-260-262.png'
  },
  {
    note: 'Middle C2',
    freq: 261,
    img: 'img/middleC2-260-262.png'
  },
  {
    note: 'Top A2',
    freq: 880,
    img: 'img/topA2-879-881.png'
  },
  {
    note: 'Top A',
    freq: 439,
    img: 'img/topA438-440.png'
  },
  {
    note: 'Top B',
    freq: 494.5,
    img: 'img/topB493-496.png'
  },
  {
    note: 'Top C',
    freq: 524,
    img: 'img/topC523-525.png'
  },
  {
    note: 'Top D2',
    freq: 587,
    img: 'img/topD2-586-588.png'
  },
  {
    note: 'Top D',
    freq: 293,
    img: 'img/topD292-294.png'
  },
  {
    note: 'Top E2',
    freq: 658.5,
    img: 'img/topE2-657-660.png'
  },
  {
    note: 'Top F2',
    freq: 698,
    img: 'img/topF2-697-699.png'
  },
  {
    note: 'Top G2',
    freq: 784,
    img: 'img/topG2-783-785.png'
  }
];

function setup() {
  createCanvas(600, 600);
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(listening);
}

function listening() {
  console.log('listening');
  pitch = ml5.pitchDetection(
    model_url,
    audioContext,
    mic.stream,
    modelLoaded
  );
}

function draw() {
  background(0);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(64);

  if (changeNote) {
    currentNote = Math.floor(Math.random() * 24);
    changeNote = false;
  }

  var canvas = document.getElementById('defaultCanvas0'),
    context = canvas.getContext('2d');

  base_image = new Image();
  base_image.src = notes[currentNote].img;
  context.drawImage(base_image, (width / 2) - 75, 50, 150, 150);
  textSize(32)
  //text(notes[currentNote].note, width / 2, height - 375)
  //text(notes[currentNote].freq, width / 2, height - 325)
  text(notes[currentNote].freq, width / 2, height - 375)
  textSize(64)

  text(freq.toFixed(2), width / 2, height - 150);

  //text(notes[curentNote].note, width / 2, height - 250)

  let closestNote = -1;
  let recordDiff = Infinity;
  for (let i = 0; i < notes.length; i++) {
    let diff = freq - notes[i].freq;
    if (abs(diff) < abs(recordDiff)) {
      closestNote = notes[i];
      recordDiff = diff;
    }
  }

  let diff = freq - notes[currentNote].freq;
  let noteRange = 1.5;
  if (abs(diff) < noteRange) {
    changeNote = true;
  }

  text(closestNote.note, width / 2, height - 50);
}

function modelLoaded() {
  console.log('model loaded');
  pitch.getPitch(gotPitch);
}

function gotPitch(error, frequency) {
  if (error) {
    console.error(error);
  } else {
    //console.log(frequency);
    if (frequency) {
      freq = frequency;
    }
    pitch.getPitch(gotPitch);
  }
}
