// ------------------- модальное окно ----------------------
var modal = document.querySelector(".modal");

if (modal) {
  var form = modal.querySelector(".add__form");
  // var oneLink, i;
  var modalLinks = document.querySelectorAll(".hit__order-button");
  if (modalLinks.length == 0) {
    var modalLinks = document.querySelectorAll(".product__add");
  }

  for (var i = 0; i < modalLinks.length; i++) {
      var oneLink = modalLinks[i];
      oneLink.addEventListener('click', function (evt) {
          console.log('oneLink');
              evt.preventDefault();
              modal.classList.remove("js-class__remove");
              form.focus();
              form.addEventListener("submit", function(evt) {
                modal.classList.add("js-class__remove");
              });
        });
  }

  //  скрыть по эскейпу
  window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      modal.classList.add("js-class__remove");
    }
  });
}
