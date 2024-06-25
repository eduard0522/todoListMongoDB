import mongoose from "mongoose";


export const connectDB = async() =>  {
  try {
      await mongoose.connect("mongodb://localhost/authMongo");  
      console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error)
  }
}

