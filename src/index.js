function currentDate() {
  let date = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  let currentMin = date.getMinutes();

  return `${currentDay} ${currentHour} : ${currentMin}`;
}

let currentDates = document.querySelector("#date");

currentDates.innerHTML = currentDate();

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = `${Math.round(
    response.data.main.temp
  )} °C`;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city_input").value;
  searchCity(city);
}

function currentLocation(position) {
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function getcurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let searchName = document.querySelector("#city_form");

searchName.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getcurrentLocation);
