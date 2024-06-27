
import { useTask } from "../components/Context/TaskContext";

const TaskList = () => {
 

  return(
    <section>
      <h2> Tareas </h2>
      {tasks.map((task, index) => (
          <div key={index} className="text-white p-8 mt-8">
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <p>{task.dateMax}</p>
          </div>
          ))}
      </section>
  )
}

export default TaskList