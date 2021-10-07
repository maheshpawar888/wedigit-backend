const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://mahesh:mahesh@cluster0.e2sjz.mongodb.net/assignment?retryWrites=true&w=majority",{
    }).then( () =>{
    console.log('Mongodb Connected successfully!!')
  })
  .catch( (e)=>{
    console.log("error: ",e)
  })