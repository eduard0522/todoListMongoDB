import { useEffect, useState } from "react"


export const DragAndDrop = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Task 1" , description : "jkd djwj lai ed ye a laojf lor eja sjudefefkk", stateTask : "to-do" },
    { id: 2, name: "Task 2",  description : "jkd djwj lai ed ye a laojf lor eja sjudefefkk" , stateTask : "to-do"},
    { id: 3, name: "Task 3", description : "jkd djwj lai ed ye a laojf lor eja sjudefefkk", stateTask : "to-do" },
    { id: 4, name: "Task 4"  , description : "jkd djwj lai ed ye a laojf lor eja sjudefefkk",  stateTask : "to-do"},
]);

  
  const getData = (list) => {
    return tasks.filter( item => {
      return item.stateTask == list
    })
  }

  const startDrag = (evt , item) => {
     evt.dataTransfer.setData("itemID", item.id);
  }

  const dragInOver = (evt) => {
    evt.preventDefault();
  }

  const onDropEvt = (evt, list) => { 
     evt.preventDefault();
      const itemID = evt.dataTransfer.getData("itemID");

      const item = tasks.find(task => task.id == itemID);
         console.log(item)

      const newState = tasks.map(task => (
        task.id == itemID ?  task = {...task, stateTask : list} : task

      ));

      console.log(newState)
      setTasks(newState)
  }

 
  return (
    <> 
      <section className="flex gap-8">


        <div className=" mt-10 w-1/3  p-2 border-t-8 rounded-md border-red-200"> 
          <h3 className="text-2xl font-bold my-2"> Tareas por hacer </h3>

          <div  className="min-h-[100vh]"
            droppable="true"
            onDragOver={ (evt) => dragInOver(evt) }
            onDrop={(evt) => onDropEvt(evt,"to-do")}
            >
                 {
                  getData("to-do").map( item => (
                    <div key={item.id} className="my-4 bg-slate-800 py-4 px-2 rounded-md"
                      draggable onDragStart={(evt) => {startDrag(evt,item)}}
                    >
                        <strong className="text-red-200 text-2xl font-bold"> {item.name} </strong>
                        <p className="text-xl "> {item.description} </p>
                    </div>
                  ))
                 }


          </div>
        </div>


        <div className=" mt-10 w-1/3  p-2 border-t-8 rounded-md border-sky-400"> 
          <h3 className="text-2xl font-bold my-2"> en proceso</h3>
          <div className="min-h-[100vh]" droppable="true"
            onDragOver={ (evt) => dragInOver(evt) } 
            onDrop={(evt) => onDropEvt(evt,"process")}
            >
                 {
                  getData("process").map( item => (
                    <div key={item.id} className="my-4 bg-slate-800 py-4 px-2 rounded-md"
                    draggable onDragStart={(evt) => {startDrag(evt,item)}}
                  >
                      <strong className="text-red-200 text-2xl font-bold"> {item.name} </strong>
                      <p className="text-xl "> {item.description} </p>
                  </div>
                  ))
                 }
          </div>
        </div>


        <div className=" mt-10 w-1/3  p-2 border-t-8 rounded-md border-green-500"> 
          <h3 className="text-2xl font-bold my-2"> Terminada </h3>
          <div className="min-h-[100vh]" droppable="true"
            onDragOver={ (evt) => dragInOver(evt) } 
            onDrop={(evt) => onDropEvt(evt,"finaliced")}
            >
                 {
                  getData("finaliced").map( item => (
                    <div key={item.id} className="my-4 bg-slate-800 py-4 px-2 rounded-md"
                      draggable onDragStart={(evt) => {startDrag(evt,item)}}
                    >
                        <strong className="text-red-200 text-2xl font-bold"> {item.name} </strong>
                        <p className="text-xl "> {item.description} </p>
                    </div>
                  ))
                 }
          </div>
        </div>
      </section>
    </>
  )
}
