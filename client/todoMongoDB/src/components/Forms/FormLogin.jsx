import { useForm }  from "react-hook-form"
import { useAuth } from "../Context/AuthContext.jsx"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react";

const FormLogin = () => {

  const { 
    register,
    handleSubmit,
    formState:{errors}
   } = useForm();

   const { signIn , errors: loginErrors, isAuthenticated  } = useAuth()

   const navigate = useNavigate ()

   useEffect(() => {
    if (isAuthenticated)  navigate("/tasks")
   }, [isAuthenticated])


  const onSubmit  = handleSubmit( (values) => {
    signIn(values)
  });


  


  return (
    <div className="bg-slate-900 w-[96%]  md:max-w-[500px] px-8 py-4 md:mt-16">

        <h2 className="text-4xl font-bold text-center"> Login </h2>
          { loginErrors.map((error, i) => (
              <div className="bg-red-500 text-white p-2 my-4 rounded-md" key={i}> 
                { error }  
              </div>
              )
          )}
         <form className="p-2" 
                onSubmit ={onSubmit} 
          >
                <input  {...register("email", {required:true}) }  placeholder="Ingresa un correo"  type="email" autoComplete="username"
                   className="w-full py-2 px-4 rounded-lg bg-slate-700 text-white  bordener-none outline-slate-300 my-2"
               />

                {errors.email && (
                  <p className="text-red-600"> Email is required </p>
                 )} 

              <input  {...register("password", {required:true}) }  placeholder="Ingresa una contraseña"  type="password" autoComplete="current-password"
                   className="w-full py-2 px-4 rounded-lg bg-slate-700 text-white  bordener-none outline-slate-300 my-2"
               />

                  {errors.password && (
                  <p className="text-red-600"> Password is required </p>
                  )} 

              <div className="flex items-center w-full justify-between">
                <button className="bg-slate-700 py-2 px-4 rounded-lg hover:bg-slate-600  my-2 " type="submit"> Ingresar </button>
                
              <Link to="/register">
                    <p className = " text-zinc-100 text-lg underline hover:text-green-200"> Registrarse  </p>
              </Link>
              </div>
            

         </form>

    </div>
  )
}

export default FormLogin