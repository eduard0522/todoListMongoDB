import { Link } from "react-router-dom"
import { useTask } from "./Context/TaskContext"

import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";

import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc);


const CardTaskDrag = ({task, startDrag,color }) => {

  const {deleteTask , changeOpenForm} = useTask()

  return (
    <article className="bg-slate-700  rounded-md text-white p-4"  onDragStart={(evt) => { startDrag(evt,task)}}  draggable>
        <header className="flex w-full items-center justify-between">

            <h2 className="text-3xl font-bold  " style={{color:`${color}`}} >{task.title}</h2>

            <div className="flex gap-2">
               <Link to={`/task/${task._id}`  } onClick={ changeOpenForm} >
                    <button type="button" className=" rounded-md text-4xl text-indigo-300"> <FaEdit />  </button> 
                </Link>
              <button type="button" className=" rounded-md text-4xl text-red-400"
                onClick={() => deleteTask(task._id)}
              >  <RiDeleteBin2Fill /> </button>
            </div>
        </header>

        <div className="flex flex-col gap-4 mt-4">
            <p className="text-xl ">
              {task.description}
            </p>
            <p>
              <span className=" text-xl font-bold " > Last update:  </span> { dayjs.utc(task.updateAt).format("DD-MM-YYYY") }
            </p>
            <p>
              <span className=" text-xl font-bold "> Deadline : </span> { dayjs.utc(task.dateMax).format("DD-MM-YYYY") }
            </p>

            </div>
       
    </article>
  )
}

export default CardTaskDrag