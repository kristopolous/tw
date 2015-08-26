var orm = require('orm');
var express = require('express');
var orm = require('orm');
var app = express();

app.use(orm.express("mysql://php:fixy2k@localhost/tw", {
  define: function (db, models, next) {

    models.users = db.define("users", {
      name: String,
      join_time: Date,
      oauth: String,
    });

    models.posts = db.define("posts", {
      // The infamous two words
      title: String,
      author: Number,
      long: Number,
      lat: Number,
      post_time: Date,
      // photo if any
      photo: String
    });

    next();
  }
}));

app.listen(80);

app.get("/", function (req, res) {
    // req.models is a reference to models used above in define()
    req.models.person.find(...);
});
