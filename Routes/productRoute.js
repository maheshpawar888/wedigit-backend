const express =  require('express');
const router = express.Router();
const multer = require('multer');const auth = require('../auth/auth');
const Products = require('../models/product');
const Users = require('../models/user');

router.get('/getProductById/:id',auth,async( req,res) =>{
    try {
        
        const product = await Products.findById( req.params.id );
        if( !product ){
           return res.status(404).json({msg:'No proudct found..!!'})
        }
        res.json( product )

    } catch (err) {
        res.status(500).json("Server error")
    }
})

router.get('/getProducts',auth,async (req,res) => {
    try {
        let products = await Products.find();
        res.json(products);
    } catch(err) {
        res.status(500).json(err)
    }
}) 


// Assign Product to user
router.put('/assignProduct/:userid',auth, async( req,res) =>{
    try {

        if( !req.user.isAdmin ){
            return res.status(400).json({ msg: "Yor are not authoried"})
        }

        const user = await Users.findById(req.params.userid);
        console.log( user )
        
        // find if product already assigned or not
        for( i in user.products) {
            if(user.products[i].id.toString() == req.body.productId) {
                return res.status(400).json({ message:"Product already assigned..!!" });
            }
        }
        
        user.products.unshift( {id: req.body.productId} );
        await user.save();
        res.json( user );

    } catch (err) {
        res.status(500).json("Server error");
    }
})


// add a product 
const storage = multer.diskStorage({
    destination: (req,file,cb) => { 
      cb(null, 'upload');
    },
    filename: (req,file,cb) => {
      
      cb(null,Date.now() + file.originalname);
    }
  })

router.post('/addProduct',auth,multer({storage: storage}).single('files'),async (req,res) => {
 
    try {

        const url = req.protocol + '://' + req.get("host");
        const fileUrl = url + '/upload/' + req.file.filename
        const fileType = req.file.mimetype
        
        var product = new Products({
            title: req.body.title,
            cover:fileUrl,
            description:req.body.description,
            fileType:fileType,
            type: req.body.type,
            price:req.body.price,
            rating:req.body.rating
        })

        product = await product.save();
        res.json(product)
    } catch(err) {
        res.status(500).json(err);
    }
})


// Delete product by id

router.delete('/deleteProduct/:id',auth,async (req,res) => {
    try {
        const id = req.params.id;

        const product = await Products.findById(id);

        if(!product) {
           return res.json({
                message:'No Product Found'
            })
        }
        await product.remove();
        res.status(200).json({
            message:'Product deleted Succesfully'
        })

    } catch(err) {
        res.status(500).json('Server error');
    }
})




module.exports = router;
