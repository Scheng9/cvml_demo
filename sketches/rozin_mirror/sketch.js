
let w=500;
let h=400;
let capture;

var col = {
  r : 255,
  g : 255,
  b : 255
}
  
function setup() {
  let canvas = createCanvas(w, h);
  canvas.parent("#sketch-parent")
  pixelDensity(1);
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();
  col.r = random (0, 255);
  col.g = random (0, 300)
  col.b = random (0, 100)
 }
function draw() 
 {background(col.r,col.g, col.b);
  let stepSize = 10;
  capture.loadPixels();
  let threshold = map(mouseX, 0,width, 0, 255, true);
  let threshold2 = threshold + 50
  
  //let threshold = mouseX
 for(let y = 0; y < capture.height; y+= stepSize)
 {for(let x = 0; x < capture.width; x+= stepSize)
 {const index = (x + y * capture.width) * 4;  
 
 
 let r = capture.pixels[index];
 let g = capture.pixels[index+1];  
 let b = capture.pixels[index+2];
 let c = color(r,g,b); 
 
 
 // r = map(mouseX, 0, 600, 0, 255);
 // b = map(mouseX, 0, 600, 255, 0);

 let totalBrightness = r + b + g;
  
 let brightness = totalBrightness/3;
  
 let size = map(brightness, 0, 255, stepSize/4, stepSize * 3);    
 noStroke()  
 noSmooth();
 //fill(255,200,225);
 fill(c);
  

 push();
  translate(width,0);
  scale(-1,1);
  translate(stepSize/2, stepSize/2);
 rect(x, y, size, size);
 pop() 
  
if(brightness < threshold) {
  capture.pixels[index] = 0;
  capture.pixels[index+1] = 0;
  capture.pixels[index+2] = 0;
} else if(brightness > threshold && brightness < threshold2) {
  capture.pixels[index] = x;
  capture.pixels[index+1] = y;
  capture.pixels[index+2] = 255;
}
  else {
  capture.pixels[index] = 255;
  capture.pixels[index+1] = 255;
  capture.pixels[index+2] = 255;
}
 }                                            
 }
  capture.updatePixels();
  //image(capture,0 ,0);
 }