'use strict';

(function () {
  var pinsData = [];
  var mapActive = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');

  var onSuccess = function (pins) {
    pinsData = pins;
    window.pin.markupPin(pinsData.slice(0, PINS_MAX));
    return pinsData;
  };

  var blockMain = document.querySelector('main');
  var onError = function (errorText) {
    var msgErrorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = msgErrorTemplate.cloneNode(true);
    var msgError = errorElement.querySelector('.error__message');
    msgError.innerHTML = errorText;

    blockMain.insertBefore(errorElement, blockMain.children[0]);

    var clickESC = function (evt) {
      evt.preventDefault();
      if (evt.keyCode === window.util.KEY_ESC) {
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

  // Отображение 5-ти меток

  var PINS_MAX = 5;

  var mapFilters = document.querySelector('.map__filters');
  var selectorType = mapFilters.querySelector('#housing-type');
  var markupPinsDelete = function () {
    var pinList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var pinListArray = Array.from(pinList);
    for (var i = 0; i < pinListArray.length; i++) {
      pinListArray[i].remove();
    }
  };

  var onTypeChange = function () {
    var filteredPins = pinsData.filter(function (filteredData) {
      markupPinsDelete();
      window.card.markupCardDelete();
      if (selectorType.value === 'any') {
        window.pin.markupPin(pinsData.slice(0, PINS_MAX));
      }
      return filteredData.offer.type === selectorType.value;
    });

    window.pin.markupPin(filteredPins.slice(0, PINS_MAX));

    return filteredPins;
  };

  selectorType.addEventListener('change', onTypeChange);

  //

  window.map = {
    adForm: adForm,
    blockMain: blockMain,
    mapActive: mapActive,
    makeSiteActive: makeSiteActive
  };
})();
