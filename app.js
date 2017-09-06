const models = require("./models");
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const app = express();

app.use(bodyParser.json({
}));

app.get("/api/activities", function(req, res) {
  models.activity.findAll()
    .then(function(activity) {
      res.json( {
        "status": "success",
        "activity": activity
      });
    })
});

app.listen(3000, function() {
  console.log('Ciao');
})
