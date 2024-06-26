import { useForm }  from "react-hook-form"
import { useAuth } from "../Context/AuthContext.jsx"
import { useNavigate, Link } from "react-router-dom"
import { useEffect } from "react";

const FormRegister = () => {

  const { 
    register,
    handleSubmit,
    formState:{errors}
   } = useForm();

  const navigate = useNavigate()
  const { signUp, isAuthenticated, errors: registerErrors  } = useAuth()


  useEffect( () => {
    if(isAuthenticated) navigate("/tasks")
  }, [isAuthenticated]);


  return (
    <div className="bg-slate-900 w-[96%]  md:max-w-[500px] px-8 py-4 md:mt-16">
        <h2 className="text-4xl font-bold text-center"> Registro </h2>
          { registerErrors.map((error, i) => (
              <div className="bg-red-500 text-white p-2 my-4 rounded-md" key={i}> 
                { error }  
              </div>
              )
          )}
         <form className="p-2" 
                onSubmit={ handleSubmit( (values) => { signUp(values) })
                }
          >

                <input  {...register("username", {required:true}) }  placeholder="Ingresa un nombre de usuario"  type="text" 
                   className="w-full py-2 px-4 rounded-lg bg-slate-700 text-white  bordener-none outline-slate-300 my-2"
               />

                {errors.username && (
                  <p className="text-red-600"> Username is required </p>
                 )} 


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
                <button className="bg-slate-700 py-2 px-4 rounded-lg hover:bg-slate-600  my-2 " type="submit"> Registrar </button>
                
                <Link to="/login">
                    <p className = " text-zinc-100 text-lg "> Ya tengo cuenta  <b className="underline hover:text-sky-400" > Ingresar </b> </p>
                  </Link>
            </div>

         </form>

    </div>
  )
}

export default FormRegister