var myAppJavaScript = function(a) {
  a.get("/apps/channel-io-proxy", function(e) {
    var t = function(e) {
      var t = document.createElement("div");
      t.innerHTML = e;
      var a = document.createDocumentFragment();
      return a.appendChild(t), a.querySelector("#intercom-widget")
    }(e);
    a("body").append(t), setInterval(storeCartCookies, 2e3)
  }), a('[href="/account/logout"]').unbind("click").click(function() {
    Intercom("shutdown")
  })
};

var loadScript = function(e, t) {
  var a = document.createElement("script");
  a.type = "text/javascript", a.readyState ? a.onreadystatechange = function() {
    "loaded" != a.readyState && "complete" != a.readyState || (a.onreadystatechange = null, t())
  } : a.onload = function() {
    t()
  }, a.src = e, document.getElementsByTagName("head")[0].appendChild(a)
};
"undefined" == typeof jQuery || parseFloat(jQuery.fn.jquery) < 1.7 ? loadScript("//ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js", function() {
  jQuery191 = jQuery.noConflict(!0), myAppJavaScript(jQuery191)
}) : myAppJavaScript(jQuery);
