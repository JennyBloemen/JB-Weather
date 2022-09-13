var cities = [];
var cityFormEl=document.querySelector("#city-search-form");
var cityInputEl=document.querySelector("#city");
var weatherContainerEl=document.querySelector("#current-weather-container");
var citySearchInputEl = document.querySelector("#searched-city");
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday-container");
var pastCityBtn = document.querySelector("#past-city-buttons");

var formSumbitHandler = (event) => {
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
        cityInputEl.value = "";
    } else{
        alert("Please Enter a City");
    }
    saveSearch();
    pastSearch(city);
}
// Key for local storage is Cities, The city entered is the value
var saveSearch = () => {
    localStorage.setItem("cities", JSON.stringify(cities));
};
// My open weather api key and function to grab api data
var getCityWeather = (city) => {
    var apiKey = "844421298d794574c100e3409cee0499"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  // response is just a defining word to explain what's happening in the funtion, but it could be taco and still work
    fetch(apiURL)
    .then((response) => {
      console.log(response);  
      response.json().then((data) => {
            displayWeather(data, city);
        });
    });
};

var displayWeather = (weather, searchCity) => {
   //clear old content
   weatherContainerEl.textContent= "";  
   citySearchInputEl.textContent=searchCity;


   var currentDate = document.createElement("span")
   currentDate.textContent= moment(weather.dt.value).format(" MMM D, YYYY");
   citySearchInputEl.appendChild(currentDate);

   var weatherIcon = document.createElement("img")
   weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
   citySearchInputEl.appendChild(weatherIcon);

   var tempEl = document.createElement("span");
   tempEl.textContent = "Temperature: " + weather.main.temp + " °F";
   tempEl.classList = "list-group-item"
   weatherContainerEl.appendChild(tempEl);

   var humidityEl = document.createElement("span");
   humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
   humidityEl.classList = "list-group-item"
   weatherContainerEl.appendChild(humidityEl);

   var windSpeedEl = document.createElement("span");
   windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
   windSpeedEl.classList = "list-group-item"
   weatherContainerEl.appendChild(windSpeedEl);

// UV index code starts here
   var lat = weather.coord.lat;
   var lon = weather.coord.lon;
   getUvIndex(lat,lon)
}

var getUvIndex = (lat,lon) => {
    var apiKey = "844421298d794574c100e3409cee0499"
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    fetch(apiURL)
    .then((response) => {
        response.json().then(function(data){
            displayUvIndex(data)
           // console.log(data)
        });
    });
}
// UV code uses separate API to pull in by lat and lon 
var displayUvIndex = (index) => {
    var uvIndexEl = document.createElement("div");
    uvIndexEl.textContent = "UV Index: "
    uvIndexEl.classList = "list-group-item uv-index"


    var uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value
    // console.log(index);
    if(index.value <=2){
        // console.log("should be favorable");
        uvIndexEl.classList.add("favorable");
    
    }else if(index.value >2 && index.value <=8 ){
        // console.log("should be moderate");
        uvIndexEl.classList.add("moderate");
    }  
    else if(index.value >8){
        // console.log("should be severe");
        uvIndexEl.classList.add("severe");
    };
    // return result;
    uvIndexEl.appendChild(uvIndexValue);
    weatherContainerEl.appendChild(uvIndexEl);
}

var get5Day = (city) => {
    var apiKey = "844421298d794574c100e3409cee0499"
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then((response) => {
        response.json().then(function(data){
           display5Day(data);
        });
    });
};

var display5Day = (weather) =>{
    forecastContainerEl.textContent = ""
    forecastTitle.textContent = "5-Day Forecast:";

    var forecast = weather.list;
        for(var i=5; i < forecast.length; i=i+8){
        var dailyForecast = forecast[i];
              
        var forecastEl=document.createElement("div");
        forecastEl.classList = "card bg-primary text-light m-2";
  
        var forecastDate = document.createElement("h4")
        forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
        forecastDate.classList = "card-header text-center"
        forecastEl.appendChild(forecastDate);
       
        var weatherIcon = document.createElement("img")
        weatherIcon.classList = "card-body";
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  
        forecastEl.appendChild(weatherIcon);
      
        var TempEl=document.createElement("span");
        TempEl.classList = "card-body";
        TempEl.textContent = dailyForecast.main.temp + " °F";
        forecastEl.appendChild(TempEl);

        var forecastHumEl=document.createElement("span");
        forecastHumEl.classList = "card-body";
        forecastHumEl.textContent = dailyForecast.main.humidity + "  %";
        forecastEl.appendChild(forecastHumEl);

        //append to five day container
        forecastContainerEl.appendChild(forecastEl);
    }

}
// creates past cities searched
var pastSearch = function(pastSearch){
    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    pastSearchEl.classList = "cities-btn d-flex w-100 btn-light border p-2";
    pastSearchEl.setAttribute("data-city",pastSearch)
    pastSearchEl.setAttribute("type", "submit");

    pastCityBtn.prepend(pastSearchEl);
}

var pastSearchHandler = (event) =>{
    var city = event.target.getAttribute("data-city")
    if(city){
        getCityWeather(city);
        get5Day(city);
    }
}
// Event listeners
cityFormEl.addEventListener("submit", formSumbitHandler);
pastCityBtn.addEventListener("click", pastSearchHandler);