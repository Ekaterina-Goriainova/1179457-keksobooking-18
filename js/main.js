'use strict';

var OFFERS_NEARBY = 8;
var KEY_ENTER = 13;
var AVATAR_SRC = 'img/avatars/user0';
var TITLE = ['Title 01', 'Title 02', 'Title 03', 'Title 04', 'Title 05', 'Title 06', 'Title 07', 'Title 08'];
var DESCRIPTION = ['Description 01', 'Description 02', 'Description 03', 'Description 04', 'Description 05', 'Description 06', 'Description 07', 'Description 08'];

var ADDRESS_OFFER = {
  x: {
    min: 150,
    max: 800
  },
  y: {
    min: 130,
    max: 630
  }
};

var PRICE_OFFER = {
  min: 1500,
  max: 7500
};

var ROOM_OFFER = {
  min: 1,
  max: 5
};

var GUEST_OFFER = {
  min: 1,
  max: 4
};

var PIN_MAIN = {
  width: 65,
  height: 65,
  offset: 32,
  offsetPin: 22
};

var types = ['palace', 'flat', 'house', 'bungalo'];

// минимальная цена по типу жилья
var TYPE_PRICE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalo': 0
};

var checkTimes = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// функция для генерации случайных чисел
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// подобные объявления
var makeSimilarOffer = function (count) {
  var addressOfferX = getRandomNumber(ADDRESS_OFFER.x.min, ADDRESS_OFFER.x.max);
  var addressOfferY = getRandomNumber(ADDRESS_OFFER.y.min, ADDRESS_OFFER.y.max);
  var priceOffer = Math.round(getRandomNumber(PRICE_OFFER.min, PRICE_OFFER.max) / 100) * 100;
  var featuresArray = Object.values(features).slice(0, getRandomNumber(1, Object.keys(features).length + 1));
  var typeOffer = Object.values(types)[getRandomNumber(0, Object.keys(types).length)];
  var avatarOffer = AVATAR_SRC + count + '.png';
  var checkInOffer = Object.values(checkTimes)[getRandomNumber(0, Object.keys(checkTimes).length)];
  var checkOutOffer = Object.values(checkTimes)[getRandomNumber(0, Object.keys(checkTimes).length)];
  var photosArray = Object.values(photos).slice(0, getRandomNumber(1, Object.keys(photos).length + 1));

  return {
    'author': {
      'avatar': avatarOffer
    },
    'offer': {
      'title': TITLE[count - 1],
      'address': addressOfferX + ', ' + addressOfferY,
      'price': priceOffer,
      'type': typeOffer,
      'rooms': getRandomNumber(ROOM_OFFER.min, ROOM_OFFER.max),
      'guests': getRandomNumber(GUEST_OFFER.min, GUEST_OFFER.max),
      'checkin': checkInOffer,
      'checkout': checkOutOffer,
      'features': featuresArray,
      'description': DESCRIPTION[count - 1],
      'photos': photosArray
    },
    'location': {
      'x': addressOfferX,
      'y': addressOfferY
    }
  };
};

// функция для создания массива из 8 сгенерированных объектов similarOffer
var makeSimilarOfferArray = function () {
  var offersArrays = [];

  for (var i = 1; i <= OFFERS_NEARBY; i++) {
    offersArrays.push(makeSimilarOffer(i));
  }

  return offersArrays;
};

// добавление новых элементов
var similarPins = document.querySelector('.map__pins');
// шаблон добавляемых элементов
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// функция заполнения блока DOM-элементами на основе массива JS-объектов
var renderPin = function (pin) {
  var pinElement = similarPinTemplate.cloneNode(true);
  var pinImg = pinElement.querySelector('img');
  var pinLocation = makeSimilarOffer();

  pinImg.src = pin.author.avatar;

  pinImg.alt = pin.offer.title;

  pinElement.style = ('left: ' + pinLocation.location.x + 'px; top: ' + pinLocation.location.y + 'px;');

  return pinElement;
};

// функция создания DOM-элемента на основе JS-объекта
var fragment = document.createDocumentFragment();
var tempArray = makeSimilarOfferArray(OFFERS_NEARBY);

for (var i = 0; i < OFFERS_NEARBY; i++) {
  fragment.appendChild(renderPin(tempArray[i]));
}

