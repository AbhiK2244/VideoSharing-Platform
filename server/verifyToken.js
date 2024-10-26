import jwt from "jsonwebtoken";
import { CreateError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log("hit", req.body, req.cookies);
    if (!token) {
        return next(CreateError(401, "You are not authenticated!"))
    }

    //now we have a token but check if it is valid or not
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return next(CreateError(403, "Token is not valid!"))
        }

        //if valid token then send user through req

        req.user = user;

        next();
    })
}