require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

// when we irongenerate new app, the name we give will be the name of our database
//                                                                            |
//                                      |--------------------------------------
//                                      |
//                                 //   |                                                                            
mongoose                           //   V
  .connect('mongodb://localhost/pt-awesome-project', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();



// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


//🚨🚨🚨 all ROUTES middleware go here: 🚨🚨🚨

const index = require('./routes/index');
app.use('/', index);

const authorRoutes = require('./routes/author-routes');
app.use('/', authorRoutes); // => here we don't prefix so we have to repeat '/authors' all the time

// const bookRoutes = require('./routes/book-routes');
// app.use('/books', bookRoutes);
app.use('/books', require('./routes/book-routes')); // => this way is the same as the way above, it's just saving a couple of key strokes

//this one we prefix every route with /books so we dont have to keep repeating it over and over


module.exports = app;