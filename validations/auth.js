import { body } from "express-validator";

export const registerValidation = [
    body('email', "invalid mail").isEmail(), //check that its email
    body('password', "password must be at least 5 characters").isLength({ min: 5 }),
    body('fullName', "name must be at least 3 characters").isLength({ min: 3 }),
    body('avatarUrl', "invalid url").optional().isURL()
];