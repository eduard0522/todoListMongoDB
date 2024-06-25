import jwt from  'jsonwebtoken'
import { SECRET_PASS } from '../config.js';

 export async function  createAccessToken (payload) {
  
  return new Promise(( resolve , reject) => {
    jwt.sign(
      payload ,
      SECRET_PASS ,
    {
      expiresIn : "12d"
    },
    (err , token) => {
      if(err) reject(err)
      resolve(token)
    }
   );
  }); 
 }