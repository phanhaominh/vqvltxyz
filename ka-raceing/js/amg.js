(function() {
  var allowed = ['localhost', '127.0.0.1', 'vqvlt.xyz', 'www.vqvlt.xyz'];
  if (allowed.indexOf(window.location.hostname) === -1) {
    document.body.innerHTML = '';
    throw new Error('Unauthorized domain');
  }
})();

  // --- Firebase Setup ---
const firebaseConfig = {
  apiKey: "AIzaSyCQydGgzxYHKwfM0Mc3FLpl0zipEeEyPd4",
  authDomain: "ka-racing-leaderboard.firebaseapp.com",
  databaseURL: "https://ka-racing-leaderboard-default-rtdb.firebaseio.com",
  projectId: "ka-racing-leaderboard",
  storageBucket: "ka-racing-leaderboard.firebasestorage.app",
  messagingSenderId: "918641103164",
  appId: "1:918641103164:web:1d926f6dfe21954d298e39"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function submitScore(username, score, team) {
  db.ref('leaderboard').push({
    username: username,
    score: score,
    team: team || 'KA-Raceing'
  });
}

function fetchLeaderboard(callback) {
  db.ref('leaderboard')
    .orderByChild('score')
    .limitToFirst(10)
    .once('value', function(snapshot) {
      const data = [];
      snapshot.forEach(function(child) {
        data.push(child.val());
      });
      callback(data);
    });
}

function renderLeaderboard(data) {
  var html = "<tr><th>Place</th><th>Team</th><th>Name</th><th>Time</th></tr>";
  $.each(data, function(i, o) {
    html += '<tr><td>'+(i+1)+'</td><td>'+(o.team || '')+'</td><td class="leaderboard_name_wrapper"><div class="leaderboard_name">'+(o.username ? o.username.slice(0, 20) : '')+'</div></td><td class="leaderboard_time_wrapper"><div class="leaderboard_time">'+(o.score !== undefined ? o.score : '')+'<div></td></tr>';
  });
  $("#leaderboard").html(html);
  $("#table_wrap").addClass("active");
}

if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) { // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}
! function() {
    "use strict";

    function t(e, o) {
        var i;
        if (o = o || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = o.touchBoundary || 10, this.layer = e, this.tapDelay = o.tapDelay || 200, this.tapTimeout = o.tapTimeout || 700, !t.notNeeded(e)) {
            for (var r = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], a = this, c = 0, s = r.length; c < s; c++) a[r[c]] = u(a[r[c]], a);
            n && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (e.removeEventListener = function(t, n, o) {
                var i = Node.prototype.removeEventListener;
                "click" === t ? i.call(e, t, n.hijacked || n, o) : i.call(e, t, n, o)
            }, e.addEventListener = function(t, n, o) {
                var i = Node.prototype.addEventListener;
                "click" === t ? i.call(e, t, n.hijacked || (n.hijacked = function(t) {
                    t.propagationStopped || n(t)
                }), o) : i.call(e, t, n, o)
            }), "function" == typeof e.onclick && (i = e.onclick, e.addEventListener("click", function(t) {
                i(t)
            }, !1), e.onclick = null)
        }

        function u(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        }
    }
    var e = navigator.userAgent.indexOf("Windows Phone") >= 0,
        n = navigator.userAgent.indexOf("Android") > 0 && !e,
        o = /iP(ad|hone|od)/.test(navigator.userAgent) && !e,
        i = o && /OS 4_\d(_\d)?/.test(navigator.userAgent),
        r = o && /OS [6-7]_\d/.test(navigator.userAgent),
        a = navigator.userAgent.indexOf("BB10") > 0;
    t.prototype.needsClick = function(t) {
        switch (t.nodeName.toLowerCase()) {
            case "button":
            case "select":
            case "textarea":
                if (t.disabled) return !0;
                break;
            case "input":
                if (o && "file" === t.type || t.disabled) return !0;
                break;
            case "label":
            case "iframe":
            case "video":
                return !0
        }
        return /\bneedsclick\b/.test(t.className)
    }, t.prototype.needsFocus = function(t) {
        switch (t.nodeName.toLowerCase()) {
            case "textarea":
                return !0;
            case "select":
                return !n;
            case "input":
                switch (t.type) {
                    case "button":
                    case "checkbox":
                    case "file":
                    case "image":
                    case "radio":
                    case "submit":
                        return !1
                }
                return !t.disabled && !t.readOnly;
            default:
                return /\bneedsfocus\b/.test(t.className)
        }
    }, t.prototype.sendClick = function(t, e) {
        var n, o;
        document.activeElement && document.activeElement !== t && document.activeElement.blur(), o = e.changedTouches[0], (n = document.createEvent("MouseEvents")).initMouseEvent(this.determineEventType(t), !0, !0, window, 1, o.screenX, o.screenY, o.clientX, o.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, t.dispatchEvent(n)
    }, t.prototype.determineEventType = function(t) {
        return n && "select" === t.tagName.toLowerCase() ? "mousedown" : "click"
    }, t.prototype.focus = function(t) {
        var e;
        o && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type && "month" !== t.type && "email" !== t.type ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus()
    }, t.prototype.updateScrollParent = function(t) {
        var e, n;
        if (!(e = t.fastClickScrollParent) || !e.contains(t)) {
            n = t;
            do {
                if (n.scrollHeight > n.offsetHeight) {
                    e = n, t.fastClickScrollParent = n;
                    break
                }
                n = n.parentElement
            } while (n)
        }
        e && (e.fastClickLastScrollTop = e.scrollTop)
    }, t.prototype.getTargetElementFromEventTarget = function(t) {
        return t.nodeType === Node.TEXT_NODE ? t.parentNode : t
    }, t.prototype.onTouchStart = function(t) {
        var e, n, r;
        if (t.targetTouches.length > 1) return !0;
        if (e = this.getTargetElementFromEventTarget(t.target), n = t.targetTouches[0], o) {
            if ((r = window.getSelection()).rangeCount && !r.isCollapsed) return !0;
            if (!i) {
                if (n.identifier && n.identifier === this.lastTouchIdentifier) return t.preventDefault(), !1;
                this.lastTouchIdentifier = n.identifier, this.updateScrollParent(e)
            }
        }
        return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = n.pageX, this.touchStartY = n.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), !0
    }, t.prototype.touchHasMoved = function(t) {
        var e = t.changedTouches[0],
            n = this.touchBoundary;
        return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n
    }, t.prototype.onTouchMove = function(t) {
        return !this.trackingClick || ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, this.targetElement = null), !0)
    }, t.prototype.findControl = function(t) {
        return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    }, t.prototype.onTouchEnd = function(t) {
        var e, a, c, s, u, l = this.targetElement;
        if (!this.trackingClick) return !0;
        if (t.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
        if (t.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
        if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, a = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, r && (u = t.changedTouches[0], (l = document.elementFromPoint(u.pageX - window.pageXOffset, u.pageY - window.pageYOffset) || l).fastClickScrollParent = this.targetElement.fastClickScrollParent), "label" === (c = l.tagName.toLowerCase())) {
            if (e = this.findControl(l)) {
                if (this.focus(l), n) return !1;
                l = e
            }
        } else if (this.needsFocus(l)) return t.timeStamp - a > 100 || o && window.top !== window && "input" === c ? (this.targetElement = null, !1) : (this.focus(l), this.sendClick(l, t), o && "select" === c || (this.targetElement = null, t.preventDefault()), !1);
        return !(!o || i || !(s = l.fastClickScrollParent) || s.fastClickLastScrollTop === s.scrollTop) || (this.needsClick(l) || (t.preventDefault(), this.sendClick(l, t)), !1)
    }, t.prototype.onTouchCancel = function() {
        this.trackingClick = !1, this.targetElement = null
    }, t.prototype.onMouse = function(t) {
        return !this.targetElement || (!!t.forwardedTouchEvent || (!t.cancelable || (!(!this.needsClick(this.targetElement) || this.cancelNextClick) || (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1))))
    }, t.prototype.onClick = function(t) {
        var e;
        return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail || ((e = this.onMouse(t)) || (this.targetElement = null), e)
    }, t.prototype.destroy = function() {
        var t = this.layer;
        n && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1)
    }, t.notNeeded = function(t) {
        var e, o, i;
        if (void 0 === window.ontouchstart) return !0;
        if (o = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
            if (!n) return !0;
            if (e = document.querySelector("meta[name=viewport]")) {
                if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
                if (o > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
            }
        }
        if (a && (i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/))[1] >= 10 && i[2] >= 3 && (e = document.querySelector("meta[name=viewport]"))) {
            if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
            if (document.documentElement.scrollWidth <= window.outerWidth) return !0
        }
        return "none" === t.style.msTouchAction || "manipulation" === t.style.touchAction || (!!(+(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1] >= 27 && (e = document.querySelector("meta[name=viewport]")) && (-1 !== e.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) || ("none" === t.style.touchAction || "manipulation" === t.style.touchAction))
    }, t.attach = function(e, n) {
        return new t(e, n)
    }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
        return t
    }) : "undefined" != typeof module && module.exports ? (module.exports = t.attach, module.exports.FastClick = t) : window.FastClick = t
}();
// this game is based on the excellent pseudo-3d calculations of codeincomplete.com
// https://codeincomplete.com/posts/javascript-racer/
// we modified huge parts of the code, made it more reusable and
// tweaked/optimized a few bits.
//=========================================================================
// minimalist DOM helpers
//=========================================================================
function animateFOV(target, duration) {
  var start = racr.params.fieldOfView;
  var end = target;
  var startTime = null;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    var progress = Math.min((timestamp - startTime) / duration, 1);
    racr.params.fieldOfView = Math.round(start + (end - start) * progress);
    racr.params.cameraDepth = 1 / Math.tan((racr.params.fieldOfView / 2) * Math.PI / 180);
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}

var assetPath = 'sounds/';

var SONG_LIBRARY = [];
var currentSong = null;
var shuffledPlaylist = [];
var shufflePosition = 0;
var playlistPath = assetPath + 'playlist/'; // Add this line for playlist folder

function buildSongLibrary() {
  // Load playlist.txt from sounds/playlist/ folder
  fetch(playlistPath + 'playlist.txt')
    .then(function(response) {
      return response.text();
    })
    .then(function(data) {
      var files = data.split('\n');
      for (var i = 0; i < files.length; i++) {
        var filename = files[i].trim();
        if (filename && (filename.indexOf('.opus') > -1 || filename.indexOf('.mp3') > -1 || filename.indexOf('.m4a') > -1)) {
          var parts = filename.split(';');
          var file = parts[0].trim();
          var bpm = parseInt(parts[1]) || 0;
          var name = file
            .replace('.opus', '')
            .replace('.mp3', '')
            .replace('.m4a', '')
            .replace(/_/g, ' ')
            .replace(/-/g, ' ');
          name = name.replace(/\b\w/g, function(l) { return l.toUpperCase(); });
          
          SONG_LIBRARY.push({
            file: file,
            name: name,
            bpm: bpm
          });
        }
      }
      console.log('Loaded ' + SONG_LIBRARY.length + ' songs from playlist');
      shuffledPlaylist = createShuffledPlaylist();
    })
    .catch(function() {
      console.log('playlist.txt not found, using fallback songs');
      SONG_LIBRARY = [
        { file: 'CRYOUT.opus', name: 'Cry Out' },
        { file: 'LUXURY.opus', name: 'Luxury' }
      ];
      shuffledPlaylist = createShuffledPlaylist();
    });
}

function createShuffledPlaylist() {
  var playlist = [];
  for (var i = 0; i < SONG_LIBRARY.length; i++) {
    playlist.push(i);
  }
  for (var i = playlist.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = playlist[i];
    playlist[i] = playlist[j];
    playlist[j] = temp;
  }
  return playlist;
}

buildSongLibrary();

function playSong() {
  if (currentSong) {
    currentSong.unload();
  }
  
  if (SONG_LIBRARY.length === 0) {
    setTimeout(function() { playSong(); }, 1000);
    return;
  }
  
  if (shufflePosition >= shuffledPlaylist.length) {
    shuffledPlaylist = createShuffledPlaylist();
    shufflePosition = 0;
  }
  
  var songIndex = shuffledPlaylist[shufflePosition];
  shufflePosition++;
  
  var song = SONG_LIBRARY[songIndex];
  console.log('Now playing: ' + song.name);
  
  currentSong = new Howl({
    src: [playlistPath + song.file], // Use playlistPath here
    html5: true,
    preload: true,
    onend: function() {
      playSong();
    },
    onloaderror: function() {
      console.log('Failed to load: ' + song.file + ' - skipping...');
      setTimeout(function() {
        playSong();
      }, 500);
    }
  });

  currentSong._bpm = song.bpm;
  
  currentSong.play();
}

var soundLoaded = 0;
var sound = {
    overtake: new Howl({
    src: [assetPath + 'overtake.wav'],
    volume: 0.3,
    onload: function() { soundLoaded++; }
  }),
  overtake_2: new Howl({
    src: [assetPath + 'overtake_2.wav'],
    volume: 0.3,
    onload: function() { soundLoaded++; }
  }),
  countdown: new Howl({
    src: [assetPath + 'countdown.wav'],
    volume: 0.4,
    onload: function() { soundLoaded++; }
  }),
  collect: new Howl({
    src: [assetPath + 'sonic_sound.wav'],
    volume: 0.3,
    onload: function() { soundLoaded++; }
  }),
  hit: new Howl({
    src: [assetPath + 'crash_sound.wav'],
    html5: true,
    volume: 0.3,
    onload: function() { soundLoaded++; }
  }),
  music: new Howl({
    src: [playlistPath + 'ON CAMERA.opus'],
    html5: true,
    loop: true,
    onload: function() { soundLoaded++; }
  }),
  engine: {
    eng: [
      new Howl({ src: [assetPath + 'engine/car_11_eng_mb_ee_00.wav'], html5: true, loop: true, volume: 0, onload: function() { soundLoaded++; } }),
      new Howl({ src: [assetPath + 'engine/car_11_eng_mb_ee_01.wav'], html5: true, loop: true, volume: 0, onload: function() { soundLoaded++; } }),
      new Howl({ src: [assetPath + 'engine/car_11_eng_mb_ee_02.wav'], html5: true, loop: true, volume: 0, onload: function() { soundLoaded++; } }),
      new Howl({ src: [assetPath + 'engine/car_11_eng_mb_ee_03.wav'], html5: true, loop: true, volume: 0, onload: function() { soundLoaded++; } }),
      new Howl({ src: [assetPath + 'engine/car_11_eng_mb_ee_04.wav'], html5: true, loop: true, volume: 0, onload: function() { soundLoaded++; } }),
      new Howl({ src: [assetPath + 'engine/car_11_eng_mb_ee_05.wav'], html5: true, loop: true, volume: 0, onload: function() { soundLoaded++; } }),
      new Howl({ src: [assetPath + 'engine/car_11_eng_mb_ee_06.wav'], html5: true, loop: true, volume: 0, onload: function() { soundLoaded++; } }),
      new Howl({ src: [assetPath + 'engine/car_11_eng_mb_ee_07.wav'], html5: true, loop: true, volume: 0, onload: function() { soundLoaded++; } })
    ],
    exh: [
      new Howl({ src: [assetPath + 'engine/car_11_exh_mb_ee_00.wav'], html5: true, loop: true, volume: 0, onload: function() { soundLoaded++; } }),
      new Howl({ src: [assetPath + 'engine/car_11_exh_mb_ee_01.wav'], html5: true, loop: true, volume: 0, onload: function() { soundLoaded++; } }),
      new Howl({ src: [assetPath + 'engine/car_11_exh_mb_ee_02.wav'], html5: true, loop: true, volume: 0, onload: function() { soundLoaded++; } }),
      new Howl({ src: [assetPath + 'engine/car_11_exh_mb_ee_03.wav'], html5: true, loop: true, volume: 0, onload: function() { soundLoaded++; } }),
      new Howl({ src: [assetPath + 'engine/car_11_exh_mb_ee_04.wav'], html5: true, loop: true, volume: 0, onload: function() { soundLoaded++; } }),
      new Howl({ src: [assetPath + 'engine/car_11_exh_mb_ee_05.wav'], html5: true, loop: true, volume: 0, onload: function() { soundLoaded++; } }),
      new Howl({ src: [assetPath + 'engine/car_11_exh_mb_ee_06.wav'], html5: true, loop: true, volume: 0, onload: function() { soundLoaded++; } }),
      new Howl({ src: [assetPath + 'engine/car_11+90_exh_mb_ee_07.wav'], html5: true, loop: true, volume: 0, onload: function() { soundLoaded++; } })
    ],
    currentLevel: 0,
    playing: false
  },

  skid: new Howl({
    src: [assetPath + 'skid.mp3'],
    html5: true,
    volume: 0.3,
    onload: function() { soundLoaded++; }
  }),
  nitro: new Howl({
    src: ['sounds/nitro.wav'],
    html5: true,
    volume: 0.5,
    onload: function() { soundLoaded++; }
  }),
  hover: new Howl({
    src: [assetPath + 'hover.wav'],
    volume: 0.4,
    onload: function() { soundLoaded++; }
  }),
  click: new Howl({
    src: [assetPath + 'click.wav'],
    volume: 0.4,
    onload: function() { soundLoaded++; }
  }),
  select: new Howl({
    src: [assetPath + 'select.wav'],
    volume: 0.4,
    onload: function() { soundLoaded++; }
  }),

  wind: [
    new Howl({ src: [assetPath + 'ambient/wind_00_mb_00.wav'], html5: true, loop: true, volume: 0, onload: function() { soundLoaded++; } }),
    new Howl({ src: [assetPath + 'ambient/wind_00_mb_01.wav'], html5: true, loop: true, volume: 0, onload: function() { soundLoaded++; } }),
    new Howl({ src: [assetPath + 'ambient/wind_00_mb_02.wav'], html5: true, loop: true, volume: 0, onload: function() { soundLoaded++; } }),
    new Howl({ src: [assetPath + 'ambient/wind_00_mb_03.wav'], html5: true, loop: true, volume: 0, onload: function() { soundLoaded++; } })
  ],


  // gameOver: new Howl({
  //   src: [assetPath + 'audio/amgdtm/retrogame/gameOver.mp3', assetPath + 'audio/amgdtm/retrogame/gameOver.ogg'],
  //   onload: function() { soundLoaded++; }
  // }),
  // beep: new Howl({
  //   src: [assetPath + 'audio/amgdtm/retrogame/beep.mp3'],
  //   onload: function() { soundLoaded++; }
  // }),
  // countIn: new Howl({
  //   src: [assetPath + 'audio/amgdtm/retrogame/countin.mp3'],
  //   sprite: {
  //     count: [0, 900],
  //     go: [4000, 1000]
  //   },
  //   onload: function() { soundLoaded++; }
  // })
};

