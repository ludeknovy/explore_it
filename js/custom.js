$("#body").ready(function() {

	loadData();

	$("#screen").click(function() {
		chrome.extension.sendMessage({name: 'screenshot'})
	});

	$("#textField").bind("change paste keyup", function() {
		var string = $(this).val()
		$("#size").html(string.length);
	});

	$("#edit-number").bind("keyup", function(e) {
		var code = (e.keyCode || e.which);
		var digit = $(this).val();
		if(code == 37 || code == 38 || code == 39 || code == 40 || code==16) {
			return;
		}
		if (digit > 0 && digit < 1000) {
			var random = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for (var i=0; i < digit; i++ ) {
				random += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			$("#string").val(random) ;
		} else if (digit > 1001) {
			$("#string").val("Number is too large");
		} else if (digit == "") {
			$("#string").val("Add a number");
		} else {
			$("#string").val("invalid input");
		}
	});

});	



document.addEventListener('DOMContentLoaded', function () {
	var c = new ProxyFormController( 'proxyForm' );
});

function loadData () {
	chrome.runtime.sendMessage({name: 'json'}, function(response) {
		var jsonData = JSON.parse(response.url);
		$.each(jsonData, function(key, val) {
			var img = val.icon;
			var category = key;
			var categoryID = category.replace(/ /g,'');
			var categoryHtml = "<li id='" + categoryID +"' class='dropdown='><a href='#' class='dropdown-toggle lorem' data-toggle='dropdown'><img src='../../icons/" + img +"'>" + category + "<b class='caret'></b></a><ul class='dropdown-menu'>";
			$("#explore .nav.navbar-nav").append(categoryHtml);
			$.each(val.items, function(itemKey, item) {
				var tempItem = item;
				var tempItemHtml = '<div class="col-lg-6"><div class="input-group"><button id="clipboard" class="btn btn-default copy clipboard-left" data-clipboard-target="#' + itemKey +'"><img src="../../icons/copy.svg"></button><span class="input-group-btn"><input id="' + itemKey +'" class="btn btn-default generate-input disabled input-value" value="' + item +'"></input></span></div></div>';
				$('#' +categoryID + ' .dropdown-menu').append(tempItemHtml);
			})
		});

		new Clipboard('.copy');

		$(".copy").click(function() {
			window.close();
		});
	});	
};




