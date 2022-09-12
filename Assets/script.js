// sets city search to an empty array
var cities = [];
var cityFormEl=document.querySelector("#city-search-form");
var cityInputEl = document.querySelector('#city');
var weatherContainerEl = document.getElementById('current-weather-container');
var citySearchInputEl = document.querySelector("#searched-city");
var forecastTitle = document.getElementById('forecast');
var forecastContainerEl = document.querySelector('fiveday-container')
var pastSearchButtonEl = document.getElementById('past-search-buttons')

var formSubmitHandler = function (event){
  // keeps the data in the local storage
  event.preventDefault();
  // This just stores this into the var city
  var city = cityInputEl.value.trim();
  if(city){
    getCityWeather(city);
    get5Day(city);
    // puts the last city first
    cities.unshift({city});
    // resets the value to zero so we can search again
    cityInputEl.value ="";
  }
  else {
    alert('Please Enter a City');
 }
 saveSearch();
 pastSearch(city);
}
// Key for local storage is Cities, The city entered is the value
var saveSearch = function () {
  localStorage.setItem("cities", JSON.stringify(cities));
};

// // My open weather api key and function to grab api data
var getCityWeather = function(city){
  var apiKey = "ef26f2b071916fd09c1698141822f121"
  var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
  fetch(apiURL)
  // response is just a defining word to explain what's happening in the funtion, but it could be taco and still work
  .then(function (response) {
      // console.log(response);
      response.json().then(function(data){
        displayWeather(data, city)
      });  
   });
}

// Fuction to pull weather content from API and console log it
var displayWeather = function(weather, searchCity){
  //clear old content
  weatherContainerEl.textContent = "";  
  citySearchInputEl.textContent = searchCity;
  // console.log(weather);
  
  var currentDate = document.createElement("span")
  currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
  citySearchInputEl.appendChild(currentDate);

  var weatherIcon = document.createElement('img')
  weatherIcon.setAttribute('src',`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`); 
  citySearchInputEl.appendChild(weatherIcon);

  var tempEl = document.createElement("span");
  tempEl.textContent = "Temperature: " + weather.main.temp + "°F";
  tempEl.classList = "list-group-item"

  var windEl = document.createElement("span");
  windEl.innerHTML = "Wind Speed: " + weather.wind.speed + "mph";
  windEl.classList = "list-group-item"

  var humidityEl = document.createElement("span");
  humidityEl.innterHTML = "Humidity: " + weather.main.humidity + "%";
  humidityEl.classList = "list-group-item"

  // Appends data to the empty html container
  weatherContainerEl.appendChild(tempEl);
  weatherContainerEl.appendChild(windEl);
  weatherContainerEl.appendChild(humidityEl);
 }

 var getUvIndex = function(lat,lon){
  var apiKey = "ef26f2b071916fd09c1698141822f121"
  var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
  fetch(apiURL)
  .then(function(response){
      response.json().then(function(data){
          displayUvIndex(data)
         // console.log(data)
      });
  });
}

var displayUvIndex = function (index) {
  var uvIndexEl = document.createElement("div");
  uvIndexEl.textContent = "UV Index: "
  uvIndexEl.classList = "list-group-item"

  uvIndexValue = document.createElement("span");
  uvIndexValue.textContent = index.value

  if(index.value <= 2) {
    uvIndexValue.classLIst = "Favorable";
  
  }else if(index.value >2 && index.value <=8) {
    uvIndexValue.classList = "Moderate";
  
  }else if(index.value >8){
  uvIndexValue.classList = "Severe";
  };

  uvIndexEl.appendChild(uvIndexValue);
  weatherContainerEL.appendChild(uvIndexValue);
}

 //  Not sure if I need this
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

var display5Day = function(weather){
  forecastContainerEl.textContent = ""
  forecastTitle.textContent = "5-Day Forecast:";

  var forecast = weather.list;
    for(var i = 5; i < forecast.length; i=i+8) {
  var dailyForecast = forecast[i];

  var forecastEl=document.createElement('div');
  forecastContainerEl.classList = "card bg-primary text-light m-2";

  var forecastDate = document.createElement('h5')
  forecast.Date.textContent = moment.unix(dailyForecast.dt).format('MMM D, YYYY');
  forecast.date.classList = 'card-header text-center'
  forecastContainerEl.appendChild(forecastDate);

  var weatherIcon = document.createElement('img')
  weatherIcon.classList = "card-body text-center";
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

var pastSearch = function(pastSearch){
 
  // console.log(pastSearch)

  pastSearchEl = document.createElement("button");
  pastSearchEl.textContent = pastSearch;
  pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
  pastSearchEl.setAttribute("data-city",pastSearch)
  pastSearchEl.setAttribute("type", "submit");

  pastSearchButtonEl.prepend(pastSearchEl);
}

var pastSearchHandler = function(event){
  var city = event.target.getAttribute('data-city')
  if(city) {
    getCityWeather(city);
    get5Day(city);
  }
}

cityFormEl.addEventListener("submit", formSubmitHandler);
pastSearchButtonEl.addEventListener('click', pastSearchHandler);
