'use strict';

(function () {
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var similarPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  var renderPin = function (pins) {
    var pinElement = similarPinTemplate.cloneNode(true);
    var pinImg = pinElement.querySelector('img');

    pinImg.src = pins.author.avatar;

    pinImg.alt = pins.offer.title;

    pinElement.style = ('left: ' + pins.location.x + 'px; top: ' + pins.location.y + 'px;');

    return pinElement;
  };

  var markupPin = function (pins) {
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }
    similarPins.appendChild(fragment);
  };

  window.pin = {
    fragment: fragment,
    markupPin: markupPin,
    renderPin: renderPin,
    similarPins: similarPins
  };
})();
