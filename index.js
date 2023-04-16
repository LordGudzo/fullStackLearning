// for back
import express from "express";
//for generate token
import jwt from "jsonwebtoken";

//coonect to mongoDB
import mongoose from "mongoose";
mongoose
    .connect("mongodb+srv://LordGudzo:w6@cluster0.ynaurch.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("DB ok"))
    .catch((err) => console.log('DB error', err));


const app = express();

//help app to understand json
app.use(express.json());


app.post("/auth/login", (req, res) => {
    
});



//add port
app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server Ok')
});