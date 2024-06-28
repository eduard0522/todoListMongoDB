import { useAuth } from "./Context/AuthContext"
import { Link } from "react-router-dom"
import { useTask } from "./Context/TaskContext"

const NavBar = () => {
  const { isAuthenticated, User , logout} = useAuth()

  const { changeOpenForm } = useTask ();

  return(
    <nav className=" w-full bg-slate-700 text-white py-4  md:px-12  flex  flex-col md:flex-row justify-between items-center rounded-xl ">
        <h1 className=" text-2xl md:text-3xl font-bold">Task Manager </h1>

        <ul className="flex gap-4 flex-col md:flex-row">
              {
                  isAuthenticated ? (
                    <>
                        <li className="py-2 px-4 font-bold text-xl" > Welcome { User.username }</li>
                        <button className="text-xl font-bold py-2 px-4 rounded-md bg-sky-500 hover:bg-sky-600" 
                            onClick={changeOpenForm}> add Task
                        </button>
                        <Link to = "/login"
                              className="text-xl text-center font-bold py-2 px-4 rounded-md bg-sky-500 hover:bg-sky-600"
                              onClick={ () => logout() }> Logout
                         </Link>
                    </>
                      
                    ) : (
                        <>
                        <li className="text-xl font-bold"> <Link to="/register">  Register  </Link></li>
                        <li className="text-xl font-bold"><Link to="/login">  Login  </Link></li>
                    </>
                  )
              }
        </ul>
    </nav>
  )
}


export default NavBar