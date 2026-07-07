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
        if(e.code === 11000){
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
        const exists = await User.exists({email: email, password: password});
        if(exists){
            const user = await User.findOne({email: email, password: password});
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

function checkIfLoggedIn(req, res){
    if(req.session.userId){
        res.status(200).json({loggedIn: true});
    }else{
        res.status(404).json({loggedIn: false});
    }
};

function logout(req, res){
    req.session.destroy(err => {
        if(err) return res.status(500).json({loggedIn: true});
        res.clearCookie('connect.sid');
        res.json({loggedIn: false});
    })
}

module.exports = {signupController, loginController, checkIfLoggedIn, logout};