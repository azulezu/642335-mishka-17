// ------------------- модальное окно ----------------------
var navMain = document.querySelector(".main-nav");

if (navMain) {
  var navToggle = navMain.querySelector(".main-nav__toggle");

  navMain.classList.remove("main-nav--nojs");
  navMain.classList.add("main-nav--closed");

  navToggle.addEventListener("click", function(evt) {
    navMain.classList.toggle("main-nav--closed");
  });
}
