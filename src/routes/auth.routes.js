import { Router } from "express";
import { 
  login, 
  register ,
  logout , 
  profile ,
  }  from "../controllers/auth.controller.js";

import { validateSchema } from '../middlewares/validator.middleware.js';
import { resgisterSchema, loginSchema } from '../schemas/auth.schema.js';
import { authRequired } from "../middlewares/validateToken.js";

const routerAuth = Router();

routerAuth.post('/register' , validateSchema(resgisterSchema),  register)
routerAuth.post('/login', validateSchema(loginSchema), login)
routerAuth.post('/logout' , logout)
routerAuth.get("/profile" , authRequired ,  profile)

export default routerAuth