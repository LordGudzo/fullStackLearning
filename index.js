// for back
import express from "express";
//coonect to mongoDB
import mongoose from "mongoose";
mongoose
    .connect("mongodb+srv://LordGudzo:w6@cluster0.ynaurch.mongodb.net/blog?retryWrites=true&w=majority")
    .then(() => console.log("DB ok"))
    .catch((err) => console.log('DB error', err));
//validation block
import { registerValidation } from "./validations/auth.js";
import * as UserController from "./controllers/UserController.js"

import checkAuth from "./utils/checkAuth.js"

const app = express();
//help app to understand json
app.use(express.json());

//post for login
app.post("/auth/login", UserController.login);
//post for registration
app.post("/auth/register", registerValidation, UserController.register );
//gets information about user, needs token
app.get("/auth/me", checkAuth, UserController.getMe )



//add port
app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server Ok')
});