var Sequelize = require('sequelize');
var sequelize = new Sequelize('tw', 'php', 'fixy2k');

var User = sequelize.define('User', {
  name: Sequelize.STRING,
  oauth: Sequelize.STRING
});

sequelize.sync().then(function() {
  return User.create({
    name: 'janedoe',
    birthday: new Date(1980, 6, 20)
  });
}).then(function(jane) {
  console.log(jane.get({
    plain: true
  }))
});
