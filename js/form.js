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
  var MAX_PRICE = 100000;
  var DEFAULT_MAINPIN = {
    X: 602,
    Y: 407
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

  var onFormFocus = function () {
    window.card.markUpCardDelete();
  };
  document.querySelector('.notice').addEventListener('focus', onFormFocus, true);

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

  var setMainPinListener = function () {
    mainPin.addEventListener('mousedown', listenerMainPin, false);
    mainPin.addEventListener('keydown', listenerMainPin, false);
  };

  setMainPinListener();

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
    apartmentPrice.setAttribute('max', MAX_PRICE);
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
  var setFormDisabled = function () {
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
  setFormDisabled();

  var successMsgTemp = document.querySelector('#success').content.querySelector('.success');
  var errorMsgTemp = document.querySelector('#error').content.querySelector('.error');
  var formSubmit = document.querySelector('.ad-form');

  formSubmit.addEventListener('submit', function (evt) {
    window.load.sendData(onSuccessSubmit, onErrorSubmit, new FormData(formSubmit));
    evt.preventDefault();
  });

  var onMessageCall = function (msgTemp) {
    var cloneElement = msgTemp.cloneNode(true);
    window.map.blockMain.insertBefore(cloneElement, window.map.blockMain.children[0]);

    var onMessageSubmit = function (evt) {
      var onSubmit = function () {
        evt.preventDefault();
        cloneElement.remove();
      };
      if (evt.keyCode === window.util.KEY_ESC) {
        onSubmit(cloneElement);
        document.removeEventListener('keydown', onMessageSubmit);
      }
      onSubmit(cloneElement);
    };

    document.addEventListener('keydown', onMessageSubmit);
    cloneElement.addEventListener('mousedown', onMessageSubmit);
  };

  var onSuccessSubmit = function () {
    onMessageCall(successMsgTemp);
    makeSiteReset();
  };
  var onErrorSubmit = function () {
    onMessageCall(errorMsgTemp);
  };

  var userForm = document.querySelector('.ad-form');
  var mapForm = document.querySelector('.map__filters');

  var makeSiteReset = function () {
    var pinList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var pinListArray = Array.from(pinList);
    userForm.reset();
    mapForm.reset();
    for (var i = 0; i < pinListArray.length; i++) {
      pinListArray[i].remove();
    }
    window.map.adForm.classList.add('ad-form--disabled');
    window.map.mapActive.classList.add('map--faded');
    setFormDisabled();
    mainPin.style = ('left: ' + (DEFAULT_MAINPIN.X - PIN_MAIN.offset) + 'px; top: ' + (DEFAULT_MAINPIN.Y - PIN_MAIN.offset) + 'px;');
    mainPinAddress.setAttribute('value', DEFAULT_MAINPIN.X + ', ' + DEFAULT_MAINPIN.Y);
    setMainPinListener();
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      window.card.markUpCardDelete();

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
    setFormDisabled: setFormDisabled
  };
})();
