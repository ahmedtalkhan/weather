const apiKey = '6853fed3fc8b48b48ee43158242506';
const apiUrl = 'https://api.weatherapi.com/v1/forecast.json';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const forecastContainer = document.getElementById('forecast');

locationInput.addEventListener('DOMContentLoaded', () => {
  const location = locationInput.value.trim();
  if (location) {
    fetchWeather(location);
  } else {
    fetchWeather('cairo');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  fetchWeather('cairo');
});


function fetchWeather(location) {
  const url = `${apiUrl}?key=${apiKey}&q=${location}&days=3`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      locationElement.textContent = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
      displayForecast(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

function displayForecast(data) {
  forecastContainer.innerHTML = '';
  data.forecast.forecastday.forEach((day, index) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const date = new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' });
    const avgTemp = `Temp: ${Math.round(day.day.avgtemp_c)}°C`;
    const conditionText = day.day.condition.text;
    const conditionIcon = day.day.condition.icon;


    if (index === 0) {
      card.innerHTML = `
        <h3>${date} ${day.date}</h3>
        <h3>${data.current.temp_c}</h3>
        <p>${conditionText}</p>
        <img src="https:${conditionIcon}" alt="${conditionText}">
      `;
    } else {
      card.innerHTML = `
        <h3>${date}</h3>
        <p>${avgTemp}</p>
        <p>${conditionText}</p>
        <img src="https:${conditionIcon}" alt="${conditionText}">
      `;
    }

    forecastContainer.appendChild(card);
  });
}
