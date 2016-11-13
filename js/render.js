// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

window.onload = function() {
	$.each(['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#000', '#fff'], function() {
		$('.control-panel #tool').append("<a href='#colors_sketch' data-color='" + this + "' style='width: 10px; background: " + this + ";'>" + this + "</a> ");
	});
	$.each([3, 5, 10, 15], function() {
		$('.control-panel #tool').append("<a href='#colors_sketch' data-size='" + this + "' style='background: #ccc'>" + this + "</a> ");
	});
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
	var height = 0; 
	if (img.width > width) {
		height = (img.width - width) / ratio;
	}
//window.addEventListener('resize', resizeCanvas, false);
myCanvas.width = width;
myCanvas.height = height;
myCanvasPaint.width = width;
myCanvasPaint.height = height;
img.onload = function(){
  		ctx.drawImage(img,0,0, width, height); // Or at whatever offset you like
  	}

  	saveFile(width, height);
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