var totalSounds = 0;
function countSounds(obj) {
  for (var key in obj) {
    if (obj[key] && obj[key]._src) {
      totalSounds++;
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      countSounds(obj[key]);
    }
  }
}
countSounds(sound);


var preloaded = false;

//=========================================================================
// general purpose helpers (mostly math)
//=========================================================================

var Util = {

  timestamp:        function()                  { return new Date().getTime();                                    },
  toInt:            function(obj, def)          { if (obj !== null) { var x = parseInt(obj, 10); if (!isNaN(x)) return x; } return Util.toInt(def, 0); },
  toFloat:          function(obj, def)          { if (obj !== null) { var x = parseFloat(obj);   if (!isNaN(x)) return x; } return Util.toFloat(def, 0.0); },
  limit:            function(value, min, max)   { return Math.max(min, Math.min(value, max));                     },
  randomInt:        function(min, max)          { return Math.round(Util.interpolate(min, max, Math.random()));   },
  randomChoice:     function(options)           { return options[Util.randomInt(0, options.length-1)];            },
  percentRemaining: function(n, total)          { return (n%total)/total;                                         },
  accelerate:       function(v, accel, dt)      { return v + (accel * dt);                                        },
  interpolate:      function(a,b,percent)       { return a + (b-a)*percent                                        },
  easeIn:           function(a,b,percent)       { return a + (b-a)*Math.pow(percent,2);                           },
  easeOut:          function(a,b,percent)       { return a + (b-a)*(1-Math.pow(1-percent,2));                     },
  easeInOut:        function(a,b,percent)       { return a + (b-a)*((-Math.cos(percent*Math.PI)/2) + 0.5);        },
  exponentialFog:   function(distance, density) { return 1 / (Math.pow(Math.E, (distance * distance * density))); },

  increase:  function(start, increment, max, isRacr) { // with looping
    var result = start + increment;
    while (result >= max) {
      result -= max;
      if (isRacr) {
        racr.resetStars();
      }
    }
    while (result < 0)
      result += max;
    return result;
  },

  project: function(p, cameraX, cameraY, cameraZ, cameraDepth, width, height, roadWidth) {
    p.camera.x     = (p.world.x || 0) - cameraX;
    p.camera.y     = (p.world.y || 0) - cameraY;
    p.camera.z     = (p.world.z || 0) - cameraZ;
    p.screen.scale = cameraDepth/p.camera.z;
    p.screen.x     = Math.round((width/2)  + (p.screen.scale * p.camera.x  * width/2));
    p.screen.y     = Math.round((height/2) - (p.screen.scale * p.camera.y  * height/2));
    p.screen.w     = Math.round(             (p.screen.scale * roadWidth   * width/2));
  },

  overlap: function(x1, w1, x2, w2, percent) {
    var half = (percent || 1)/2;
    var min1 = x1 - (w1*half);
    var max1 = x1 + (w1*half);
    var min2 = x2 - (w2*half);
    var max2 = x2 + (w2*half);
    return ! ((max1 < min2) || (min1 > max2));
  },

  getX: function(startX, angle, distance) {
    return startX + (distance * Math.cos(angle));
  },
  getY: function(startY, angle, distance) {
    return startY + (distance * Math.sin(angle));
  }
};

//=========================================================================
// POLYFILL for requestAnimationFrame
//=========================================================================

if (!window.requestAnimationFrame) { // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback, element) {
      window.setTimeout(callback, 1000 / 60);
    }
}

//=========================================================================
// GAME LOOP helpers
//=========================================================================

var Game = {  // a modified version of the game loop from my previous boulderdash game - see http://codeincomplete.com/posts/2011/10/25/javascript_boulderdash/#gameloop

  stop: false,

  run: function(options) {

    Game.loadImages(options.images, function(images) {

      options.ready(images); // tell caller to initialize itself because images are loaded and we're ready to rumble

      var canvas = options.canvas,    // canvas render target is provided by caller
        update = options.update,    // method to update game logic is provided by caller
        render = options.render,    // method to render the game is provided by caller
        step   = options.step,      // fixed frame step (1/fps) is specified by caller
        now    = null,
        last   = Util.timestamp(),
        dt     = 0,
        gdt    = 0;

      function frame() {
        if (!Game.stop) {
          now = Util.timestamp();
          dt  = Math.min(1, (now - last) / 1000); // using requestAnimationFrame have to be able to handle large delta's caused when it 'hibernates' in a background or non-visible tab
          gdt = gdt + dt;
          while (gdt > step) {
            gdt = gdt - step;
            update(step);
          }
          render();
          last = now;
        }
        requestAnimationFrame(frame, canvas);
      }

      frame(); // lets get this party started
    });
  },

  //---------------------------------------------------------------------------

  loadImages: function(names, callback) { // load multiple images and callback when ALL images have loaded
    var result = [];
    var count  = names.length;

    var onload = function() {
      if (--count == 0)
        callback(result);
    };

    for(var n = 0 ; n < names.length ; n++) {
      var name = names[n];
      result[n] = new Image();
      result[n].onload = onload;
      if (name == 'background') {
        result[n].src = 'backgrounds/background_03.png';
      } else if (name == 'background1') {
        result[n].src = 'backgrounds/background_01.png';
      } else if (name == 'background2') {
        result[n].src = 'backgrounds/background_02.png';
      } else if (name == 'background3') {
        result[n].src = 'backgrounds/background_03.png';
      } else if (name == 'spritesheet') {
        result[n].src = 'spritesheet_v4.png';
      } else if (name == 'backgroundTrip') {
        result[n].src = 'backgrounds/background_v3.png';
      } else if (name == 'spin_sprites') {
        result[n].src = 'spin_sprites.png';
      } else if (name == 'player_straight') {
        result[n].src = 'cars/player_straight.png';
      } else if (name == 'player_left') {
        result[n].src = 'cars/player_left.png';
      } else if (name == 'player_farleft') {
        result[n].src = 'cars/player_farleft.png';
      } else if (name == 'player_right') {
        result[n].src = 'cars/player_right.png';
      } else if (name == 'player_farright') {
        result[n].src = 'cars/player_farright.png';
      } else if (name == 'rennteam_straight') {
        result[n].src = 'cars/traffic/rennteam_straight.png';
      } else if (name == 'rennteam_left') {
        result[n].src = 'cars/traffic/rennteam_left.png';
      } else if (name == 'rennteam_farleft') {
        result[n].src = 'cars/traffic/rennteam_farleft.png';
      } else if (name == 'rennteam_right') {
        result[n].src = 'cars/traffic/rennteam_right.png';
      } else if (name == 'rennteam_farright') {
        result[n].src = 'cars/traffic/rennteam_farright.png';
      } else if (name == 'tum_straight') {
        result[n].src = 'cars/traffic/tum_straight.png';
      } else if (name == 'tum_left') {
        result[n].src = 'cars/traffic/tum_left.png';
      } else if (name == 'tum_farleft') {
        result[n].src = 'cars/traffic/tum_farleft.png';
      } else if (name == 'tum_right') {
        result[n].src = 'cars/traffic/tum_right.png';
      } else if (name == 'tum_farright') {
        result[n].src = 'cars/traffic/tum_farright.png';
      } else if (name == 'delft_straight') {
        result[n].src = 'cars/traffic/delft_straight.png';
      } else if (name == 'delft_left') {
        result[n].src = 'cars/traffic/delft_left.png';
      } else if (name == 'delft_farleft') {
        result[n].src = 'cars/traffic/delft_farleft.png';
      } else if (name == 'delft_right') {
        result[n].src = 'cars/traffic/delft_right.png';
      } else if (name == 'delft_farright') {
        result[n].src = 'cars/traffic/delft_farright.png';
      } else if (name == 'tue_straight') {
        result[n].src = 'cars/traffic/tue_straight.png';
      } else if (name == 'tue_left') {
        result[n].src = 'cars/traffic/tue_left.png';
      } else if (name == 'tue_farleft') {
        result[n].src = 'cars/traffic/tue_farleft.png';
      } else if (name == 'tue_right') {
        result[n].src = 'cars/traffic/tue_right.png';
      } else if (name == 'tue_farright') {
        result[n].src = 'cars/traffic/tue_farright.png';
      } else {
        result[n].src = assetPath + 'images/amgdtm/retrogame/' + name + '.png';
      }

    }
  },
  //---------------------------------------------------------------------------

// REPLACE playMusic:
  playMusic: function() {
    if (currentSong && !currentSong.playing()) {
      currentSong.play();
      return;
    }
    if (currentSong && currentSong.playing()) {
      currentSong.stop();
    }
    playSong();
  },

  pauseMusic: function() {
    if (currentSong && currentSong.playing()) {
      currentSong.pause();
    }
  },

  toggleBounce: function() {
    racr.params.bounceEnabled = !racr.params.bounceEnabled;
  },

  stopMusic: function() {
    if (currentSong) {
      currentSong.stop();
      currentSong = null;
    }
  },

// REPLACE playNextSong:
  playNextSong: function() {
    if (currentSong && currentSong.playing()) {
      currentSong.stop();
    }
    playSong();
  },

// REPLACE playLastSong:
  playLastSong: function() {
    if (currentSong && currentSong.playing()) {
      currentSong.stop();
    }
    playSong();
  }

};

//=========================================================================
// canvas rendering helpers
//=========================================================================

var Render = {

  polygon: function(ctx, x1, y1, x2, y2, x3, y3, x4, y4, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    ctx.fill();
  },

  //---------------------------------------------------------------------------

  segment: function(ctx, width, lanes, x1, y1, w1, x2, y2, w2, fog, color, n, curve) {

    var r1 = Render.rumbleWidth(w1, lanes),
      r2 = Render.rumbleWidth(w2, lanes),
      l1 = Render.laneMarkerWidth(w1, lanes),
      l2 = Render.laneMarkerWidth(w2, lanes),
      lanew1, lanew2, lanex1, lanex2, lane;

    ctx.fillStyle = color.grass;
    ctx.fillRect(0, y2, width, y1 - y2);

    var borderLeft = color.rumble;
    var borderRight = color.rumble;

    Render.polygon(ctx, x1-w1-r1, y1, x1-w1, y1, x2-w2, y2, x2-w2-r2, y2, borderLeft);
    Render.polygon(ctx, x1+w1+r1, y1, x1+w1, y1, x2+w2, y2, x2+w2+r2, y2, borderRight);
    Render.polygon(ctx, x1-w1,    y1, x1+w1, y1, x2+w2, y2, x2-w2,    y2, color.road);

    if (color.lane) {
      lanew1 = w1*2/lanes;
      lanew2 = w2*2/lanes;
      lanex1 = x1 - w1 + lanew1;
      lanex2 = x2 - w2 + lanew2;
      for(lane = 1 ; lane < lanes ; lanex1 += lanew1, lanex2 += lanew2, lane++) {
        Render.polygon(ctx, lanex1 - l1/2, y1, lanex1 + l1/2, y1, lanex2 + l2/2, y2, lanex2 - l2/2, y2, color.lane);
        if (lane === 1) {
          // console.log(lane, y1, lanex2 - l2/2, lanex2 + l2/2, n);
        }
      }
    }

    Render.fog(ctx, 0, y1, width, y2-y1, fog);
  },

  //---------------------------------------------------------------------------

  background: function(ctx, background, width, height, layer, rotation, offset, opacity) {
    rotation = rotation || 0;
    offset   = offset   || 0;

    var imageW = layer.w/2;
    var imageH = layer.h;

    var sourceX = layer.x + Math.floor(layer.w * rotation);
    var sourceY = layer.y
    var sourceW = Math.min(imageW, layer.x+layer.w-sourceX);
    var sourceH = imageH;

    var destX = 0;
    var destY = offset;
    var destW = Math.floor(width * (sourceW/imageW));
    var destH = height;

    ctx.globalAlpha = opacity;
    ctx.drawImage(background, sourceX, sourceY, sourceW, sourceH, destX, destY, destW, destH);
    if (sourceW < imageW)
      ctx.drawImage(background, layer.x, sourceY, imageW-sourceW, sourceH, destW-1, destY, width-destW, destH);
    
    ctx.globalAlpha = 1;
  },

  calcSunPosition: function() {
    var ret = {
      ratio: racr.params.playerW / SPRITES.PLAYER_4.w,
      baseTop: 0,
      baseLeft: 0,
      r: 0,
      center: 0,
      distanceToCenter: 0,
      angle: 0,
      v1: 0,
      v2: 0
    };

    if (!ret.ratio) { return ret; }
    ret.baseTop = racr.params.height * .15;
    ret.r = 15 * ret.ratio;
    ret.center = racr.params.width/2;
    ret.baseLeft = ret.center * 1.4 + racr.params.sunOffset * -100;
    ret.distanceToCenter = 100 - (ret.baseLeft * 100 / ret.center);
    ret.v1 = { x: ret.baseLeft + ret.r, y: ret.baseTop + ret.r };
    ret.v2 = { x: racr.params.width - ret.baseLeft - ret.r, y: racr.params.height - ret.baseTop - ret.r };
    ret.angle = Math.atan2(ret.v2.y - ret.v1.y, ret.v2.x - ret.v1.x);

    var a = ret.v1.x - ret.v2.x,
        b = ret.v1.y - ret.v2.y;
    ret.vDistance = Math.sqrt(a*a + b*b);

    return ret;
  },

  sun: function(ctx, width, height) {
    var params = Render.calcSunPosition();
    if (!params.ratio) { return; }

    ctx.beginPath();
    const moonImage = new Image();
    moonImage.src = "";

    ctx.drawImage(moonImage, params.baseLeft + params.r, params.baseTop - params.r, 2 * params.r, 2 * params.r);

    ctx.closePath();

    // +left, +top, radius multiply -> arc
    // left percent radius from center, +top, radius as width -> rect
    var dots = [
      [40, 40, 1, true, .05],
      [15, 15, 1, true, .03],
      [-2, -2, 1, true, .1],
      [0, 0, 1, true, .05],
      [1, 1, 1, true, .05],
      [-2, -2, 1, true, .05],
      [-8, -8, 1, true, .05],
      [-10, -10, 1, true, .1],
      [-14, -14, 1, true, .3]
    ];
    // Render.drawSunParts(ctx, params, dots);
  },

  finishLine: function (ctx, width, height) {
    var params = Render.calcSunPosition();
    if (!params.ratio) { return; }

    const finishLineImage = new Image();
    finishLineImage.src = "finishline.gif";

    ctx.beginPath();
    ctx.drawImage(finishLineImage, params.center - width / 10, params.baseTop, width / 5, height * 0.4);
    ctx.closePath();
  },

  //---------------------------------------------------------------------------

  sprite: function(ctx, width, height, resolution, roadWidth, sprites, sprite, scale, destX, destY, offsetX, offsetY, clipY, isPlayer, segment, spriteName) {

    //  scale for projection AND relative to roadWidth (for tweakUI)
    var destW  = (sprite.w * scale * width/2) * (SPRITES.SCALE * roadWidth);
    var destH  = (sprite.h * scale * width/2) * (SPRITES.SCALE * roadWidth);

    destX = destX + (destW * (offsetX || 0));
    destY = destY + (destH * (offsetY || 0));

    // baseline of sprite?
    if ('b' in sprite) {
      destY += (sprite.h - sprite.b) * SPRITES.SCALE;
    }

    if (isPlayer) {
      racr.params.playerW = destW;
      racr.params.playerH = destH;
      var offCanvas = (height - destY) * (racr.params.playerOffcanvas/100);
      destY = destY + offCanvas;
    }

    var clipH = clipY ? Math.max(0, destY+destH-clipY) : 0;
    var alpha = 1, baseAlpha = 1;
    if (clipH < destH) {
      if (segment && 'fog' in segment) {
        alpha = segment.fog * 3;
        baseAlpha = segment.fog * 30;
        if (alpha < 1) {
          ctx.globalAlpha = alpha;
        }
      }
      ctx.drawImage(sprites, sprite.x, sprite.y, sprite.w, sprite.h - (sprite.h*clipH/destH), destX, destY, destW, destH - clipH);
      if (segment && 'fog' in sprite) {
        alpha = 1 - (segment.fog * 2);
        if (baseAlpha < 1) {
          alpha = baseAlpha;
        }
        if (alpha > 0) {
          ctx.globalAlpha = alpha;
          var ratioFog = sprite.fog.h / sprite.h;
          var clipFog = clipH*ratioFog/destH;
          ctx.drawImage(sprites, sprite.fog.x, sprite.fog.y, sprite.fog.w, sprite.fog.h - clipFog, destX, destY, destW, destH - clipH);
        }
      }
      ctx.globalAlpha = 1;
    }

  },

  //---------------------------------------------------------------------------

  player: function(ctx, width, height, resolution, roadWidth, sprites, speedPercent, scale, destX, destY, steer, updown, curve) {
    var carImage;
    var steerAmount = Math.round(racr.params.steerAmount);
    
    var carSet = racr.playerCars[racr.params.playerCar];
    if (!carSet) carSet = racr.playerCars['KARACEING'];
    
    if (racr.params.controlMode === 'sim') {
      if (steerAmount < 0) { carImage = steerAmount <= -2 ? carSet.farleft : carSet.left; }
      else if (steerAmount > 0) { carImage = steerAmount >= 2 ? carSet.farright : carSet.right; }
      else { carImage = carSet.straight; }
    } else {
      if (steer < 0) { carImage = steerAmount >= 2 ? carSet.farleft : carSet.left; }
      else if (steer > 0) { carImage = steerAmount >= 2 ? carSet.farright : carSet.right; }
      else if (curve < -3) { carImage = carSet.farleft; }
      else if (curve > 3) { carImage = carSet.farright; }
      else { carImage = carSet.straight; }
    }    
    if (!carImage) return;
    
    var PLAYER_BASE_HEIGHT = 240;
    var PLAYER_SCALE = 0.3 * (1/PLAYER_BASE_HEIGHT);
    var destH = (PLAYER_BASE_HEIGHT * scale * width/2) * (PLAYER_SCALE * roadWidth);
    var destW = destH * (carImage.width / carImage.height);
    
    destX = destX + (destW * -0.5);
    destY = destY + (destH * -1);
    
    racr.params.playerW = destW;
    racr.params.playerH = destH;
    
    var offCanvas = (height - destY) * (racr.params.playerOffcanvas/100);
    destY = destY + offCanvas;
    
    // Music bounce - squish down on beat like compressing a pillow
    var bounceAmount = 0;
    if (racr.params.bounceEnabled && currentSong && currentSong._bpm && currentSong._bpm > 0) {
      var beatInterval = 60 / currentSong._bpm;
      var beatPhase = (racr.params.currentLapTime % beatInterval) / beatInterval;
      // Sharp downward squish on beat, spring back between beats
      var raw = Math.sin(beatPhase * Math.PI * 2);
      // Invert so beat = squish down, between beats = normal
      bounceAmount = raw > 0 ? 0 : Math.pow(Math.abs(raw), 1.5) * 0.3;
    }
    
    ctx.save();
    ctx.translate(destX + destW/2, destY + destH * 0.85);
    ctx.scale(1 + bounceAmount * 0.3, 1 - bounceAmount);
    ctx.drawImage(carImage, -destW/2, -destH * 0.85, destW, destH);
    ctx.restore();
  },

  //---------------------------------------------------------------------------

  fog: function(ctx, x, y, width, height, fog) {
    if (fog < 1) {
      ctx.globalAlpha = (1-fog)
      ctx.fillStyle = COLORS.FOG;
      ctx.fillRect(x, y, width, height);
      ctx.globalAlpha = 1;
    }
  },

  rumbleWidth:     function(projectedRoadWidth, lanes) { return projectedRoadWidth/Math.max(6,  2*lanes); },
  laneMarkerWidth: function(projectedRoadWidth, lanes) { return projectedRoadWidth/Math.max(32, 8*lanes); },

  leftX: function (width, x1, y1, w1, x2, y2, w2) {
    // console.log(width, x1, y1, w1, x2, y2, w2);
    // helper.css({
    //   top: x1 + 'px',
    //   left: y1 + 'px',
    //   width: (x2 - x1) + 'px',
    //   height: (y2 - y1) + 'px'
    // });
  },

  centerX: function () {

  },

  rightX: function () {

  }

}

