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

let realCity = document.querySelector("#city-form");
realCity.addEventListener("submit", CitySearch);

function CitySearch(event) {
  event.preventDefault();
  let city = document.querySelector(".main-city");
  let cityResult = document.querySelector("#search-engine");
  city.innerHTML = cityResult.value;
  let apiKey = "4ef94b768e7d2f21afad485d2138b2d7";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityResult.value}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(DefaultTemperature);
}
function DefaultTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let heading = document.querySelector("h1");
  heading.innerHTML = `${temperature}°C`;
}

function StartingTemp(position) {
  let latitude = 51.7197711;
  let longitude = -1.9648097;
  let apiKey = "4ef94b768e7d2f21afad485d2138b2d7";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(DefaultTemperature);
}
StartingTemp();

function navigatorActioning(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(StartingPosition);
}

function StartingPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "4ef94b768e7d2f21afad485d2138b2d7";
  let apiURL = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(CurrentValues);
}

function CurrentValues(response) {
  let CurrentTemperature = Math.round(response.data.main.temp);
  let heading = document.querySelector("h1");
  heading.innerHTML = `${CurrentTemperature}°C`;
  let CurrentCity = response.data.name;
  let CityName = document.querySelector("h2");
  CityName.innerHTML = `${CurrentCity}`;
}
