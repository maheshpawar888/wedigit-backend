var express = require('express');
const app = express();
const path = require('path');
require('./database/db');

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-auth-token');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.json());
app.use('/upload',express.static(path.join("upload")));


const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoute');


const port = process.env.PORT || 3001;

app.use('/user',userRoutes);
app.use('/product',productRoutes);


app.listen(port,() => {
    console.log(`Listening on ${port}...`)
})
