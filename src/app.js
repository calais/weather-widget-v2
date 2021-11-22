'use strict';

function displayTemperature(response) {
  console.log(response.data);
  let cityElement = document.querySelector('#city');
  let temperatureElement = document.querySelector('#temperature');
  let descriptionElement = document.querySelector('#description');
  let humidityElement = document.querySelector('#humidity');
  let windElement = document.querySelector('#wind');

  humidityElement.innerHTML = response.data.main.humidity;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}
let apiKey = '204af6a06d59739ba0c43dfe8c56a8ca';
let city = 'Austin';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
