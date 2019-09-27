'use strict';

var offersNearby = 8;

var types = ['palace', 'flat', 'house', 'bungalo'];
var checkTimes = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var pfotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

var getRandomElementFromArray = function(arr) {
  return arr[Math.round((arr.length - 1) * Math.random())];
};

var createRandomLengthArray  = function(arr) {
  var randomArr = [];

  for (var i = 0; i < arr.length - 1; i++) {
    var pushToArr = (pushToArr) ? (Math.round(Math.random())) : randomArr.push(arr[i]);
  }
  return randomArr;
};

var createOffersArray = function(count) {
  var offersArray = [];

  for (var i = 1; i < count; i++) {
    var randomOffer = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: 'Title',
        address: '600, 350',
        price: 1000,
        type: getRandomElementFromArray(types),
        rooms: createRandomLengthArray,
        guests: 2 * createRandomLengthArray,
        checkin: getRandomElementFromArray(checkTimes),
        checkout: getRandomElementFromArray(checkTimes),
        features: createRandomLengthArray(features),
        description: 'description',
        photos: createRandomLengthArray(photos)
      },
      location: {
        x: Math.round(mapPins.offsetWidth * Math.random()),
        y: 130 + Math.round(500 * Math.random())
      }
    };

    offersArray.push(randomOffer);
  }
  return offersArray;
};

var renderPin = function (offer) {
  var pinElement = mapPinTemplate.cloneNode(true);
  var pinElementImage = pinElement.querySelector('img');

  pinElement.style = 'left: ' + (offer.location.x - 25) + 'px; top: ' + (offer.location.y - 70) + 'px;';
  pinElementImage.src = offer.author.avatar;
  pinElementImage.alt = offer.offer.description;

  return pinElement;
};

var createPins = function(arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPin(arr[i]));
  }

  mapPins.appendChild(fragment);
};

var map = document.querySelector('.map');

map.classList.remove('map--faded');

var offers = createOffersArray(offersNearby);
createPins(offers);
