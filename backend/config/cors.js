const allowedOrigins = require('./allowed_origins')


const corsOptions = {
  origin: (origin, callback) => {
    if(allowedOrigins.includes(origin) || !origin){
      callback(null, true)
    }else{
      callback(new Error('Not allowed by CORS'))
    }
  },
  // origin: '*',
  // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  // credentials: true,
  // optionsSuccessStatus: 204,
  // allowedHeaders: 'Content-Type, Authorization',
}

module.exports = corsOptions