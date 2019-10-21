'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var tempArray = window.data.makeSimilarOfferArray(window.data.OFFERS_NEARBY);
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var similarPins = document.querySelector('.map__pins');

  var renderPin = function (pin) {
    var pinElement = similarPinTemplate.cloneNode(true);
    var pinImg = pinElement.querySelector('img');
    var pinLocation = window.data.makeSimilarOffer();

    pinImg.src = pin.author.avatar;

    pinImg.alt = pin.offer.title;

    pinElement.style = ('left: ' + pinLocation.location.x + 'px; top: ' + pinLocation.location.y + 'px;');

    return pinElement;
  };

  for (var i = 0; i < window.data.OFFERS_NEARBY; i++) {
    fragment.appendChild(renderPin(tempArray[i]));
  }

  window.pin = {
    fragment: fragment,
    tempArray: tempArray,
    similarPins: similarPins
  };
})();
