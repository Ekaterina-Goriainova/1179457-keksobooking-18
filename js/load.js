'use strict';

(function () {
  var SUCCESS_STATUS = 200;
  var TIMEOUT = 10000;

  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var METHOD_LOAD = 'GET';
  var METHOD_UPLOAD = 'POST';

  var loadData = function (method, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, url);
    xhr.send(data);
  };

  var sendData = function (onSuccess, onError, data) {
    loadData(METHOD_UPLOAD, URL_UPLOAD, onSuccess, onError, data);
  };

  var getData = function (onSuccess, onError) {
    loadData(METHOD_LOAD, URL_LOAD, onSuccess, onError);
  };

  window.load = {
    sendData: sendData,
    getData: getData,
    loadData: loadData
  };
})();
