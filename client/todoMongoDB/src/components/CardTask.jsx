import { Link } from "react-router-dom"
import { useTask } from "./Context/TaskContext"

import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";

import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc);


const TaskCard = ({task}) => {

  console.log(task)

  const {deleteTask , changeOpenForm} = useTask()

  return (
    <article className="bg-slate-700  rounded-md text-white p-4">
        <header className="flex w-full items-center justify-between">
          
            <h2 className="text-2xl font-bold ">{task.title}</h2>
            <div className="flex gap-2">
               <Link to={`/task/${task._id}`  } onClick={ changeOpenForm} >
                    <button type="button" className=" rounded-md text-4xl text-indigo-300"> <FaEdit />  </button> 
                </Link>
              <button type="button" className=" rounded-md text-4xl text-red-400"
                onClick={() => deleteTask(task._id)}
              >  <RiDeleteBin2Fill /> </button>
            </div>
        </header>
        <p>
          {task.description}
        </p>
        <p>
          { dayjs.utc(task.dateMax).format("DD-MM-YYYY") }
        </p>
    </article>
  )
}

export default TaskCard