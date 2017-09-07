const models = require("./models");
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const app = express();

app.use(bodyParser.json({}));

const users = {
    'Mahima': 'work'
};

passport.use(new BasicStrategy(
  function(username, password, done) {
      const userPassword = users[username];
      if (!userPassword) { return done(null, false); }
      if (userPassword !== password) { return done(null, false); }
      return done(null, username);
  }
));

// put routes here

// basic authentication
app.get('/api/hello',
    passport.authenticate('basic', {session: false}),
    function (req, res) {
        res.json({"hello": req.user, status: "success"})
    }
);

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
