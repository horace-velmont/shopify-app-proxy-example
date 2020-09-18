var myAppJavaScript = function(a) {
  a.get("/apps/channel-io-proxy", function(e) {
    var t = function(e) {
      var t = document.createElement("div");
      t.innerHTML = e;
      var a = document.createDocumentFragment();
      return a.appendChild(t), a.querySelector("#channel-io-widget")
    }(e);
    a("body").append(t), setInterval(storeCartCookies, 5000)
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

function storeCartCookies() {
  var e = {
    cart_id: docCookies.getItem("cart")
  },
  
  if (window.channelConfig.customer.id) {
    console.log("has customer id");
    var last_user_id = docCookies.getItem("last_user_id");
    var last_user_cart = docCookies.getItem("last_user_cart");
    e.email = window.channelConfig.customer.email;
    e.customer_id = window.channelConfig.customer.id;
    if (e.customer_id != last_user_id || e.cart_id != last_user_cart) {
      docCookies.setItem("last_user_id", e.customer_id);
      docCookies.setItem("last_user_cart", e.cart_id);
      $.get("https://d3c090ccee4e6c1ae6f772b732790f92.m.pipedream.net", e)
    }
  }
  
  //window.channelConfig.customer.email ? e.email = window.channelConfig.customer.email : e.user_id = window.channelConfig., e.cart_id && (!e.email || t && t == e.cart_id ? !e.user_id || a && a == e.cart_id || (docCookies.removeItem("last_cart_lead"), docCookies.setItem("last_cart_lead", e.cart_id), $.get("/apps/intercom-proxy/save_cart", e)) : (docCookies.removeItem("last_cart_user"), docCookies.setItem("last_cart_user", e.cart_id), $.get("/apps/intercom-proxy/save_cart", e)))
}

var docCookies = {
  getItem: function(e) {
    return e && this.hasItem(e) ? unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1")) : null
  },
  setItem: function(e, t, a, o, r, c) {
    if (e && !/^(?:expires|max\-age|path|domain|secure)$/.test(e)) {
      var n = "";
      if (a) switch (typeof a) {
        case "number":
          n = "; max-age=" + a;
          break;
        case "string":
          n = "; expires=" + a;
          break;
        case "object":
          a.hasOwnProperty("toGMTString") && (n = "; expires=" + a.toGMTString())
      }
      document.cookie = escape(e) + "=" + escape(t) + n + (r ? "; domain=" + r : "") + (o ? "; path=" + o : "") + (c ? "; secure" : "")
    }
  },
  removeItem: function(e) {
    if (e && this.hasItem(e)) {
      var t = new Date;
      t.setDate(t.getDate() - 1), document.cookie = escape(e) + "=; expires=" + t.toGMTString() + "; path=/"
    }
  },
  hasItem: function(e) {
    return new RegExp("(?:^|;\\s*)" + escape(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie)
  }
};
