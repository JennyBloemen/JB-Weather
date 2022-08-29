// console.log('test');
// setting city search to an empty array
var cities = [];

var cityFormEl=document.querySelector("#city-search-form");
var cityInputEl = document.querySelector('#city');
var weatherContainerEL = document.getElementById('current-weather-container');
var citySearchInputEL = document.getElementById('searched-city');
var forecastTitle = document.getElementById('forecast');
var forecastContainerEl = document.querySelector('fiveday-container')
var pastSearchButtonEL = document.getElementById('past-search-buttons')

var formSubmitHandler=function (event){
  event.preventDefault();
  var city = cityInputEl.value.trim();
  if(city){
    getCityWeather(city);
    get5Day(city);
    cities.unshift({city});
    cityInputEl.value ="";
  }
  else {
    alert('PLease enter a City');
 }
 saveSearch();
 pastSearchButtonEL(city);
}

var saveSearch = function () {
  localStorage.setItem("cities", JSON.stringify(cities));
};

// // My open weather api key and function to grab api data
var getCityWeather = function(city){
  var apiKey = "ef26f2b071916fd09c1698141822f121"
  var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  fetch(apiURL)
    .then(function (response) {
      console.log(response);
      response.json().then(function(data){
        displayWeather(data, city);
      });
    });
  };
// Fuction to pull weather content from API
var displayWeather = function(weather, searchCity){
  weatherContainerEL.textcontent="";
  citySearchInputEL.textContent=searchCity;
  console.log(weather);
  
  var currentDate = document.createElement('span')
  currentDate.textContent = ' ('+ moment(weather.dt.value.format)('MMM D, YYYY') + ") ";
  citySearchInputEL.appendChild(currentDate);

  var weatherIcon = docuemt.createElement('img')
  weatherIcon.setAttribute('src',`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`); 
  citySearchInputEL.appendChild(weatherIcon);

  var tempEl = document.createElement("span");
  tempEl.innerHTML = "Temperature: " + response.data.main.temp + "°F";
  tempEl.classList = "list-group-item"

  var windEl = document.createElement("span");
  windEl.innerHTML = "Wind Speed: " + repsonse.data.wind.speed + "mph";
  windEl.classList = "list-group-item"

  var humidityEl = document.createElement("span");
  humidityEl.innterHTML = "Humidity: " + response.data.main.humidity + "%";
  humidityEl.classList = "list-group-item"

  // Appends data to the container
  weatherContainerEL.appendChild(tempEl);
  weatherContainerEL.appendChild(windEl);
  weatherContainerEL.appendChild(humidityEl);
 }
// function k2f (K) {
//   return Math.floor((K-273.15)* 1.8 + 32);
// } 

var get5Day=function(city){
  var apiKey = "ef26f2b071916fd09c1698141822f121"
  var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`
  
  fetch(apiURL)
  .then(function (response) {
    response.json().then(function(data){
      display5Day(data);
    });
  });
};

var display5Day = function(weather) {
  forecastContainerEl.textContent = ""
  forecastTitle.textContect = "5-day Forecast:";

  var forecast = weather.list;
    for (let i = 0; i < forcast.length; i=i+8) {
  var dailyForecast = forecast[i];

  var forecastEl=document.createElement('div');
  forecastContainerEl.classList = "card";

  var forecastDate = document.createElement('h5')
  forecast.Date.textContent = moment.unix(dailyForecast.dt).format('MMM D, YYYY');
  forcast.date.classList = 'card-header text-center'
  forecastContainerEl.appendChild(forecastDate);

  var weatherIcon = document.createElement('img')
  weatherIcon.classList = "card-body text-canter"
  weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);

  forecastContainerEl.appendChild(weatherIcon);

  var forecastTempEl=document.createElement('span');
  forecastTempEl.classList = "card-body text-center";
  forecastTempEl.textContect = dailyForecast.main.temp + " °F";

  forecastEl.appendChild(forecastTempEl);

  var forecastHumEl=document.createElement('span');
  forecastHumEl.classList = "card-body text-center";
  forecastHumEl.textContent = dailyForecast.main.humidity + " %";

  forecastEl.appendChild(forecastHumEl);

  forecastContainerEl.appendChild(forecastEl);

}
}

// cityFormEl.addEventListener("submit", formSumbitHandler);

// UV API Key Shared in Class
// var apiKey = "ef26f2b071916fd09c1698141822f121"
// var apiUrl = `https://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}`





// // let searchHistory = JSON.parse(localStorage.getItem("search")) || [];


    // Need to figure out how to convert temp, currently lists as 291.51 

   
//     // what is the difference between setting .textContent vs innerHTML

//   })
// }

// getApi(requestUrl);

// responseText.addEventListener("click", function (){
//   var searchInput = responseText.value;
//   getWeather(searchInput);
//   searchHistory.push(searchInput);
//   localStorage.setItem("search", JSON.stringify(searchHistory));
//   console.log(searchHistory); 
// })




// function searchForCity(event) {
//   event.preventDefault();
//   let searchText = searchCityEl.value.trim();
//   if (searchText.length > 0) {
//       fetchCitySearchResults(searchText);
//   }
// }

// // Need for five day forcast
// function resenderSearchHistory() {
//   historyEL.innerHTML = "";  

  
//   }
// }


//   // // Current Day Variables
