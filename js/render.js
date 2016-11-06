// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function setScreenshotUrl(url) {
	var myCanvas = document.getElementById('myCanvas');
	var ctx = myCanvas.getContext('2d');
	var img = new Image;
	img.src = url;

	var ratio = img.width / img.height
	var width = window.innerWidth;
	var height = 0; 
	if (img.width > width) {
		height = (img.width - width) / ratio;
	}
//window.addEventListener('resize', resizeCanvas, false);
	myCanvas.width = width;
	myCanvas.height = height;
	img.onload = function(){
  		ctx.drawImage(img,0,0, width, height); // Or at whatever offset you like
	}

	saveFile(url);
}

function saveFile(url) {
	var download = $("#save-as");
	download.click(function() {
		var optionalFile = $("#filename").val();
		if (optionalFile != "") {
			download.attr("download", optionalFile);
		}
	download.attr("href",url)

	});



}

