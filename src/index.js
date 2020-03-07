const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const cors = require('cors');

//Initializations
const app = express();
require('dotenv').config();
require('./database');

//Settings
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(cors());
app.use(express.json());

//Routes
app.use(require('./routes/index'));

//Server is listenning
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
});