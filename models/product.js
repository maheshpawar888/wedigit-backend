const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
    title:{
        type:String
    },
    type:{
        type: String
    },
    description:{
        type:String,
    },
    cover:{
        type: String
    },
    price:{
        type: Number
    },
    rating:{
        type: Number
    },
    fileType:{
        type: String
    },
    addedOn:{
        type: Date,
        default: Date.now
    }
})

const Products = mongoose.model('products',productSchema);

module.exports = Products;