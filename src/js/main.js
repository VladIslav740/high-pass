//yandex map
function init() {
  var myMap = new ymaps.Map("map", {
    center: [55.76475574129317, 37.61976184996316],
    zoom: 14,
  });

  var myPlacemark = new ymaps.Placemark(
    [55.76950800575283, 37.63971509120011],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "../img/icon-placemark.svg",
      iconImageSize: [20, 20],
      iconImageOffset: [-17, -13],
    }
  );

  myMap.geoObjects.add(myPlacemark);

  myMap.controls.remove("geolocationControl");
  myMap.controls.remove("searchControl");
  myMap.controls.remove("trafficControl");
  myMap.controls.remove("typeSelector");
  myMap.controls.remove("fullscreenControl");
  myMap.controls.remove("zoomControl");
  myMap.controls.remove("rulerControl");
  myMap.behaviors.disable(["scrollZoom"]);
}

ymaps.ready(init);

//justValidate
new window.JustValidate(".contacts__form", {
  rules: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 20,
    },
  },
  colorWrong: "#FF3030",
  messages: {
    name: {
      required: "Вы не ввели имя",
      minLength: "Введите 2 и более символов",
      maxLength: "Запрещено вводить более 20 символов",
    },
    email: {
      email: "Недопустимый формат",
      required: "Вы не ввели e-mail",
    },
  },
});

new window.JustValidate(".about-us__form", {
  colorWrong: "#FF3030",
  messages: {
    email: {
      email: "Недопустимый формат",
      required: "Вы не ввели e-mail",
    },
  },
});

// burger
let burger = document.querySelector(".burger");
let menuClose = document.querySelector(".nav__close-btn");
let menu = document.querySelector(".nav");
let menuLinks = document.querySelectorAll(".nav__link");

burger.addEventListener("click", function () {
  menu.classList.add("nav--active");

  document.body.classList.add("stop-scroll");
});

menuClose.addEventListener("click", function () {
  menu.classList.remove("nav--active");

  document.body.classList.remove("stop-scroll");
});

menuLinks.forEach(function (element) {
  element.addEventListener("click", () => {
    menu.classList.remove("nav--active");

    document.body.classList.remove("stop-scroll");
  });
});

// search
let search = document.querySelector(".search");
let searchBtn = document.querySelector(".search__btn");
let searchClose = document.querySelector(".search__close-btn");

searchBtn.addEventListener("click", function () {
  search.classList.add("search--active");
});

searchClose.addEventListener("click", function () {
  search.classList.remove("search--active");
});
