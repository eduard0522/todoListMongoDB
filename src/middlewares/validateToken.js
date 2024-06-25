import { SECRET_PASS } from "../config.js";
import jwt from "jsonwebtoken";
export const authRequired = (req, res , next) => {

    const { token } = req.cookies;
    if(!token) 
      return res.status(401).json( { message : "No token , authorization denied."})

    jwt.verify(token , SECRET_PASS , (err , user) => {
      if(err) return res.status(403).json({ message : "Invalid token, authorization denied."})

      req.user = user
      next();
    })
}