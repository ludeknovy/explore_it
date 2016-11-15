// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

window.onload = function() {
	$('#myCanvasPaint').sketch();
};


function setScreenshotUrl(url) {
	var myCanvas = document.getElementById('myCanvas');
	var myCanvasPaint = document.getElementById('myCanvasPaint');
	var ctx = myCanvas.getContext('2d');
	var ctxPaint = myCanvasPaint.getContext('2d');
	var img = new Image;
	img.src = url;

	var ratio = img.width / img.height
	var width = window.innerWidth;
	var height = window.innerHeight; 
	console.log(ratio, width, height, img.height, img.width)
	if (img.width > width || img.height > height) {
		console.log("r")
		height = img.height / 2
		width = img.width / 2
	}
//window.addEventListener('resize', resizeCanvas, false);
	myCanvas.width = width;
	myCanvas.height = height;
	myCanvasPaint.width = width;
	myCanvasPaint.height = height;

	console.log(height, width)
	img.onload = function(){
	  		ctx.drawImage(img,0,0, width, height); // Or at whatever offset you like
	}

  	saveFile(width, height)
  }

  function saveFile(width, height) {
	// in memory canvas
	var download = $("#save-as");
	download.click(function() {
		console.log(width);
		var canTemp = document.getElementById("tempCanvas")
		var ctxTemp = canTemp.getContext('2d');
		canTemp.height = height;
		canTemp.width = width;
		ctxTemp.drawImage(myCanvas, 0, 0, width, height);
		ctxTemp.drawImage(myCanvasPaint, 0, 0, width, height);
		var pngUrl = canTemp.toDataURL();
		console.log(pngUrl);

		var optionalFile = $("#filename").val();
		if (optionalFile != "") {
			download.attr("download", optionalFile);
		}
		download.attr("href",pngUrl)

	});
}