// функция добавления полям формы атрибута 'disabled'
var setFormDisabled = function () {
  var setFieldset = document.querySelectorAll('fieldset');
  for (var j = 0; j < setFieldset.length; j++) {
    setFieldset[j].setAttribute('disabled', 'disabled');
  }
};

setFormDisabled();

// функция удаления у полей формы атрибута 'disabled'
var setFormEnabled = function () {
  var setFieldset = document.querySelectorAll('fieldset');
  for (var j = 0; j < setFieldset.length; j++) {
    setFieldset[j].removeAttribute('disabled');
  }
};

// перевод карты и формы в активное состояние
var mapActive = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');

var makeSiteActive = function () {
  mapActive.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  similarPins.appendChild(fragment);
  setFormEnabled();
  getMainAddress();
  // onChangeRooms(numberRooms, numberGuests);
  onChangeApartmentType();
  apartmentTitle.setAttribute('required', 'true');
  apartmentPrice.setAttribute('required', 'true');
  setGuestNumber();
};

mainPin.addEventListener('mousedown', function () {
  makeSiteActive();
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_ENTER) {
    makeSiteActive();
  }
});

// записываем по умолчанию - координаты центра пина, при активации страницы - острия указателя
var getMainAddress = function () {
  var pinMainX = mainPin.style.left;
  var pinMainY = mainPin.style.top;
  pinMainX = parseInt(pinMainX, 10);
  pinMainY = parseInt(pinMainY, 10);

  if (mapActive.classList.contains('map--faded')) {
    pinMainX = parseInt(pinMainX, 10) + PIN_MAIN.offset;
    pinMainY = parseInt(pinMainY, 10) + PIN_MAIN.offset;
  } else {
    pinMainX = parseInt(pinMainX, 10) + PIN_MAIN.offset;
    pinMainY = parseInt(pinMainY, 10) + PIN_MAIN.height + PIN_MAIN.offsetPin;
  }

  var mainPinAddress = document.querySelector('#address');
  mainPinAddress.setAttribute('value', pinMainX + ', ' + pinMainY);
  mainPinAddress.setAttribute('readonly', 'true');
};
getMainAddress();

// room_number - кол-во комнат, capacity - кол-во гостей
var numberGuests = document.querySelector('#capacity');
var numberRooms = document.querySelector('#room_number');

// функция автоматической установки максимального кол-ва гостей при изменении кол-ва комнат
var setGuestNumber = function () {
  var selectedRooms = parseInt(numberRooms.value, 10);
  numberGuests.value = numberRooms.value;
  if (selectedRooms === 100) {
    numberGuests.value = '0';
  }
};

// валидация максимального количества гостей зависящее от количества комнат
var onChangeGuests = function () {
  if (numberRooms.value < numberGuests.value) {
    numberRooms.setCustomValidity('Должно быть минимум ' + numberGuests.value + ' комнаты');
  } else if (parseInt(numberGuests.value, 10) === 0) {
    numberGuests.setCustomValidity('Выберите какое-то количество гостей!');
  } else {
    numberGuests.setCustomValidity('');
    numberRooms.setCustomValidity('');
  }
};

// поля формы, проверяемые на корректность воодимых данных
var apartmentType = document.querySelector('#type');
var apartmentPrice = document.querySelector('#price');
var apartmentTitle = document.querySelector('#title');
var apartmentTimeIn = document.querySelector('#timein');
var apartmentTimeOut = document.querySelector('#timeout');

// функция валидации минимальной/максимальной цены и установки значения в placeholder по типу жилья
var onChangeApartmentType = function () {
  var selectedType = apartmentType.value;
  var minPrice = TYPE_PRICE[selectedType];
  apartmentPrice.setAttribute('placeholder', minPrice);
  apartmentPrice.setAttribute('min', minPrice);
  apartmentPrice.setAttribute('max', 1000000);
};

// синхронизация времени заезда/выезда
var synhronField = function (field01, field02) {
  field01.value = field02.value;
};

var onChangeTimeOut = function () {
  synhronField(apartmentTimeIn, apartmentTimeOut);
};

var onChangeTimeIn = function () {
  synhronField(apartmentTimeOut, apartmentTimeIn);
};

// подписка на события в полях формы
numberRooms.addEventListener('change', onChangeGuests);
numberGuests.addEventListener('change', onChangeGuests);
apartmentTimeIn.addEventListener('change', onChangeTimeIn);
apartmentTimeOut.addEventListener('change', onChangeTimeOut);
apartmentType.addEventListener('change', onChangeApartmentType);
