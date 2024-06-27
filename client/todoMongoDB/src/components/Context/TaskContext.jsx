import { createContext , useContext, useState } from "react";
import { getTaskRequest,getTasksRequest, createTaskRequest ,deleteTaskRequest ,updateTaskRequest } from "../../api/tasks";

export const TaskContext = createContext()

export const useTask = () => {
  const context = useContext(TaskContext);

  if(!context){
    throw new Error('useTask must be used within a TaskProvider')
  }
  return context;
}

export const TaskContextProvider = ({ children }) => {

      const [tasks, setTasks] = useState([]);

      const [loading , setLoading] = useState(true)

      const [openFormTask , setOpenFormTask] = useState(false);


      const changeOpenForm = () => {
        setOpenFormTask(!openFormTask);
      }


      const getTasks = async () => {
        try {

          const res =  await getTasksRequest();

          if(!res.data) {
           return setLoading(false)
          } 

          setTasks(res.data)
          return  setLoading(false)


        } catch (error) {
          console.log(error)
        }

      }

      const createTask = async (task) => {
        try {
          const res = await createTaskRequest(task);
            if(res.data){
              console.log(res)
              setTasks([...tasks, res.data])
            }
          } catch (error) {
            console.log(error);
          }
      } 

      const updateTask = async (id,task) => {
        try {
          const res = await updateTaskRequest(id,task);
          if(res.data){
            const newTasks = tasks.map((task) => task._id === id ? task = res.data :  task)
            setTasks(newTasks)
          }
        } catch (error) {
          setTasks(tasks)
        }
      }

      const deleteTask = async (id) => {
     
        try {
          const res = await deleteTaskRequest(id);
          
          if(res.status === 204){ 
            const newTasks = tasks.filter((task) => task._id !== id)
            setTasks(newTasks)
          }
        } catch (error) {
          console.log(error)
        }
      }


      return(
        <TaskContext.Provider 
            value={{ tasks, createTask, getTasks, loading , changeOpenForm , openFormTask, updateTask, deleteTask }}
        >
            {children}

        </TaskContext.Provider>
      )
}