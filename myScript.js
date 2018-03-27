$(document).ready(function(){
  var long;
  var lat;

  if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
          long = position.coords.longitude;
          lat = position.coords.latitude;

  var api = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=c966e385e9fd103d5695c61b746c22ef";

  $.getJSON(api, function(data){
    var fTemp;
    var cTemp;
    var kTemp;

    var tempSwap = true;

    var weatherType = data.weather[0].description;
    var kTemp = data.main.temp;
    var windSpeed = data.wind.speed;
    var city = data.name;

    //Temperature in Kelvin
    fTemp = (kTemp*(9/5)-459.67).toFixed(1);
    cTemp = (kTemp - 273).toFixed(1);

    $("#city").html(city);
    $("#weatherType").html(weatherType);
    $("#fTemp").html(fTemp + " &#8457");


      $("#fTemp").click(function(){
      if(tempSwap===false){
        $("#fTemp").html(fTemp + " &#8457");
        tempSwap = true;
      }
      else {
        $("#fTemp").html(cTemp + " &#8451");
        tempSwap = false;
      }
    });

    windSpeed = (2.237*(windSpeed)).toFixed(1);
    $("#windSpeed").html(windSpeed + " mph");

    //checks what icon should be used:

    var weatherIcons = {
      "clear sky": "01",
      "few clouds": "02",
      "scattered clouds": "03",
      "broken clouds": "04",
      "shower rain": "09",
      "rain": "10",
      "thunderstorm": "11",
      "snow": "13",
      "mist": "50"
    }

    var iconToUse = weatherIcons[weatherType];

    $("#weatherIcon").html("<img src=\"http://openweathermap.org/img/w/" + iconToUse + "d.png\" alt=\"\">");


    //checks the temperature and changes background-picture
    if(cTemp > 30){
     $('body').css('background-image', 'url("https://images.unsplash.com/photo-1499479387933-4567e710809c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f24dbbf141dd628c5bf767b03f438609&auto=format&fit=crop&w=334&q=80")');
    }
    else if(cTemp > 20){
      $('body').css('background-image', 'url("https://d11in36igezwwb.cloudfront.net/texts/images/000/001/226/original/clouds.jpg?1507822094")');
     } else if(cTemp > 10){
       $('body').css('background-image', 'url("https://media.gettyimages.com/photos/sunrise-on-yosemite-valley-picture-id505872990?b=1&k=6&m=505872990&s=612x612&w=0&h=Aq3nxnL41EENnMdGNy6RkN78e-vPZfe_kO1WoEoYgtU=")');
      $('body').css("color", "white");
     } else if(cTemp > 0) {
      $('body').css("background-image", 'url("https://cdn.theatlantic.com/assets/media/img/mt/2017/06/GettyImages_675371680/lead_960.jpg?1498239007")');
      $("body").css("color", "white");
     }
   else {
       $('body').css('background-image', 'url("https://c.pxhere.com/photos/d6/89/clouds_cloudy_cold_daylight_fog_foggy_foliage_forest-911303.jpg!d")');
     }
  });

        });
    }

});
