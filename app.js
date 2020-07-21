const createError = require('http-errors');

const Vue = require('vue');

var index = require('fs').readFileSync('./public/index.template.html', 'utf-8');
var account = require('fs').readFileSync('./public/account.template.html', 'utf-8');

const indexRenderer = require('vue-server-renderer').createRenderer({
  index,
});

const accountRenderer = require('vue-server-renderer').createRenderer({
  account,
});

const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');

const passport = require('passport');
const util = require('util');

const session = require('express-session');
const sharedsession = require('express-socket.io-session');

const SteamStrategy = require("passport-steam").Strategy;
const User = require("passport-steam").User;

const indexRouter = require('./routes/index');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SteamStrategy({
  returnURL: 'http://157.245.80.100/auth/steam/return',
  realm: 'http://157.245.80.100/',
  apiKey: 'F4A5F0578C6B49254B84268773BC86AE' // put steam api key here
},
function(identifier, profile, done) {
  process.nextTick(async function () {
    profile.identifier = identifier;
    let seed = await clientSeed(20);
    let user = await UserDB.findOne({ steamid: profile.id });
    if(!user){
      user = await new UserDB({
        steamid: profile.id,
        username: profile.displayName,
        profile_url: profile.identifier.replace('openid/id','profiles'),
        avatar: profile.photos[2].value,
        trade_url: "invalid",
        client_seed: seed,
        times_bet: 0,
        times_won: 0,
        total_deposited: 0.00,
        total_won: 0.00,
        profit: 0.00,
        register_date: date,
        past_flips: []
      }).save()
    }
    return done(null, profile);
  });
}
));

var app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var sessionMiddleware = session({
  secret: "the brown whatever goes woof",
  name: 'session_id',
  resave: true,
  saveUninitialized: true
});

app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());
//app.use(express.static(__dirname + './public'));

app.use('/', indexRouter);

app.get('/auth/steam', passport.authenticate('steam', { failureRedirect: '/' }), function(req, res) {
  res.redirect('/');
});

app.get('/auth/steam/return', passport.authenticate('steam', { failureRedirect: '/' }), function(req, res) {
  res.redirect('/');
});

server.listen(80, () => {
  console.log('listening on *:80');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log("listening");
