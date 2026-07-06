const User = require('../models/userModel');

async function signupController(req, res){
    const {name, email, password} = req.body;
    const newUser = {
        name: name,
        email: email,
        password: password,
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
    const {email, password} = req.body;
    
    try{
        const user = await User.find({email: email, password: password});
        if(user){
            req.session.userId = user._id
            res.status(200).send('exists');
        }else{
            throw new Error('User doesnt exist');
        }
    }catch(e){
        console.log(e.message)
        res.status(500).send('server error');
    }
};

module.exports = {signupController, loginController};