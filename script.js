//This is my API key:
var apiKey = "cc4b8a3876056cbd6e597915655fb722";
var cityId = "";
var historyArr = [];

function generateHistory() {
  $("#pastSearches").empty();
  historyArr = JSON.parse(localStorage.getItem("cityId"));
  if (historyArr !== null) {
    for (i = 0; i < historyArr.length && i < 8; i++) {
      var newListItem = $("<li>");
      newListItem.text(historyArr[i]);
      $("#pastSearches").prepend(newListItem);

    }
  }
}
generateHistory();

$("#searchFormButton").on("submit", function (event) {
  event.preventDefault();
  cityId = $("#search").val();
  console.log(cityId);
  // URL we need to query the database
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityId + "&appid=" + apiKey;

  $.ajax({
    //$.curl({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    console.log(response);
    $("#cityBig").empty();
    $("#tempBig").empty();
    $("#humidBig").empty();
    $("#windBig").empty();
    $("#uvBig").empty();

    $("#tempSmall1").empty();
    $("#humidSmall1").empty();
    $("#tempSmall2").empty();
    $("#humidSmall2").empty();
    $("#tempSmall3").empty();
    $("#humidSmall3").empty();
    $("#tempSmall4").empty();
    $("#humidSmall4").empty();
    $("#tempSmall5").empty();
    $("#humidSmall5").empty();


    // $("#pastSearches").empty();

    var coords = response.coord

    var cityName = response.name
    var temperature = ((Math.floor(response.main.temp - 273.15) * 1.80 + 32) + " degrees")
    var humidity = response.main.humidity
    var windspeed = response.wind.speed
    var uvIndex = response.name
    var currentTime = $("#currentDay").text(moment().format("MM/DD/YYYY"));
    var currentTime1 = $("#currentDayPlus1").text(moment().add(1, 'days').format("MM/DD/YYYY"));
    var currentTime2 = $("#currentDayPlus2").text(moment().add(2, 'days').format("MM/DD/YYYY"));
    var currentTime3 = $("#currentDayPlus3").text(moment().add(3, 'days').format("MM/DD/YYYY"));
    var currentTime4 = $("#currentDayPlus4").text(moment().add(4, 'days').format("MM/DD/YYYY"));
    var currentTime5 = $("#currentDayPlus5").text(moment().add(5, 'days').format("MM/DD/YYYY"));

    getUVIndex(coords);

    var mainDiv1 = document.createElement("div");
    var mainDiv1CityName = mainDiv1.textContent = cityName;
    $("#cityBig").append(mainDiv1CityName);

    var mainDiv2 = document.createElement("div");
    var mainDiv2Temperature = mainDiv2.textContent = temperature;
    $("#tempBig").append(mainDiv2Temperature);

    var mainDiv3 = document.createElement("div");
    var mainDiv3Humidity = mainDiv3.textContent = humidity + " %";
    $("#humidBig").append(mainDiv3Humidity);

    var mainDiv4 = document.createElement("div");
    var mainDiv4Windspeed = mainDiv4.textContent = windspeed + " MPH";
    $("#windBig").append(mainDiv4Windspeed);

    $("#weatherIcon").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");


    var cityName = cityId;
    console.log(cityName);
    var newCityName = [];
    var oldCityName = JSON.parse(localStorage.getItem("cityId"));
    console.log(oldCityName);
    if (oldCityName !== null) {
      newCityName = oldCityName;
    }
    // var newCityNameObj = {
    //     Name: cityName,
    //     City: city
    // }
    newCityName.push(cityName);
    console.log(newCityName);
    //var cityArr = JSON.stringify(newCityName);
    console.log("-----");
    console.log(JSON.stringify(newCityName));
    localStorage.setItem("cityId", JSON.stringify(newCityName));

    generateHistory();

    var queryURL1 = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityId + "&cnt=10&units=imperial&appid=" + apiKey;

    $.ajax({
      url: queryURL1,
      method: 'GET'
    }).then(function (response) {
      console.log(response);

      $("#tempSmall1").html(response.list[0].main.temp);
      $("#humidSmall1").html(response.list[0].main.humidity);
      $("#tempSmall2").html(response.list[1].main.temp);
      $("#humidSmall2").html(response.list[1].main.humidity);
      $("#tempSmall3").html(response.list[2].main.temp);
      $("#humidSmall3").html(response.list[2].main.humidity);
      $("#tempSmall4").html(response.list[3].main.temp);
      $("#humidSmall4").html(response.list[3].main.humidity);
      $("#tempSmall5").html(response.list[4].main.temp);
      $("#humidSmall5").html(response.list[4].main.humidity);

      $("#weatherIcon1").attr("src", "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png");
      $("#weatherIcon2").attr("src", "http://openweathermap.org/img/wn/" + response.list[1].weather[0].icon + "@2x.png");
      $("#weatherIcon3").attr("src", "http://openweathermap.org/img/wn/" + response.list[2].weather[0].icon + "@2x.png");
      $("#weatherIcon4").attr("src", "http://openweathermap.org/img/wn/" + response.list[3].weather[0].icon + "@2x.png");
      $("#weatherIcon5").attr("src", "http://openweathermap.org/img/wn/" + response.list[4].weather[0].icon + "@2x.png");

    });

  });

  function getUVIndex(coords) {
    console.log(coords)
    var lat = coords.lat;
    var lon = coords.lon;
    var queryUV = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=9eb05d381db07ca6a0d36e08a08087f1&lat=" + lat + "&lon=" + lon;

    $.ajax({
      url: queryUV,
      method: "GET"

      // Open Weather returns a JSON form

    }).then(function (response) {
      var valueUV = response[0].value;
      console.log(response[0].value)
      var el = $("<span>").text(valueUV);

      if (valueUV < 3) {
        el.addClass("heatIndexGreen")
      } else if (valueUV < 7) {
        el.addClass("heatIndexYellow")
      } else {
        el.addClass("heatIndexRed")
      }

      $("#uvBig").append(el)

    })
  }
});