'use strict';

(function () {
  var OFFERS_NEARBY = 8;
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

  var types = ['palace', 'flat', 'house', 'bungalo'];
  var checkTimes = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  window.data = {
    OFFERS_NEARBY: OFFERS_NEARBY,
    AVATAR_SRC: AVATAR_SRC,
    TITLE: TITLE,
    DESCRIPTION: DESCRIPTION,
    ADDRESS_OFFER: ADDRESS_OFFER,
    PRICE_OFFER: PRICE_OFFER,
    ROOM_OFFER: ROOM_OFFER,
    GUEST_OFFER: GUEST_OFFER,
    types: types,
    checkTimes: checkTimes,
    features: features,
    photos: photos,

    makeSimilarOffer: function (count) {
      var addressOfferX = window.util.getRandomNumber(ADDRESS_OFFER.x.min, ADDRESS_OFFER.x.max);
      var addressOfferY = window.util.getRandomNumber(ADDRESS_OFFER.y.min, ADDRESS_OFFER.y.max);
      var priceOffer = Math.round(window.util.getRandomNumber(PRICE_OFFER.min, PRICE_OFFER.max) / 100) * 100;
      var featuresArray = Object.values(features).slice(0, window.util.getRandomNumber(1, Object.keys(features).length + 1));
      var typeOffer = Object.values(types)[window.util.getRandomNumber(0, Object.keys(types).length)];
      var avatarOffer = AVATAR_SRC + count + '.png';
      var checkInOffer = Object.values(checkTimes)[window.util.getRandomNumber(0, Object.keys(checkTimes).length)];
      var checkOutOffer = Object.values(checkTimes)[window.util.getRandomNumber(0, Object.keys(checkTimes).length)];
      var photosArray = Object.values(photos).slice(0, window.util.getRandomNumber(1, Object.keys(photos).length + 1));

      return {
        'author': {
          'avatar': avatarOffer
        },
        'offer': {
          'title': TITLE[count - 1],
          'address': addressOfferX + ', ' + addressOfferY,
          'price': priceOffer,
          'type': typeOffer,
          'rooms': window.util.getRandomNumber(ROOM_OFFER.min, ROOM_OFFER.max),
          'guests': window.util.getRandomNumber(GUEST_OFFER.min, GUEST_OFFER.max),
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
    },
    makeSimilarOfferArray: function () {
      var offersArrays = [];

      for (var i = 1; i <= OFFERS_NEARBY; i++) {
        offersArrays.push(window.data.makeSimilarOffer(i));
      }

      return offersArrays;
    }
  };
})();
