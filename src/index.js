//day & time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[today];

let today = document.querySelector("#date");
today.innerHTML = `${
  days[now.getDay()]
}, ${now.getHours()}:${now.getMinutes()}`;

//search
function searchCityName(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name");
  let inputCity = document.querySelector("#search-city");
  console.log(inputCity.value);
  city.innerHTML = inputCity.value;

  let searchCity = document.querySelector("#search-city");
  let apiKey = "318b89d1d3da782c38977be3d7f1cedb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=metric`;

  function showTemp(response) {
    console.log(response.data);
    let cityName = response.data.name;
    let currentTemp = Math.round(response.data.main.temp);
    let cityElement = document.querySelector("#city-name");
    cityElement.innerHTML = cityName;
    let tempElement = document.querySelector("#temperature");
    tempElement.innerHTML = `${currentTemp}°C`;
  }
  axios.get(apiUrl).then(showTemp);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCityName);

// units F °C  Buttons

let getFahrenheit = document.querySelector("#fahrenheit-link");
let getCelsius = document.querySelector("#celsius-link");
let temperature = document.querySelector(".temperature");

getFahrenheit.addEventListener("click", function (event) {
  event.preventDefault();
  if (getFahrenheit.innerHTML === "°F") {
    temperature.innerHTML = "50ºF ☀️";
  }
});

getCelsius.addEventListener("click", function (event) {
  event.preventDefault();
  if (getCelsius.innerHTML === "°C") {
    temperature.innerHTML = "10ºC ☀️";
  }
});
