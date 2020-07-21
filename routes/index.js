var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1/Rustypot', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const UserDB = require('../models/users.js');

const { generateServerSeed, sha512, combine, getResult } = require('../src/fair-system/utils.js');

var expressVue = require("express-vue");
var app = express();

expressVue.use(app).then(() => {
  router.get('/', function(req, res, next) {
    let navName;
    if (req.isAuthenticated()) {
      if(req.user.displayName.length > 7){
        navName = req.user.displayName.substring(0, 7) + "...";
      } else{
        navName = req.user.displayName;
      }
    }
    var data: {};
    req.vueOptions: {
      user: req.user,
      nav_name: navName
    };
    res.renderVue('index.vue', data, req.vueOptions);
  });
  router.get('/account', ensureAuthenticated, function(req, res, next) {
    UserDB.findOne({ steamid: req.user.id }, function(err, data){
      if(err) throw err;
      let navName;
      if(req.user.displayName.length > 7){
        navName = req.user.displayName.substring(0, 7) + "...";
      } else{
        navName = req.user.displayName;
      }
      if(data.trade_url == undefined){
        var data: {};
        req.vueOptions:{
          user: req.user,
          nav_name: navName,
          total_flipped: data.times_bet,
          total_won: data.times_won,
          total_profit: (data.total_won - data.total_deposited).toFixed(2),
          tradelink: 'No tradelink currently set',
          clientseed: data.client_seed
        }
        res.renderVue('account.vue', data, req.vueOptions);
        });
      } else{
        var data: {};
        req.vueOptions:{
          user: req.user,
          nav_name: navName,
          total_flipped: data.times_bet,
          total_won: data.times_won,
          total_profit: (data.total_won - data.total_deposited).toFixed(2),
          tradelink: data.trade_url,
          clientseed: data.client_seed
        }
        res.renderVue('account.vue', data, req.vueOptions);
        });
      }
    })
  });

  router.post('/settings/tradelink', ensureAuthenticated, function(req, res, next){
    let tradelink = req.body.tradelink;
    UserDB.findOneAndUpdate({ steamid: req.user.id }, {$set: { trade_url: tradelink }}, function(err, data){
      if(err) throw err;
      res.redirect('/account');
    })
  })

  router.post('/settings/clientseed', ensureAuthenticated, function(req, res, next){
    let clientseed = req.body.clientseed;
    UserDB.findOneAndUpdate({ steamid: req.user.id }, {$set: { client_seed: clientseed }}, function(err, data){
      if(err) throw err;
      res.redirect('/account');
    })
  })

  router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}


module.exports = router;
