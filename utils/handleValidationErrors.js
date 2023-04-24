import { validationResult } from "express-validator";

export default (req, res, next) => {
    //contains all errors after validaton
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }

    next();
}