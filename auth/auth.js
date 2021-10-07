const jwt = require('jsonwebtoken');
const Users = require('../models/user');

const auth = async(req,res,next) =>{

    const token = req.header('x-auth-token');

    if( !token ) {
        return res.status(401).json({ msg:'No token provided, Authorization denied..!!'});
    }

    try{
        const decoded = jwt.verify(token,"mysecretkey");
        const user = await Users.findById(decoded.user.id);
        req.user = user;    

    }catch( err ){
        return res.status(401).json({ msg:'Invalid token provided, Authorization denied..!!'});
    }
    next();
}

module.exports = auth;