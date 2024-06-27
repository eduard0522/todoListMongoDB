import { createContext, useEffect,useState, useContext } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../../api/auth";
import Cookies from "js-cookie"

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) { 
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
} 


export const AuthProvider = ({children}) => {

    const[User , setUser] = useState(null);

     const [isAuthenticated , setIsAunthenticated] = useState(false);

    const [errors, setErrors] = useState([]);

    const [loading , setLoading] = useState( true );

    
    const signUp =  async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAunthenticated(true);
    } catch (error) {
      setErrors(error.response.data.message)
      setUser(null);
      setIsAunthenticated(false)
    }
    
    }

    const signIn =  async (data) => {
      try {
        const res =  await loginRequest(data);
        setUser(res.data);
        setIsAunthenticated(true);
      } catch (error) {
        setErrors(error.response.data.message);
        setUser(null);
        setIsAunthenticated(false)
      }
    }  

    useEffect(() => {
      if(errors.length > 0 ){
        const timer = setTimeout(() => setErrors([]), 4000);

        return() => clearTimeout(timer);
      }
    }, [errors]);


    useEffect(() => {

      async function verifyToken () {
        const cookies = Cookies.get();
        
          if(!cookies.token) {
              setIsAunthenticated(false)
              setLoading(false)
              return setUser(null)
          }

          try {
            const res = await  verifyTokenRequest();
            if(!res.data){
              setIsAunthenticated(false)
              setLoading(false)
              return setUser(null)
            }

            setIsAunthenticated(true)
            setLoading(false)
            return setUser(res.data)

        } catch (error) {
            setLoading(false)
            console.log(error)
            setIsAunthenticated(false)
        }
      }

      verifyToken()
      
    },[]);

    const logout = () => {
      const cookies = Cookies.get()
      if(cookies.token)
        Cookies.remove('token');
       setIsAunthenticated(false)
       setUser(null)
        
    }

  return(
    <AuthContext.Provider 
       value={{ 
          signUp , 
          signIn,
          User , 
          isAuthenticated,
          errors,
          loading,
          logout
        }}>
      {children}
    </AuthContext.Provider>
  )
}