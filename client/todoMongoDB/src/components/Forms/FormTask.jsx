import { useForm } from "react-hook-form"
import { useTask } from "../Context/TaskContext";
import { useParams,useNavigate } from "react-router-dom";
import { getTaskRequest } from "../../api/tasks";
import { useEffect } from "react";

import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc);



export const FormTask = () => {

  const { register , handleSubmit , setValue} = useForm()
  const { createTask, changeOpenForm , updateTask } = useTask()
  const params = useParams()
  const navigate = useNavigate()

  const clearForm = () => {
    setValue("title", "")
    setValue("description", "")
  }

    useEffect(() => {

        const getTask = async (id) => {
          try {
            const res = await getTaskRequest(id);
            if(res.data){
              const task = res.data.task
              setValue("title", task.title)
              setValue("description", task.description)
              setValue("dateMax", dayjs.utc(task.dateMax).format("YYYY-MM-DD"))
            }
          } catch (error) {
              console.log(error)
          }
       }

       if(params.id) getTask(params.id);

    },[]);
    

  const onSubmmit = handleSubmit( (task) => { 
    console.log(params.id)
    if(params.id) {
      changeOpenForm()
      clearForm()
      navigate("/tasks")
      return updateTask(params.id,{
        ...task,
        dateMax : dayjs.utc(task.dateMax).format(),
      });
    }

    createTask({
      ...task,
      dateMax : dayjs.utc(task.dateMax).format(),
    });

    clearForm()
    changeOpenForm();
  });
  
  return(

      <section className="fixed top-0 left-0 right-0 bottom-0  bg-[#05101d84] flex justify-center items-center  ">

          <div className="w-[98%] 0  bg-slate-800 p-4  md:max-w-[500px] relative rounded-lg shadow-md ">
              <form  onSubmit = { onSubmmit } className="mt-4 flex flex-col justify-center gap-1">
                  <h2 className="text-2xl font-bold ">
                    {params.id ? "Edit Task" : "Create task"}
                  </h2>

                <label htmlFor="title" className="text-xl"> Title </label>
                <input type="text" placeholder="Title" autoFocus
                  className="w-full p-4 bg-slate-700 text-white my-1 rounded-lg" 
                  {...register("title") }
                />

                <label htmlFor="description" className="text-xl">Description  </label>
                <textarea placeholder="Description..."
                  className="w-full p-2 bg-slate-700 text-white my-1 rounded-lg" 
                  {...register("description")}
                  rows={3}
                />
                
                <label htmlFor="dateMax" className="text-xl"> Deadline </label>
                <input type="date" className="w-full p-4 bg-slate-700 text-white my-1 rounded-lg"
                 {...register("dateMax")}
                />

                <button className=" py-2 px-4 rounded-lg bg-sky-400 text-white w-2/5 self-end ">
                    {  params.id ? "Update"  : "Create" }

                </button>

            </form>

            <button type="button" className="text-white font-bold text-xl absolute  top-2 right-4 hover:text-sky-500  "
              onClick={ () => {
                clearForm();
                navigate("/tasks")
                changeOpenForm()}}
            > X </button>
      </div>
      </section> 

      
  )
}


export default FormTask