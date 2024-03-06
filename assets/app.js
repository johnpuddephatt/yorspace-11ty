/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./_resources/js/app.js":
/*!******************************!*\
  !*** ./_resources/js/app.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var simpleslider = __webpack_require__(/*! simple-slider */ "./node_modules/simple-slider/dist/simpleslider.js");

var sliders = document.querySelectorAll('.slider');

if (sliders) {
  sliders.forEach(function (slider) {
    console.log(slider);
    simpleslider.getSlider({
      container: slider,
      duration: 1.5,
      delay: 5,
      prop: 'opacity',
      unit: '',
      init: 0,
      show: 1,
      end: 0
    });
  });
}

;

(function () {
  // Get all the <h3> headings
  var headings = document.querySelectorAll('.section--faqs h3');
  Array.prototype.forEach.call(headings, function (heading) {
    // Give each <h3> a toggle button child
    // with the SVG plus/minus icon
    heading.innerHTML = "\n      <button aria-expanded=\"false\">\n        ".concat(heading.textContent, "\n        <svg width=\"46\" height=\"46\" viewBox=\"0 0 46 46\">\n          <path fill=\"#83D6C1\" stroke=\"#0D1D48\" stroke-width=\"4\" stroke-miterlimit=\"10\" d=\"M32.1 23.1v16.2l-14-8.1L4 23.1l14.1-8.2 14-8.1z\"/>\n        </svg>\n\n      </button>\n    "); // Function to create a node list
    // of the content between this <h3> and the next

    var getContent = function getContent(elem) {
      var elems = [];

      while (elem.nextElementSibling && elem.nextElementSibling.tagName !== 'H3') {
        elems.push(elem.nextElementSibling);
        elem = elem.nextElementSibling;
      } // Delete the old versions of the content nodes


      elems.forEach(function (node) {
        node.parentNode.removeChild(node);
      });
      return elems;
    }; // Assign the contents to be expanded/collapsed (array)


    var contents = getContent(heading); // Create a wrapper element for `contents` and hide it

    var wrapper = document.createElement('div');
    wrapper.hidden = true; // Add each element of `contents` to `wrapper`

    contents.forEach(function (node) {
      wrapper.appendChild(node);
    }); // Add the wrapped content back into the DOM
    // after the heading

    heading.parentNode.insertBefore(wrapper, heading.nextElementSibling); // Assign the button

    var btn = heading.querySelector('button');

    btn.onclick = function () {
      // Cast the state as a boolean
      var expanded = btn.getAttribute('aria-expanded') === 'true' || false; // Close all others if this one isn't open

      if (!expanded) {
        wrapper.parentNode.querySelectorAll('div').forEach(function (node) {
          node.hidden = true;
        });
        wrapper.parentNode.querySelectorAll('button').forEach(function (btn) {
          btn.setAttribute('aria-expanded', false);
        });
      } // Switch the state


      btn.setAttribute('aria-expanded', !expanded); // Switch the content's visibility

      wrapper.hidden = expanded;
    };
  });
})();
/*
** Trailer on film pages
*/


var trailerContainer = document.querySelector('.single-listing--trailer');
var trailerIframe = document.querySelector('.single-listing--trailer--iframe');
var trailerButton = document.querySelector('.trailer-button');
var closeTrailerButton = document.querySelector('.close-trailer-button');

if (trailerButton) {
  var trailerID = trailerButton.dataset.iframe;
}

if (trailerID) {
  var tag = document.createElement('script');
  tag.src = "//www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady = function () {
    youtubePlayer = new YT.Player(trailerIframe, {
      height: '390',
      width: '640',
      videoId: trailerID,
      events: {
        'onReady': onPlayerReady
      }
    });
  };

  if (window.innerHeight > window.innerWidth) {
    trailerIframe.style.width = '100%';
  } else {
    trailerIframe.style.width = '75%';
  }

  trailerIframe.style.height = trailerIframe.clientWidth * (9 / 16) + 'px';
} // 4. The API will call this function when the video player is ready.


window.onPlayerReady = function (event) {
  connectTrailerButton();
  trailerButton.classList.add('loaded');
};

function connectTrailerButton() {
  var playing = false;
  trailerButton.addEventListener('click', function () {
    trailerContainer.classList.add('lights-out');
    youtubePlayer.playVideo();
    document.body.classList.add('locked');
    trailerButton.blur();
    playing = true;
  });
  closeTrailerButton.addEventListener('click', function () {
    if (playing) {
      closeVideo();
    }
  });
}

function closeVideo() {
  trailerContainer.classList.remove('lights-out');
  document.body.classList.remove('locked');
  youtubePlayer.stopVideo();
  trailerButton.blur();
  playing = false;
} // Trigger trailer close when escape is pressed


document.addEventListener('keyup', function (event) {
  if (event.defaultPrevented) {
    return;
  }

  var key = event.key || event.keyCode;

  if (key === 'Escape' || key === 'Esc' || key === 27) {
    closeVideo();
  }
});

/***/ }),

