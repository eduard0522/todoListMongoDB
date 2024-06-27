import {z}  from 'zod';

export const resgisterSchema = z.object({
  username : z.string({
    required_error : "Username is required."
  }),
  email : z.string({
    required_error : "Email is required."
   }).email({
    message : "Invalid email address."
   }),
   password : z.string({ 
    required_error : "Password is required.",
    }).min(5,{
      message : "Password must be at least 5 characters long."
   })
});




export const loginSchema = z.object({
  email: z.string({
    required_error: "Email is required",
    message :" Invalid email "
  }).email({
    required_error: "Invalid email address",
   }),
  password: z.string({
    required_error: "Password is required",
  }).min(5, "Password must be at least 5 characters"),
});
