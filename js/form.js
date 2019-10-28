'use strict';

(function () {
  var PIN_MAIN = {
    width: 65,
    height: 65,
    offset: 32,
    offsetPin: 20
  };
  var TYPE_PRICE = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };
  var mapRestrict = {
    X: {
      MIN: 0,
      MAX: 1200
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  };

  var mainPin = document.querySelector('.map__pin--main');

  var listenerMainPin = function (evt) {
    if (evt.keyCode === window.util.KEY_ENTER) {
      window.map.makeSiteActive();
    } else {
      window.map.makeSiteActive();
    }
    mainPin.removeEventListener('mousedown', listenerMainPin, false);
    mainPin.removeEventListener('keydown', listenerMainPin, false);
  };
  mainPin.addEventListener('mousedown', listenerMainPin, false);
  mainPin.addEventListener('keydown', listenerMainPin, false);

  var setFieldset = document.querySelectorAll('fieldset');
  var apartmentTimeIn = document.querySelector('#timein');
  var apartmentTimeOut = document.querySelector('#timeout');
  var numberGuests = document.querySelector('#capacity');
  var numberRooms = document.querySelector('#room_number');
  var apartmentType = document.querySelector('#type');
  var apartmentPrice = document.querySelector('#price');
  var apartmentTitle = document.querySelector('#title');

  apartmentTitle.setAttribute('required', 'true');

  var synhronField = function (field01, field02) {
    field01.value = field02.value;
  };
  var onTimeOutChange = function () {
    synhronField(apartmentTimeIn, apartmentTimeOut);
  };
  var onTimeInChange = function () {
    synhronField(apartmentTimeOut, apartmentTimeIn);
  };
  var onGuestsChange = function () {
    if (numberRooms.value < numberGuests.value) {
      numberRooms.setCustomValidity('Должно быть минимум ' + numberGuests.value + ' комнаты');
    } else if (parseInt(numberGuests.value, 10) === 0) {
      numberGuests.setCustomValidity('Выберите какое-то количество гостей!');
    } else {
      numberGuests.setCustomValidity('');
      numberRooms.setCustomValidity('');
    }
  };
  var onApartmentTypeChange = function () {
    var selectedType = apartmentType.value;
    var minPrice = TYPE_PRICE[selectedType];
    apartmentPrice.setAttribute('placeholder', minPrice);
    apartmentPrice.setAttribute('min', minPrice);
    apartmentPrice.setAttribute('max', 1000000);
  };

  var setGuestNumber = function () {
    var selectedRooms = parseInt(numberRooms.value, 10);
    numberGuests.value = numberRooms.value;
    if (selectedRooms === 100) {
      numberGuests.value = '0';
    }
  };

  var mainPinAddress = document.querySelector('#address');

  var getMainAddress = function () {
    var pinMainX = mainPin.style.left;
    var pinMainY = mainPin.style.top;
    pinMainX = parseInt(pinMainX, 10);
    pinMainY = parseInt(pinMainY, 10);

    if (window.map.mapActive.classList.contains('map--faded')) {
      pinMainX = parseInt(pinMainX, 10) + PIN_MAIN.offset;
      pinMainY = parseInt(pinMainY, 10) + PIN_MAIN.offset;
    } else {
      pinMainX = parseInt(pinMainX, 10) + PIN_MAIN.offset;
      pinMainY = parseInt(pinMainY, 10) + PIN_MAIN.height + PIN_MAIN.offsetPin;
    }

    mainPinAddress.setAttribute('value', pinMainX + ', ' + pinMainY);
    mainPinAddress.setAttribute('readonly', 'true');
  };
  var setFormDesabled = function () {
    for (var j = 0; j < setFieldset.length; j++) {
      setFieldset[j].setAttribute('disabled', 'disabled');
    }
    getMainAddress();
  };

  numberRooms.addEventListener('change', onGuestsChange);
  numberGuests.addEventListener('change', onGuestsChange);
  apartmentTimeIn.addEventListener('change', onTimeInChange);
  apartmentTimeOut.addEventListener('change', onTimeOutChange);
  apartmentType.addEventListener('change', onApartmentTypeChange);
  setFormDesabled();


  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      window.card.markupCardDelite();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var mainPinSet = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };
      var MapField = {
        minX: mapRestrict.X.MIN - PIN_MAIN.width / 2,
        maxX: mapRestrict.X.MAX - PIN_MAIN.width / 2,
        minY: mapRestrict.Y.MIN - PIN_MAIN.height - PIN_MAIN.offsetPin,
        maxY: mapRestrict.Y.MAX - PIN_MAIN.height - PIN_MAIN.offsetPin
      };

      if (mainPinSet.x >= MapField.minX && mainPinSet.x <= MapField.maxX) {
        mainPin.style.left = mainPinSet.x + 'px';
      }
      if (mainPinSet.y >= MapField.minY && mainPinSet.y <= MapField.maxY) {
        mainPin.style.top = mainPinSet.y + 'px';
      }
      var mainPinCoords = {
        mainPinX: mainPinSet.x + 'px',
        mainPinY: mainPinSet.y + 'px'
      };

      getMainAddress(mainPinCoords);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.form = {
    setGuestNumber: setGuestNumber,
    onApartmentTypeChange: onApartmentTypeChange,
    apartmentPrice: apartmentPrice,
    getMainAddress: getMainAddress,
    setFieldset: setFieldset,
    setFormDesabled: setFormDesabled
  };
})();
