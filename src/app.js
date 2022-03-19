//Display the current date and time using JavaScript: Tuesday 16:00

let now = new Date();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let monthNameData = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let monthName = monthNameData[now.getMonth()];
let dayName = weekdays[now.getDay()];
let date = now.getDate();
let yearnumber = now.getFullYear();
let hour = now.getHours();
let minutes = now.getMinutes();

let realDate = document.querySelector("#hourInfo");
realDate.innerHTML = `${hour}:${minutes} - ${dayName}, ${date} ${monthName}, ${yearnumber}`;

// when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.

let realCity = document.querySelector("#city-form");
realCity.addEventListener("submit", handleSubmit);

function CitySearch(city) {
  let apiKey = "4ef94b768e7d2f21afad485d2138b2d7";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(DefaultTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityResult = document.querySelector("#search-engine");
  CitySearch(cityResult.value);
}

function DefaultTemperature(response) {
  let CurrentCity = response.data.name;
  let CityName = document.querySelector("h2");
  CityName.innerHTML = `${CurrentCity}`;
  let temperature = Math.round(response.data.main.temp);
  let heading = document.querySelector("h1");
  heading.innerHTML = `${temperature}°C`;
  let humidity = Math.round(response.data.main.humidity);
  let humidity_value = document.querySelector("#humidity-value");
  humidity_value.innerHTML = `${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let wind_value = document.querySelector("#wind-value");
  wind_value.innerHTML = `${wind} mph`;
  let AirPressure = response.data.main.pressure;
  let AirPressureValue = document.querySelector("#airpressure-value");
  AirPressureValue.innerHTML = `${AirPressure}mb`;
  let weather_description = response.data.weather[0].main;
  let weather_descriptionAxio = document.querySelector("#DescriptionWeather");
  weather_descriptionAxio.innerHTML = `${weather_description}`;
  let iconElement = document.querySelector(".real-main-icon");
  iconElement.setAttribute(
    "src",
    `media/Exported/${response.data.weather[0].icon}.svg`
  );
  celsiusTemperature = response.data.main.temp;
  getForecast(response.data.coord);
}

//Pa Hacerlo Bonito al Empezar

function StartingTemp(position) {
  let latitude = 51.7197711;
  let longitude = -1.9648097;
  let apiKey = "4ef94b768e7d2f21afad485d2138b2d7";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(DefaultTemperature);
}
StartingTemp();

// Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.

function navigatorActioning(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(StartingPosition);
}

function StartingPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "4ef94b768e7d2f21afad485d2138b2d7";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(CurrentValues);
}

function CurrentValues(response) {
  let CurrentTemperature = Math.round(response.data.main.temp);
  let heading = document.querySelector("h1");
  heading.innerHTML = `${CurrentTemperature}°C`;
  let CurrentCity = response.data.name;
  let CityName = document.querySelector("h2");
  CityName.innerHTML = `${CurrentCity}`;
  let humidity = Math.round(response.data.main.humidity);
  let humidity_value = document.querySelector("#humidity-value");
  humidity_value.innerHTML = `${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let wind_value = document.querySelector("#wind-value");
  wind_value.innerHTML = `${wind} mph`;
  let AirPressure = response.data.main.pressure;
  let AirPressureValue = document.querySelector("#airpressure-value");
  AirPressureValue.innerHTML = `${AirPressure}mb`;
  let weather_description = response.data.weather[0].main;
  let weather_descriptionAxio = document.querySelector("#DescriptionWeather");
  weather_descriptionAxio.innerHTML = `${weather_description}`;
  let iconElement = document.querySelector(".real-main-icon");
  iconElement.setAttribute(
    "src",
    `media/Exported/${response.data.weather[0].icon}.svg`
  );
  getForecast(response.data.coord);
}

let GeoCity = document.querySelector(".default-button");
GeoCity.addEventListener("click", navigatorActioning);

// Fahrenheit Function

let celsiusTemperature = null;

function FahrenheitFunction() {
  let checkbox = document.querySelector('input[type="checkbox"]');
  if (checkbox.checked == true) {
    let farenheitDisplay = document.querySelector("h1");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    farenheitDisplay.innerHTML = Math.round(fahrenheitTemperature) + "°F";
  } else {
    let farenheitDisplay = document.querySelector("h1");
    fahrenheitTemperature = celsiusTemperature;
    farenheitDisplay.innerHTML = Math.round(celsiusTemperature) + "°C";
  }
}

// Forecast JS

function forecastDayFormat(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row next-days-info">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2 left-weekdays">
              <div class="day-1-day">
                ${forecastDayFormat(forecastDay.dt)}
                <br />
                <img
                  class="day-1-icon"
                  src="media/Exported/${forecastDay.weather[0].icon}.svg"
                />
                <br />
                <span class="day-1-max-temperature"> ${Math.round(
                  forecastDay.temp.max
                )}°C </span>
                <span class="day-1-min-temperature">  ${Math.round(
                  forecastDay.temp.min
                )}°C</span>
              </div>
            </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Getting Forecast API

function getForecast(coordinates) {
  let apiKey = "4ef94b768e7d2f21afad485d2138b2d7";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}
