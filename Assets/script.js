// search variables
var searchCityEl=document.getElementbyId("searchCity");
var searchButtonEl=document.getElementById("searchButton");

// Current Day Variables
var cityEl=document.getElementById("city");
var tempEl=document.getElementById("temp");
var windEl=document.getElementById("wind");
var humidityEl=document.getElementById("humidity");
var uvEl=document.getElementById("uv");
var todaysWeatherEl=document.getElementById("todaysWeather");
// var currentPicEl=document.getElementById("currentPic");

// 5 Day Forcast Variables
var fiveDayEl=document.getElementById("fiveDay");

// My open weather api key
ef26f2b071916fd09c1698141822f121
https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}



// Fetch example from class
var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={ef26f2b071916fd09c1698141822f121}";
var responseText = document.getElementById('response-text');

function getApi(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      if (response.status === 200) {
        responseText.textContent = response.status;
      }
      return response.json();
  });
}

getApi(requestUrl);