'use strict';

(function () {
  var SUCCESS_STATUS = 200;
  var TIMEOUT = 10000;

  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var METHOD = 'GET';

  var loadData = function (method, url, onSuccess, onError) {
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
    xhr.send();
  };

  var getData = function (onSuccess, onError) {
    loadData(METHOD, LOAD_URL, onSuccess, onError);
  };

  window.load = {
    getData: getData,
    loadData: loadData
  };
})();