'use strict';

(function () {
  var similarCard = document.querySelector('.map__filters-container');
  var parentElement = similarCard.parentNode;

  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var renderCard = function (pins) {
    var cardElement = similarCardTemplate.cloneNode(true);

    var cardTitle = cardElement.querySelector('.popup__title');
    var cardAddress = cardElement.querySelector('.popup__text--address');
    var cardPrice = cardElement.querySelector('.popup__text--price');
    var cardType = cardElement.querySelector('.popup__type');
    var cardCapacity = cardElement.querySelector('.popup__text--capacity');
    var cardTime = cardElement.querySelector('.popup__text--time');
    var cardDescription = cardElement.querySelector('.popup__description');
    var cardAvatar = cardElement.querySelector('.popup__avatar');
    var cardCloseBtn = cardElement.querySelector('.popup__close');

    var types = {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    };

    cardTitle.textContent = pins.offer.title;
    cardAddress.textContent = pins.offer.address;
    cardPrice.textContent = pins.offer.price + ' \u20bd/ночь ';
    cardType.textContent = types[pins.offer.type];
    cardCapacity.textContent = pins.offer.rooms + ' комнат' + ((pins.offer.rooms > 1 && pins.offer.rooms < 4) ? 'ы' : 'а') + ' для ' + pins.offer.guests + ' гост' + ((pins.offer.guests > 1 && pins.offer.guests < 100) ? 'ей' : 'я');
    cardTime.textContent = ('Заезд после ' + pins.offer.checkin + ', выезд до ' + pins.offer.checkout);
    cardDescription.textContent = pins.offer.description;
    cardAvatar.src = pins.author.avatar;

    var setFeatures = function () {
      var cardFeatures = cardElement.querySelector('.popup__features');
      var defaultFeatures = cardFeatures.querySelectorAll('.popup__feature');

      for (var i = 0; i < defaultFeatures.length; i++) {
        defaultFeatures[i].remove(singleFeature);
      }

      for (var j = 0; j < pins.offer.features.length; j++) {
        var singleFeature = document.createElement('li');
        singleFeature.classList.add('popup__feature', 'popup__feature--' + pins.offer.features[j]);
        cardFeatures.appendChild(singleFeature);
      }
    };

    setFeatures();

    var setPhotos = function () {
      var cardPhotos = cardElement.querySelector('.popup__photos');
      var cardPhoto = cardPhotos.querySelector('.popup__photo');

      for (var i = 0; i < pins.offer.photos.length; i++) {
        cardPhoto.src = pins.offer.photos[i];
        var singlePhoto = cardElement.querySelector('.popup__photo').cloneNode(true);
        cardPhotos.appendChild(singlePhoto);
      }
      cardPhotos.removeChild(cardPhoto);
    };

    setPhotos();

    var onPopupClose = function (evt) {
      evt.preventDefault();
      cardElement.remove();
      cardCloseBtn.removeEventListener('click', onPopupClose);
    };
    cardCloseBtn.addEventListener('click', onPopupClose);

    var clickPopupESC = function (evt) {
      evt.preventDefault();
      document.removeEventListener('keydown', clickPopupESC);

      if (evt.keyCode === window.map.KEY_ESC) {
        cardElement.remove();
      }
    };
    document.addEventListener('keydown', clickPopupESC);

    return cardElement;
  };

  var markupCardDelete = function () {
    var cardPresent = document.querySelector('.map__card');
    if (cardPresent) {
      cardPresent.remove();
    }
  };

  var markupCard = function (pins) {
    markupCardDelete();
    parentElement.insertBefore(renderCard(pins), similarCard);
  };

  window.card = {
    markupCardDelete: markupCardDelete,
    markupCard: markupCard,
    similarCard: similarCard,
    renderCard: renderCard,
    parentElement: parentElement
  };
})();
