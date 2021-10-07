const express = require("express");
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require("../models/user");
const auth = require("../auth/auth");

router.get('/getAllUsers',auth,async(req,res) => {
    try {
        const users = await User.find({ isAdmin:false });
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/register',async (req,res) => {
    try {
        const { email,password,username } = req.body;

        const isEmailExist = await User.findOne({ email });
        if(isEmailExist) {
            return res.status(400).json({ message:'Email is already register' })
        }

        const isUsernameExist = await User.findOne({ username });
        if(isUsernameExist) {
            return res.status(400).json({ message:'Username is already taken..!!' })
        }


        let user = new User({
            email,
            password,
            username
        })

        user.password = await bcrypt.hash(password, 8);
        await user.save();

        res.status(201).json({ message:'Registered Succesfully!!!' })
        
    } catch(err) {
        res.status(500).json(err);
    }
})

router.post('/login',async (req,res) => {
    try {
        const { username,password } = req.body;
        const user = await User.findOne({username});
        if(!user) {
            return res.status(400).json({ message:"Invalid Username or Password" })
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch) {
            return res.status(400).json({ message:"Invalid Username or Password"})
        }

        const payload = {
            user: {
                id:user.id
            }
        }

        const token = jwt.sign(payload, "mysecretkey");
        res.status(200).json({
            token:token,
            user:user
        });
 
    } catch(err) {
        res.status(500).json(err)
    }
})

router.get('/getUser/:id',auth,async(req,res) =>{
    try {
        const user = await Users.findById(req.params.id).select('products');
        if( !user ){
            return res.status(400).json({ msg: 'No User found..!' })
        }
        res.json( user );
    } catch (err) {
        res.status(500).json('Server Error..!!')
    }
})

module.exports = router;