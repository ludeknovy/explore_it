window.onload = function () {
  new Clipboard('.copy');

$(".copy").click(function() {
  window.close();
});
};

document.addEventListener('DOMContentLoaded', function () {
  var c = new ProxyFormController( 'proxyForm' );
});
