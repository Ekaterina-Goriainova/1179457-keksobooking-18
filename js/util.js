'use strict';

(function () {
  var KEY_ENTER = 13;
  var KEY_ESC = 27;
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;
  var debounce = function (cb) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  window.util = {
    debounce: debounce,
    getRandomNumber: getRandomNumber,
    KEY_ENTER: KEY_ENTER,
    KEY_ESC: KEY_ESC
  };
})();
