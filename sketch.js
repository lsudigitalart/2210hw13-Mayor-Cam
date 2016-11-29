// Canvas Variables
var canvasWidth = 600;
var canvasHeight = 600;
var midX = canvasWidth/2;
var midY = canvasHeight/2;

// Time Variables
var timer;
var prevTime = 0;
var beatTimer = 0;     // Timer for counting beats
var startUpTime;       // Offsets timer to account for start-up time, so timer is synced with the music

// Music Time Variables
var beatLength = 400;    //12 frames at 30 fps
var beat = 3;            // For some reason, the virtual music counter is one beat ahead of the music.  Measures are set to 0 and beat is set to 3 to compensate.
var measure = 0;
var objMeasure1 = 0;    // Separate measure count for vertcal line animation cycles
var instBeat = 0;       // Variable created for triggering animations in one instant.  instBeat = beat for only the frames that beat changes.

// Animation Variables
// Harps
var anim1 = 0;    // Frame counter for harp 1 animation:  max 35
var anim2 = 0;    // Frame counter for harp 2 animation
var anim3 = 0;    // Frame counter for harp 3 animation
var amp1 = 0;     // Amplitude of harp animation:  max 10
var amp2 = 0;
var amp3 = 0;
var dir = 1;      // Direction of amplitude.  Alternates between 1 and -1.

// Color Variables
var backR = 50;
var backG = 50;
var backB = 150;
var alpha = 1;

var harpRmax = 240;   //  240;
var harpGmax = 216;   //  200;
var harpBmax = 72;    //  80;

var harpRdec =  10;    // 12
var harpGdec =  9;    // 10
var harpBdec =  3;    //  4

var harpR1 = 0;
var harpG1 = 0;
var harpB1 = 0;

var harpR2 = 0;
var harpG2 = 0;
var harpB2 = 0;

var harpR3 = 0;
var harpG3 = 0;
var harpB3 = 0;

// Shape Variables
var refX1 = canvasWidth/4;
var refY1 = midY - 50;
var refX2 = canvasWidth * 3/4;
var refY2 = midY - 50;
var refX3 = midX;
var refY3 = midY + 90;

function preload()
{
  music = loadSound('sound/the_end_of_time.mp3');
}

function setup()
{
  frameRate(30);
  createCanvas(canvasWidth,canvasHeight);
  background(50,50,150);
  textSize(30);
  textAlign(CENTER);
  music.setVolume(0.1);
  music.play();
  startUpTime = millis();
}