//=============================================================================
// RACING GAME CONSTANTS
//=============================================================================

var COLORS = {
  SKY:  '#0',
  TREE: '#0',
  FOG:  '#091b22',
  LIGHT:  { road: '#292929', grass: '#222222', rumble: '#FEE333', lane: '#ffffff'},
  DARK:   { road: '#292929', grass: '#111111', rumble: '#000000'},
  START:  { road: '#666', grass: '#666', rumble: '#1B3E4B'                     },
  FINISH: { road: '#0D303D', grass: '#0D303D', rumble: '#1B3E4B'                     }
};

var BACKGROUND = {
  HILLS: { x:   5, y:   5, w: 1280, h: 480 },
  SKY:   { x:   5, y: 495, w: 1280, h: 480 },
  TREES: { x:   5, y: 985, w: 1280, h: 480 }
};

var SPRITES = {
  // trees, vegetation
  DUMMY1:                 { x: 239, y: 410, w: 108, h: 203, fog: { x: 258, y: 710, w: 74, h: 149 }},
  DUMMY2:                 { x: 250, y: 623, w: 84, h: 242},
  DUMMY3:                 { x: 1071, y: 0, w: 79, h: 236},
  DUMMY4:                 { x: 1071, y: 242, w: 84, h: 236},
  DUMMY5:                 { x: 827, y: 401, w: 117, h: 212},
  DUMMY6:                 { x: 969, y: 394, w: 89, h: 226},
  DUMMY7:                 { x: 708, y: 401, w: 102, h: 217},

  MERCH1:                 { x: 606, y: 410, w: 96, h: 94},
  MERCH2:                 { x: 606, y: 519, w: 96, h: 94},

  TREE1:                  { x: 370, y: 425, w: 114, h: 198},
  TREE2:                  { x: 488, y: 401, w: 111, h: 212},

  // billboards
  BILLBOARD_PETRONAS:     { x: 12, y: 623, w: 227, h: 138 },
  BILLBOARD_REMUS:        { x: 6, y: 480, w: 227, h: 140 },
  BILLBOARD_SILBERPFEIL:  { x: 12, y: 761, w: 227, h: 141 },

  // elements
  TIRES:                  { x:  0,  y:  398,  w:   70,  h:   76 },
  STAR: [
    { x: 0,   y:  0,    w:  86,  h:   86 },
    { x: 86,  y:  0,    w:  86,  h:   86 },
    { x: 172, y:  0,    w:  86,  h:   86 },
    { x: 258, y:  0,    w:  86,  h:   86 },
    { x: 344, y:  0,    w:  86,  h:   86 },
    { x: 0,   y:  86,   w:  86,  h:   86 },
    { x: 86,  y:  86,   w:  86,  h:   86 },
    { x: 172, y:  86,   w:  86,  h:   86 },
    { x: 258, y:  86,   w:  86,  h:   86 },
    { x: 344, y:  86,   w:  86,  h:   86 },
    { x: 0,   y:  172,  w:  86,  h:   86 },
    { x: 86,  y:  172,  w:  86,  h:   86 },
    { x: 172, y:  172,  w:  86,  h:   86 },
    { x: 258, y:  172,  w:  86,  h:   86 },
    { x: 344, y:  172,  w:  86,  h:   86 },
    { x: 0,   y:  258,  w:  86,  h:   86 },
    { x: 86,  y:  258,  w:  86,  h:   86 },
    { x: 172, y:  258,  w:  86,  h:   86 }  
  ],

  // cars
  CARBLUE_FARLEFT:       { x: 264,  y: 0, w:   93, h:  66,   b: 45 },
  CARBLUE_LEFT:          { x: 368,  y: 0, w:   83,  h:  66,  b: 45 },
  CARBLUE:               { x: 461,  y: 0, w:   77,  h:   66,  b: 45 },
  CARBLUE_STRAIGHT:      { x: 461,  y: 0, w:   77,  h:   66,  b: 45 },
  CARBLUE_RIGHT:         { x: 549,  y: 0, w:   83,  h:   62,  b: 45 },
  CARBLUE_FARRIGHT:      { x: 642,  y: 0, w:   93, h:   63,  b: 45 },

  // cars
  GWAGON:               { x: 480,  y: 70, w:   80,  h:   85,  b: 45 },
  GWAGON_STRAIGHT:      { x: 480,  y: 70, w:   80,  h:   85,  b: 45 },
  GWAGON_LEFT:          { x: 385,  y: 70, w:   92,  h:   85,  b: 45 },
  GWAGON_FARLEFT:       { x: 273,  y: 70, w:   104, h:   85,   b: 45 },
  GWAGON_RIGHT:         { x: 570,  y: 70, w:   92,  h:   85,  b: 45 },
  GWAGON_FARRIGHT:      { x: 667,  y: 70, w:   104, h:   85,  b: 45 },

  // cars
  BRINXTRUCK:           { x: 673, y: 895, w: 96, h: 96, b: 45},
  BRINXTRUCK_STRAIGHT:  { x: 673, y: 895, w: 96, h: 96, b: 45 },
  BRINXTRUCK_LEFT:      { x: 535, y: 895, w: 112, h: 98, b: 45},
  BRINXTRUCK_FARLEFT:   { x: 394, y: 895, w: 122, h: 98, b: 45},
  BRINXTRUCK_RIGHT:     { x: 795, y: 895, w: 110, h: 97, b: 45},
  BRINXTRUCK_FARRIGHT:  { x: 921, y: 895, w: 121, h: 97, b: 45},

  //cars
  TESTING_CAR_WHITE: { x: 725, y: 718, w: 85, h: 73},
  TESTING_CAR_WHITE_STRAIGHT: { x: 725, y: 718, w: 85, h: 73},
  TESTING_CAR_WHITE_LEFT: { x: 615, y: 718, w: 99, h: 73},
  TESTING_CAR_WHITE_FARLEFT: { x: 498, y: 718, w: 108, h: 73, b: 45},
  TESTING_CAR_WHITE_RIGHT: { x: 824, y: 717, w: 96, h: 73},
  TESTING_CAR_WHITE_FARRIGHT: { x: 930, y: 718, w: 106, h: 73, b: 45},

  // cars
  TESTING_CAR_RED : { x: 725, y: 805, w: 84, h: 74, b: 45},
  TESTING_CAR_RED_STRAIGHT: { x: 725, y: 805, w: 84, h: 74, b: 45},
  TESTING_CAR_RED_LEFT: { x: 615, y: 804, w: 99, h: 74, b: 45},
  TESTING_CAR_RED_FARLEFT: { x: 498, y: 810, w: 108, h: 68, b: 45},
  TESTING_CAR_RED_RIGHT: { x: 820, y: 804, w: 97, h: 74, b: 45},
  TESTING_CAR_RED_FARRIGHT: { x: 928, y: 804, w: 106, h: 74, b: 45},

  // cars
  TESTING_CAR_BLACK : { x: 725, y: 632, w: 85, h: 73, b: 45},
  TESTING_CAR_BLACK_STRAIGHT: { x: 725, y: 632, w: 85, h: 73, b: 45},
  TESTING_CAR_BLACK_LEFT: { x: 615, y: 632, w: 99, h: 73, b: 45},
  TESTING_CAR_BLACK_FARLEFT: { x: 498, y: 632, w: 108, h: 73, b: 45},
  TESTING_CAR_BLACK_RIGHT: { x: 821, y: 632, w: 95, h: 73, b: 45},
  TESTING_CAR_BLACK_FARRIGHT: { x: 928, y: 632, w: 108, h: 73, b: 45},

  // 0Ã‚Â° up
  PLAYER_1:           { x: 165, y: 159, w: 106, h: 69 },
  PLAYER_2:           { x: 292, y: 159, w: 92, h: 69 },
  PLAYER_3:           { x: 399, y: 159, w: 79, h: 69 },
  PLAYER_4:           { x: 492, y: 159, w: 74, h: 69 },
  PLAYER_5:           { x: 580, y: 159, w: 80, h: 69 },
  PLAYER_6:           { x: 673, y: 159, w: 92, h: 69 },
  PLAYER_7:           { x: 787, y: 159, w: 106, h: 69 },
  // 8Ã‚Â° up
  PLAYER_UP2_1:     { x: 167, y: 230, w: 104, h: 76, b: -10 }, // all -5, damit die rÃƒÂ¤der verschwinden
  PLAYER_UP2_2:     { x: 299, y: 230, w: 90, h: 76, b: -10 }, // all -5, damit die rÃƒÂ¤der verschwinden
  PLAYER_UP2_3:     { x: 404, y: 230, w: 79, h: 76, b: -10 }, // all -5, damit die rÃƒÂ¤der verschwinden
  PLAYER_UP2_4:    { x: 499, y: 230, w: 72, h: 76, b: -10 },
  PLAYER_UP2_5:    { x: 588, y: 230, w: 79, h: 76, b: -10 },
  PLAYER_UP2_6:    { x: 683, y: 230, w: 90, h: 76, b: -10 },
  PLAYER_UP2_7:    { x: 801, y: 230, w: 104, h: 76, b: -10 },
  // 4Ã‚Â° up
  PLAYER_UP_1:     { x: 165, y: 315, w: 106, h: 73, b: -5 }, // all -5, damit die rÃƒÂ¤der verschwinden
  PLAYER_UP_2:     { x: 298, y: 315, w: 91, h: 73, b: -5 }, // all -5, damit die rÃƒÂ¤der verschwinden
  PLAYER_UP_3:     { x: 404, y: 315, w: 79, h: 73, b: -5 }, // all -5, damit die rÃƒÂ¤der verschwinden
  PLAYER_UP_4:    { x: 498, y: 315, w: 74, h: 73, b: -5 },
  PLAYER_UP_5:    { x: 588, y: 315, w: 79, h: 73, b: -5 },
  PLAYER_UP_6:    { x: 682, y: 315, w: 91, h: 73, b: -5 },
  PLAYER_UP_7:    { x: 801, y: 315, w: 106, h: 73, b: -5 },


};

SPRITES.SCALE = 0.3 * (1/SPRITES.PLAYER_4.w) // the reference sprite width should be 1/3rd the (half-)roadWidth

SPRITES.BILLBOARDS = [SPRITES.BILLBOARD_PETRONAS, SPRITES.BILLBOARD_REMUS, SPRITES.BILLBOARD_SILBERPFEIL];
SPRITES.PLANTS     = [SPRITES.TREE1, SPRITES.TREE2];
SPRITES.DUMMIES = [SPRITES.DUMMY1, SPRITES.DUMMY2, SPRITES.DUMMY3, SPRITES.DUMMY4, SPRITES.DUMMY5, SPRITES.DUMMY6, SPRITES.DUMMY7];
SPRITES.CARS   = ['CARBLUE', 'GWAGON', 'BRINXTRUCK'];
SPRITES.MERCH = [SPRITES.MERCH1, SPRITES.MERCH2];

