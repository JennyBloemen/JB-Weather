// setting city search to an empty array
var cities = [];

var cityFormEl=document.getElementbyId('city-search-form');
var cityInputEl=docuemt.getElementbyId('city');
var weatherContainerEL=document.getElementById('current-weather-container');
var citySearchInputEL=document.getElementById('searched-city');
var forcastTitle=document.getElementById('forecast');
var forcastContainerEl=document.getElementbyId('fiveday-container')
var pastSearchButtonEL=document.getElementById('past-search-buttons')

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


var getCityWeather = function(city){
  var apiKey="ef26f2b071916fd09c1698141822f121"
  var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  fetch(apiURL)
    .then(function (response) {
      console.log(response);
      response.json().then(function(data){
        displayWeather(data, city);
      });
    });
  };



// // 5 Day Forcast Variables
// var fiveDayEl=document.getElementById("five-day");

// // My open weather api key
// // let searchHistory = JSON.parse(localStorage.getItem("search")) || [];






//     // Need to figure out how to convert temp, currently lists as 291.51 
//     // ℉=((K-273.15)*1.8)+32
//     // let fahrenheit = Math.floor(celsius * (9/5) + 32);
//     // what is the difference between setting .textContent vs innerHTML
//     tempEl.innerHTML = "Temperature: " + response.data.main.temp;
//     windEl.innerHTML = "Wind Speed: " + repsonse.data.wind.speed + "mph";
//     humidityEl.innterHTML = "Humidity: " + response.data.main.humidity + "%";
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
// for (let i = 0; i < searchHistory.length; i++) {
//   const historyItem = docuemnt.createElement ("input");
  
//   }
// }
//   tempEl.setAttribute("temp");
//   windEl.setAttribute("wind");
//   humidityEl.setAttribute("wind");
//   currentPicEl.setAttribute("current-pic")

//   // // Current Day Variables
// var cityEl=document.getElementById("city");
// var tempEl=document.getElementById("temp");
// var windEl=document.getElementById("wind");
// var humidityEl=document.getElementById("humidity");
// var uvEl=document.getElementById("uv");
// var todaysWeatherEl=document.getElementById("todays-weather");
// var currentPicEl=document.getElementById("current-pic");