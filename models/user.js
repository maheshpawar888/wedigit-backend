const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    email:{
        type:String
    },
    password:{
        type:String
    },
    username:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default: false
    },
    addedOn:{
        type: Date,
        default: Date.now
    },
    products:[
        {
            id:{
                type:mongoose.Schema.Types.ObjectId,
                ref :'products',                
            }
        }
    ]
})

const Users = mongoose.model('users',userSchema);

module.exports = Users;