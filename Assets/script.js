// search variables
var searchCityEl=document.getElementbyId("search-city");
// var searchButtonEl=document.getElementById("searchButton");

// // Current Day Variables
// var cityEl=document.getElementById("city");
var tempEl=document.getElementById("temp");
var windEl=document.getElementById("wind");
var humidityEl=document.getElementById("humidity");
// var uvEl=document.getElementById("uv");
// var todaysWeatherEl=document.getElementById("todaysWeather");
// var currentPicEl=document.getElementById("currentPic");

// 5 Day Forcast Variables
// var fiveDayEl=document.getElementById("fiveDay");

// My open weather api key
var apikey="ef26f2b071916fd09c1698141822f121"




// Fetch example from class
// var testing= `${fiveDayEl}` template literal
var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apikey}`;
var responseText = document.getElementById('search-city');

function getApi(requestUrl) {
  console.log("here");
  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
  })
    .then(function (data) {
    console.log(data);
    tempEl=data.main.temp;
    windEl=data.wind.speed;
    humidityEl=data.main.humidity;
    


  })
}

getApi(requestUrl);