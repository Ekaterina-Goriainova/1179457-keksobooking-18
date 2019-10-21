'use strict';

(function () {
  var mapActive = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');

  var setFormEnabled = function () {
    for (var j = 0; j < window.form.setFieldset.length; j++) {
      window.form.setFieldset[j].removeAttribute('disabled');
    }
  };

  var makeSiteActive = function () {
    mapActive.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.pin.similarPins.appendChild(window.pin.fragment);
    setFormEnabled();
    window.form.getMainAddress();
    window.form.onApartmentTypeChange();
    window.form.apartmentPrice.setAttribute('required', 'true');
    window.form.setGuestNumber();
  };

  window.map = {
    mapActive: mapActive,
    makeSiteActive: makeSiteActive
  };
})();
