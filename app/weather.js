const API_KEY = "241051bf13976dd3ddf8b8d9f247255e";
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?"; //openweathermap 

const weather = document.querySelector(".js-weather .weather__text");


//coords used together with the shape attribute to specify the size, shape, and placement of an area.
function getWeather(coords) { //get coordinates
  fetch(
    `${WEATHER_API}lat=${coords.lat}&lon=${  //latitude and longitude.
      coords.lng 
    }&appid=${API_KEY}&units=metric`
  )
    .then(response => response.json())
    .then(json => {
      const name = json.name;
      const temperature = json.main.temp;
      weather.innerHTML = `${Math.floor(temperature)}&#176 @ ${name}`; //"degrees" and "@" location
    });
}

//latitude and longitude
function handleGeoSuccess(position) { 
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const coords = {
    lat,
    lng
  };
  localStorage.setItem("coords", JSON.stringify(coords));
  getWeather(coords);
}

//load weather (degrees)
function showWeather() {
  const currentCoords = localStorage.getItem("coords");
  if (currentCoords !== null) {
    const parsedCoords = JSON.parse(currentCoords);
    getWeather(parsedCoords);
    return;
  } else {
    navigator.geolocation.getCurrentPosition(
      handleGeoSuccess,
      
    );
  }
}

function init() {
  showWeather();
}

init();