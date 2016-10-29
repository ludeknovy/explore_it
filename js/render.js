// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function setScreenshotUrl(url) {

	var myCanvas = document.getElementById('myCanvas');
	var ctx = myCanvas.getContext('2d');
	var img = new Image;
	var dataUrl = url;
//window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
	myCanvas.width = window.innerWidth;
	myCanvas.height = window.innerHeight;
	drawStuff(); 
}
resizeCanvas();

function drawStuff() {
	img.onload = function(){
  	ctx.drawImage(img,0,0, myCanvas.width, myCanvas.height); // Or at whatever offset you like
  };
}
img.src = dataUrl

}

