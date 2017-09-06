const models = require("./models");
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const app = express();

app.use(bodyParser.json({}));

// list activities
app.get("/api/activities", function(req, res) {
  models.activity.findAll()
    .then(function(activity) {
      res.json( {
        "status": "success",
        "activity": activity
      });
    })
});

// add new activities
app.post("/api/activities", function(req, res) {
  const active = models.activity.build({
    name: req.body.name,
    amount: req.body.amount
  })
  active.save().then(function(newActivity) {
    res.json({
      "status": "success",
      "data": newActivity
    });
  })
});

app.put("/api/activities/{id}", function (req,res) {
  models.activity.update({
    name: req.body.name,
    amount: req.body.amount
  }, {where: {id: req.params.id}})
  .then(function(update){
    res.json({
      "status": "success",
      "udpate": update
    })
  })
});

app.listen(3000, function() {
  console.log('Ciao');
})
