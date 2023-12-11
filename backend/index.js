
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const corsOptions = require('./config/cors');
const connectDB = require('./config/database');
const credentials = require('./middleware/credentials');
const errorHandlerMiddleware = require('./middleware/error_handle')
const authenticationMiddleware = require('./middleware/authentication')
const { auth} = require('./middleware/auth')
const app = express();
const PORT = 8081;

connectDB();

// Allow Credentials
app.use(credentials)

// CORS


app.use(cors(corsOptions));


// application.x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));

app.use(bodyParser.json());

// middleware for cookies
app.use(cookieParser());

app.use(authenticationMiddleware);


// static files
app.use('/static', express.static(path.join(__dirname,'public')));

// Default error handler
app.use(errorHandlerMiddleware);

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/index', require('./routes/api/index'));
app.use('/api/user', require('./routes/api/user'));





app.all('*', (req, res) => {
    res.status(404)
  
    if(req.accepts('json')){
      res.json({'error': '404 Not Found'})
    }else{
      res.type('text').send('404 Not Found')
    }
  })
  


app.listen(PORT, () => {
    console.log(`server is listen on post ${PORT}`);
})