function draw()
{
  timer = millis() - startUpTime;
  beatTimer += timer - prevTime;

  background(backR,backG,backB);

  fill(0,0,0,alpha);
  rect(0,0,canvasWidth,canvasHeight);
  fill(0,0,0);

  // Half-beat counter
  if (beatTimer >= beatLength/2)
  {
    beat += 0.5;
    instBeat = beat;
    beatTimer -= beatLength/2;      // Resets beat timer by subtracting half beat length.  We can't just set it to 0 because beatTimer is unlikely to be exactly at a half beat.
  }
  else
  {instBeat = 0;}

  // Measure counter (3 beats to a measure)
  if (beat == 4)
  {
    measure++;
    objMeasure1++;
    beat = 1;
    instBeat = 1;
  }

  // Reset measure when song loops
  if (measure == 56 && instBeat == 1)
  {
    measure = 1;
    objMeasure1 = 1;
  }

  // Resets objMeasure once it goes out of its 8-measure boundary
  if (objMeasure1 > 8)
  {
    objMeasure1 = 1;
  }


  if (measure < 25)
  {
    // Harp 1 animation trigger
    if ((objMeasure1 == 1 || objMeasure1 == 3 || objMeasure1 == 5) && instBeat == 1)
    {
        anim1 = 1;
        amp1 = 10;
        harpR1 = harpRmax;
        harpG1 = harpGmax;
        harpB1 = harpBmax;
    }
    // Harp 2 animation trigger
    if ((objMeasure1 == 2 || objMeasure1 == 4 || objMeasure1 == 6) && instBeat == 1)
    {
        anim2 = 1;
        amp2 = 10;
        harpR2 = harpRmax;
        harpG2 = harpGmax;
        harpB2 = harpBmax;
    }
    // Harp 3 animation trigger
    if (objMeasure1 == 7 && instBeat == 1)
    {
        anim3 = 1;
        amp3 = 10;
        harpR3 = harpRmax;
        harpG3 = harpGmax;
        harpB3 = harpBmax;
    }
  }
  // Harp amplitude and color dampening
  if (anim1 > 11)
  {
    if (amp1 > 0)
    { amp1 -= 0.5;}

    if (harpR1 > 0)
    { harpR1 -= harpRdec;}
    if (harpG1 > 0)
    { harpG1 -= harpGdec;}
    if (harpB1 > 0)
    { harpB1 -= harpBdec;}
  }
  if (anim2 > 11)
  {
    if (amp2 > 0)
    { amp2 -= 0.5;}

    if (harpR2 > 0)
    { harpR2 -= harpRdec;}
    if (harpG2 > 0)
    { harpG2 -= harpGdec;}
    if (harpB2 > 0)
    { harpB2 -= harpBdec;}
  }
  if (anim3 > 11)
  {
    if (amp3 > 0)
    { amp3 -= 0.5;}

    if (harpR3 > 0)
    { harpR3 -= harpRdec;}
    if (harpG3 > 0)
    { harpG3 -= harpGdec;}
    if (harpB3 > 0)
    { harpB3 -= harpBdec;}
  }
  /*
  if (anim1 > 11 && amp1 > 0)
  { amp1 -= 0.5;}
  if (anim2 > 11 && amp2 > 0)
  { amp2 -= 0.5;}
  if (anim3 > 11 && amp3 > 0)
  { amp3 -= 0.5;}
  */

  // Harp renderings
  harp(refX1, refY1, anim1, amp1, harpR1, harpG1, harpB1);
  harp(refX2, refY2, anim2, amp2, harpR2, harpG2, harpB2);
  harp(refX3, refY3, anim3, amp3, harpR3, harpG3, harpB3);

  // Harp animation frame progressions and resets
  if (anim1 > 35)
  {anim1 = 0;}
  else if (anim1 > 0)
  {anim1++;}

  if (anim2 > 35)
  {anim2 = 0;}
  else if (anim2 > 0)
  {anim2++;}

  if (anim3 > 35)
  {anim3 = 0;}
  else if (anim3 > 0)
  {anim3++;}



  /*
  // Tool for testing tempo: Displays measures, beats, beatTimer, and frameRate
  if (beat == 1 || beat == 2 || beat == 3)
  {
    fill(255,255,255);
  }
  else
  {
    fill(0,0,0);
  }
  ellipse(midX, canvasHeight/4, 50);
  fill(0,0,0);
  text(measure, canvasWidth/4, midY);
  text(beat, midX, midY);
  text(beatTimer, canvasWidth * 3/4, midY + 30);
  text(frameRate(), midX, canvasHeight *3/4);
  */

  /*
  // Tool for identifying x and y positions for object placement
  fill(0,0,0);
  strokeWeight(1);
  stroke(0,0,0);
  text(mouseX, midX - 30, 30);
  text(mouseY, midX + 30, 30);
  */

  prevTime = timer;
}

/*
var millis2 = 0;
var deltaT;
// Beat measurement tool
function mouseClicked()
{

  timer = millis();
  deltaT = timer - millis2;
  millis2 = timer;
  background(50,50,150);
  text(deltaT, 200, 200);
}
*/


//  Object Functions  //

// Sets up an optionally animated array of 5 vertical lines
// x and y are the center of the array
// Set animFrame to 0 for no animation, or 1 for standard animation.
function harp(x,y, animFrame, amp, r, g, b)
{

  strokeWeight(5);
  noFill();


  if (animFrame > 0)
  {
    stroke(r,g,b);
    bezier(x - 30, y + 40, x - 30 + (amp * dir), y + 30, x - 30 + (amp * dir), y - 30, x-30, y-40);
  }
  else
  {
    stroke(0,0,0);
    line(x -30, y + 40, x -30, y -40);
  }

  if (animFrame > 2)
  {
    stroke(r,g,b);
    bezier(x -15, y + 40, x -15 + (amp * dir), y + 30, x - 15 + (amp * dir), y - 30, x - 15 , y-40)
  }
  else
  {
    stroke(0,0,0);
    line(x -15, y + 40, x -15, y -40);
  }

  if (animFrame > 4)
  {
    stroke(r,g,b);
    bezier(x, y + 40, x + amp * dir, y + 30, x + amp * dir, y - 30, x, y-40);;
  }
  else
  {
    stroke(0,0,0);
    line(x, y + 40, x, y -40);
  }

  if (animFrame > 6)
  {
    stroke(r,g,b);
    bezier(x +15, y + 40, x +15 + (amp * dir), y + 30, x + 15 + (amp * dir), y - 30, x + 15 , y-40);
  }
  else
  {
    stroke(0,0,0);
    line(x +15, y + 40, x +15, y -40);
  }

  if (animFrame > 8)
  {
    stroke(r,g,b);
    bezier(x + 30, y + 40, x +30 + (amp * dir), y + 30, x + 30 +(amp * dir), y - 30, x+30, y-40);
  }
  else
  {
    stroke(0,0,0);
    line(x +30, y + 40, x +30, y -40);
  }

  dir *= -1;
}

//function squareNote(x,y, w, h, animFrame, r, g, b, a)
