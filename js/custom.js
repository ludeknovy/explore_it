window.onload = function () {
	new Clipboard('.copy');


	$(".copy").click(function() {
		window.close();
	});

	$("#textField").bind("change paste keyup", function() {
		var x = $(this).val()
		$("#size").html(x.length);


});

	$("#random-string").click(function() {
		var length = document.getElementById("textLength").value;
		if (length % 1 === 0) {
			var random = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for( var i=0; i < length; i++ )
				random += possible.charAt(Math.floor(Math.random() * possible.length));
			$("#clipboard").css("visibility", "visible");
			$("#resultGenerator").html(random) ;
//			document.getElementById("resultGenerator").innerHTML = random;
		} else {
			$("#resultGenerator").html("invalid input");
		}
	})
};

document.addEventListener('DOMContentLoaded', function () {
	var c = new ProxyFormController( 'proxyForm' );
});


