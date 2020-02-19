var apiKey = "cc4b8a3876056cbd6e597915655fb722";
var cityId = "";
var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityId + "&APPID=" + apiKey;

//“http://api.openweathermap.org/data/2.5/forecast?q=” + q + “&APPID=” + apiKey;

$.ajax({
    //$.curl({
    url: queryURL,
    method: 'GET'
  }).done(function(response) {

    //console.log(response);
    //console.log(response.list[0].weather[0].description);
  })

  $("#search-form").on("submit", function(event) {
    event.preventDefault();
       cityId = $("#search").val();
       console.log(cityId);
       
    });
    $("#city-1").on("click", function(event) {
      event.preventDefault();
         cityId = $("#city-1").val();
         console.log(city-1);
    });
