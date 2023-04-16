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

/* req - reques, res - response */
app.get('/', (req, res) => {
    res.send("hello world!!!");
});

app.post("/auth/login", (req, res) => {
    console.log(req.body);

    //token encryption
    const token = jwt.sign({
        email: req.body.email,
        fullName: "Andrew"
    }, "secret123");

    res.json({
        succes: true,
        token
    })
});



//add port
app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server Ok')
});