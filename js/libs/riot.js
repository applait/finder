/* Riot 1.0.4, @license MIT, (c) 2014 Muut Inc + contributors */
(function(riot) { "use strict";

riot.observable = function(el) {
  var callbacks = {}, slice = [].slice;

  el.on = function(events, fn) {
    if (typeof fn === "function") {
      events.replace(/\S+/g, function(name, pos) {
        (callbacks[name] = callbacks[name] || []).push(fn);
        fn.typed = pos > 0;
      });
    }
    return el;
  };

  el.off = function(events, fn) {
    if (events === "*") callbacks = {};
    else if (fn) {
      var arr = callbacks[events];
      for (var i = 0, cb; (cb = arr && arr[i]); ++i) {
        if (cb === fn) { arr.splice(i, 1); i--; }
      }
    } else {
      events.replace(/\S+/g, function(name) {
        callbacks[name] = [];
      });
    }
    return el;
  };

  // only single event supported
  el.one = function(name, fn) {
    if (fn) fn.one = true;
    return el.on(name, fn);
  };

  el.trigger = function(name) {
    var args = slice.call(arguments, 1),
      fns = callbacks[name] || [];

    for (var i = 0, fn; (fn = fns[i]); ++i) {
      if (!fn.busy) {
        fn.busy = true;
        fn.apply(el, fn.typed ? [name].concat(args) : args);
        if (fn.one) { fns.splice(i, 1); i--; }
        fn.busy = false;
      }
    }

    return el;
  };

  return el;

};
var FN = {}, // Precompiled templates (JavaScript functions)
  template_escape = {"\\": "\\\\", "\n": "\\n", "\r": "\\r", "'": "\\'"},
  render_escape = {'&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;'};

function default_escape_fn(str, key) {
  return str == null ? '' : (str+'').replace(/[&\"<>]/g, function(char) {
    return render_escape[char];
  });
}

// Patch riot.render based on https://github.com/muut/riotjs/issues/103#issuecomment-40866114
riot.render = function(tmpl, data, escape_fn) {
    if (escape_fn === true) escape_fn = default_escape_fn;
    tmpl = tmpl || '';

    return tmpl.replace(/{\s*([\w\.]+)\s*}/g, function(k, v) {
        var p = v.split(".");
        var t = data ? data[p[0]] : null;
        if (t === undefined || t === null) return '';
        for (var i = 1; i < p.length; i++) t = t[p[i]];
        return (escape_fn ? escape_fn(t, v) : t || (t === undefined || t === null ? '': t));
    });
};
// -- End patch -- //
/* Cross browser popstate */
(function () {
  // for browsers only
  if (typeof window === "undefined") return;

  var currentHash,
    pops = riot.observable({}),
    listen = window.addEventListener,
    doc = document;

  function pop(hash) {
    hash = hash.type ? location.hash : hash;
    if (hash !== currentHash) pops.trigger("pop", hash);
    currentHash = hash;
  }

  /* Always fire pop event upon page load (normalize behaviour across browsers) */

  // standard browsers
  if (listen) {
    listen("popstate", pop, false);
    doc.addEventListener("DOMContentLoaded", pop, false);

  // IE
  } else {
    doc.attachEvent("onreadystatechange", function() {
      if (doc.readyState === "complete") pop("");
    });
  }

  /* Change the browser URL or listen to changes on the URL */
  riot.route = function(to) {
    // listen
    if (typeof to === "function") return pops.on("pop", to);

    // fire
    if (history.pushState) history.pushState(0, 0, to);
    pop(to);

  };
})();
if (typeof exports === 'object') {
  // CommonJS support
  module.exports = riot;
} else if (typeof define === 'function' && define.amd) {
  // support AMD
  define(function() { return riot; });
} else {
  // support browser
  window.riot = riot;
}

})({});
