//This is my API key:
var apiKey = "cc4b8a3876056cbd6e597915655fb722";
var cityId = "";

  $("#searchFormButton").on("submit", function(event) {
    event.preventDefault();
       cityId = $("#search").val();
       console.log(cityId);
       // URL we need to query the database
       var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityId + "&APPID=" + apiKey;

   
       $.ajax({
        //$.curl({
        url: queryURL,
        method: 'GET'
      }).then(function(response) {
    console.log(response);
    console.log(response.city.name)

    var cityName = response.city.name
    var temperature = ((Math.floor(response.list["0"].main.temp - 273.15) * 1.80 + 32) + " degrees")
    var humidity = response.list["0"].main.humidity
    var windspeed = response.list["0"].wind.speed
    var uvIndex = response.city.name
    var currentTime = $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
    //varuvIndexBig`

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

// $("#currentDay").text(moment().format("$("1"));


      })

    });
    function getUVIndex() {

    }