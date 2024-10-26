import mongoose from "mongoose";
import User from "../models/User.js"
import bcrypt from "bcryptjs";
import { CreateError } from "../error.js";
import  jwt from "jsonwebtoken";
// import dotenv from "dotenv"


// dotenv.config();


//signup
export const signup = async(req, res, next) => {
    try{
        const {password, name, email} = req.body;

        const userName = await User.findOne({name});
        const userEmail = await User.findOne({email});

        if(userName)
        {
            next(CreateError(403, "Username already exist!"))
        }

        if(userEmail)
        {
            next(CreateError(403, "User already exist, Try login!"))
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new User({...req.body, password: hash});

        await newUser.save();

        res.status(200).send("User has been created. Please Signin!");
    }
    catch(err)
    {
        next(err)
    }
    
}

//signin
export const signin = async(req, res, next) => {
    try{
        const user = await User.findOne({name: req.body.name});
        if(!user)
        {
            next(CreateError(404, "no user found!"))
        }
        else
        {
            const hash = user.password;
            let passStatus = bcrypt.compareSync(req.body.password, hash);
            if(!passStatus)
            {
                next(CreateError(400, "no password match"))
            }

            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY);

            //to destructure only required details
            const {password, ...other} = user._doc;
            
            //sending this cookie to client browser for future use
            res.cookie("access_token", token, {
                //adding cofiguration for more security
                httpOnly:true,
                sameSite: 'Lax',
            }).status(200).json(other);
        } 
    }
    catch(err)
    {
        next(err)
    }
    
}

//google signin

export const googleAuth = async (req, res, next) => {
    try{
        const {name, email, img} = req.body;
        const user = await User.findOne({email});

        if(user)
        {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY);
            res.cookie("access_token", token, {
                //adding cofiguration for more security
                httpOnly:true,
                sameSite: 'Lax',
            }).status(200).json(user._doc);
        }
        else{
            const newUser = new User({...req.body, fromGoogle: true})
            const savedUser = await newUser.save();

            const token = jwt.sign({id: savedUser._id}, process.env.JWT_SECRET_KEY);

            res.cookie("access_token", token, {
                //adding cofiguration for more security
                httpOnly:true,
                sameSite: 'Lax',
            }).status(200).json(savedUser._doc);
        }

    }
    catch(err)
    {
        next(err);
    }
}

//logout
export const logout = (req, res, next) =>
{
    res.cookie("access_token", "").status(200).json("logout successfull!");
}