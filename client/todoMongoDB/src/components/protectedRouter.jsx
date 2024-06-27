import { useEffect } from "react"
import { useAuth } from "./Context/AuthContext"
import { Navigate , Outlet } from "react-router-dom"

const ProtectedRoutes  = () => {
  const {isAuthenticated, User , loading } = useAuth()

  loading && <h2> Loading........... </h2>

  if(!loading  && !isAuthenticated) return <Navigate to="/login"/>

  return  <Outlet />
}

export default ProtectedRoutes