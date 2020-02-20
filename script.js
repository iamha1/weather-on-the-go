//This is my API key:
var apiKey = "cc4b8a3876056cbd6e597915655fb722";
var cityId = "";

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

    var coords = response.coord

    var cityName = response.name
    var temperature = ((Math.floor(response.main.temp - 273.15) * 1.80 + 32) + " degrees")
    var humidity = response.main.humidity
    var windspeed = response.wind.speed
    var uvIndex = response.name
    var currentTime = $("#currentDay").text(moment().format("MM/DD/YYYY"));

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




  })

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
    console.log(response)
    var valueUV = response.value;
    var el = $("<span>").text(valueUV);

    if (valueUV < 3) {
      el.addClass("heatIndexGreen")
    } else if (valueUV < 7) {
      el.addClass("heatIndexYellow")
    } else {
      el.addClass("heatIndexRed")
    }

    $("#mainUV").append(el)

  })
  //       
  //       // Go through the JSON form and pull data from the objects

}