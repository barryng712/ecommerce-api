const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const registerUser = async (req, res) =>{
    const {username, email, password} = req.body;

    const userExists = await User.findOne({email});

    if (userExists) {
        return res.status(400).json({ message: 'user already exists'});
    }   

    const user = await User.create({
        username, email, password,
    });

    res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
    });
};

const loginUser = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    }else{
        res.status(401).json({message: 'invalid email or password'})
    }
};

module.exports = {registerUser, loginUser}