// for back
import express from "express";
//coonect to mongoDB
import mongoose from "mongoose";
mongoose
    .connect("mongodb+srv://LordGudzo:w6@cluster0.ynaurch.mongodb.net/blog?retryWrites=true&w=majority")
    .then(() => console.log("DB ok"))
    .catch((err) => console.log('DB error', err));
//validation block
import { registerValidation, loginValidation, postCreateValidation } from "./validations.js";

//logical for req, res
import { UserController, PostController } from "./controllers/index.js";
//utils
import { checkAuth, handleValidationErrors } from "./utils/index.js";


const app = express();
//help app to understand json
app.use(express.json());
//help app to check uploads field when get request for /uploads
app.use('/uploads', express.static('uploads'))

//for dowlanding images
import multer from "multer";
const storage = multer.diskStorage({
    destination: (_, __, callBack) => {   //puth for file
        callBack(null, 'uploads');
    },
    filename: (_, file, callBack) => {  //file name
        callBack(null, file.originalname);
    },
});
const upload = multer({ storage });
app.post("/upload", checkAuth, upload.single('image'), (req,res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})


//post for login
app.post("/auth/login", loginValidation, handleValidationErrors , UserController.login);
//post for registration
app.post("/auth/register", registerValidation, handleValidationErrors, UserController.register );
//gets information about user, needs token
app.get("/auth/me", checkAuth, UserController.getMe );


app.get( "/posts", PostController.getAll );
app.get( "/posts/:id", PostController.getOne );
app.post( "/posts", checkAuth, postCreateValidation, handleValidationErrors, PostController.create );
app.delete( "/posts/:id", checkAuth, PostController.remove );
app.patch( "/posts/:id", checkAuth, postCreateValidation, handleValidationErrors, PostController.update );





//add port 4444
app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server Ok')
});