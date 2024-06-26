import { useForm }  from "react-hook-form"
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext.jsx";
import { registerRequest } from "../../api/auth.js";

const FormRegister = () => {

  const{ register, handleSubmit}= useForm();

  const { signUp } = useContext(AuthContext)

  return (
    <div className="bg-slate-900 w-[96%]  md:max-w-[500px] px-8 py-4 md:mt-16">
        <h2 className="text-4xl font-bold text-center"> Registro </h2>

         <form className="p-2" 
                onSubmit={ handleSubmit( (values) => { signUp(values) })
                }
          >

                <input  {...register("username", {required:true}) }  placeholder="Ingresa un nombre de usuario"  type="text" 
                   className="w-full py-2 px-4 rounded-lg bg-slate-700 text-white  bordener-none outline-slate-300 my-2"
               />


                <input  {...register("email", {required:true}) }  placeholder="Ingresa un correo"  type="email" autoComplete="username"
                   className="w-full py-2 px-4 rounded-lg bg-slate-700 text-white  bordener-none outline-slate-300 my-2"
               />


              <input  {...register("password", {required:true}) }  placeholder="Ingresa una contraseña"  type="password" autoComplete="current-password"
                   className="w-full py-2 px-4 rounded-lg bg-slate-700 text-white  bordener-none outline-slate-300 my-2"
               />
        
              <button className="bg-slate-700 py-2 px-4 rounded-lg hover:bg-slate-600  my-2 " type="submit"> Registrar</button>

         </form>

    </div>
  )
}

export default FormRegister