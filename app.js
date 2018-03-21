// Requring files, libs, and dependencies ...
const path                  = require('path')
      express               = require('express'),
      mongoose              = require('./db/mongoose'),
      User                  = require('./models/user'),
      bodyParser            = require('body-parser'),
      expressSession        = require('express-session'),
      passport              = require('passport'),
      LocalStrategy         = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      app = express();

  
// App Configurations
app.set('PORT', process.env.PORT || 3001);
app.set('view engine', 'ejs');


// App Middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
  secret: 'Internet Programming Project En/De coding',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


// Passport Config ...!
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Routes
app.get('/login', (req, res) => {
  res.render('signin', {});
})

app.post('/login',passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "login",
}), (req, res) => {});

app.get('/register', (req, res) => {
  res.render('signup', {});
});

app.post('/register', (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password)
    .then(
      (user) => {
        console.log('saved user: ', user);
        passport.authenticate("local")(req, res, () => {
          res.redirect('/');
        })
      }
    )
    .catch(
      err =>  {
        console.log(err);
        res.render('signup')
      } 
    );
})


// Launching Server...
app.listen(app.get('PORT'), ()=> {
  console.log('Server is running on port ' + app.get('PORT') + '. Press Ctrl+C to terminate...');
})