var fileinput = document.getElementById("finput");
var imgcanvas = null; 

var image = null;
var grayImage = null;
var redImage = null;
var greenImage = null;
var windowImage = null;
var rainbowImage = null;


function upload() {
  
  image = new SimpleImage(fileinput);
  grayImage = new SimpleImage(fileinput);
  redImage = new SimpleImage(fileinput);
  greenImage = new SimpleImage(fileinput);
  windowImage = new SimpleImage(fileinput);
  rainbowImage = new SimpleImage(fileinput);
  
  imgcanvas = document.getElementById("can");
  image.drawTo(imgcanvas);
}

function filter(pixel, color) {
  var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
  if (avg < 128) {
    pixel.setRed((color[0] / 127.5) * avg);
    pixel.setGreen((color[1] / 127.5) * avg);
    pixel.setBlue((color[2] / 127.5) * avg);
  } else {
    pixel.setRed((2 - color[0] / 127.5) * avg + 2 * color[0] - 255);
    pixel.setGreen((2 - color[1] / 127.5) * avg + 2 * color[1] - 255);
    pixel.setBlue((2 - color[2] / 127.5) * avg + 2 * color[2] - 255);
  }
}

function filterGray() {
  for (var pixel of grayImage.values()){
var avg   =(pixel.getRed()+pixel.getBlue()+pixel.getGreen())/3;
    pixel.setRed(avg);
    pixel.setBlue(avg);
    pixel.setGreen(avg);
  }
  imgcanvas = document.getElementById("can");
  grayImage.drawTo(imgcanvas);
}

function filterRed() {
  for (var pixel of redImage.values()){
var avg   =(pixel.getRed()+pixel.getBlue()+pixel.getGreen())/3;
    if (avg<128){
    pixel.setRed(2*avg);
    pixel.setBlue(0);
    pixel.setGreen(0);
    }
    
    else {
    pixel.setRed(255);
    pixel.setBlue(2*avg - 255);
    pixel.setGreen(2*avg - 255);
    }
  }
  
  imgcanvas = document.getElementById("can");
  redImage.drawTo(imgcanvas);
}

function filterGreen() {
  for (var pixel of greenImage.values()){
var avg   =(pixel.getRed()+pixel.getBlue()+pixel.getGreen())/3;
    if (avg<128){
    pixel.setRed(0);
    pixel.setBlue(0);
    pixel.setGreen(2*avg);
    }
    
    else {
    pixel.setRed(2*avg - 255);
    pixel.setBlue(2*avg - 255);
    pixel.setGreen(255);
    }
  }
  
  imgcanvas = document.getElementById("can");
  greenImage.drawTo(imgcanvas);
}

function setBorder(pixel) {
  var pixelBorder = pixel.setRed(225);
  pixelBorder = pixel.setGreen(255);
  pixelBorder = pixel.setBlue(255);
  return pixelBorder;
}

function filterWindow() {
  var w = windowImage.getWidth();
  var h = windowImage.getHeight();
  var th = w * 0.0125;
  var xx = (w - 4 * th) / 3;
  var yy = (h - 3 * th) / 2;
  for (var pixel of windowImage.values()) {
    if (pixel.getY() < th || pixel.getY() >= h - th) {
      setBorder(pixel);
    }
    if (pixel.getX() < th || pixel.getX() >= w - th) {
      setBorder(pixel);
    }
    if (pixel.getX() > xx && pixel.getX() < xx + th) {
      setBorder(pixel);
    }
    if (pixel.getX() > 2 * xx + th && pixel.getX() < 2 * xx + 2 * th) {
      setBorder(pixel);
    }
    if (pixel.getY() > yy && pixel.getY() < yy + th) {
      setBorder(pixel);
    }
  }
  windowImage.drawTo(imgcanvas);
}

function filterRainbow() {
  var height = rainbowImage.getHeight();
  for (var pixel of rainbowImage.values()) {
    var y = pixel.getY();
    if (y < height / 7) {
      filter(pixel, [255, 0, 0]);
    } else if (y < (2 * height) / 7) {
      filter(pixel, [255, 127, 0]);
    } else if (y < (3 * height) / 7) {
      filter(pixel, [255, 255, 0]);
    } else if (y < (4 * height) / 7) {
      filter(pixel, [0, 255, 0]);
    } else if (y < (5 * height) / 7) {
      filter(pixel, [0, 0, 255]);
    } else if (y < (6 * height) / 7) {
      filter(pixel, [75, 0, 130]);
    } else {
      filter(pixel, [148, 0, 211]);
    }
  }
  imgcanvas = document.getElementById("can");
  rainbowImage.drawTo(imgcanvas);
}

function getnewPixel(x, y) {
  var h = imgBlur.getHeight();
  var w = imgBlur.getWidth();
  var newX = x + Math.round(Math.random() * 10) - 5;
  var newY = y + Math.round(Math.random() * 10) - 5;

  if (newX > w - 1) {
    newX = w - 1;
  } else if (newX < 0) {
    newX = 0;
  }

  if (newY > h - 1) {
    newY = h - 1;
  } else if (newY < 0) {
    newY = 0;
  }

  return (imgBlur.getPixel(newX, newY));
}

function blurImage() {
  for (var pixel of imgBlur.values()) {
    var random = Math.random();
    var x = pixel.getX();
    var y = pixel.getY();
    if (random < 0.5) {
      imgBlur.setPixel(x, y, pixel);
    } else {
      var newPixel = getnewPixel(x, y);
      imgBlur.setPixel(x, y, newPixel);
    }
  }
  var canvas = document.getElementById("can");
  imgBlur.drawTo(canvas);
}



function reset() {
  upload();
}
