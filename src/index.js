function showCurrentDate(element) {
  let currentDate = new Date();

  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = weekDays[currentDate.getDay()];
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let message = (element.innerHTML = `${day}, ${hours}:${minutes}`);
  return message;
}

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = temperature;
}

function updateCity(event) {
  event.preventDefault();
  let cityName = document.querySelector(".city-name");
  let cityInput = document.querySelector("#search-city-input");

  cityName.innerHTML = `${cityInput.value}`;

  let unit = "metric";
  let apiKey = "0213a5bacb9c127e38e1f86fb2b9741b";
  let endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=${unit}&appid=${apiKey}`;

  axios.get(endpoint).then(showTemperature);
}

function showTemperatureByLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=0213a5bacb9c127e38e1f86fb2b9741b`;
  axios.get(apiUrl).then(showTemperature);

  let locationName = document.querySelector(".city-name");
  locationName.innerHTML = "Your location temperature is...";
}

function getLocation(event) {
  navigator.geolocation.getCurrentPosition(showTemperatureByLocation);
}

let dateAndTime = document.querySelector(".current-day");
showCurrentDate(dateAndTime);

let searchCity = document.querySelector(".search-bar");
searchCity.addEventListener("submit", updateCity);

let currentButton = document.querySelector("#geolocation");
currentButton.addEventListener("click", getLocation);
