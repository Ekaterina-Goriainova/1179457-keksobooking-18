'use strict';

(function () {
  var KEY_ESC = 27;

  var mapActive = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');

  var onSuccess = function (pins) {
    window.pin.markupPin(pins);
  };

  var onError = function (errorText) {
    var msgErrorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = msgErrorTemplate.cloneNode(true);
    var blockMain = document.querySelector('main');
    var msgError = errorElement.querySelector('.error__message');
    msgError.innerHTML = errorText;

    // элемент error создается в блоке main, по тз
    blockMain.insertBefore(errorElement, blockMain.children[0]);

    var clickESC = function (evt) {
      evt.preventDefault();
      if (evt.keyCode === KEY_ESC) {
        errorElement.remove();
        document.removeEventListener('keydown', clickESC);
      }
    };

    var clickMouse = function (evt) {
      evt.preventDefault();
      errorElement.remove();
      document.removeEventListener('mousedown', clickMouse);
    };

    document.addEventListener('keydown', clickESC);
    document.addEventListener('mousedown', clickMouse);
  };

  var setFormEnabled = function () {
    for (var j = 0; j < window.form.setFieldset.length; j++) {
      window.form.setFieldset[j].removeAttribute('disabled');
    }
  };

  var makeSiteActive = function () {
    mapActive.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.load.getData(onSuccess, onError);
    setFormEnabled();
    window.form.getMainAddress();
    window.form.onApartmentTypeChange();
    window.form.apartmentPrice.setAttribute('required', 'true');
    window.form.setGuestNumber();
  };

  window.map = {
    mapActive: mapActive,
    makeSiteActive: makeSiteActive,
    KEY_ESC: KEY_ESC
  };
})();
