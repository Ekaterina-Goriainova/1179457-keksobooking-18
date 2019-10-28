'use strict';

(function () {
  var KEY_ENTER = 13;
  var KEY_ESC = 27;

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    KEY_ENTER: KEY_ENTER,
    KEY_ESC: KEY_ESC
  };
})();
