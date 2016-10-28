window.onload = function () {
	new Clipboard('.copy');


	$(".copy").click(function() {
		window.close();
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
};	



document.addEventListener('DOMContentLoaded', function () {
	var c = new ProxyFormController( 'proxyForm' );
});


