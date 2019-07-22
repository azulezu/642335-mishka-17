var mapURL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1998.6036253003151!2d30.320858716146023!3d59.9387191690541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4696310fca145cc1%3A0x62740c0ffcd8a91f!2z0JHQvtC70YzRiNCw0Y8g0JrQvtC90Y7RiNC10L3QvdCw0Y8g0YPQuy4sIDE5LzgsIDEwMSwg0KHQsNC90LrRgi3Qn9C10YLQtdGA0LHRg9GA0LMsIDE5MTE4Ng!5e0!3m2!1sru!2sru!4v1563467615859!5m2!1sru!2sru";
var map = document.querySelector(".map");

var isNoError = false;
var isTimeout = false;
// интервалы от балды в msec
var TOO_FAST = 200;
var BIG_TIMEOUT = 2000;

// msec от начала загрузки стр.
var fromStart = performance.now();

if (map) {
  var mapImg = map.querySelector(".map__img");
  var mapiFrame = document.querySelector(".map__iframe");

// если слишком быстро - считаем, что фрейм
// карту не загружал, ошибка
var iframeError = setTimeout(function() {
  isNoError = true;
  console.log(performance.now() - fromStart);
  console.log('быстрый таймер isNoError=' + isNoError + "\n\n");
}, TOO_FAST);

// если долго загружается - ошибка
  var iframeTimeout = setTimeout(function() {
    isTimeout = true;
    console.log(performance.now() - fromStart);
    console.log('таймаут isTimeout=' + isTimeout + "\n\n");
  }, BIG_TIMEOUT);

// после загрузки сбрасываем таймеры и если
// таймер быстрой загрузки успел сработать,
// а таймер таймаута - нет - считаем, что фрейм норм.
  mapiFrame.addEventListener('load', function() {
    clearTimeout(iframeError);
    clearTimeout(iframeTimeout);
    console.log(performance.now() - fromStart);
    console.log(' isNoError=' + isNoError);
    console.log(' isTimeout=' + isTimeout);
    console.log('загрузилось ' + mapiFrame.src + "\n\n");
    if (!isTimeout & isNoError) {
      mapImg.classList.add("js-hide");
      console.log('спрятать ');
    }
  })

  mapiFrame.src = mapURL;
}
