var precacheConfig  = [
  "",
  "index.html",
  "service-worker.js",
  "css/font-awesome.css",
  "css/ionic.app.css",
  "css/ionic.app.min.css",
  "css/ionic.css",
  "css/style.css",
  "fonts/fontawesome-webfont.eot",
  "fonts/fontawesome-webfont.svg",
  "fonts/fontawesome-webfont.ttf",
  "fonts/fontawesome-webfont.woff",
  "fonts/fontawesome-webfont.woff2",
  "fonts/ FontAwesome.otf",
  "fonts/ionicons.eot",
  "fonts/ionicons.svg",
  "fonts/ionicons.ttf",
  "fonts/ionicons.woff",
  "img/about.png",
  "img/esteem.png",
  "img/esteem_white.png",
  "img/isimage.png",
  "img/logo.png",
  "img/logo_steemfest.png",
  "img/logo_steemmonitor.png",
  "img/noimage.png",
  "img/nsfwimage.png",
  "img/ollist.png",
  "img/photo.png",
  "img/plus.png",
  "img/steemDeclined.png",
  "img/steem_icon.png",
  "img/tap_to_see_image.xcf",
  "img/ullist.png",
  "img/user_profile.png",
  "img/ user_profile.xcf",
  "js/index.js",
  "js/lib.js",
  "lib/blockies.js",
  "lib/firebase.js",
  "lib/highcharts.src.js",
  "lib/highstock.src.js",
  "lib/imgcache.js",
  "lib/ion-datetime-picker.min.css",
  "lib/ion-datetime-picker.min.js",
  "lib/ionic-img-cache.js",
  "lib/ marked.js",
  "lib/moment-with-locales.min.js",
  "lib/speakingurl.min.js",
  "templates/gallery_images.html",
  "templates/info.html",
  "templates/login.html",
  "templates/pincode.html",
  "templates/popover.html",
  "templates/reply.html",
  "templates/search.html",
  "templates/story.html"
],
cacheName = "sw-precache-v3-eSteem-" + (self.registration ? self.registration.scope : ""),
ignoreUrlParametersMatching = [/^utm_/],
addDirectoryIndex = function(e, t) {
    var n = new URL(e);
    return "/" === n.pathname.slice(-1) && (n.pathname += t), n.toString()
},
cleanResponse = function(e) {
    return e.redirected ? ("body" in e ? Promise.resolve(e.body) : e.blob()).then(function(t) {
        return new Response(t, {
            headers: e.headers,
            status: e.status,
            statusText: e.statusText
        })
    }) : Promise.resolve(e)
},
createCacheKey = function(e, t, n, r) {
    var a = new URL(e);
    return r && a.pathname.match(r) || (a.search += (a.search ? "&" : "") + encodeURIComponent(t) + "=" + encodeURIComponent(n)), a.toString()
},
isPathWhitelisted = function(e, t) {
    if (0 === e.length) return !0;
    var n = new URL(t).pathname;
    return e.some(function(e) {
        return n.match(e)
    })
},
stripIgnoredUrlParameters = function(e, t) {
    var n = new URL(e);
    return n.hash = "", n.search = n.search.slice(1).split("&").map(function(e) {
        return e.split("=")
    }).filter(function(e) {
        return t.every(function(t) {
            return !t.test(e[0])
        })
    }).map(function(e) {
        return e.join("=")
    }).join("&"), n.toString()
},
hashParamName = "_sw-precache",
urlsToCacheKeys = new Map(precacheConfig.map(function(e) {
    var t = e[0],
        n = e[1],
        r = new URL(t, self.location),
        a = createCacheKey(r, hashParamName, n, !1);
    return [r.toString(), a]
}));

function setOfCachedUrls(e) {
return e.keys().then(function(e) {
    return e.map(function(e) {
        return e.url
    })
}).then(function(e) {
    return new Set(e)
})
}
self.addEventListener("install", function(e) {
e.waitUntil(caches.open(cacheName).then(function(e) {
    return setOfCachedUrls(e).then(function(t) {
        return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n) {
            if (!t.has(n)) {
                var r = new Request(n, {
                    credentials: "same-origin"
                });
                return fetch(r).then(function(t) {
                    if (!t.ok) throw new Error("Request for " + n + " returned a response with status " + t.status);
                    return cleanResponse(t).then(function(t) {
                        return e.put(n, t)
                    })
                })
            }
        }))
    })
}).then(function() {
    return self.skipWaiting()
}))
}), self.addEventListener("activate", function(e) {
var t = new Set(urlsToCacheKeys.values());
e.waitUntil(caches.open(cacheName).then(function(e) {
    return e.keys().then(function(n) {
        return Promise.all(n.map(function(n) {
            if (!t.has(n.url)) return e.delete(n)
        }))
    })
}).then(function() {
    return self.clients.claim()
}))
}), self.addEventListener("fetch", function(e) {
if ("GET" === e.request.method) {
    var t, n = stripIgnoredUrlParameters(e.request.url, ignoreUrlParametersMatching);
    (t = urlsToCacheKeys.has(n)) || (n = addDirectoryIndex(n, "index.html"), t = urlsToCacheKeys.has(n));
    0, t && e.respondWith(caches.open(cacheName).then(function(e) {
        return e.match(urlsToCacheKeys.get(n)).then(function(e) {
            if (e) return e;
            throw Error("The cached response that was expected is missing.")
        })
    }).catch(function(t) {
        return console.warn('Couldn\'t serve response for "%s" from cache: %O', e.request.url, t), fetch(e.request)
    }))
}
});