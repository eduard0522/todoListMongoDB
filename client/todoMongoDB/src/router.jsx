import { Route , Routes  } from "react-router-dom";
import ProtectedRoutes from "./components/protectedRouter.jsx";
import { TaskContextProvider } from "./components/Context/TaskContext.jsx";
import NavBar from "./components/NavBar.jsx";
import { DragAndDrop } from "./components/DragAndDrop.jsx";

import Home from "./pages/Home.jsx";
import LoginPage from "./pages/Login.jsx";
import TasksPage from "./pages/Tasks.jsx";
import TaskList from "./pages/TaskList.jsx";

export function  Router() {
  
  return(
    <TaskContextProvider>
      <NavBar />
        <Routes>
            <Route path="/register" element={ < Home /> } />
            <Route path="/login" element={ <LoginPage />  } />
                <Route element={ <ProtectedRoutes/>} > 
                    <Route path="/tasks" element={  <TasksPage /> } />
                    <Route path="/task/:id" element={  <TasksPage /> } />
                    <Route path="/profile" element={ <DragAndDrop /> } />
                </Route>
        </Routes>
     </TaskContextProvider>
  )
}