'use strict';

let units = 'imperial';
let city = 'Austin';

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let amPM;

  if (hours > 12) {
    hours -= 12;
    amPM = 'pm';
  } else {
    amPM = 'am';
  }

  const day = days[date.getDay()];
  return `${day} ${hours}:${minutes} ${amPM}`;
}

function displayTemperature(response) {
  const cityElement = document.getElementById('city');
  const temperatureElement = document.getElementById('temperature');
  const descriptionElement = document.getElementById('description');
  const humidityElement = document.getElementById('humidity');
  const windElement = document.getElementById('wind');
  const dateElement = document.getElementById('date');
  const iconElement = document.getElementById('icon');

  cityElement.textContent = response.data.name;
  temperatureElement.textContent = Math.round(response.data.main.temp);
  descriptionElement.textContent = response.data.weather[0].description;
  humidityElement.textContent = response.data.main.humidity;
  windElement.textContent = Math.round(response.data.wind.speed);
  dateElement.textContent = formatDate(response.data.dt * 1000);
  iconElement.src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
}

function search(city) {
  const apiKey = '204af6a06d59739ba0c43dfe8c56a8ca';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  city = document.getElementById('city-input').value;
  search(city);
}

function changeUnits(event) {
  event.preventDefault();
  const windUnitsElement = document.getElementById('wind-units');

  if (units === 'metric') {
    units = 'imperial';
    windUnitsElement.textContent = ' mph';
    celciusLink.classList.remove('disabled');
    fahrenheitLink.classList.add('disabled');
  } else if (units === 'imperial') {
    units = 'metric';
    windUnitsElement.textContent = ' km/h';
    celciusLink.classList.add('disabled');
    fahrenheitLink.classList.remove('disabled');
  }
  search(city);
}

function changeToImperial(event) {
  event.preventDefault();
  const windUnitsElement = document.getElementById('wind-units');

  units = 'imperial';
  windUnitsElement.textContent = ' mph';
  celciusLink.classList.remove('disabled');
  fahrenheitLink.classList.add('disabled');

  search(city);
}

function changeToMetric(event) {
  event.preventDefault();
  const windUnitsElement = document.getElementById('wind-units');

  units = 'metric';
  windUnitsElement.textContent = ' km/h';
  celciusLink.classList.add('disabled');
  fahrenheitLink.classList.remove('disabled');
  search(city);
}

const form = document.getElementById('search-form');
form.addEventListener('submit', handleSubmit);

const fahrenheitLink = document.getElementById('fahrenheit-link');
fahrenheitLink.addEventListener('click', changeToImperial);

const celciusLink = document.getElementById('celcius-link');
celciusLink.addEventListener('click', changeToMetric);

search(city);
