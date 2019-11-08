'use strict';

(function () {
  var PINS_MAX = 5;

  var pinsData = [];
  var mapActive = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');

  var onSuccess = function (pins) {
    pinsData = pins;
    window.pin.markupPin(pinsData.slice(0, PINS_MAX));
    return pinsData;
  };

  var setSelectedFilters = function () {
    var filteredPins = pinsData.filter(function (filteredData) {
      return window.filter.getFiltersSelect(filteredData);
    });

    return filteredPins.slice(0, PINS_MAX);
  };

  var markupPinsDelete = function () {
    var pinList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var pinListArray = Array.from(pinList);
    for (var i = 0; i < pinListArray.length; i++) {
      pinListArray[i].remove();
    }
  };

  var onOffersReload = function () {
    markupPinsDelete();
    window.card.markupCardDelete();
    window.pin.markupPin(setSelectedFilters());
  };

  window.filter.mapFilters.addEventListener('change', function (evt) {
    if (evt.target.name !== 'features') {
      window.filter.FilteringOffers[evt.target.name](evt.target.value);
    }
    window.util.debounce(onOffersReload);
  });

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

  window.map = {
    adForm: adForm,
    blockMain: blockMain,
    mapActive: mapActive,
    makeSiteActive: makeSiteActive
  };
})();
