import jwt from "jsonwebtoken";

export default (req, res, next) => {
    //return token without (Bearer - word from insomia token) or ""
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    //token decoding
    if(token){
        try{
            const decoded = jwt.verify(token, "secret123");
            req.userId = decoded._id;
            
            //say to parrent function continue            
            next();
        }catch(err){
            return res.status(403).json({
                message: "No access"
            })
        }
    } else {
        return res.status(403).json({
            message: "No access"
        })
    }
}