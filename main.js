let map;
let weatherMarker;
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#yr').textContent = `${new Date().getFullYear()}`;
});
function initializeMap(lat, lon){
    if(!map){
        map = L.map('map').setView([lat, lon], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);
}
else{
    map.setView([lat, lon], 10)
}

if(weatherMarker){
    weatherMarker.remove();
}
}
// get weather icon
function getWeatherIcon(id){
if(id === 8000) return '☀️';
if(id >= 200 && id <= 232) return '☔️';
if(id >= 300 && id <= 321) return '🌩';
if(id >= 500 && id <= 531) return '⛈';
if(id >= 600 && id <= 622) return '☁️';
if(id >= 701 && id <= 781) return '⛅️';
if(id >= 801 && id <= 804) return '⛅️';
return '⭐️';
}

// get the weather
function getWeather(){
const city = document.getElementById('cityInput').value;
const apiKey = '9b92b20a5ccb1cbf2a7aae74091bcf75';
const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${apiKey}`;
console.log(url); // Log the URL for debugging
fetch(url)
.then(response => response.json())
.then(data => {
    console.log(data)
    if(data.cod === 200){
        const weatherIcon = getWeatherIcon(data.weather[0].id);
        document.querySelector('#weatherInfo').innerHTML = `
                    <p>Ville: ${data.name}</p>
                    <p>Température: ${data.main.temp} °C ${weatherIcon}</p>
                    <p>Météo: ${data.weather[0].description}</p>
                    <p>Humidité: ${data.main.humidity}%</p>
                `;

        initializeMap(data.coord.lat, data.coord.lon);
        weatherMarker = L.marker([data.coord.lat, data.coord.lon]).addTo(map)
        .bindPopup(`Meteo ${data.weather[0].description} ${weatherIcon}`)
        .openPopup();
    }
    else{
        document.getElementById('weatherInfo').innerHTML = `<p> Je n'ai pas pu trouver la ville </p>`;
    }
})
.catch((error)=> {
    console.error('Error fetching weather data:', error);
    document.getElementById('weatherInfo').innerHTML = `<p> erreur lors de la récupération des données météo</p>`;

})
}