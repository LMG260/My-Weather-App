//day & time
function formatDate(now) {
  let date = now.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let years = now.getFullYear();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = now.getMonth() + 1;
  if (months < 10) {
    months = `0${months}`;
  }
  return `${day} ${months}/${date}/${years} ${hours}:${minutes}`;
}

let now = new Date();
let dateTime = document.querySelector("#date");
dateTime.innerHTML = formatDate(now);

//search
function searchCityName(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name");
  let inputCity = document.querySelector("#search-city");
  city.innerHTML = inputCity.value;

  let searchCity = document.querySelector("#search-city");
  let apiKey = "318b89d1d3da782c38977be3d7f1cedb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=metric`;

  function showTemp(response) {
    let cityName = response.data.name;
    let currentTemp = Math.round(response.data.main.temp);
    let cityElement = document.querySelector("#city-name");
    let tempElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind-speed");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = Math.round(response.data.main.temp);

    cityElement.innerHTML = cityName;
    tempElement.innerHTML = `${currentTemp}°C`;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
  }
  axios.get(apiUrl).then(showTemp);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCityName);

//Current Location Button
function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "318b89d1d3da782c38977be3d7f1cedb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

// Units F °C  Buttons

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function displaycelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let button = document.querySelector("#button");
button.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displaycelsiusTemperature);

searchCityName("Cardiff");

//let getFahrenheit = document.querySelector("#fahrenheit-link");
//let getCelsius = document.querySelector("#celsius-link");
////let temperature = document.querySelector(".temperature");

//getFahrenheit.addEventListener("click", function (event) {
// event.preventDefault();
//if (getFahrenheit.innerHTML === "°F") {
//   temperature.innerHTML = "50ºF ☀️";
// }
//});

//getCelsius.addEventListener("click", function (event) {
// event.preventDefault();
// if (getCelsius.innerHTML === "°C") {
//   temperature.innerHTML = "10ºC ☀️";
// }
//});
