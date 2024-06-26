import { createContext, useState } from "react";
import { registerRequest } from "../../api/auth";


export const AuthContext = createContext();


export const AuthProvider = ({children}) => {

  const[User , setUser] = useState(null);

  const signUp =  async (user) => {
    const res = await registerRequest(user);
    console.log(res)
    setUser(res.data);
  }

  return(
    <AuthContext.Provider value={{ signUp ,User}}>
      {children}
    </AuthContext.Provider>
  )
}