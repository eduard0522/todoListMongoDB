import { Route , Routes  } from "react-router-dom";

import Home from "./pages/Home.jsx";

export function  Router() {
  
  return(
    <Routes>
        <Route path="/" element={ < Home /> } />
        <Route path="/login" element={ <h2 > Login </h2> } />
        <Route path="/register" element={  <h2 > Register </h2> } />
        <Route path="/task" element={  <h2 > Task </h2>} />
        <Route path="/profile" element={  <h2 > Profile </h2> } />
    </Routes>
  )
}