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
