let cats = [];
let cat;
let goal;
let bestImg;
let bestScore;

let iii=0;
let iii_e;

let pg;

let mainCanvas;

let paused = false;

function preload() {
  // cat = loadImage('images/cat1.png');
  let catFiles = [
    'images/s1.png',
    'images/s2.png',
    'images/s3.png',
    'images/s4.png',
    'images/s5.png',
    'images/s6.png',
    'images/s7.png',
    'images/s8.png',
    'images/s9.png',
    'images/s10.png',
    'images/s11.png',
    'images/s12.png',
    'images/s13.png',
    'images/s14.png',
    'images/s15.png',
    'images/s16.png',
    'images/s17.png',
    'images/s18.png',
    'images/s19.png',
    'images/s20.png',
    'images/s21.png',
    'images/s22.png',
    'images/s23.png',
    'images/s24.png',
    'images/s25.png',
    'images/s26.png',
    'images/s27.png',
    'images/s28.png',
    'images/s29.png',
    'images/s30.png',
    'images/s31.png',
    'images/s32.png',
    'images/s33.png',
    'images/s34.png',
    'images/s35.png',
    'images/s36.png',
    'images/s37.png',
    'images/s38.png',
  ];

  for (let catFile of catFiles) {
    let e = select('#loading_file');
    e.html(catFile);
    cats.push(loadImage(catFile));
  }

  goal = loadImage(
    // 'images/ff.jpg'
    'images/beg.jpg'
  );
  

}

function setup() {
  goal.resize(1536,0);
  console.log(goal.width);
  mainCanvas = createCanvas(goal.width, goal.height);
  bestImg = createImage(width,height);

  
  for (let [ii,oCat] of cats.entries()) {
    console.log('gray-ing cats',ii);
    pg = createGraphics(oCat.width, oCat.height);
    pg.image(oCat,0,0);
    pg.filter(GRAY);
    cats[ii] = pg.get();
    pg.remove();
  }

  iii_e = select('#iii');

  bestScore = (256**2)*goal.width*goal.height*4;
  goal.loadPixels();
  frameRate(5);

}

function draw() {
  background(0,0,0);
  image(bestImg,0,0);

  cat = random(cats);
  
  let x = width/2;
  let y = height/2;
  let maxCat = (min(goal.width,goal.height)/8)/max(cat.width,cat.height);
  // console.log(maxCat)
  let catScale = random(0.02,maxCat);
  
  let catOffsetX = random(0,goal.width/2)*random([-1,1]);
  let catOffsetY = random(0,goal.height/2)*random([-1,1]);
  let catAngle = random(0,2*PI);

  let newCat = createImage(cat.width,cat.height);
  newCat.copy(cat,0,0,cat.width,cat.height,0,0,newCat.width,newCat.height)
  // console.log(catScale)
  newCat.resize(1000*catScale,0);


  push();  

  let rc = goal.get(
    round(random(goal.width)),
    round(random(goal.height))
  );

  for (let ii=0;ii<3;ii++) {
    rc[ii] = constrain(rc[ii]+random(20,50),0,255);
  }
 
  tint(
      rc
    );

  translate(x+catOffsetX,y+catOffsetY);
  rotate(catAngle);
  imageMode(CENTER);
  image(newCat,0,0);
  pop();
  
  let a = getFitness(pg);
  
  if (a<bestScore) {
    console.log('best score!')

    bestScore = a;
    bestImg = get();
  }

  iii++;
  iii_e.html(iii);

  if (iii%500==0) {
    saveCanvas('bookmark','jpg');
  }

  // noLoop();
}

function mousePressed() {
  paused = !paused;
  if (paused) {
    noLoop();
  } else {
    loop();
  }
  // console.log(c,mouseX,mouseY);
}

function getFitness(buffer) {

  let score = 0;
  loadPixels();
  goal.loadPixels();

  for (let ii = 0; ii<pixels.length; ii=ii+4) {
    score += (
      (pixels[ii]-goal.pixels[ii])**2
    )+(
      (pixels[ii+1]-goal.pixels[ii+1])**2
    )+(
      (pixels[ii+2]-goal.pixels[ii+2])**2
    );

  }

  return score;
}

function fitnessXY(x,y) {
  let p1 = goal.get(x,y);
  let p2 = get(x,y);

  let s = (
    (
      (p1[0]-p2[0])**2
    )+(
      (p1[1]-p2[1])**2
    )+(
      (p1[2]-p2[2])**2
    )
  )

  if (s<=0) {
    // console.log(mouseX,mouseY)
    // debugger;
  }
  return s
}