/***/ "./_resources/scss/app.scss":
/*!**********************************!*\
  !*** ./_resources/scss/app.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/simple-slider/dist/simpleslider.js":
/*!*********************************************************!*\
  !*** ./node_modules/simple-slider/dist/simpleslider.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function getdef(val, def) {
    return val == null ? def : val;
  }

  function len(arr) {
    return arr.length;
  }

  function startSlides(containerElem, children, unit, startVal, visVal, trProp) {
    var style = void 0,
        imgs = [];

    if (!children) {
      children = containerElem.children;
    }

    var i = len(children);

    while (--i >= 0) {
      imgs[i] = children[i];
      style = imgs[i].style;
      style.position = 'absolute';
      style.top = style.left = style.zIndex = 0;
      style[trProp] = startVal + unit;
    }

    style[trProp] = visVal + unit;
    style.zIndex = 1;

    return imgs;
  }

  function defaultEase(time, begin, change, duration) {
    return (time = time / (duration / 2)) < 1 ? change / 2 * time * time * time + begin : change / 2 * ((time -= 2) * time * time + 2) + begin;
  }

  function getSlider(options) {
    options = options || {};
    var actualIndex = void 0,
        interval = void 0,
        intervalStartTime = void 0,
        imgs = void 0,
        remainingTime = void 0;

    var containerElem = getdef(options.container, document.querySelector('*[data-simple-slider]'));
    var trProp = getdef(options.prop, 'left');
    var trTime = getdef(options.duration, 0.5) * 1000;
    var delay = getdef(options.delay, 3) * 1000;
    var unit = getdef(options.unit, '%');
    var startVal = getdef(options.init, -100);
    var visVal = getdef(options.show, 0);
    var endVal = getdef(options.end, 100);
    var paused = options.paused;
    var ease = getdef(options.ease, defaultEase);
    var onChange = getdef(options.onChange, 0);
    var onChangeEnd = getdef(options.onChangeEnd, 0);
    var now = Date.now;

    function reset() {
      if (len(containerElem.children) > 0) {
        var style = containerElem.style;
        style.position = 'relative';
        style.overflow = 'hidden';
        style.display = 'block';

        imgs = startSlides(containerElem, options.children, unit, startVal, visVal, trProp);
        actualIndex = 0;
        remainingTime = delay;
      }
    }

    function setAutoPlayLoop() {
      intervalStartTime = now();
      interval = setTimeout(function () {
        intervalStartTime = now();
        remainingTime = delay;

        change(nextIndex());

        setAutoPlayLoop();
      }, remainingTime);
    }

    function resume() {
      if (isAutoPlay()) {
        if (interval) {
          clearTimeout(interval);
        }

        setAutoPlayLoop();
      }
    }

    function isAutoPlay() {
      return !paused && len(imgs) > 1;
    }

    function pause() {
      if (isAutoPlay()) {
        remainingTime = delay - (now() - intervalStartTime);
        clearTimeout(interval);
        interval = 0;
      }
    }

    function reverse() {
      var newEndVal = startVal;
      startVal = endVal;
      endVal = newEndVal;
      actualIndex = Math.abs(actualIndex - (len(imgs) - 1));
      imgs = imgs.reverse();
    }

    function change(newIndex) {
      var count = len(imgs);
      while (--count >= 0) {
        imgs[count].style.zIndex = 1;
      }

      imgs[newIndex].style.zIndex = 3;
      imgs[actualIndex].style.zIndex = 2;

      anim(imgs[actualIndex].style, visVal, endVal, imgs[newIndex].style, startVal, visVal, trTime, 0, 0, ease);

      actualIndex = newIndex;

      if (onChange) {
        onChange(prevIndex(), actualIndex);
      }
    }

    function next() {
      change(nextIndex());
      resume();
    }

    function prev() {
      change(prevIndex());
      resume();
    }

    function nextIndex() {
      var newIndex = actualIndex + 1;
      return newIndex >= len(imgs) ? 0 : newIndex;
    }

    function prevIndex() {
      var newIndex = actualIndex - 1;
      return newIndex < 0 ? len(imgs) - 1 : newIndex;
    }

    function dispose() {
      clearTimeout(interval);
      document.removeEventListener('visibilitychange', visibilityChange);

      imgs = containerElem = interval = trProp = trTime = delay = startVal = endVal = paused = actualIndex = remainingTime = onChange = onChangeEnd = null;
    }

    function currentIndex() {
      return actualIndex;
    }

    function anim(insertElem, insertFrom, insertTo, removeElem, removeFrom, removeTo, transitionDuration, startTime, elapsedTime, easeFunc) {
      function setProp(elem, from, to) {
        elem[trProp] = easeFunc(elapsedTime - startTime, from, to - from, transitionDuration) + unit;
      }

      if (startTime > 0) {
        if (elapsedTime - startTime < transitionDuration) {
          setProp(insertElem, insertFrom, insertTo);
          setProp(removeElem, removeFrom, removeTo);
        } else {
          insertElem[trProp] = insertTo + unit;
          removeElem[trProp] = removeTo + unit;

          if (onChangeEnd) {
            onChangeEnd(actualIndex, nextIndex());
          }
          return;
        }
      }

      requestAnimationFrame(function (time) {
        if (startTime === 0) {
          startTime = time;
        }

        anim(insertElem, insertFrom, insertTo, removeElem, removeFrom, removeTo, transitionDuration, startTime, time, easeFunc);
      });
    }

    function visibilityChange() {
      if (document.hidden) {
        pause();
      } else {
        resume();
      }
    }

    document.addEventListener('visibilitychange', visibilityChange);
    reset();

    if (imgs && len(imgs) > 1) {
      resume();
    }

    return {
      currentIndex: currentIndex,
      pause: pause,
      resume: resume,
      nextIndex: nextIndex,
      prevIndex: prevIndex,
      next: next,
      prev: prev,
      change: change,
      reverse: reverse,
      dispose: dispose
    };
  }

  exports.getSlider = getSlider;
});

/***/ }),

/***/ 0:
/*!***************************************************************!*\
  !*** multi ./_resources/js/app.js ./_resources/scss/app.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/johnpuddephatt/Sites/yorspace/_resources/js/app.js */"./_resources/js/app.js");
module.exports = __webpack_require__(/*! /Users/johnpuddephatt/Sites/yorspace/_resources/scss/app.scss */"./_resources/scss/app.scss");


/***/ })

/******/ });