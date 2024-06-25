import app from "./app.js";
import { connectDB } from "./db.js";

connectDB()

app.listen(9876 , () => {
  console.log("Server is running http://localhost:9876");
});
