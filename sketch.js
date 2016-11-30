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
var measureLoop1 = 0;    // Separate measure loop for harp and pulseOrb animation cycles
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

  // Pulse orb constructors.
  pulseOrb1 = new pulseOrb(midX, midY, 40, 130,220,250);
  pulseOrb2 = new pulseOrb(midX, 217,  40, 130,220,250);
  pulseOrb3 = new pulseOrb(midX, 134,  40, 130,220,250);
  pulseOrb4 = new pulseOrb(midX, 50,   20, 255,255,255);
  pulseOrb4.wave(10);      // makes pulseOrb4's shockwave effect last longer

  music.setVolume(0.1);
  music.play();
  startUpTime = millis();
}


function draw()
{
  timer = millis() - startUpTime;
  beatTimer += timer - prevTime;

  background(backR,backG,backB);

  // fill(0,0,0,alpha);
  // rect(0,0,canvasWidth,canvasHeight);
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
    measureLoop1++;
    beat = 1;
    instBeat = 1;
  }

  // Reset measure when song loops
  if (measure == 56 && instBeat == 1)
  {
    measure = 1;
    measureLoop1 = 1;
    pulseOrb1.hide();
    pulseOrb2.hide();
    pulseOrb3.hide();
    pulseOrb4.hide();
  }

  // Resets measureLoop1 once it goes out of its 8-measure boundary
  if (measureLoop1 > 8)
  {
    measureLoop1 = 1;
  }


  if (measure < 25)
  {
    // Harp 1 animation trigger
    if ((measureLoop1 == 1 || measureLoop1 == 3 || measureLoop1 == 5) && instBeat == 1)
    {
        anim1 = 1;
        amp1 = 10;
        harpR1 = harpRmax;
        harpG1 = harpGmax;
        harpB1 = harpBmax;
    }
    // Harp 2 animation trigger
    if ((measureLoop1 == 2 || measureLoop1 == 4 || measureLoop1 == 6) && instBeat == 1)
    {
        anim2 = 1;
        amp2 = 10;
        harpR2 = harpRmax;
        harpG2 = harpGmax;
        harpB2 = harpBmax;
    }
    // Harp 3 animation trigger
    if (measureLoop1 == 7 && instBeat == 1)
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


  // PulseOrb pulse/creation triggers
  // Pulse orb note order: 341 2-1 341 2-1 341 213 14- ---
  // Beat counts:          123 123 123 123 123 123 123 123
  // Measure counts:       1-- 2-- 3-- 4-- 5-- 6-- 7-- 8--
  if (measure > 8 && measure < 25)
  {
    if (measureLoop1 == 1 || measureLoop1 == 3 || measureLoop1 == 5)
    {
      if (instBeat == 1)
      { pulseOrb3.pulse()}
      else if (instBeat == 2)
      { pulseOrb4.pulse()}
      else if (instBeat == 3)
      { pulseOrb1.pulse()}
    }

    else if (measureLoop1 == 2 || measureLoop1 == 4)
    {
      if (instBeat == 1)
      { pulseOrb2.pulse();}
      else if (instBeat == 3)
      { pulseOrb1.pulse();}
    }

    else if (measureLoop1 == 6)
    {
      if (instBeat == 1)
      { pulseOrb2.pulse();}
      else if (instBeat == 2)
      { pulseOrb1.pulse();}
      else if (instBeat == 3)
      { pulseOrb3.pulse();}
    }

    if (measureLoop1 == 7)
    {
      if (instBeat == 1)
      { pulseOrb1.pulse();}
      else if (instBeat == 2)
      { pulseOrb4.pulse();}
    }
  }

  // pulseOrb renderings
  pulseOrb1.draw();
  pulseOrb2.draw();
  pulseOrb3.draw();
  pulseOrb4.draw();
/*
  // Tool for testing tempo: Displays measures, beats, beatTimer, and frameRate
  if (instBeat == 1 || instBeat == 2 || instBeat == 3)
  {
    fill(255,255,255);
  }
  else
  {
    fill(0,0,0);
  }
  ellipse(midX, canvasHeight/4, 50);
  fill(100,100,100);
  text(measure, canvasWidth/4, midY);
  text(beat, midX, midY);
  text(beatTimer, canvasWidth * 3/4, midY + 30);
  text(frameRate(), midX, canvasHeight *3/4);
*/

  /*
  // Tool for identifying x and y positions for object placement
  fill(100,100,100);
  strokeWeight(1);
  stroke(100,100,100);
  text(mouseX, midX - 30, 30);
  text(mouseY, midX + 30, 30);

  text(pulseOrb2.animFrame, 40, canvasHeight - 30);
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

  // Object for orbs that pulse during certain notes.
  function pulseOrb(x, y, radius, r, g, b) {
    this.x = x;
    this.y = y;
    this.rad = radius;
    this.r = r;
    this.g = g;
    this.b = b;
    this.animFrame = -2;
    this.opacity = 255;
    this.tempRad = 1;
    this.opDelta = 20;

    this.hide = function()
    {
      this.animFrame = -2;
    }

    /*
    // Changes orb's position
    this.move = function(x,y)
    {
      this.x = x;
      this.y = y;
    }

    // Changes orb's standard radius
    this.radius = function(radius)
    {
      this.rad = radius;
    }

    // Changes orb's color
    this.color = function(red, green, blue)
    {
      r = this.red;
      g = this.green;
      b = this.blue;
    }
    */

    // Triggers the orb's pulse animation
    this.pulse = function()
    {
      // Begins animation if orb has been initialized
      if (this.animFrame > -1)
      { this.animFrame = 1;}
      // Initializes orb for creation animation if it hasn't been done yet.
      else if (this.animFrame < -1)
      { this.animFrame = -1;}
    }

    this.wave = function(opDelta)
    {
      this.opDelta = opDelta;
    }

    this.draw = function()
    {
      noStroke();
      fill(r,g,b);

      // Creation animation
      if (this.animFrame == -1)
      {
        // If the this.tempRadius is equal to or higher than standard, moves to pulse animation
        if (this.tempRad >= this.rad)
        { this.animFrame = 1;}

        // this.tempRadius grows until it reaches the standard radius
        else
        {
        ellipse(x,y, this.tempRad);
        this.tempRad += this.rad/4;
        }
      }

      // Pulse animation.  No "else" on this if statement so creation animation can move into pulse animation
      if (this.animFrame > 0)
      {
        // Second orb grows and fades
        this.opacity = 255 - (5 + this.animFrame * this.opDelta);
        fill(r,g,b, this.opacity);
        ellipse(x,y,this.rad + this.animFrame*5);

        // Original orb pulses, and returns to normal size
        fill(r,g,b, 255);
        //ellipse(x,y, this.rad);
        if (this.animFrame < 4)
        {
          this.tempRad = this.rad + this.animFrame * 4;
          ellipse(x,y, this.tempRad);
        }
        else if (this.tempRad > this.rad)
        {
          this.tempRad--;
          ellipse(x,y, this.tempRad);
        }
        else
        { ellipse(x,y,this.rad);}


        if (this.opacity <= 0)
        { this.animFrame = 0;}
        else
        { this.animFrame++;}
      }

      // Idle rendering
      else if (this.animFrame == 0)
      { ellipse(x,y,this.rad);}

    }
  }


//function squareNote(x,y, w, h, animFrame, r, g, b, a)
