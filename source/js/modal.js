// ------------------- модальное окно ----------------------
var modal = document.querySelector(".modal");

if (modal) {
  var modal_link = document.querySelector(".hit__order-button");
  var form = modal.querySelector(".add__form");

  modal_link.addEventListener("click", function(evt) {
    evt.preventDefault();
    modal.classList.remove("js-class__remove");
    form.focus();
    form.addEventListener("submit", function(evt) {
      modal.classList.add("js-class__remove");
    });
  });

  //  скрыть по эскейпу
  window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      modal.classList.add("js-class__remove");
    }
  });
}
