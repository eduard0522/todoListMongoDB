import FormTask from "../components/Forms/FormTask";
import { useTask } from "../components/Context/TaskContext";
import TaskCard from "../components/CardTask";
import { useEffect } from "react";



const TasksPage = () => {

  const { tasks, getTasks, loading, openFormTask  } = useTask();

  useEffect(() => {
    getTasks();
  },[]);

  loading && <h2> Loading....... </h2>

  if(!loading && tasks.length == 0) return <h2> No tasks </h2>

  return (
    <main className=" mt-4" >

        <section className="grid  md:grid-cols-3 gap-4 w-full">
            { tasks.map(task => <TaskCard  key={task._id} task ={task}/>)}
        </section>

        {
          openFormTask && <FormTask/>
        }
    </main>
  )
}


export default TasksPage