var racr = {
  dom: {},
  win: '',
  canvas: '',
  ctx: '',
  segments: [],
  cars: [],
  stars: [],
  particles: [],
  queryParams: {
    t: 0,
    name: '',
    email: ''
  },
  countdown: {},
  sprites: '',
  background: '',
  background1: '',
  background2: '',
  background3: '',
  backgroundTrip: '',
  params: {
    external: 'external' in window && 'notify' in window.external,
    fps: 120,                     // how many 'update' frames per second
    step: 1 / 120,                   // how long is each frame (in seconds)
    width: 1024,                    // logical canvas width
    height: 768,                     // logical canvas height
    centrifugal: 0,                       // centrifugal force multiplier when going around curves
    controlMode: 'arcade',               // 'arcade' or 'sim'
    simCentrifugal: 0.3,                 // mild drift on curves in sim mode
    arcadeCentrifugal: 0,                // no drift in arcade mode    
    skySpeed: 0.015,                   // background sky layer scroll speed when going around curve (or up hill)
    hillSpeed: 0.0007,                   // background hill layer scroll speed when going around curve (or up hill)
    treeSpeed: 0.0005,                   // background tree layer scroll speed when going around curve (or up hill)
    sunOffset: 0,                       // current sky scroll offset
    skyOffset: 0,                       // current sky scroll offset
    hillOffset: 0,                       // current hill scroll offset
    treeOffset: 0,                       // current tree scroll offset
    resolution: null,                    // scaling factor to provide resolution independence (computed)
    roadWidth: 2000,                    // actually half the roads width, easier math if the road spans from -roadWidth to +roadWidth
    segmentLength: 200,                     // length of a single segment
    rumbleLength: 3,                       // number of segments per red/white rumble strip
    trackLength: null,                    // z length of entire track (computed)
    lanes: 3,                       // number of lanes
    fieldOfView: 100,                     // angle (degrees) for field of view
    cameraHeight: window.width > 1000 ? window.width : 1000, // z height of camera
    targetCameraHeight: window.width > 700 ? window.width : 700, // z height of camera
    cameraDepth: null,                    // z distance camera is from screen (computed)
    drawDistance: 300,                     // number of segments to draw
    playerY: 0,
    playerX: 0,                       // player x offset from center of road (-1 to 1 to stay independent of roadWidth)
    playerZ: null,                    // player relative z distance from camera (computed)
    playerW: 0,
    playerH: 0,
    fogDensity: 5,                       // exponential fog density
    position: 0,                       // current camera Z position (add playerZ to get player's absolute Z position)
    speed: 0,                       // current speed
    nitro: 0,
    nitroRequirements: 30,
    nitroCollected: 0,
    starsCollectedLevel: 0,
    bounceEnabled: false,
    nitroAvailable: false,
    totalCars: {              // total number of cars on the road based on level
      1: 20,
      2: 40,
      3: 60
    },                      
    totalStars: 60,                      // number of collectable Stars
    currentLapTime: 0,                       // current lap time
    lastLapTime: null,                    // last lap time
    lapNumber: 1,
    steerLeft: false,
    steerRight: false,
    steerAmount: 0,
    laneChangeTime: 350,
    // maxRoundDurate: 60,                      // duration in second, a game can take longest
    secondsLeft: 0,
    boostIncrease: 0,                       // variable, that holds the increased speed
    latestSuccess: {
      time: 0,
      finished: 0,
    },                      // object with the latest finished game
    starsToWin: {
      1: 10,
      2: 25,
      3: 45
    },
    gameOver: false,
    gameStart: false,
    begin: false,
    beginAnimation: false,
    playerOffcanvas: 100, // percentage of player car off canvas - when canvas is resized, this value will be animated to 0
    start: false,
    keyLeft: false,
    keyRight: false,
    keyCenter: false,
    keyFaster: false,
    keySlower: false,
    volume: 1,
    music: 1,
    lastHitSound: 0, // avoid endless sounds
    lastSkidSound: 0, // avoid endless sounds
    controls: []
  },
  begin: function () {

      // racr.params.username = racr.dom.username.val();
      // racr.params.email = racr.dom.email.val();

      racr.params.controls = [];
      racr.params.beginAnimation = true;
      racr.dom.ampel.outer.addClass("view");

          // Start engine with crossfade system
      if (sound.engine && sound.engine.eng) {
        for (var i = 0; i < 8; i++) {
          sound.engine.eng[i].play();
          if (sound.engine.exh[i]) sound.engine.exh[i].play();
        }
        sound.engine.playing = true;
      }

      racr.params.waitingNextLevel = true;

      TweenLite.to($("html, body"), .5, {
        scrollTop: racr.racer.offset().top,
        onComplete: function() {
          var targetHeight = racr.params.width > 700 ? racr.params.width : 700
          TweenLite.to(racr.params, 2, {
            cameraHeight: targetHeight,
            playerOffcanvas: 0,
            onUpdate: function () {
              racr.params.playerZ = (targetHeight * racr.params.cameraDepth);
            }
          });
          TweenLite.to(racr.dom.description, 1, {
            marginTop: 0,
            onComplete: function() {
              $("#hud").removeClass("hideHud");
              racr.ampel();
              racr.params.begin = true;
              racr.params.beginAnimation = false;
            }
          });
        }
      });

      TweenLite.to(racr.dom.modal, .3, {
        opacity: 0,
        onComplete: function() {
          racr.dom.modal.css('display', 'none');
        }
      });

      Game.stop = false;

      racr.params.playerCar = racr.params.playerCar || 'KARACEING';

      // *** INITIALIZE RIVAL SYSTEM ***
      if (typeof RivalSystem !== 'undefined') {
        RivalSystem.init();
        console.log('Rival initialized: ' + RivalSystem.name);
      }
      // *** END RIVAL INIT ***

      // ... inside racr.begin(), after the game starts ...
      // Remove or comment out:
      // document.getElementById('bottom-home-navbar').style.display = 'flex';
      // ... existing code ...
  },
  replay: function () {
    
      racr.params.waitingNextLevel = true;
      racr.params.speed = 0;
      racr.params.position = 0;
      racr.params.playerZ = 0;
      racr.params.playerX = 0;
      racr.params.boostIncrease = 0;
      racr.params.secondsLeft = racr.params.maxRoundDurate;
      racr.reset({ segmentLength: racr.params.segmentLength });
      racr.params.begin = false;
      racr.params.beginAnimation = false;
      racr.params.gameStart = false;
          // Start engine for new lap
      if (sound.engine && sound.engine.eng) {
        for (var i = 0; i < 8; i++) {
          if (!sound.engine.eng[i].playing()) {
            sound.engine.eng[i].play();
            if (sound.engine.exh[i]) sound.engine.exh[i].play();
          }
        }
      }
      racr.updateHud('maxSpeed', 160);
      racr.params.keyFaster = false;
      racr.dom.ampel.lights.removeClass("on go");
      if (racr.params.gameOver === true) {
        racr.dom.modal.css('display', 'block');
        racr.dom.menu.removeClass('active');
        racr.params.nitroAvailable = false;
        racr.params.currentLapTime = 0;
        racr.params.start = false;
        racr.params.nitroCollected = 0;
        racr.params.starsCollectedLevel = 0;
        racr.params.lapNumber = 1;
        racr.updateHud('lap',"1");
        $("#nitrobutton").css("display", "none");
        racr.params.gameOver = false;
        racr.params.gameStart = false;
        racr.resetRoad();
        Game.stop = false;
        
        if (typeof RivalSystem !== 'undefined') {
          RivalSystem.reset();
        }  
        // *** RE-INITIALIZE RIVAL SYSTEM ***
        if (typeof RivalSystem !== 'undefined') {
          RivalSystem.init();
          console.log('Rival re-initialized for new game');
        }
        // *** END RIVAL INIT ***
        
      } else {
        racr.begin();
      }

      TweenLite.to(racr.dom.modal, .3, {
        opacity: 1,
        delay: .1
      });
      racr.depixelate();

  },
  resize: function () {
    racr.params.width = racr.win.innerWidth();
    racr.params.height = racr.win.innerHeight();
    racr.racer.width(racr.params.width);
    racr.params.parentWidth = racr.retrogame.width();
    racr.params.parentHeight = racr.racer.height();

    if (!racr.params.begin && !racr.params.beginAnimation) {
      var marginTop = ((racr.params.height - racr.dom.modal.height()) / 2 - 100) * -1;
      if (marginTop < -200) { marginTop = -200; }
      if (marginTop > 0) { marginTop = 0; }
      racr.dom.description.css('margin-top', marginTop);
    }

    // if (racr.params.height > racr.win.height() || racr.win.width() < 768) {
    //   racr.params.height = racr.win.height() * .9;
    // }

    var translateX = 0;
    translateX = (racr.params.width - racr.params.parentWidth)/2;

    racr.canvas.attr({
      width: racr.params.width + "px",
      height: racr.params.height + "px"
    }).css({
      width: racr.params.width + "px",
      height: racr.params.height + "px"
    });

    racr.racer.height(racr.params.height).width(racr.params.width).css({ transform: "translate(" + (-translateX) + "px, 0)" });

    racr.params.cameraHeight = racr.params.width > 700 ? racr.params.begin ? racr.params.width : racr.params.width * 2.5 : racr.params.begin ? 700 : 1400;
    racr.params.targetCameraHeight = racr.params.width > 700 ? racr.params.width : 700;
    racr.params.cameraDepth = .4;
    racr.reset({width: racr.params.width, height: racr.params.height});
    if (racr.params.begin) {

    }
  },
  init: function () {
    FastClick.attach(document.body);
    racr.win = $(window);
    racr.retrogame = $(".amgdtm-retrogame");
    racr.racer = racr.retrogame.find("#racer");
    racr.canvas = racr.retrogame.find("canvas");
    racr.ctx = racr.canvas.get(0).getContext('2d');

    racr.dom.modal = $("#retrogame-modal");
    racr.dom.description = $("#retrogame-description");
    racr.dom.hud = {
      outer: $("#hud"),
      currentLapTime: $("#current_lap_time_value"),
      currentLapTimeHighlight: $("#current_lap_time_highlight"),
      lap: $("#lap_value"),
      speed: $("#speed_value"),
      maxSpeed: $("#max_speed"),
      stars: $("#stars_left")
    };
    // racr.dom.username = $("#retrogame-username");
    // racr.dom.email = $("#retrogame-email");
    racr.dom.start = $("#retrogame-start");
    // racr.dom.agree = $("#retrogame-agree");
    racr.dom.menu = $("#menu");

    $('#retrogame-start').on('mouseenter', function() {
      sound.hover.play();
    });


    racr.dom.finishScreen = {
      totalScore: $("#total_score_value")
    };

    racr.dom.ampel = {
      outer: $("#ampel"),
      lights: $("#ampel > .light")
    };

    $('#user_form button[type="submit"]').on('mouseenter', function() {
      sound.hover.play();
    });

    var ls = localStorage.getItem('retrogame');
    // if (ls) {
    //   ls = JSON.parse(ls);
    //   racr.params.username = ls.username;
    //   racr.params.email = ls.email;
    //   if (racr.dom.username.length) {
    //     racr.dom.username.val(racr.params.username);
    //     racr.dom.email.val(racr.params.email);
    //   }
    // }

    racr.win.on("resize", racr.resize);
    racr.resize();

    racr.helper = $("#helper");

    // racr.getHighscore();

    $(window).on("keydown", function (e) {
      if (racr.params.begin) {
        if (racr.params.controlMode === 'sim') {
          if (e.keyCode === 37 || e.keyCode === 65) { e.stopPropagation(); e.preventDefault(); racr.params.keyLeft = true; }
          if (e.keyCode === 39 || e.keyCode === 68) { e.stopPropagation(); e.preventDefault(); racr.params.keyRight = true; }
          if (e.keyCode === 38 || e.keyCode === 87) { e.stopPropagation(); e.preventDefault(); racr.params.keyFaster = true; }
          if (e.keyCode === 40 || e.keyCode === 83) { e.stopPropagation(); e.preventDefault(); racr.params.keySlower = true; }
          if (e.keyCode === 32) { e.stopPropagation(); e.preventDefault(); racr.params.keySlower = true; }
        } else {
          if (e.keyCode === 37 || e.keyCode == 65) { e.stopPropagation(); racr.goTo('L'); }
          if (e.keyCode === 38 || e.keyCode == 83 || e.keyCode == 87) { e.stopPropagation(); racr.goTo('U'); }
          if (e.keyCode === 39 || e.keyCode == 68) { e.stopPropagation(); racr.goTo('R'); }
          if (e.keyCode === 32) { e.stopPropagation(); racr.goTo('N'); }
        }
      } else {
        var keyDom = $("[data-keycode=" + e.keyCode + "]");
        if (keyDom.length) { keyDom.addClass('highlight'); setTimeout(function() { keyDom.removeClass('highlight'); }, 10); }
      }
      if (e.keyCode === 16) { racr.activateNitrous(); }
      if (e.keyCode === 32) { racr.params.keySlower = true; }
      if (e.keyCode === 67) { e.stopPropagation(); e.preventDefault(); racr.toggleControlMode(); }
    });
    $(window).on("keyup", function (e) {
      if (racr.params.controlMode === 'sim') {
        if (e.keyCode === 37 || e.keyCode === 65) { e.stopPropagation(); e.preventDefault(); racr.params.keyLeft = false; }
        if (e.keyCode === 39 || e.keyCode === 68) { e.stopPropagation(); e.preventDefault(); racr.params.keyRight = false; }
        if (e.keyCode === 38 || e.keyCode === 87) { e.stopPropagation(); e.preventDefault(); racr.params.keyFaster = false; }
        if (e.keyCode === 40 || e.keyCode === 83) { e.stopPropagation(); e.preventDefault(); racr.params.keySlower = false; }
        if (e.keyCode === 32) { e.stopPropagation(); e.preventDefault(); racr.params.keySlower = false; }
      } else {
        if (e.keyCode === 32) { racr.params.keySlower = false; }
      }
    });
    var last = Date.now(), now = 0;
    racr.canvas.on("click", function (e) {
      if (!racr.params.begin && !racr.params.beginAnimation) {
        now = Date.now();
        if (now - last > 60) {
          racr.circleExplode(e.pageX, e.pageY - racr.canvas.offset().top);
          last = Date.now();
        }
      }
    });

    var touchControl = $(".touch-control");
    touchControl.on("click", function () {
      var t = $(this);
      touchControl.removeClass("view");
      t.addClass("view");
      setTimeout(function () {
        t.removeClass("view");
      }, 300);
      racr.goTo(t.data("control"));
    });

        // Team selection
    $('.team-option').on('click', function() {
      sound.select.play();
      $('.team-option').removeClass('selected');
      $(this).addClass('selected');
      racr.params.playerCar = $(this).data('team');
    }).on('mouseenter', function() {
      sound.hover.play();
    });

        // Select team button
    $('#select-team-btn').on('click', function() {
      sound.select.play();
      $('#main-menu').fadeOut(300, function() {
        $('#team-selection').fadeIn(300);
      });
    });

    var imagesLoaded = 0;
    var files = ['backgrounds/background_02.png',  'spritesheet_v4.png', 'backgrounds/background_v3.png'];
    $.each(files, function (i, t) {
      var img = new Image();
      img.onload = function () {
        imagesLoaded++;
      }
      img.src = t;
    });

    racr.getQueryParams();
    // if ('duration' in racr.queryParams) {
    //   racr.params.maxRoundDurate = racr.queryParams.duration;
    // }
    if (racr.queryParams.name) {
      $("#total_name").html(racr.queryParams.name);
    }
    if (racr.queryParams.name) {
      $("#total_email").html(racr.queryParams.email);
    }

    var preloadInterval = setInterval(function () {
      if (imagesLoaded == files.length && soundLoaded == totalSounds) {
        clearInterval(preloadInterval);
        Game.run({
          canvas: racr.canvas.get(0), render: racr.render, update: racr.update, step: racr.params.step,
          images: ["background", "background1", "background2", "background3", "spritesheet", "backgroundTrip", "spin_sprites", "player_straight", "player_left", "player_farleft", "player_right", "player_farright", "rennteam_straight", "rennteam_left", "rennteam_farleft", "rennteam_right", "rennteam_farright", "tum_straight", "tum_left", "tum_farleft", "tum_right", "tum_farright", "delft_straight", "delft_left", "delft_farleft", "delft_right", "delft_farright", "tue_straight", "tue_left", "tue_farleft", "tue_right", "tue_farright"],
          ready: function (images) {
            racr.background = images[0];
            racr.background1 = images[1];
            racr.background2 = images[2];
            racr.background3 = images[3];
            racr.sprites = images[4];
            racr.backgroundTrip = images[5];
            racr.starSprite = images[6];
            racr.playerStraight = images[7];
            racr.playerLeft = images[8];
            racr.playerFarleft = images[9];
            racr.playerRight = images[10];
            racr.playerFarright = images[11];
            racr.trafficImages = {};
            racr.trafficImages['RENNTEAM_STRAIGHT'] = images[12];
            racr.trafficImages['RENNTEAM_LEFT'] = images[13];
            racr.trafficImages['RENNTEAM_FARLEFT'] = images[14];
            racr.trafficImages['RENNTEAM_RIGHT'] = images[15];
            racr.trafficImages['RENNTEAM_FARRIGHT'] = images[16];
            racr.trafficImages['TUM_STRAIGHT'] = images[17];
            racr.trafficImages['TUM_LEFT'] = images[18];
            racr.trafficImages['TUM_FARLEFT'] = images[19];
            racr.trafficImages['TUM_RIGHT'] = images[20];
            racr.trafficImages['TUM_FARRIGHT'] = images[21];
            racr.trafficImages['DELFT_STRAIGHT'] = images[22];
            racr.trafficImages['DELFT_LEFT'] = images[23];
            racr.trafficImages['DELFT_FARLEFT'] = images[24];
            racr.trafficImages['DELFT_RIGHT'] = images[25];
            racr.trafficImages['DELFT_FARRIGHT'] = images[26];
            racr.trafficImages['TUE_STRAIGHT'] = images[27];
            racr.trafficImages['TUE_LEFT'] = images[28];
            racr.trafficImages['TUE_FARLEFT'] = images[29];
            racr.trafficImages['TUE_RIGHT'] = images[30];
            racr.trafficImages['TUE_FARRIGHT'] = images[31];
            
            racr.playerCars = {
              'KARACEING': {
                straight: racr.playerStraight,
                left: racr.playerLeft,
                farleft: racr.playerFarleft,
                right: racr.playerRight,
                farright: racr.playerFarright
              },
              'RENNTEAM': {
                straight: racr.trafficImages['RENNTEAM_STRAIGHT'],
                left: racr.trafficImages['RENNTEAM_LEFT'],
                farleft: racr.trafficImages['RENNTEAM_FARLEFT'],
                right: racr.trafficImages['RENNTEAM_RIGHT'],
                farright: racr.trafficImages['RENNTEAM_FARRIGHT']
              },
              'TUM': {
                straight: racr.trafficImages['TUM_STRAIGHT'],
                left: racr.trafficImages['TUM_LEFT'],
                farleft: racr.trafficImages['TUM_FARLEFT'],
                right: racr.trafficImages['TUM_RIGHT'],
                farright: racr.trafficImages['TUM_FARRIGHT']
              },
              'DELFT': {
                straight: racr.trafficImages['DELFT_STRAIGHT'],
                left: racr.trafficImages['DELFT_LEFT'],
                farleft: racr.trafficImages['DELFT_FARLEFT'],
                right: racr.trafficImages['DELFT_RIGHT'],
                farright: racr.trafficImages['DELFT_FARRIGHT']
              },
              'TUE': {
                straight: racr.trafficImages['TUE_STRAIGHT'],
                left: racr.trafficImages['TUE_LEFT'],
                farleft: racr.trafficImages['TUE_FARLEFT'],
                right: racr.trafficImages['TUE_RIGHT'],
                farright: racr.trafficImages['TUE_FARRIGHT']
              }
            };
            
            racr.reset();
            $("#preload").addClass("remove");
            racr.depixelate();
          }
        });
      }
    }, 100);
  },
  getHighscore: function () {
    racr.dom.highscore1 = $("#retrogame-highscore-1");
    if (racr.dom.highscore1.length) {
      $.ajax({
        url: racr.params.api + "highscore",
        success: function(r) {
          console.log(r);
          if ('ranking' in r) {
            racr.updateHighscore(r.ranking);
          }
        }
      });
    }
  },
  updateHighscore: function(ranking) {
    if (ranking) {
      var html = '';
      var html1 = '';
      var tbody1 = racr.dom.highscore1.find("tbody");
      $.each(ranking, function(i, entry) {
        if (i >= 10) { return false; }
        html = '<td>' + entry.i + '</td><td>' + entry.username + '</td><td>' + entry.points + '</td>';
        html1 += '<tr class="' + (i >= 5 ? 'hidden-sm hidden-md hidden-lg' : '') + '">' + html + '</tr>';
      });
      tbody1.html(html1);
    }
  },
  validateEmail: function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  startClick: function() {
    sound.click.play();

    // Start wind ambient with slow fade
    if (sound.wind && sound.wind.length) {
      for (var i = 0; i < 4; i++) {
        sound.wind[i].volume(0);
        sound.wind[i].play();
      }
      var windStart = Date.now();
      var windFade = setInterval(function() {
        var elapsed = (Date.now() - windStart) / 1000; // seconds
        var targetVol = Math.min(0.08, elapsed * 0.02); // takes ~4 seconds to reach 0.08
        sound.wind[0].volume(targetVol);
        if (elapsed > 4) clearInterval(windFade);
      }, 100);
    }
    
    // racr.dom.username.val(racr.dom.username.val().trim()).removeClass('error');
    // racr.dom.email.val(racr.dom.email.val().trim()).removeClass('error');
    // racr.dom.agree.removeClass('error');
    // var username = racr.dom.username.val();
    // var email = racr.dom.email.val();
    // if (username.length && (!email || (email.length && racr.validateEmail(email))) && racr.dom.agree.is(":checked")) {
      // sound.collect.play();
      // racr.params.username = username;
      // racr.params.email = email;
      // localStorage.setItem('retrogame', JSON.stringify({ username: racr.params.username, email: racr.params.email }));

      setTimeout(function() { Game.playMusic(); }, 500);
      racr.begin();

      $("#touch-input").addClass("mobile-show");
    // } else {
    //
    //   if (!username) {
    //     racr.dom.username.addClass('error');
    //   }
    //   if (email && !racr.validateEmail(email)) {
    //     racr.dom.email.addClass('error');
    //   }
    //   if (!racr.dom.agree.is(":checked")){
    //     racr.dom.agree.addClass('error');
    //   }
    //
    //   // shake
      // sound.hit.play();
      var duration = .1;
      var amount = 3;
      var base = -50;
      // console.log("translate(" + (base - amount) + "%, 0)");
      // TweenLite.to(racr.dom.modal, duration * 5, {
      //   transform: "translate(" + (base - amount) + "%, 0)",
      //   onComplete: function() {
      //     TweenLite.to(racr.dom.modal, duration, {
      //       transform: "translate(" + (base + amount) + "%, 0)",
      //       onComplete: function() {
      //         TweenLite.to(racr.dom.modal, duration, {
      //           transform: "translate(" + (base - amount) + "%, 0)",
      //           onComplete: function() {
      //             TweenLite.to(racr.dom.modal, duration, {
      //               transform: "translate(" + (base + amount) + "%, 0)",
      //               onComplete: function() {
      //                 TweenLite.to(racr.dom.modal, duration * 3, {
      //                   transform: "translate(" + (base) + "%, 0)"
      //                 });
      //               }
      //             });
      //           }
      //         });
      //       }
      //     })
      //   }
      // });
    // }
  },
  sound: function (key, play, spriteKey) {
    if (key in sound) {
      if (play && racr.params.volume > 0) {
        if (typeof spriteKey !== 'undefined') {
          sound[key].play(spriteKey);
        } else {
          sound[key].play();
        }
      }
      if (!play) {
        sound[key].pause();
      }
    }
  },
  goTo: function goTo(key) {
    if (!racr.params.gameStart || racr.params.gameOver || !racr.params.begin) {
      return false;
    }

    if (racr.params._laneTween) {
      racr.params._laneTween.kill();
    }
    racr.params.controls.push(key);
    
    var laneChangeSpeed = racr.params.speed / 10000;
    if (laneChangeSpeed < .2) {
      laneChangeSpeed = .2;
    }

    switch (key) {
      case 'L':
        if (racr.params.external) {
          window.external.notify(JSON.stringify({method: "Left"}));
        }
        racr.params.keyFaster = true;
        if (racr.params.playerX > -0.66) {
          racr.params.steerLeft = true;
        }
        var duration = racr.params.laneChangeTime * (racr.params.playerX === 0 ? 1 : 2) / laneChangeSpeed / 1000;
        if (racr.params.playerX > -0.66) {
          TweenLite.to(racr.params, duration / 2, {
            ease: Linear.none,
            steerAmount: racr.params.playerX > 0 ? 2 : 1,
            onComplete: function () {
              TweenLite.to(racr.params, duration / 2, {
                ease: Linear.easeNone,
                steerAmount: 0
              });
            }
          });
        }
        racr.params._laneTween = TweenLite.to(racr.params, duration, {
          playerX: -0.66,
          ease: Linear.easeNone,
          onStart: function () {
            racr.params.steerLeft = racr.params.playerX > -0.66;
            racr.params.steerRight = false;
            racr.playTireSkid();
          },
          onComplete: function () {
            racr.params.steerLeft = false;
            racr.params.steerRight = false;
          }
        });
        break;
      case 'U':
        if (racr.params.external) {
          window.external.notify(JSON.stringify({method: "Middle"}));
        }
        racr.params.keyFaster = true;
        var duration = racr.params.laneChangeTime / laneChangeSpeed / 1000;
        if (racr.params.playerX != 0) {
          TweenLite.to(racr.params, duration / 2, {
            ease: Linear.none,
            steerAmount: 1,
            onComplete: function () {
              TweenLite.to(racr.params, duration / 2, {
                ease: Linear.easeNone,
                steerAmount: 0
              });
            }
          });
        }
        racr.params._laneTween = TweenLite.to(racr.params, duration, {
          playerX: 0,
          ease: Linear.easeNone,
          onStart: function () {
            racr.params.steerLeft = racr.params.playerX > 0;
            racr.params.steerRight = racr.params.playerX < 0;
          },
          onComplete: function () {
            racr.params.steerLeft = false;
            racr.params.steerRight = false;
          }
        });
        break;
      case 'R':
        if (racr.params.external) {
          window.external.notify(JSON.stringify({method: "Right"}));
        }
        racr.params.keyFaster = true;
        var duration = racr.params.laneChangeTime * (racr.params.playerX === 0 ? 1 : 2) / laneChangeSpeed / 1000;
        if (racr.params.playerX < 0.66) {
          TweenLite.to(racr.params, duration / 2, {
            ease: Linear.none,
            steerAmount: racr.params.playerX < 0 ? 2 : 1,
            onComplete: function () {
              TweenLite.to(racr.params, duration / 2, {
                ease: Linear.easeNone,
                steerAmount: 0
              });
            }
          });
        }
        racr.params._laneTween = TweenLite.to(racr.params, duration, {
          playerX: 0.66,
          ease: Linear.easeNone,
          onStart: function () {
            racr.params.steerRight = racr.params.playerX < 0.66;
            racr.params.steerLeft = false;
            racr.playTireSkid();
          },
          onComplete: function () {
            racr.params.steerLeft = false;
            racr.params.steerRight = false;
          }
        });
        break;
      case 'N':
          if (racr.params.nitroAvailable) {
            if (racr.params.external) {
              window.external.notify(JSON.stringify({method: "NO2"}));
            }
            racr.params.nitro = 1500;
            racr.params.nitroCollected = 0;
            racr.params.nitroAvailable = false;
            $("#nitrobutton").css("display", "none");

          }
          break;
    }
  },

//=========================================================================
// UPDATE THE GAME WORLD
//=========================================================================

  update: function (dt) {

      if (!racr.params.gameStart) {
        racr.params.speed = 0;
        racr.params.playerX = 0;
        racr.params.steerLeft = false;
        racr.params.steerRight = false;
        racr.params.steerAmount = 0;
        racr.params.keyFaster = false;
        racr.params.keySlower = false;
        racr.params.keyLeft = false;
        racr.params.keyRight = false;
        racr.updateHud('speed', 0);

        // Kill engine sound during countdown
        if (sound.engine && sound.engine.eng) {
          for (var i = 0; i < 8; i++) {
            sound.engine.eng[i].volume(0);
            if (sound.engine.exh[i]) sound.engine.exh[i].volume(0);
          }
        }
        return;
      }

      // *** UPDATE RIVAL SYSTEM ***
      if (typeof RivalSystem !== 'undefined') {
        RivalSystem.update(dt);
      }
      // *** END RIVAL UPDATE ***

      var n, car, carW, star, starW, sprite, spriteW;
      var playerSegment = racr.findSegment(racr.params.position + racr.params.playerZ);
      var playerW = SPRITES.PLAYER_4.w * SPRITES.SCALE;
      
      var speedPercent = racr.params.speed / racr.params.maxSpeed;
      var dx = dt * 2 * speedPercent;
      var startPosition = racr.params.position;

      racr.updateCars(dt, playerSegment, playerW);

      racr.params.position = Util.increase(racr.params.position, dt * racr.params.speed, racr.params.trackLength, true);

      if (racr.params.controlMode === 'sim') {
        if (racr.params.keyLeft) { racr.params.playerX = racr.params.playerX - dx; }
        if (racr.params.keyRight) { racr.params.playerX = racr.params.playerX + dx; }
        racr.params.playerX = racr.params.playerX - (dx * speedPercent * playerSegment.curve * racr.params.centrifugal);
        if (racr.params.keyLeft && !racr.params.keyRight) { racr.params.steerAmount = -2; }
        else if (racr.params.keyRight && !racr.params.keyLeft) { racr.params.steerAmount = 2; }
        else { racr.params.steerAmount = 0; }
      } else {
        if (racr.params.keyLeft) { racr.params.keyFaster = true; racr.params.playerX = racr.params.playerX - dx; }
        else if (racr.params.keyRight) { racr.params.keyFaster = true; racr.params.playerX = racr.params.playerX + dx; }
        racr.params.playerX = racr.params.playerX - (dx * speedPercent * playerSegment.curve * racr.params.centrifugal);
      }
      if (racr.params.keySlower) {
        racr.params.speed = Util.accelerate(racr.params.speed, racr.params.breaking, dt);
        if (racr.params.speed < 50) racr.params.speed = 0; // instant stop if very slow
      } else if (racr.params.keyFaster && racr.params.nitro > 0) {
        racr.params.speed = Util.accelerate(racr.params.speed, racr.params.accel*5, dt);
      } else if (racr.params.keyFaster) {
        racr.params.speed = Util.accelerate(racr.params.speed, racr.params.accel, dt);
      } else {
        racr.params.speed = Util.accelerate(racr.params.speed, racr.params.decel, dt);
      }

      for (n = 0; n < playerSegment.cars.length; n++) {
        car = playerSegment.cars[n];
        carW = car.sprite ? car.sprite.w * SPRITES.SCALE : (racr.trafficImages['DELFT_STRAIGHT'].width * SPRITES.SCALE);
              var speedDiff = racr.params.speed - car.speed;
        if (speedDiff > 100) {
          if (Util.overlap(racr.params.playerX, playerW * 1.5, car.offset, carW * 1.5, 1.2)) {
            var now = Date.now();
            if (!car._lastOvertake || now - car._lastOvertake > 2000) {
              car._lastOvertake = now;
              var overtakeKey = speedDiff > 500 ? 'overtake' : 'overtake_2';
              var overtakeVol = Math.min(0.5, 0.1 + speedDiff / 2000);
              if (sound[overtakeKey]) {
                sound[overtakeKey].volume(overtakeVol);
                sound[overtakeKey].play();
              }
            }
          }
        }

        // console.log(car);
        if (racr.params.speed > car.speed) {
          if (Util.overlap(racr.params.playerX, playerW, car.offset, carW, 0.8)) {
            var playSound = true;
            if (racr.params.lastHitSound != 0) {
              var now = Date.now();
              if (now - racr.params.lastHitSound < 1000) {
                playSound = false;
              }
            }
            if (playSound) {
              racr.sound('hit', true);
              racr.params.lastHitSound = Date.now();
              racr.explode(racr.params.width / 2, racr.params.height - racr.params.playerH / 1.5);
              racr.params.controls.push('H' + Math.round(racr.params.currentLapTime));
            }
            racr.params.speed = car.speed * (car.speed / racr.params.speed);
            racr.params.position = Util.increase(car.z, -racr.params.playerZ, racr.params.trackLength, false);
            break;
          }
        }
      }
      // console.log(racr.stars)
      for (var m = 0; m < playerSegment.stars.length; m++) {
        star = playerSegment.stars[m];
        starW = star.sprite[0].w * SPRITES.SCALE;
        if (Util.overlap(racr.params.playerX, playerW, star.offset, starW, 0.8)) {
          // console.log(racr.params.playerX);
          if (!racr.params.gameOver) {
            racr.sound('collect', true);
            racr.params.boostIncrease += 500;
            racr.params.controls.push('C' + Math.round(racr.params.currentLapTime));
            racr.params.nitroCollected += 2;
            racr.params.starsCollectedLevel += 1;
            var starsToWinForCurrentLap = racr.params.starsToWin[racr.params.lapNumber];
            racr.updateHud('stars', Math.max(starsToWinForCurrentLap - racr.params.starsCollectedLevel, 0));
            // console.log(racr.params.playerZ);
            if (racr.params.starsCollectedLevel % starsToWinForCurrentLap == 0) { // end of lap
              if (racr.params.lapNumber == 3) {
                racr.finishGame();
              } else {
                setTimeout(function() {
                  racr.params.lapNumber += 1;
                  racr.replay();
                  racr.params.lastLapTime = racr.params.currentLapTime;
                  racr.updateHud('stars', Math.max(racr.params.starsToWin[racr.params.lapNumber] - racr.params.starsCollectedLevel, 0));
                  racr.updateHud('lap', racr.params.lapNumber.toString());
                  racr.updateHud('maxSpeed',  (racr.params.maxSpeed * 2 - racr.params.maxSpeed + racr.params.lapNumber * racr.params.maxSpeed/3)/100);
                  $("#lap_value").addClass("lap-announcement").delay(1000).queue(function(){
                  $(this).removeClass("lap-announcement");
                  $(this).dequeue();
                  if (typeof RivalSystem !== 'undefined') {
                    RivalSystem.reset();
                  }
                  });
                }, 400);
              }
            }
            if (racr.params.nitroCollected == racr.params.nitroRequirements) {
              racr.params.nitroAvailable = true;
              $("#nitrobutton").css("display", "block");
            }
          }
          racr.circleExplode(racr.params.width / 2, racr.params.height - racr.params.playerH / 1.5);
        }
      }

      if (racr.params.controlMode === 'sim') {
        racr.params.playerX = Util.limit(racr.params.playerX, -2.5, 2.5);
      } else {
        racr.params.playerX = Util.limit(racr.params.playerX, -3, 3);
      }

      if (racr.params.nitro > 0) {
        if (racr.params.nitro%30==0)
          racr.tripExplode(racr.params.width / 2, racr.params.height - racr.params.playerH / 1.5);
        racr.params.speed = Util.limit(racr.params.speed, 0, Math.min(racr.params.maxSpeed + racr.params.boostIncrease, racr.params.maxSpeed * 4 - racr.params.maxSpeed + racr.params.lapNumber * racr.params.maxSpeed/3));
        racr.params.nitro = Math.max(0, racr.params.nitro - 2);
      } else {
        racr.params.speed = Util.limit(racr.params.speed, 0, Math.min(racr.params.maxSpeed + racr.params.boostIncrease, racr.params.maxSpeed * 2 - racr.params.maxSpeed + racr.params.lapNumber * racr.params.maxSpeed/3)); // or exceed maxSpeed
      }

      if (racr.params.boostIncrease > 0) {
        racr.params.boostIncrease = Math.max(0, racr.params.boostIncrease - 2);
      }

      racr.params.sunOffset = racr.params.sunOffset + racr.params.skySpeed * playerSegment.curve * (racr.params.position - startPosition) / racr.params.segmentLength;
      racr.params.skyOffset = Util.increase(racr.params.skyOffset, racr.params.skySpeed * playerSegment.curve * (racr.params.position - startPosition) / racr.params.segmentLength, 1, false);
      racr.params.hillOffset = Util.increase(racr.params.hillOffset, racr.params.hillSpeed * playerSegment.curve * (racr.params.position - startPosition) / racr.params.segmentLength, 1, false);
      racr.params.treeOffset = Util.increase(racr.params.treeOffset, racr.params.treeSpeed * playerSegment.curve * (racr.params.position - startPosition) / racr.params.segmentLength, 1, false);

      // if the player crosses the finish line or the game has timed out
      if (racr.params.position > racr.params.playerZ) {
        // if (racr.params.currentLapTime && (startPosition < racr.params.playerZ || racr.params.currentLapTime > racr.params.maxRoundDurate) && !racr.params.gameOver)
        //   racr.finishGame();
        // else
          racr.params.currentLapTime += dt;
      }

      // Wind crossfade
      if (sound.wind && sound.wind.length) {
        var windPercent = Math.min(1, racr.params.speed / racr.params.maxSpeed);
        var windLevel = Math.floor(windPercent * 3);
        for (var i = 0; i < 4; i++) {
          var wVol = 0;
          if (i === windLevel) wVol = 0.12;
          else if (i === windLevel + 1 && windLevel < 3) wVol = 0.06;
          sound.wind[i].volume(wVol);
        }
      }

      racr.updateHud('speed', Math.round(racr.params.speed / 100));
      // Engine sound crossfade
      var speedPercent = racr.params.speed / racr.params.maxSpeed;
      var level = Math.min(7, Math.floor(speedPercent * 7)); // spreads across 0-7 more evenly
      // Engine sound crossfade
      // Engine sound crossfade - biased for arcade acceleration
      if (sound.engine && sound.engine.eng) {
        var speedPercent = Math.min(1, racr.params.speed / racr.params.maxSpeed);
        var level = Math.floor(speedPercent * 5);
        for (var i = 0; i < 8; i++) {
          var targetVol = 0;
          if (i === level) {
            targetVol = 0.3;
          } else if (i === level + 1 && level < 5) {
            targetVol = 0.2;
          } else if (i === level - 1 && level > 0) {
            targetVol = 0.15;
          }
          sound.engine.eng[i].volume(targetVol);
          if (sound.engine.exh[i]) sound.engine.exh[i].volume(targetVol * 0.8);
        }
      }

      racr.updateHud('currentLapTime', racr.formatTime(racr.params.currentLapTime));

      racr.updateStars(dt, playerSegment, playerW);
  },
  finishGame: function () {
    $('#nos-mobile-btn').addClass('hidden');
    racr.params.gameOver = true;

    if (sound.engine && sound.engine.eng) {
      for (var i = 0; i < 8; i++) {
        sound.engine.eng[i].stop();
        if (sound.engine.exh[i]) sound.engine.exh[i].stop();
      }
      sound.engine.playing = false;
    }

    if (sound.wind && sound.wind.length) {
      for (var i = 0; i < 4; i++) {
        sound.wind[i].stop();
      }
    }


    $("#touch-input").removeClass("mobile-show");

    var timeout = racr.pixelate();

    // racr.sound('music', false);
    // racr.sound('gameOver', true);

    racr.params.latestSuccess = {
      time: Math.max(0, Math.round(racr.params.currentLapTime)),
      finished: racr.params.currentLapTime > racr.params.maxRoundDurate,
    };
    racr.updateFinishScreen('totalScore', Math.max(0, Math.round(racr.params.currentLapTime)));

    setTimeout(function () {
      Game.stop = true;
      if (racr.params.external) {
        window.external.notify(JSON.stringify($.extend({}, racr.queryParams, racr.params.latestSuccess)));
      }
      racr.dom.menu.addClass('active');
      racr.dom.hud.outer.addClass('hideHud');
    }, timeout * 1.5);

    $("#user_form").off("submit").submit(function (form) {
      form.preventDefault();
      sound.click.play();
      var username = $("#username_field").val();
      var score = Math.max(0, Math.round(racr.params.currentLapTime));
      submitScore(username, score, racr.params.playerCar);
      // Show table immediately
      $("#table_wrap").addClass("active");
      // Then update with fresh data when it arrives
      fetchLeaderboard(renderLeaderboard);
    });


  },
  playTireSkid: function () {
    var shouldSkid = racr.params.lastSkidSound == 0 || Date.now() - racr.params.lastSkidSound > 2 * 1000; // don't play skid twice in 10s
    if (shouldSkid) {
      racr.sound('skid', true);
      racr.params.lastSkidSound = Date.now();
      // Spawn tire smoke at rear wheels
      var smokeX = racr.params.width / 2;
      var smokeY = racr.params.height - racr.params.playerH / 2;
      racr.tireSmoke(smokeX - racr.params.playerW * 0.3, smokeY);
      racr.tireSmoke(smokeX + racr.params.playerW * 0.3, smokeY);
    }
  },
  updateStars: function (dt, playerSegment, playerW) {
    var n, star, oldSegment, newSegment;
    for (n = 0; n < racr.stars.length; n++) {
      star = racr.stars[n];
      oldSegment = racr.findSegment(star.z);
      star.percent = Util.percentRemaining(star.z, racr.params.segmentLength); // useful for interpolation during rendering phase
      if (oldSegment.index === playerSegment.index) {
        var index = oldSegment.stars.indexOf(star);
        oldSegment.stars.splice(index, 1);
        newSegment = null;
      } else {
        newSegment = racr.findSegment(star.z);
      }
    }
  },
  updateCars: function (dt, playerSegment, playerW) {
    var n, car, oldSegment, newSegment;
    for (n = 0; n < racr.cars.length; n++) {
      car = racr.cars[n];
      oldSegment = racr.findSegment(car.z);
      //car.offset  = car.offset + racr.updateCarOffset(car, oldSegment, playerSegment, playerW);
      car.z = Util.increase(car.z, dt * car.speed, racr.params.trackLength, false);
      car.percent = Util.percentRemaining(car.z, racr.params.segmentLength); // useful for interpolation during rendering phase
      newSegment = racr.findSegment(car.z);
      if (oldSegment !== newSegment) {
        var index = oldSegment.cars.indexOf(car);
        oldSegment.cars.splice(index, 1);
        newSegment.cars.push(car);
      }
    }
  },
  updateCarOffset: function (car, carSegment, playerSegment, playerW) {

    var i, j, dir, segment, otherCar, otherCarW, lookahead = 20, carW = car.sprite ? car.sprite.w * SPRITES.SCALE : (racr.trafficImages['DELFT_STRAIGHT'].width * SPRITES.SCALE);

    // optimization, dont bother steering around other cars when 'out of sight' of the player
    if ((carSegment.index - playerSegment.index) > racr.params.drawDistance)
      return 0;

    for (i = 1; i < lookahead; i++) {
      segment = racr.segments[(carSegment.index + i) % racr.segments.length];

      if ((segment === playerSegment) && (car.speed > racr.params.speed) && (Util.overlap(racr.params.playerX, playerW, car.offset, carW, 1.4))) {
        if (racr.params.playerX > 0.5)
          dir = -1;
        else if (racr.params.playerX < -0.5)
          dir = 1;
        else
          dir = (car.offset > racr.params.playerX) ? 1 : -1;
        return dir * 1 / i * (car.speed - racr.params.speed) / racr.params.maxSpeed; // the closer the cars (smaller i) and the greated the speed ratio, the larger the offset
      }

      for (j = 0; j < segment.cars.length; j++) {
        otherCar = segment.cars[j];
        otherCarW = otherCar.sprite ? otherCar.sprite.w * SPRITES.SCALE : (racr.trafficImages['DELFT_STRAIGHT'].width * SPRITES.SCALE);
        if ((car.speed > otherCar.speed) && Util.overlap(car.offset, carW, otherCar.offset, otherCarW, 1.4)) {
          if (otherCar.offset > 0.5)
            dir = -1;
          else if (otherCar.offset < -0.5)
            dir = 1;
          else
            dir = (car.offset > otherCar.offset) ? 1 : -1;
          return dir * 1 / i * (car.speed - otherCar.speed) / racr.params.maxSpeed;
        }
      }
    }

    // if no cars ahead, but I have somehow ended up off road, then steer back on
    if (car.offset < -0.7)
      return 0.1;
    else if (car.offset > 0.7)
      return -0.1;
    else
      return 0;
  },

  updateHud: function (key, value) { // accessing DOM can be slow, so only do it if value has changed
    racr.dom.hud[key].html(value);
  },

  updateFinishScreen: function (key, value) { // accessing DOM can be slow, so only do it if value has changed
    racr.dom.finishScreen[key].html(value);
  },

  formatTime: function (dt) {
    // if (racr.params.gameOver) {
    //   return 0;
    // }
    var minutes = Math.floor(dt / 60);
    var seconds = Math.ceil(dt - (minutes * 60));
    var tenths = Math.floor(10 * (dt - Math.floor(dt)));
    return 60 * minutes + seconds;
    //
    // if (minutes > 0)
    //   return minutes + "." + (seconds < 10 ? "0" : "") + seconds + "." + tenths;
    // else
    //   return seconds + "." + tenths;
  },

  //=========================================================================
  // RENDER THE GAME WORLD
  //=========================================================================

  render: function () {

      var baseSegment = racr.findSegment(racr.params.position);

      var basePercent = Util.percentRemaining(racr.params.position, racr.params.segmentLength);
      var playerSegment = racr.findSegment(racr.params.position + racr.params.playerZ);
      var playerPercent = Util.percentRemaining(racr.params.position + racr.params.playerZ, racr.params.segmentLength);
      racr.params.playerY = Util.interpolate(playerSegment.p1.world.y, playerSegment.p2.world.y, playerPercent);
      var maxy = racr.params.height;

      var x = 0;
      var dx = -(baseSegment.curve * basePercent);

      racr.ctx.clearRect(0, 0, racr.params.width, racr.params.height);

      const levelBackground = [racr.background1, racr.background2, racr.background3];
      let bg = levelBackground[racr.params.lapNumber-1];

      if (racr.params.nitro > 750) {
        Render.background(racr.ctx, racr.backgroundTrip, racr.params.width, racr.params.height, BACKGROUND.SKY, racr.params.skyOffset, 0);

        Render.sun(racr.ctx, racr.params.width, racr.params.height);

        Render.background(racr.ctx, racr.backgroundTrip, racr.params.width, racr.params.height, BACKGROUND.HILLS, racr.params.hillOffset, racr.params.resolution * racr.params.hillSpeed * racr.params.playerY);
        Render.background(racr.ctx, racr.backgroundTrip, racr.params.width, racr.params.height, BACKGROUND.TREES, racr.params.treeOffset, racr.params.resolution * racr.params.treeSpeed * racr.params.playerY);

      } else if (racr.params.nitro > 0) {
        Render.background(racr.ctx, racr.background, racr.params.width, racr.params.height, BACKGROUND.SKY, racr.params.skyOffset, 0);
        // console.log(racr.params.nitro);
        Render.background(racr.ctx, racr.backgroundTrip, racr.params.width, racr.params.height, BACKGROUND.SKY, racr.params.skyOffset, 0, racr.params.nitro/750);

        Render.sun(racr.ctx, racr.params.width, racr.params.height);

        Render.background(racr.ctx, racr.background, racr.params.width, racr.params.height, BACKGROUND.HILLS, racr.params.hillOffset, racr.params.resolution * racr.params.hillSpeed * racr.params.playerY, 1-racr.params.nitro/750);
        Render.background(racr.ctx, racr.backgroundTrip, racr.params.width, racr.params.height, BACKGROUND.HILLS, racr.params.hillOffset, racr.params.resolution * racr.params.hillSpeed * racr.params.playerY, racr.params.nitro/750);
        
        Render.background(racr.ctx, racr.background, racr.params.width, racr.params.height, BACKGROUND.TREES, racr.params.treeOffset, racr.params.resolution * racr.params.treeSpeed * racr.params.playerY, 1-racr.params.nitro/750);
        Render.background(racr.ctx, racr.backgroundTrip, racr.params.width, racr.params.height, BACKGROUND.TREES, racr.params.treeOffset, racr.params.resolution * racr.params.treeSpeed * racr.params.playerY, racr.params.nitro/750);

      } else {

        Render.background(racr.ctx, bg, racr.params.width, racr.params.height, BACKGROUND.SKY, racr.params.skyOffset, 0);

        Render.background(racr.ctx, bg, racr.params.width, racr.params.height, BACKGROUND.HILLS, racr.params.hillOffset, racr.params.resolution * racr.params.hillSpeed * racr.params.playerY);
        Render.background(racr.ctx, bg, racr.params.width, racr.params.height, BACKGROUND.TREES, racr.params.treeOffset, racr.params.resolution * racr.params.treeSpeed * racr.params.playerY);
        
        Render.sun(racr.ctx, racr.params.width, racr.params.height);
      }


      var n, i, segment, car, star, sprite, spriteScale, spriteX, spriteY, spriteName, spriteDirection;

      for (n = 0; n < racr.params.drawDistance; n++) {

        segment = racr.segments[(baseSegment.index + n) % racr.segments.length];
        segment.looped = segment.index < baseSegment.index;
        segment.fog = Util.exponentialFog(n / racr.params.drawDistance, racr.params.fogDensity);
        segment.clip = maxy;

        Util.project(segment.p1, (racr.params.playerX * racr.params.roadWidth) - x, racr.params.playerY + racr.params.cameraHeight, racr.params.position - (segment.looped ? racr.params.trackLength : 0), racr.params.cameraDepth, racr.params.width, racr.params.height, racr.params.roadWidth);
        Util.project(segment.p2, (racr.params.playerX * racr.params.roadWidth) - x - dx, racr.params.playerY + racr.params.cameraHeight, racr.params.position - (segment.looped ? racr.params.trackLength : 0), racr.params.cameraDepth, racr.params.width, racr.params.height, racr.params.roadWidth);

        x = x + dx;
        dx = dx + segment.curve;

        if ((segment.p1.camera.z <= racr.params.cameraDepth) || // behind us
          (segment.p2.screen.y >= segment.p1.screen.y) || // back face cull
          (segment.p2.screen.y >= maxy))                  // clip by (already rendered) hill
          continue;

        Render.segment(racr.ctx, racr.params.width, racr.params.lanes,
          segment.p1.screen.x,
          segment.p1.screen.y,
          segment.p1.screen.w,
          segment.p2.screen.x,
          segment.p2.screen.y,
          segment.p2.screen.w,
          segment.fog,
          segment.color,
          n,
          segment.curve);

        maxy = segment.p1.screen.y;
      }

      var particleDrawn = 0;
      for (var i = 0; i < racr.particles.length; i++) {
        if (racr.particles[i].animate && racr.particles[i].onTop == false) {
          racr.particles[i].draw();
          particleDrawn++;
        }
      }

      for (n = (racr.params.drawDistance - 1); n > 0; n--) {
        segment = racr.segments[(baseSegment.index + n) % racr.segments.length];

        for (i = 0; i < segment.cars.length; i++) {
          car = segment.cars[i];
          
          
          var direction = 'STRAIGHT';
          if (segment.curve > 2) direction = 'RIGHT';
          else if (segment.curve < -2) direction = 'LEFT';
          
          // Curve only if in center lane or no player steering
          if (car.offset === 0) {
            if (segment.curve > 2) direction = 'RIGHT';
            else if (segment.curve < -2) direction = 'LEFT';
          }

          // Try Delft image first, fall back to sprite sheet
          var trafficImg = racr.trafficImages[car.spriteName + '_' + direction];
          
          if (trafficImg) {
            // Use high-res Delft image
            spriteScale = Util.interpolate(segment.p1.screen.scale, segment.p2.screen.scale, car.percent);
            var TRAFFIC_BASE_HEIGHT = 240; // match your player car base height
            var TRAFFIC_SCALE = 0.3 * (1/TRAFFIC_BASE_HEIGHT);
            var tDestH = (TRAFFIC_BASE_HEIGHT * spriteScale * racr.params.width/2) * (TRAFFIC_SCALE * racr.params.roadWidth);
            var tDestW = tDestH * (trafficImg.width / trafficImg.height);
            var tDestX = Util.interpolate(segment.p1.screen.x, segment.p2.screen.x, car.percent) + (spriteScale * car.offset * racr.params.roadWidth * racr.params.width / 2) - tDestW/2;
            var tDestY = Util.interpolate(segment.p1.screen.y, segment.p2.screen.y, car.percent) - tDestH;
            
            var tClipH = segment.clip ? Math.max(0, tDestY + tDestH - segment.clip) : 0;
            if (tClipH < tDestH) {
              racr.ctx.drawImage(trafficImg, tDestX, tDestY, tDestW, tDestH - tClipH);
            }
          } else {
            // Fallback to original sprite sheet cars
            spriteName = car.spriteName;
            spriteDirection = 'STRAIGHT';
            if (car.offset < 0) {
              spriteDirection = racr.params.playerX < 0 ? 'STRAIGHT' : racr.params.playerX > 0 ? 'FARRIGHT' : 'RIGHT';
            } else if (car.offset > 0) {
              spriteDirection = racr.params.playerX > 0 ? 'STRAIGHT' : racr.params.playerX < 0 ? 'FARLEFT' : 'LEFT';
            } else {
              if (racr.params.playerX < 0) spriteDirection = 'LEFT';
              if (racr.params.playerX > 0) spriteDirection = 'RIGHT';
            }
            if (segment.curve > 1) spriteDirection = segment.curve > 2 ? 'FARRIGHT' : 'RIGHT';
            if (segment.curve < -1) spriteDirection = segment.curve < -2 ? 'FARLEFT' : 'LEFT';
            sprite = SPRITES[spriteName + '_' + spriteDirection];
            segment.cars[i].sprite = sprite;
            spriteScale = Util.interpolate(segment.p1.screen.scale, segment.p2.screen.scale, car.percent);
            spriteX = Util.interpolate(segment.p1.screen.x, segment.p2.screen.x, car.percent) + (spriteScale * car.offset * racr.params.roadWidth * racr.params.width / 2);
            spriteY = Util.interpolate(segment.p1.screen.y, segment.p2.screen.y, car.percent);
            Render.sprite(racr.ctx, racr.params.width, racr.params.height, racr.params.resolution, racr.params.roadWidth, racr.sprites, sprite, spriteScale, spriteX, spriteY, -0.5, -1, segment.clip, false, segment);
          }
        }

        for (i = 0; i < segment.stars.length; i++) {
          star = segment.stars[i];
          sprite = star.sprite;
          spriteScale = Util.interpolate(segment.p1.screen.scale, segment.p2.screen.scale, star.percent);
          spriteX = Util.interpolate(segment.p1.screen.x, segment.p2.screen.x, star.percent) + (spriteScale * star.offset * racr.params.roadWidth * racr.params.width / 2);
          spriteY = Util.interpolate(segment.p1.screen.y, segment.p2.screen.y, star.percent);
          // console.log(Math.floor(racr.params.currentLapTime*2) % 18);
          Render.sprite(racr.ctx, racr.params.width, racr.params.height, racr.params.resolution, racr.params.roadWidth, racr.starSprite, star.sprite[Math.floor(racr.params.currentLapTime*4) % 18], spriteScale, spriteX, spriteY, -0.5, -1, segment.clip, false, segment);
        }

        for (i = 0; i < segment.sprites.length; i++) {
          sprite = segment.sprites[i];
          spriteScale = segment.p1.screen.scale;
          spriteX = segment.p1.screen.x + (spriteScale * sprite.offset * racr.params.roadWidth * racr.params.width / 2);
          spriteY = segment.p1.screen.y;
          if(sprite.name === 'dummy') spriteScale *= 0.6;
          Render.sprite(racr.ctx, racr.params.width, racr.params.height, racr.params.resolution, racr.params.roadWidth, racr.sprites, sprite.source, spriteScale, spriteX, spriteY, (sprite.offset < 0 ? -1 : 0), -1, segment.clip, false, segment);
        }

        if (segment === playerSegment) {
          Render.player(racr.ctx, racr.params.width, racr.params.height, racr.params.resolution, racr.params.roadWidth, racr.sprites, racr.params.speed / racr.params.maxSpeed,
            racr.params.cameraDepth / racr.params.playerZ,
            racr.params.width / 2,
            (racr.params.height / 2) - (racr.params.cameraDepth / racr.params.playerZ * Util.interpolate(playerSegment.p1.camera.y, playerSegment.p2.camera.y, playerPercent) * racr.params.height / 2),
            racr.params.speed * (racr.params.keyLeft || racr.params.steerLeft ? -1 : racr.params.keyRight || racr.params.steerRight ? 1 : 0),
            playerSegment.p2.world.y - playerSegment.p1.world.y,
            segment.curve);
          Render.leftX(racr.params.width, racr.params.lanes, segment.p1.screen.x, segment.p1.screen.y, segment.p1.screen.w, segment.p2.screen.x, segment.p2.screen.y, segment.p2.screen.w);
          
          // *** RENDER RIVAL CAR ***
          if (typeof RivalRender !== 'undefined') {
            RivalRender.render(racr.ctx, racr.params.width, racr.params.height);
          }
          // *** END RIVAL RENDER ***
        }

      }

      for (var i = 0; i < racr.particles.length; i++) {
        if (racr.particles[i].animate && racr.particles[i].onTop) {
          racr.particles[i].draw();
          particleDrawn++;
        }
      }

      for (var i = 0; i < racr.pixels.length; i++) {
        if (racr.pixels[i].animate) {
          racr.pixels[i].draw();
        }
      }

      // *** RENDER RIVAL HUD ***
      if (typeof RivalRender !== 'undefined') {
        RivalRender.renderHUD();
      }
      // *** END RIVAL HUD ***

  },

  findSegment: function (z) {
    return racr.segments[Math.floor(z / racr.params.segmentLength) % racr.segments.length];
  },

  //=========================================================================
  // BUILD ROAD GEOMETRY
  //=========================================================================

  lastY: function () {
    return (racr.segments.length == 0) ? 0 : racr.segments[racr.segments.length - 1].p2.world.y;
  },

  addSegment: function (curve, y) {
    var n = racr.segments.length;
    racr.segments.push({
      index: n,
      p1: {world: {y: racr.lastY(), z: n * racr.params.segmentLength}, camera: {}, screen: {}},
      p2: {world: {y: y, z: (n + 1) * racr.params.segmentLength}, camera: {}, screen: {}},
      curve: curve,
      sprites: [],
      cars: [],
      stars: [],
      color: Math.floor(n / racr.params.rumbleLength) % 2 ? COLORS.DARK : COLORS.LIGHT
    });
  },

  addSprite: function (n, sprite, offset, name) {
    racr.segments[n].sprites.push({source: sprite, offset: offset, name: name });
  },

  addRoad: function (enter, hold, leave, curve, y) {
    var startY = racr.lastY();
    var endY = startY + (Util.toInt(y, 0) * racr.params.segmentLength);
    var n, total = enter + hold + leave;
    for (n = 0; n < enter; n++)
      racr.addSegment(Util.easeIn(0, curve, n / enter), Util.easeInOut(startY, endY, n / total));
    for (n = 0; n < hold; n++)
      racr.addSegment(curve, Util.easeInOut(startY, endY, (enter + n) / total));
    for (n = 0; n < leave; n++)
      racr.addSegment(Util.easeInOut(curve, 0, n / leave), Util.easeInOut(startY, endY, (enter + hold + n) / total));
  },

  ROAD: {
    LENGTH: {NONE: 0, SHORT: 25, MEDIUM: 50, LONG: 100},
    HILL: {NONE: 0, LOW: 20, MEDIUM: 40, HIGH: 60},
    CURVE: {NONE: 0, EASY: 2, MEDIUM: 4, HARD: 6}
  },

  addStraight: function (num) {
    num = num || racr.ROAD.LENGTH.MEDIUM;
    racr.addRoad(num, num, num, 0, 0);
  },

  // addFinishSegment: function (num) {
  //   var carSegment = racr.findSegment(racr.params.position + racr.params.playerZ);
  //   var currentSegment = racr.segments[(carSegment.index + i) % racr.segments.length];
  //   Render.finishLine(racr.ctx, racr.params.width, racr.params.height);
  // }

  addHill: function (num, height) {
    num = num || racr.ROAD.LENGTH.MEDIUM;
    height = height || racr.ROAD.HILL.MEDIUM;
    racr.addRoad(num, num, num, 0, height);
  },

  addCurve: function (num, curve, height) {
    num = num || racr.ROAD.LENGTH.MEDIUM;
    curve = curve || racr.ROAD.CURVE.MEDIUM;
    height = height || racr.ROAD.HILL.NONE;
    racr.addRoad(num, num, num, curve, height);
  },

  addLowRollingHills: function (num, height) {
    num = num || racr.ROAD.LENGTH.SHORT;
    height = height || racr.ROAD.HILL.LOW;
    racr.addRoad(num, num, num, 0, height / 2);
    racr.addRoad(num, num, num, 0, -height);
    racr.addRoad(num, num, num, racr.ROAD.CURVE.EASY, height);
    racr.addRoad(num, num, num, 0, 0);
    racr.addRoad(num, num, num, -racr.ROAD.CURVE.EASY, height / 2);
    racr.addRoad(num, num, num, 0, 0);
  },

  addSCurves: function () {
    racr.addRoad(racr.ROAD.LENGTH.MEDIUM, racr.ROAD.LENGTH.MEDIUM, racr.ROAD.LENGTH.MEDIUM, -racr.ROAD.CURVE.EASY, racr.ROAD.HILL.NONE);
    racr.addRoad(racr.ROAD.LENGTH.MEDIUM, racr.ROAD.LENGTH.MEDIUM, racr.ROAD.LENGTH.MEDIUM, racr.ROAD.CURVE.MEDIUM, racr.ROAD.HILL.MEDIUM);
    racr.addRoad(racr.ROAD.LENGTH.MEDIUM, racr.ROAD.LENGTH.MEDIUM, racr.ROAD.LENGTH.MEDIUM, racr.ROAD.CURVE.EASY, -racr.ROAD.HILL.LOW);
    racr.addRoad(racr.ROAD.LENGTH.MEDIUM, racr.ROAD.LENGTH.MEDIUM, racr.ROAD.LENGTH.MEDIUM, -racr.ROAD.CURVE.EASY, racr.ROAD.HILL.MEDIUM);
    racr.addRoad(racr.ROAD.LENGTH.MEDIUM, racr.ROAD.LENGTH.MEDIUM, racr.ROAD.LENGTH.MEDIUM, -racr.ROAD.CURVE.MEDIUM, -racr.ROAD.HILL.MEDIUM);
  },

  addBumps: function () {
    racr.addRoad(10, 10, 10, 0, 5);
    racr.addRoad(10, 10, 10, 0, -2);
    racr.addRoad(10, 10, 10, 0, -5);
    racr.addRoad(10, 10, 10, 0, 8);
    racr.addRoad(10, 10, 10, 0, 5);
    racr.addRoad(10, 10, 10, 0, -7);
    racr.addRoad(10, 10, 10, 0, 5);
    racr.addRoad(10, 10, 10, 0, -2);
  },

  addDownhillToEnd: function (num) {
    num = num || 200;
    racr.addRoad(num, num, num, -racr.ROAD.CURVE.EASY, -racr.lastY() / racr.params.segmentLength);
  },

  resetRoad: function () {
    racr.segments = [];

    racr.addStraight(racr.ROAD.LENGTH.SHORT);
    racr.addLowRollingHills();
    racr.addSCurves();
    racr.addCurve(racr.ROAD.LENGTH.MEDIUM, racr.ROAD.CURVE.MEDIUM, racr.ROAD.HILL.LOW);
    racr.addBumps();
    racr.addLowRollingHills();
    racr.addCurve(racr.ROAD.LENGTH.LONG * 2, racr.ROAD.CURVE.MEDIUM, racr.ROAD.HILL.MEDIUM);
    racr.addStraight();
    racr.addHill(racr.ROAD.LENGTH.MEDIUM, racr.ROAD.HILL.HIGH);
    racr.addSCurves();
    racr.addCurve(racr.ROAD.LENGTH.LONG, -racr.ROAD.CURVE.MEDIUM, racr.ROAD.HILL.NONE);
    // racr.addHill(racr.ROAD.LENGTH.LONG, racr.ROAD.HILL.HIGH);
    // racr.addCurve(racr.ROAD.LENGTH.LONG, racr.ROAD.CURVE.MEDIUM, -racr.ROAD.HILL.LOW);
    // racr.addBumps();
    // racr.addHill(racr.ROAD.LENGTH.LONG, -racr.ROAD.HILL.MEDIUM);
    // racr.addStraight();
    // racr.addSCurves();
    racr.addDownhillToEnd();

    racr.resetSprites();
    racr.resetCars();
    racr.resetStars();

    racr.segments[racr.findSegment(racr.params.playerZ).index + 2].color = COLORS.START;
    racr.segments[racr.findSegment(racr.params.playerZ).index + 3].color = COLORS.START;
    for (var n = 0; n < racr.params.rumbleLength; n++)
      racr.segments[racr.segments.length - 1 - n].color = COLORS.FINISH;

    racr.params.trackLength = racr.segments.length * racr.params.segmentLength;
  },

  resetSprites: function () {
    var n, i;

    var lastBillboard = 0;
    for (var startBillboards = 0; startBillboards < 10; startBillboards++) {
      racr.addSprite(startBillboards * 20 + 20, SPRITES.BILLBOARDS[lastBillboard], -1.2);
      lastBillboard == SPRITES.BILLBOARDS.length - 1 ? lastBillboard = 0 : lastBillboard++;
    }
    racr.addSprite(240, Util.randomChoice(SPRITES.BILLBOARDS), -1.2);
    racr.addSprite(240, Util.randomChoice(SPRITES.BILLBOARDS), 1.2);
    racr.addSprite(racr.segments.length - 25, Util.randomChoice(SPRITES.BILLBOARDS), -1.2);
    racr.addSprite(racr.segments.length - 25, Util.randomChoice(SPRITES.BILLBOARDS), 1.2);

    // ADD PLANTS
    for (n = 10; n < 200; n += 4 + Math.floor(n / 100)) {
      racr.addSprite(n, Util.randomChoice(SPRITES.PLANTS), 1 + Math.random() * 0.5);
      racr.addSprite(n, Util.randomChoice(SPRITES.PLANTS), 1 + Math.random() * 2);
    }

    for (n = 250; n < 1000; n += 3) {
      racr.addSprite(n + Util.randomInt(0, 3), Util.randomChoice(SPRITES.PLANTS), -1 - (Math.random() * 2));
      racr.addSprite(n + Util.randomInt(0, 3), Util.randomChoice(SPRITES.PLANTS), -1 - (Math.random() * 2));
    }

    for (n = 200; n < racr.segments.length; n += 1) {
      racr.addSprite(n, Util.randomChoice(SPRITES.PLANTS), Util.randomChoice([1, -1]) * (2 + Math.random() * 5));
    }

    // ADD DUMMIES
    for (n = 10; n < 100; n += 6 + Math.floor(n / 100)) {
      racr.addSprite(n, Util.randomChoice(SPRITES.DUMMIES), 0.8 + Math.random() * 1.5, 'dummy');
    }

    for (n = 100; n < racr.segments.length; n += 18) {
      racr.addSprite(n, Util.randomChoice(SPRITES.DUMMIES), Util.randomChoice([1, -1]) * (1 + Math.random()), 'dummy');
    }

    // ADD MERCH
    for (n = 10; n < 100; n += 40 + Math.floor(n / 100)) {
      racr.addSprite(n, Util.randomChoice(SPRITES.MERCH), 0.75 + Math.random() * 0.8);
    }

    for (n = 100; n < racr.segments.length; n += 40) {
      racr.addSprite(n, Util.randomChoice(SPRITES.MERCH), Util.randomChoice([1, -1]) * (0.75 + Math.random() * 0.8));
    }

    var side, sprite, offset;
    var curveStart = 0;

    // add tires and bumps in curves
    for (n = 100; n < racr.segments.length - 50; n += 3) {
      if (racr.segments[n].curve >= 2) {
        if (curveStart == 0) {
          curveStart = n;
        }
        racr.addSprite(n, SPRITES.TIRES, -1.2);
      } else if (racr.segments[n].curve <= -2) {
        racr.addSprite(n, SPRITES.TIRES, 1.2);
        if (curveStart == 0) {
          curveStart = n;
        }
      }

      // add tires after a curve for realism
      if (curveStart > n - 60 && curveStart > 0) {
        racr.addSprite(n, SPRITES.TIRES, racr.segments[n].curve > 0 ? -1.2 : 1.2);
      }
      if (curveStart < n - 60 && curveStart > 0) {
        curveStart = 0;
      }
    }

    for (n = 1000; n < (racr.segments.length - 50); n += 100) {
      side = Util.randomChoice([1, -1]);
      racr.addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -side);
      for (i = 0; i < 20; i++) {
        sprite = Util.randomChoice(SPRITES.PLANTS);
        offset = side * (1.5 + Math.random());
        racr.addSprite(n + Util.randomInt(0, 50), sprite, offset);
      }

    }

  },

  resetCars: function () {
    racr.cars = [];
    var n, car, segment, offset, z, sprite, spriteName, speed;
    for (n = 0; n < racr.params.totalCars[racr.params.lapNumber]; n++) {
      // Force equal distribution across lanes
      var lanePick = Math.random();
      if (lanePick < 0.33) offset = -0.66;
      else if (lanePick < 0.66) offset = 0;
      else offset = 0.66;
      z = Math.floor(Math.random() * racr.segments.length) * racr.params.segmentLength;
      var trafficTeams = ['RENNTEAM', 'TUM', 'DELFT', 'TUE'];
      spriteName = Util.randomChoice(trafficTeams);
      sprite = SPRITES[spriteName + '_STRAIGHT'];
      speed = racr.params.maxSpeed / 4 + Math.random() * racr.params.maxSpeed / 2;
      car = {offset: offset, z: z, spriteName: spriteName, sprite: sprite, speed: speed};
      segment = racr.findSegment(car.z);
      segment.cars.push(car);
      racr.cars.push(car);
    }
  },

  resetStars: function () {
    racr.stars = [];
    var n, offset, star, segment, z, sprite, segmentNr;
    for (n = 0 ; n < racr.params.totalStars ; n++) {
      offset = Util.randomChoice([-0.66, 0, 0.66]);
      z      = Math.floor(Math.random() * racr.segments.length) * racr.params.segmentLength;
      sprite = SPRITES.STAR;
      star   = { offset: offset, z: z, sprite: sprite, speed: 0 };
      segment = racr.findSegment(star.z);
      segment.stars.push(star);
      racr.stars.push(star);
    }
    // for (n = 20; n < racr.segments.length; n += 70) {
    //   segmentNr = n + Util.randomInt(0, 70);
    //   if (segmentNr < racr.segments.length) {
    //     offset = Util.randomChoice([-0.66, 0, 0.66]);
    //     star = {offset: offset, z: segmentNr * racr.params.segmentLength, sprite: SPRITES.STAR, speed: 0};
    //     racr.segments[segmentNr].stars.push(star);
    //     racr.stars.push(star);
    //   }
    // }
  },

  createParticle: function (settings) {
    var defaultSettings = {
      startX: racr.params.width / 2,
      startY: racr.params.height / 2,
      alpha: 1,
      width: Util.randomInt(1, 5),
      direction: Util.randomInt(1, 360),
      distance: Util.randomInt(20, 100),
      duration: Util.randomInt(5, 10) / 10,
      delay: 0,
      color: '#ffffff',
      ease: Power3.easeOut,
      animate: true,
      onTop: false,
      endX: false,
      endY: false,
      endAlpha: false,
      endWidth: false,
      endColor: false,
      easing: 'easeOutExpo',
      type: 'rect'
    };

    if (typeof settings == 'undefined') {
      settings = {};
    }

    var p = Object.assign(defaultSettings, settings);

    p.x = p.startX - p.width / 2;
    p.y = p.startY - p.width / 2;

    if (p.endX === false)
      p.endX = p.x + (p.distance * Math.cos(p.direction));

    if (p.endY === false)
      p.endY = p.y + (p.distance * Math.sin(p.direction));

    if (p.endAlpha === false)
      p.endAlpha = p.alpha;

    if (p.endWidth === false)
      p.endWidth = p.width;

    if (p.endColor === false)
      p.endColor = p.color;

    p.draw = function () {
      racr.ctx.globalAlpha = p.alpha;
      racr.ctx.beginPath();
      if (p.type == 'rect') {
        racr.ctx.rect(p.x, p.y, p.width, p.width);
      } else {
        racr.ctx.arc(p.x, p.y, p.width / 2, 0, 2 * Math.PI, false);
      }
      racr.ctx.fillStyle = p.color;
      racr.ctx.fill();
      racr.ctx.closePath();
      racr.ctx.globalAlpha = 1;
    };

    var animeSettings = {
      targets: p,
      easing: p.easing,
      duration: p.duration * 1000,
      complete: function () {
        p.animate = false;
      }
    };

    if (p.x != p.endX) {
      animeSettings['x'] = [p.x, p.endX];
    }
    if (p.y != p.endY) {
      animeSettings['y'] = [p.y, p.endY];
    }
    if (p.color != p.endColor) {
      animeSettings['color'] = [p.color, p.endColor];
    }
    if (p.width != p.endWidth) {
      animeSettings['width'] = [p.width, p.endWidth];
    }
    if (p.alpha != p.endAlpha) {
      animeSettings['alpha'] = [p.alpha, p.endAlpha];
    }
    if (p.delay > 0) {
      animeSettings['delay'] = p.delay;
    }
    anime(animeSettings);

    var found = -1;
    for (var i = 0; i < racr.particles.length; i++) {
      if (racr.particles[i].animate == false) {
        racr.particles[i] = p;
        found = i;
        break;
      }
    }
    if (found < 0) {
      racr.particles.push(p);
      found = racr.particles.length - 1;
    } else {
      racr.particles[i] = p;
    }
  },

  circleExplode: function (x, y) {
    var ratio = racr.params.playerW / SPRITES.PLAYER_4.w;
    var colors = ['#ffffff', '#00ADEF'];
    for (var i = 0; i < Util.randomInt(10, 30); i++) {
      var w = Util.randomInt(Math.round(5 * ratio), Math.round(5 * ratio));
      var angle = Util.randomInt(1, 360);
      var radius = 20 * ratio;
      var startX = x + (radius * Math.cos(angle));
      var startY = y + (radius * Math.sin(angle));
      var endX = startX + (Util.randomInt(100, 200) * Math.cos(angle));
      var endY = startY + (Util.randomInt(100, 200) * Math.sin(angle));
      var settings = {
        startX: startX,
        startY: startY,
        endX: endX,
        endY: endY,
        width: w,
        endWidth: 0,
        alpha: 1,
        duration: Util.randomInt(.3, 1.2),
        color: Util.randomChoice(colors),
        endAlpha: 1
      };
      racr.createParticle(settings);
    }
    // and one transparent circle
    for (var i = 0; i < Util.randomInt(2, 4); i++) {
      var radius = Util.randomInt(15 * ratio, 40 * ratio);
      var endRadius = radius * 1.5;
      var angle = Util.randomInt(1, 360);
      var gap = Util.randomInt(radius * .1, radius * .5);
      var startX = x + (gap * Math.cos(angle));
      var startY = y + (gap * Math.sin(angle));
      var settings = {
        angle: angle,
        gap: gap,
        startX: startX,
        startY: startY,
        direction: angle,
        distance: gap * 2,
        width: radius,
        endWidth: endRadius,
        alpha: .3,
        duration: 1,
        color: '#fff',
        endAlpha: 0,
        onTop: true
      };
      racr.createParticle(settings);
    }
  },

  tireSmoke: function(x, y) {
    var ratio = racr.params.playerW / 306; // base width of your player car
    var colors = ['#aaaaaa', '#cccccc', '#ffffff', '#999999'];
    for (var i = 0; i < Util.randomInt(5, 12); i++) {
      var w = Util.randomInt(Math.round(3 * ratio), Math.round(10 * ratio));
      var angle = Util.randomInt(160, 200); // mostly downward
      var distance = Util.randomInt(10 * ratio, 40 * ratio);
      var startX = x + Util.randomInt(-10, 10);
      var startY = y;
      var endX = startX + (distance * Math.cos(angle * Math.PI / 180));
      var endY = startY + (distance * Math.sin(angle * Math.PI / 180));
      var settings = {
        startX: startX,
        startY: startY,
        endX: endX,
        endY: endY,
        width: w,
        endWidth: w * 3,
        alpha: 0.6,
        duration: Util.randomInt(0.3, 0.8),
        color: Util.randomChoice(colors),
        endAlpha: 0,
        onTop: true
      };
      racr.createParticle(settings);
    }
  },


  tripExplode: function (x, y) {
    var ratio = racr.params.playerW / SPRITES.PLAYER_4.w;
    var colors = ['#ffffff', '#00ADEF', '#660000', '#ffff00'];
    for (var i = 0; i < Util.randomInt(10, 30); i++) {
      var w = Util.randomInt(Math.round(5 * ratio), Math.round(5 * ratio));
      var angle = Util.randomInt(1, 360);
      var radius = 20 * ratio;
      var startX = x + (radius * Math.cos(angle));
      var startY = y + (radius * Math.sin(angle));
      var endX = startX + (Util.randomInt(100, 200) * Math.cos(angle));
      var endY = startY + (Util.randomInt(100, 200) * Math.sin(angle));
      var settings = {
        startX: startX,
        startY: startY,
        endX: endX,
        endY: endY,
        width: w,
        endWidth: 0,
        alpha: 1,
        duration: Util.randomInt(.3, 1.2),
        color: Util.randomChoice(colors),
        endAlpha: 1
      };
      racr.createParticle(settings);
    }
  },

  explode: function (x, y) {
    if (typeof x == 'undefined') {
      x = racr.params.width / 2;
      y = racr.params.height / 2;
    }
    var ratio = racr.params.playerW / SPRITES.PLAYER_4.w;
    var dir = Util.randomInt(1, 360);
    var amount = Util.randomInt(10, 30);
    for (var i = 0; i < amount; i++) {
      var w = Util.randomInt(Math.round(10 * ratio), Math.round(30 * ratio));
      var spread = Util.randomInt(dir - 20, dir + 20);
      if (spread < 0) {
        spread = 360 + spread;
      }
      if (spread > 360) {
        spread = 0 + spread;
      }

      var distance = Util.randomInt(10 * ratio, 60 * ratio);

      var endX = x + (distance * Math.cos(spread));
      var endY = y + (distance * Math.sin(spread));

      var settings = {
        startX: x,
        startY: y,
        width: w,
        endX: endX,
        endY: endY,
        endWidth: 0,
        duration: Util.randomInt(.3, 1.2),
        distance: distance,
        direction: spread,
        color: '#660000',
        endColor: '#ffff00',
        alpha: 1,
        endAlpha: 1,
        onTop: true
      };
      racr.createParticle(settings);
    }
  },

  pixels: [],
  depixelate: function () {
    racr.pixels = [];
    var w = Math.ceil(racr.params.width > racr.params.height ? racr.params.width / 50 : racr.params.height / 50);
    if (w < 20) {
      w = 20;
    }
    var endWidth = w * .1; //  .7;
    var cols = Math.ceil(racr.params.width / w);
    var rows = Math.ceil(racr.params.height / w);
    var settings;
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var x = c * w;
        var y = r * w;
        var timing = 0;
        if (r < rows / 2) {
          timing = timing + (c * 10) + (r * 40);
        } else {
          timing = timing + ((cols - c) * 10) + ((rows - r) * 40);
        }
        var p = {
          startX: x,
          startY: y,
          endX: x + (w - endWidth) / 2,
          endY: y + (w - endWidth) / 2,
          width: w,
          endWidth: endWidth,
          color: '#1f1f1f',
          endColor: '#00adef',
          timing: 1000 + timing,
          alpha: 1,
          endAlpha: 0
        };
        racr.createPixel(p);
      }
    }
  },

  pixelate: function () {
    racr.pixels = [];
    var maxTimeout = 0;
    var w = Math.ceil(racr.params.width > racr.params.height ? racr.params.width / 50 : racr.params.height / 50);
    if (w < 20) {
      w = 20;
    }
    var endWidth = w * .1; // .7;
    var cols = Math.ceil(racr.params.width / w);
    var rows = Math.ceil(racr.params.height / w);
    var settings;
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var x = c * w;
        var y = r * w;
        var timing = 500;
        if (r < rows / 2) {
          timing = timing + (c * 10) + (r * 40);
        } else {
          timing = timing + ((cols - c) * 10) + ((rows - r) * 40);
        }
        if (timing > maxTimeout) {
          maxTimeout = timing;
        }
        var p = {
          startX: x + (w - endWidth) / 2,
          startY: y + (w - endWidth) / 2,
          endX: x,
          endY: y,
          width: endWidth,
          endWidth: w,
          endColor: '#1f1f1f',
          color: '#00adef',
          timing: timing,
          alpha: 0,
          endAlpha: 1
        };
        racr.createPixel(p);
      }
    }
    return maxTimeout;
  },

  createPixel: function (settings) {
    var p = {
      x: settings.startX,
      y: settings.startY,
      width: settings.width,
      alpha: settings.alpha,
      color: settings.color,
      animate: true
    };
    p.draw = function () {
      racr.ctx.globalAlpha = p.alpha;
      racr.ctx.beginPath();
      racr.ctx.rect(p.x, p.y, p.width, p.width);
      racr.ctx.fillStyle = p.color;
      racr.ctx.fill();
      racr.ctx.closePath();
      racr.ctx.globalAlpha = 1;
    };
    anime({
      targets: p,
      x: [settings.startX, settings.endX],
      y: [settings.startY, settings.endY],
      width: [settings.width, settings.endWidth],
      alpha: [settings.alpha, settings.endAlpha],
      color: [settings.color, settings.endColor],
      duration: 800,
      delay: settings.timing,
      easing: 'easeOutQuart',
      complete: function () {
        p.animate = settings.endAlpha == 1;
      }
    });
    racr.pixels.push(p);
  },

    ampel: function() {
      TweenLite.to(racr.dom.ampel.outer, 2, {
        opacity: 1,
        ease: Power3.easeOut,
        onComplete: function() {
          var on = 0;
          var ampelInterval = setInterval(function() {
            if (on == racr.dom.ampel.lights.length) {
              clearInterval(ampelInterval);
              // racr.sound('countIn', true, 'go');
              for (var i = 0; i < racr.dom.ampel.lights.length; i++) {
                var light = racr.dom.ampel.lights.eq(i);
                light.addClass('go');
                racr.circleExplode(light.offset().left + light.width()/2, (light.offset().top - racr.racer.offset().top) + light.height()/2);
              }
              racr.params.gameStart = true;
              $('#nos-mobile-btn').removeClass('hidden');
              if (racr.params.controlMode === 'arcade') { racr.goTo('U'); }
              if (racr.params.currentLapTime < 1) {
                // Game.playMusic();
              }
              TweenLite.to(racr.dom.ampel.outer, .3, {
                opacity: 0
              });
            } else {
              var light = racr.dom.ampel.lights.eq(on);
              light.addClass('on');
              // racr.sound('countIn', true, 'count');
              sound.countdown.play();
              racr.circleExplode(light.offset().left + light.width()/2, (light.offset().top - racr.racer.offset().top) + light.height()/2);
              on++;
            }
          }, 1000);
        }
      })
    },

  getQueryParams: function () {
    var obj = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    if (racr.queryParams.mode === 'sim') {
      racr.params.controlMode = 'sim';
      racr.params.centrifugal = racr.params.simCentrifugal;
    }
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      obj[pair[0]] = decodeURIComponent(pair[1]);
    }
    racr.queryParams = $.extend({}, racr.queryParams, obj);
  },

  //=========================================================================
  // THE GAME LOOP
  //=========================================================================

  reset: function (options) {
    racr.params.maxSpeed = racr.params.segmentLength / (racr.params.step * 2);// top speed (ensure we can't move more than 1 segment in a single frame to make collision detection easier)
    racr.params.accel = racr.params.maxSpeed / 5;             // acceleration rate - tuned until it 'felt' right
    racr.params.breaking = -racr.params.maxSpeed * 3; // even stronger braking
    racr.params.decel = -racr.params.maxSpeed / 5;             // 'natural' deceleration rate when neither accelerating, nor braking
    racr.params.offRoadDecel = -racr.params.maxSpeed / 2;             // off road deceleration is somewhere in between
    racr.params.offRoadLimit = racr.params.maxSpeed / 4;             // limit when off road deceleration no longer applies (e.g. you can always go at least this speed even when off road)

    options = options || {};
    // canvas.width = racr.params.width = Util.toInt(options.width, racr.params.width);
    // canvas.height = racr.params.height = Util.toInt(options.height, racr.params.height);
    racr.params.lanes = Util.toInt(options.lanes, racr.params.lanes);
    racr.params.roadWidth = Util.toInt(options.roadWidth, racr.params.roadWidth);
    racr.params.cameraHeight = Util.toInt(options.cameraHeight, racr.params.cameraHeight);
    racr.params.drawDistance = Util.toInt(options.drawDistance, racr.params.drawDistance);
    racr.params.fogDensity = Util.toInt(options.fogDensity, racr.params.fogDensity);
    racr.params.fieldOfView = Util.toInt(options.fieldOfView, racr.params.fieldOfView);
    racr.params.segmentLength = Util.toInt(options.segmentLength, racr.params.segmentLength);
    racr.params.rumbleLength = Util.toInt(options.rumbleLength, racr.params.rumbleLength);
    racr.params.cameraDepth = 1 / Math.tan((racr.params.fieldOfView / 2) * Math.PI / 180);
    racr.params.playerZ = (racr.params.targetCameraHeight * racr.params.cameraDepth);
    racr.params.resolution = racr.params.height / 480;

    if ((racr.segments.length === 0) || (options.segmentLength) || (options.rumbleLength))
      racr.resetRoad(); // only rebuild road when necessary
  },

  toggleControlMode: function() {
    if (racr.params.controlMode === 'arcade') {
      racr.params.controlMode = 'sim';
      racr.params.centrifugal = racr.params.simCentrifugal;
      if (racr.params._laneTween) { racr.params._laneTween.kill(); }
      racr.params.playerX = 0;
      racr.params.steerAmount = 0;
      racr.params.steerLeft = false;
      racr.params.steerRight = false;
      racr.params.keyFaster = false;
      racr.params.keySlower = false;
      racr.params.keyLeft = false;
      racr.params.keyRight = false;
      racr.showModeIndicator('SIM');
    } else {
      racr.params.controlMode = 'arcade';
      racr.params.centrifugal = racr.params.arcadeCentrifugal;
      if (racr.params._laneTween) { racr.params._laneTween.kill(); }
      racr.params.playerX = 0;
      racr.params.steerAmount = 0;
      racr.params.steerLeft = false;
      racr.params.steerRight = false;
      racr.params.keyFaster = false;
      racr.params.keySlower = false;
      racr.params.keyLeft = false;
      racr.params.keyRight = false;
      racr.showModeIndicator('ARCADE');
    }
  },

  showModeIndicator: function(mode) {
    var indicator = document.getElementById('mode-indicator');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.id = 'mode-indicator';
      indicator.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);color:white;font-size:48px;font-family:Arial,sans-serif;font-weight:bold;text-shadow:0 0 20px rgba(0,173,239,0.8);pointer-events:none;z-index:9999;opacity:0;transition:opacity 0.3s;';
      document.body.appendChild(indicator);
    }
    indicator.textContent = mode;
    indicator.style.opacity = '1';
    setTimeout(function() { indicator.style.opacity = '0'; }, 1500);
  },
  
  activateNitrous: function() {
    if (!racr.params.gameStart || racr.params.gameOver || !racr.params.begin) return;
    if (racr.params.nitrousActive || racr.params.nitrousCooldown) return;
    if (racr.params.nitrousActive || racr.params.nitrousCooldown) return;
    racr.params.nitrousActive = true;
    racr.params.nitrousCooldown = true;
    racr.params.lastNitrousTime = Date.now();
    // Play nitro sound
    if (sound.nitro) sound.nitro.play();
    // Save original maxSpeed, accel, and FOV
    racr.params._originalMaxSpeed = racr.params.maxSpeed;
    racr.params._originalAccel = racr.params.accel;
    racr.params._originalFieldOfView = racr.params.fieldOfView;
    // Animate FOV to 150 (1.5x) over 0.4s
    animateFOV(125, 800);
    // Boost maxSpeed and accel
    racr.params.maxSpeed = racr.params.maxSpeed * 2;
    racr.params.accel = racr.params.accel * 2;
    setTimeout(function() {
      racr.params.nitrousActive = false;
      // Restore original maxSpeed and accel
      racr.params.maxSpeed = racr.params._originalMaxSpeed;
      racr.params.accel = racr.params._originalAccel;
      // Animate FOV back to 100 over 0.4s
      animateFOV(100, 1000);
      setTimeout(function() {
        racr.params.nitrousCooldown = false;
      }, 5000); // 5 seconds cooldown
    }, 2500); // 2.5 seconds active
  }
};

//=========================================================================
$(function () {
  racr.init();
  // racr.finishGame();
});

// DEBUG: Show leaderboard and fetch data on page load
$(document).ready(function() {
  $.ajax({
    url: racr.params.api,
    type: 'GET',
    dataType: 'json',
    success: function(r) {
      var html = "<tr><th>Place</th><th>Name</th><th>Time</th></tr>";
      $.each(r, function(i, o) {
        html += '<tr><td>'+(i+1)+'</td><td class="leaderboard_name_wrapper"><div class="leaderboard_name">'+(o.username ? o.username.slice(0, 20) : '')+'</div></td><td class="leaderboard_time_wrapper"><div class="leaderboard_time">'+(o.score !== undefined ? o.score : '')+'<div></td></tr>';
      });
      $("#leaderboard").html(html);
      $("#table_wrap").addClass("active");
    }
  });
});