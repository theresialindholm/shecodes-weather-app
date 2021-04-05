//Homework w5 Search Engine

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

function displayTemp(response) {

document.querySelector("#current-city").innerHTML = response.data.name;

let description = (response.data.weather[0].main);
let descriptionElement = document.querySelector("#weather-description");
descriptionElement.innerHTML = `${description}`;

  //let temperature = Math.round(response.data.main.temp);
  //let temperatureElement = document.querySelector("#temp-now");
  //temperatureElement.innerHTML = `${temperature}`;

  document.querySelector("#temp-now").innerHTML =
  Math.round(response.data.main.temp);

  let feels = Math.round(response.data.main.feels_like);
  let feelsElement = document.querySelector("#percieved");
  feelsElement.innerHTML = `Feels like: ${feels}°C`;

  let humidity = (response.data.main.humidity);
  let humidityElement = document.querySelector("#hum");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;

  let wind = (response.data.wind.speed);
let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `Wind: ${wind}m/s`;
}

function convertTemp(event) {
    event.preventDefault();
    let cTemp = document.querySelector("#temp-now");
   celsius.classList.remove("active");
   fahrenheit.classList.add("active");
    let fTemp = (cTemp.innerHTML * 9) / 5 + 32;
    let fTempRounded = Math.round(fTemp);
    cTemp.innerHTML = `${fTempRounded}`;
  }
  
  function revertTemp(event) {
    event.preventDefault();
    let fTemp = document.querySelector("#temp-now");
    celsius.classList.add("active");
    fahrenheit.classList.remove("active");
    let cTemp = ((fTemp.innerHTML - 32) * 5) / 9;
    let cTempRounded = Math.round(cTemp);
    fTemp.innerHTML = `${cTempRounded}`;
  }
  
  let conversion = document.querySelector("#fahrenheit");
  conversion.addEventListener("click", convertTemp);
  
  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", revertTemp);





//Bonus point w5

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
  







//Feature 1

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