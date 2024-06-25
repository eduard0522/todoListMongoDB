import { Schema } from "zod";


export const validateSchema = (Schema) => (req,res,next) => {
    try {
        Schema.parse(req.body)
        next()
    } catch (error) {
      console.log(error.errors)
      return res
        .status(400)
        .json({ message : error.errors.map(err => err.message )});
    }
};