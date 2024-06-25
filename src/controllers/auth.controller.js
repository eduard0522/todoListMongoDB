import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

export const register =  async (req,res) => {
  const {username , email , password } = req.body;
  try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser =  new User({
        username,
        email,
        password : hashedPassword
      });

      const userSaved = await newUser.save();
      const token = await createAccessToken({id : userSaved._id });     
        
      res.cookie("token" , token)

      res.json({ 
        id: userSaved._id,
        username: userSaved.username,
        email : userSaved.email,
        createdAt : userSaved.createdAt
      });

  } catch (error) {
    res.status(500).json({message : "error al crear este usuario"})
    console.log(error)
  }
}


export const login =  async (req,res) => {
   
  const{email ,password } = req.body;

  try {

    const userFound = await User.findOne({ email });

    if(!userFound) return res.status(400).json({message : "Creadenciales invalidos."});

    const isMatch = await bcrypt.compare(password , userFound.password);
    if(!isMatch) return res.status(400).json({message : "Creadenciales invalidos."});

    const token = await createAccessToken({id : userFound._id }); 

    res.cookie("token" , token);

    res.json({
      id: userFound._id,
      username: userFound.username,
      email : userFound.email,
      createdAt : userFound.createdAt
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message:  "Ocurrio un error inesperado, intente de nuevo mas tarde."})
  }
}


export const logout = (req,res) => {

  res.cookie("token" , "" , {
    expires : new Date(0),
  })

  return res.sendStatus(200);
}

export const profile = async (req,res) => {
    
  try {
    const userFound = await User.findById(req.user.id)
    if(!userFound) return res.status(404).json({message : " user not found " });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email : userFound.email,
      createdAt : userFound.createdAt
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message:  " An unexpected error ocurred, please try again later.  " });
  }
}