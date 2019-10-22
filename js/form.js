'use strict';

(function () {
  var KEY_ENTER = 13;

  var PIN_MAIN = {
    width: 65,
    height: 65,
    offset: 32,
    offsetPin: 22
  };
  
  var TYPE_PRICE = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  var mainPin = document.querySelector('.map__pin--main');
  mainPin.addEventListener('mousedown', function () {
    window.map.makeSiteActive();
  });
  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_ENTER) {
      window.map.makeSiteActive();
    }
  });
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
  var getMainAddress = function () {
    var pinMainX = mainPin.style.left;
    var pinMainY = mainPin.style.top;
    var mainPinAddress = document.querySelector('#address');
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

  window.form = {
    setGuestNumber: setGuestNumber,
    onApartmentTypeChange: onApartmentTypeChange,
    apartmentPrice: apartmentPrice,
    getMainAddress: getMainAddress,
    setFieldset: setFieldset,
    setFormDesabled: setFormDesabled
  };
})();
