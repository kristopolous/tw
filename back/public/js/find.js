 var last_hash;

  _.templateSettings = {
      interpolate : /\{\{(.+?)\}\}/g
  };
  var Tpl = {}, test_data = [
    {
      title: "street tacos",
      img_url: 'http://www.valeriescookbook.com/images/chicken-street-tacos-served-09.jpg',
      lat: 34.052234,
      long: -118.243685,
      distance: 5,
      age: +(new Date()) - 1000,
      author: "taco_monster",
      score: 60
    }
  ];

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

