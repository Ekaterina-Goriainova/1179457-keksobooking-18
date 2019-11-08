'use strict';

(function () {

  var mapFilters = document.querySelector('.map__filters');
  var selectorType = mapFilters.querySelector('#housing-type').value;
  var selectorPrice = mapFilters.querySelector('#housing-price');
  var selectorRooms = mapFilters.querySelector('#housing-rooms').value;
  var selectorGuests = mapFilters.querySelector('#housing-guests').value;
  var fieldsetFeatures = document.querySelector('#housing-features');
  var featureWIFI = fieldsetFeatures.querySelector('#filter-wifi');
  var featureDishwasher = fieldsetFeatures.querySelector('#filter-dishwasher');
  var featureParking = fieldsetFeatures.querySelector('#filter-parking');
  var featureWasher = fieldsetFeatures.querySelector('#filter-washer');
  var featureElevator = fieldsetFeatures.querySelector('#filter-elevator');
  var featureConditioner = fieldsetFeatures.querySelector('#filter-conditioner');

  var FilteringOffers = {
    'housing-type': function (evt) {
      selectorType = evt;
    },
    'housing-rooms': function (evt) {
      selectorRooms = evt;
    },
    'housing-price': function (evt) {
      selectorPrice = evt;
    },
    'housing-guests': function (evt) {
      selectorGuests = evt;
    }
  };
  var FilteringPrices = {
    'middle': {
      min: 10000,
      max: 50000
    },
    'low': {
      min: 0,
      max: 10000
    },
    'high': 50000
  };

  var selectFeatures = function (element, data) {
    return (data.offer.features.indexOf(element.value) !== -1) || (!element.checked);
  };

  var selectType = function (data) {
    return (data.offer.type === selectorType) || (selectorType === 'any');
  };

  var selectRooms = function (data) {
    return (data.offer.rooms.toString() === selectorRooms) || (selectorRooms === 'any');
  };

  var selectPrice = function (data) {
    if (selectorPrice === 'high') {
      return data.offer.price > FilteringPrices[selectorPrice];
    }
    if (selectorPrice === 'low') {
      return data.offer.price < FilteringPrices[selectorPrice].max;
    }
    if (selectorPrice === 'middle') {
      return data.offer.price >= FilteringPrices[selectorPrice].min &&
        data.offer.price <= FilteringPrices[selectorPrice].max;
    }
    return true;
  };

  var selectGuests = function (data) {
    return (data.offer.guests.toString() === selectorGuests) || (selectorGuests === 'any');
  };

  var getFiltersSelect = function (data) {
    return selectType(data) &&
      selectRooms(data) &&
      selectPrice(data) &&
      selectGuests(data) &&
      selectFeatures(featureWIFI, data) &&
      selectFeatures(featureDishwasher, data) &&
      selectFeatures(featureParking, data) &&
      selectFeatures(featureWasher, data) &&
      selectFeatures(featureElevator, data) &&
      selectFeatures(featureConditioner, data);
  };

  window.filter = {
    getFiltersSelect: getFiltersSelect,
    mapFilters: mapFilters,
    FilteringOffers: FilteringOffers
  };
})();
