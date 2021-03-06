
function searchCity(city) {

    let apiKey = "79d26871fe6a29e52dcc85af1af380ed";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    
    axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemp);
}

function updateCity(event) {
event.preventDefault();
let city = document.querySelector("#search-text-input").value

searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", updateCity);

let searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", updateCity);

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  
  forecast.forEach(function(forecastDay, index) {
  if (index <6) {

    forecastHTML = forecastHTML + `

    <div class="col-2">
      <div class="forecast-day" >
        ${formatDay(forecastDay.dt)}
      </div>
        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
                     alt=""
                     id="icon">
        <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">
        ${Math.round(forecastDay.temp.max)}</span>°
        |
        <span class="weather-forecast-temperature-min">
        ${Math.round(forecastDay.temp.min)}</span>°
        </div>
    </div>
  `;
}
forecastMinTemp = forecastDay.temp.min;
forecastMaxTemp = forecastDay.temp.Max;
  });

        forecastHTML = forecastHTML+ `</div>`;
        forecastElement.innerHTML = forecastHTML;
}


function getForecast(coordinates) {
  
  let apiKey = "79d26871fe6a29e52dcc85af1af380ed";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {

document.querySelector("#current-city").innerHTML = response.data.name;

let description = (response.data.weather[0].main);
let descriptionElement = document.querySelector("#weather-description");
descriptionElement.innerHTML = `${description}`;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temp-now");
  temperatureElement.innerHTML = `${temperature}`;
  celsiusTemperature = temperature;

  //document.querySelector("#temp-now").innerHTML =
  //Math.round(response.data.main.temp);

  let iconElement = document.querySelector("#icon")
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let feels = Math.round(response.data.main.feels_like);
  let feelsElement = document.querySelector("#percieved");
  feelsElement.innerHTML = `${feels}`;
  feelsTemperature = feels;

  let humidity = (response.data.main.humidity);
  let humidityElement = document.querySelector("#hum");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;

  let wind = response.data.wind.speed;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `Wind: ${Math.round(wind)}m/s`;

getForecast(response.data.coord);
}

function displayFahrenheitTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temp-now");
    let feelsLikeElement = document.querySelector("#percieved");
    let farenheitTemperature = (celsiusTemperature*9)/5+32;
    let farenheitFeelTemperature = (feelsTemperature*9)/5+32;
    temperatureElement.innerHTML = Math.round(farenheitTemperature);
    feelsLikeElement.innerHTML = Math.round(farenheitFeelTemperature);

   celsius.classList.remove("active");
   fahrenheit.classList.add("active");

   let forecastMin = document.querySelectorAll(".weather-forecast-temperature-min");
   forecastMin.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
   });

   let forecastMax = document.querySelectorAll(".weather-forecast-temperature-max");
   forecastMax.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round((currentTemp * 9) /5 +32);
   });

  celsiusLink.addEventListener("click", displayCelsiusTemp);
  fahrenheitLink.removeEventListener("click", displayFahrenheitTemp);

  }
  
  function displayCelsiusTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temp-now");
    let feelsLikeElement = document.querySelector("#percieved");

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    feelsLikeElement.innerHTML = Math.round(feelsTemperature);

  celsius.classList.remove("active");
   fahrenheit.classList.add("active");

    let forecastMin = document.querySelectorAll(".weather-forecast-temperature-min");
    forecastMin.forEach(function (item) {
      let currentTemp = item.innerHTML;
      item.innerHTML = Math.round(((currentTemp - 32) *5) / 9);
    });

    let forecastMax = document.querySelectorAll(".weather-forecast-temperature-max");
    forecastMax.forEach(function (item) {
      let currentTemp = item.innerHTML;
      item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
    });

  celsiusLink.removeEventListener("click", displayCelsiusTemp);
  fahrenheitLink.addEventListener("click", displayFahrenheitTemp);
  }
  
let celsiusTemperature = null;
let feelsTemperature = null;
let forecastMinTemp = null;
let forecastMaxTemp = null;

  let fahrenheitLink = document.querySelector("#fahrenheit");
  fahrenheitLink.addEventListener("click", displayFahrenheitTemp);
  
  let celsiusLink = document.querySelector("#celsius");
  celsiusLink.addEventListener("click", displayCelsiusTemp);


function showCurrentLocation(position) {
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    let geoApiKey = "79d26871fe6a29e52dcc85af1af380ed";
    let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
    axios.get(`${geoUrl}&appid=${geoApiKey}`).then(geoCitySwitch);
  }
  
  function geoCitySwitch(response) {
    let cityName = (response.data.name);
    let h5 = document.querySelector("#current-city");
    h5.innerHTML = `${cityName}`;
  
    let apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric`;
    let apiKeyWeather = "79d26871fe6a29e52dcc85af1af380ed";
  
    axios.get(`${apiUrlWeather}&appid=${apiKeyWeather}`).then(displayTemp);
  }
  
  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showCurrentLocation);
  }
  
  let locationButton = document.querySelector("#location-btn");
  locationButton.addEventListener("click", getCurrentPosition);
  
let now = new Date();
let h6 = document.querySelector("h6");
let date = now.getDate();

let hours = now.getHours();
    if (hours < 10) {
    hours = "0"+hours;
    }
let minutes = now.getMinutes();
    if (minutes <10) {
    minutes = "0"+minutes;
    }

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
let month = months[now.getMonth()];

h6.innerHTML = `${day} ${date} ${month} ${hours}:${minutes}`;

searchCity("Stockholm");