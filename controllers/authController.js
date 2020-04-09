const User  = require("../models/user")
const jwt = require('jsonwebtoken')
require('dotenv').config

exports.signup = async (req, res) => {
    const userExists = await User.findOne({email: req.body.email})
    if(userExists) return res.status(403).send(
        "Email is taken!"
    )

    const user = await new User(req.body)
    await user.save()
    res.status(200).json({ user:user.email, message:"signed up" });
}

exports.signin = (req, res) => {
 
    const {email, password} = req.body
    
    User.findOne({email}, (err, user) => {
        if(err || !user) {
            return res.status(401).send({
                error: "User with email does not exist, Sign up please"
            })
        }
        
       
        if(!user.authenticate(password)) {
            
            return res.status(401).send({
                error: "Email and password don't match"
            })
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

        res.cookie("t", token, {expire: new Date() + 9999})

        const {_id, name, email} = user
        return res.json({token,user: {_id, email, name}})
    })
}

exports.signout = (req, res) => {
    res.clearCookie("t")
    return res.json({message: "Sign out success"})
}
