// console.log('test');
// setting city search to an empty array
var cities = [];

// var cityFormEl=document.getElementbyId('city-search-form');
// var cityInputEl=docuemt.getElementbyId('city');
var weatherContainerEL=document.getElementById('current-weather-container');
var citySearchInputEL=document.getElementById('searched-city');
var forcastTitle=document.getElementById('forecast');
// var forcastContainerEl=document.getElementbyId('fiveday-container')
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

// // My open weather api key and function to grab api data
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

var displayWeather = function(weather, searchCity){
  weatherContainerEL.textcontent="";
  citySearchInputEL.textContent=searchCity;
  console.log(weather);
  
  var currentDate=document.createElement('span')
  currentDate.textContent=' ('+ moment(weather.dt.value.format)('MMM D, YYYY') + ") ";
  citySearchInputEL.appendChild(currentDate);

  var weatherIcon=docuemt.createElement('img')
  weatherIcon.setAttribute('src',`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`); 
  citySearchInputEL.appendChild(weatherIcon);

  var tempEl=document.createElement("span");
  tempEl.innerHTML="Temperature: " + response.data.main.temp + "°F";
  tempEl.classList="list-group-item"

  var windEl=document.createElement("span");
  windEl.innerHTML = "Wind Speed: " + repsonse.data.wind.speed + "mph";
  windEl.classList="list-group-item"

  var humidityEl=document.createElement("span");
  humidityEl.innterHTML = "Humidity: " + response.data.main.humidity + "%";
  humidityEl.classList="list-group-item"

  // appends data to the container
  weatherContainerEL.appendChild(tempEl);
  weatherContainerEL.appendChild(windEl);
  weatherContainerEL.appendChild(humidityEl);
  
}







// // 5 Day Forcast Variables
// var fiveDayEl=document.getElementById("five-day");


// // let searchHistory = JSON.parse(localStorage.getItem("search")) || [];






//     // Need to figure out how to convert temp, currently lists as 291.51 
//     // ℉=((K-273.15)*1.8)+32
//     // let fahrenheit = Math.floor(celsius * (9/5) + 32);
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
// for (let i = 0; i < searchHistory.length; i++) {
//   const historyItem = docuemnt.createElement ("input");
  
//   }
// }


//   // // Current Day Variables
