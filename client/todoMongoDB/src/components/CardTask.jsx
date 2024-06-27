import { Link } from "react-router-dom"
import { useTask } from "./Context/TaskContext"

import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc);


const TaskCard = ({task}) => {


  const {deleteTask , changeOpenForm} = useTask()

  return (
    <article className="bg-slate-700  rounded-md text-white p-4">
        <header className="flex w-full items-center justify-between">
          
            <h2 className="text-2xl font-bold ">{task.title}</h2>
            <div className="flex gap-2">
               <Link to={`/task/${task._id}`  } onClick={ changeOpenForm} >
                    <button type="button" className=" py-2 px-4 rounded-md bg-sky-400"> Edit</button> 
                </Link>
              <button type="button" className=" py-2 px-4 rounded-md bg-red-400"
                onClick={() => deleteTask(task._id)}
              >Delete</button>
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