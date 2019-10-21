'use strict';

(function () {
  window.util = {

    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  };
})();
