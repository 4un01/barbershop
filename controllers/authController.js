const User = require('../models/userModel');

async function signupController(req, res){
    const {name, email, password} = req.body;
    const newUser = {
        nameVal: name,
        emailVal: email,
        passwordVal: password,
        role: 'client'
    };

    try{
        const user = new User(newUser);
        await user.save();
        req.session.userId = user._id;
        res.status(202).send('success');
    }catch(e){
        if(e.code === 1100){
            res.status(409).send('email already registered');
        }else{
            console.log(e.message);
            res.status(500).send(error);
        }
    }
};

async function loginController(req, res){
    
};