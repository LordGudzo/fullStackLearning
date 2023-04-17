// for back
import express from "express";
//for generate token
import jwt from "jsonwebtoken";
//coonect to mongoDB
import mongoose from "mongoose";
mongoose
    .connect("mongodb+srv://LordGudzo:w6@cluster0.ynaurch.mongodb.net/blog?retryWrites=true&w=majority")
    .then(() => console.log("DB ok"))
    .catch((err) => console.log('DB error', err));
//validation block
import { registerValidation } from "./validations/auth.js";
import { validationResult } from "express-validator";
import UserModel from "./models/user.js";
//need for password encryption
import bcrypt from "bcrypt";


const app = express();

//help app to understand json
app.use(express.json());


app.post("/auth/register", registerValidation, async(req, res) => {
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
    
});



//add port
app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server Ok')
});