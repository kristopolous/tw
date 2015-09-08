var 
  last_hash, 
  Tpl = {}, 
  test_data = [];

/*
var socket = io.connect('http://localhost');
socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});
*/

function generate(data_list) {
  $("#result-list").empty();
  _.each(data_list, function(row) {
    $("#result-list").append( Tpl.result(row) );
  });
}

$(function(){

  $("#template").children().each(function() {
    var key = this.id.replace(/^tpl-/,'');
    Tpl[key] = _.template(this.innerHTML);
  });

  generate(test_data);

  $('#found-button,#header-found').click(function(){
    $("#top-level-buttons").hide();
    $("#found-input").focus();
  });

  $('#discover-button,#header-find').click(function(){
    $("#top-level-buttons").hide();
    $("#discover-input").focus();
  });
});

function geo_error() {
  alert("Sorry, no position available.");
}

function success(position) {
  var latitude  = position.coords.latitude;
  var longitude = position.coords.longitude;

  output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

  var img = new Image();
  img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

  output.appendChild(img);
};

setInterval(function(){
  var my_hash = window.location.hash.slice(1);

  if(last_hash != my_hash && my_hash) {
    $(".endpoint").hide();
    $("#ep-" + my_hash).show();
    $('a[href="#' + my_hash + '"]').parent().addClass('active').siblings().removeClass('active');
    last_hash = my_hash;
  }
}, 150);

setInterval(function(){
  $(".time").each(function(){
    var delta = (new Date()) - parseInt(this.getAttribute('data'), 10);
    if (delta < 180) {
      this.innerHTML = delta + " seconds ago."
    } else if (delta / 60 < 90) {
      this.innerHTML = Math.floor(delta / 60) + " minutes ago."
    } else {
      this.innerHTML = Math.floor(delta / 3600) + " hours ago."
    }
  });
}, 1000);


if ("geolocation" in navigator) {
/*

  // This is snagged from https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
  var geo_options = {
    enableHighAccuracy: true, 
    maximumAge        : 30000, 
    timeout           : 27000
  };

  var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);

  var watchID = navigator.geolocation.watchPosition(function(position) {
    do_something(position.coords.latitude, position.coords.longitude);
  });
  */
} else {
  $("#no-gps").slideDown();
}
