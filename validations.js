import { body } from "express-validator";

export const loginValidation = [
    body('email', "invalid mail").isEmail(), //check that its email
    body('password', "password must be at least 5 characters").isLength({ min: 5 })
];


export const registerValidation = [
    body('email', "invalid mail").isEmail(), //check that its email
    body('password', "password must be at least 5 characters").isLength({ min: 5 }),
    body('fullName', "name must be at least 3 characters").isLength({ min: 3 }),
    body('avatarUrl', "invalid url").optional().isURL()
];

export const postCreateValidation = [
    body('title', "create title").isLength({ min: 5 }), 
    body('text', "enter the text of post").isLength({ min: 10 }),
    body('tags', "incorrect form of tags (need String)").optional().isString(),
    body('imageUrl', "invalid url").optional().isString()
];