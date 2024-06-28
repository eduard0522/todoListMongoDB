import { useEffect } from "react";
import { useTask } from "../components/Context/TaskContext";
import CardTaskDrag from "../components/CardTaskDrag";
import FormTask from "../components/Forms/FormTask";
const TaskDrag = () => {
 
  const{ tasks, loading, getTasks, setTasks , updateTask , openFormTask } = useTask();
  const taskStatus = [
    {
      id: 1,
      status: "to-do",
      color : "#f64747"
    },
    {
      id:2,
      status:"process",
      color:"#7474ef"
    },
    {
      id:3,
      status:"pospone",
      color:"#727272"
    },
    {
      id:4,
      status:"concluded",
      color:"#52eb4a"
    }
  ];

  const dragStart = (evt,item) => {
    evt.dataTransfer.setData("taskID", item._id);
  }

  const dragOver = (evt) => {
      evt.preventDefault();
  }

  const onDropEvt = async (evt,status) => {
    evt.preventDefault();

    const id = evt.dataTransfer.getData("taskID");

    const taskNew = tasks.find((task) =>(
      task._id === id
    ));

    taskNew.stateTask = status;

    const newStatus = tasks.map((task) => {
      return task._id == id ? { ...task, stateTask: status } : task;
    });

    setTasks(newStatus) 

    updateTask(id,taskNew);

  }

  useEffect(() => {
    getTasks()
  },[])


  if(loading)  return <h1> Cargando....</h1>
  if(!loading && tasks.length === 0) return <h1> No Tasks..  </h1>
 
  return(
    <section className="flex gap-2 mt-8 ">
     { taskStatus.map((status) => (   
        <div className="w-1/4 p-2 min-h-[100vh] flex flex-col gap-8" 
            style={{ borderTop:`4px solid ${status.color}`}} 
            key={status.id}
            onDragOver={(evt) => dragOver(evt)}
            onDrop={ (evt) =>  onDropEvt(evt,status.status)}
       >
            <h2 className="text-3xl font-bold text-center"> { status.status.toUpperCase() } </h2>
            { tasks.map((task) => {
              return  task.stateTask == status.status ? <CardTaskDrag  color={status.color} task={task} startDrag={dragStart} key={task._id} /> : ""
            })}
        </div>
     )) }  

     
    { openFormTask && <FormTask /> }
    </section>
  )
}

export default TaskDrag