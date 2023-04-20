//for generate token
import jwt from "jsonwebtoken";
//need for password encryption
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import UserModel from "../models/user.js";

export const register = async(req, res) => {
    try{
            //contains all errors after validaton
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json(errors.array());
        }

        //encryption password
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash
        });

        const user = await doc.save();

        //create token
        const token = jwt.sign({
                _id: user._id
            }, 
            "secret123",
            {
            expiresIn: "30d"  
            }
        )
        //destructorization so as not to send the password in the response
        const { passwordHash, ... userData } = user._doc

        res.json({
           ... userData,
           token
        });
    } catch(err){
        console.log(err);
        res.status(500).json("not succesfull registration")
    }
    
}

export const login = async (req, res) => {
    try {
        //check email
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                //in real project don't need to send this massege
                message: "user isn't find"
            })
        }

        //check password
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPass) {
            return res.status(403).json({
                message: "No valid login or password"
            })
        }

        //create token
        const token = jwt.sign({
            _id: user._id
        }, 
        "secret123",
        {
        expiresIn: "30d"  
        })

        //destructorization so as not to send the password in the response
        const { passwordHash, ... userData } = user._doc

        res.json({
            ... userData,
            token
        });
    } catch(err){
        console.log(err);
        res.status(500).json("not succesfull avtorisation");
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        

        if(!user){
            return res.status(404).json({
                message: "user isn't find"
            })
        }

        //destructorization so as not to send the password in the response
        const { passwordHash, ... userData } = user._doc;
        res.json(userData);
    } catch(err){
        console.log(err);
        res.status(500).json("not acsses");
    }
}