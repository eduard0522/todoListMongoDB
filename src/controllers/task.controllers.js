import Task from "../models/task.model.js"

export const getTasks = async (req,res) => {
  try {
    const tasks = await  Task.find({
      user: req.user.id
    });
    return res.json(tasks)
  } catch (err) {
    console.log(err)
    return res.status(500).json({message : " An unexpected error ocurred, please try again later"})
  }
 
}
export const getTask = async (req,res) => {
  const{ id } = req.params;

  try {
      const task = await Task.findById(id);
      if(!task) return res.status(404).json({ message: "Task not found."});

      return res.json({ task });
  } catch (error) {
      console.log(error);
      return res.status(500).json({message : " An unexpected error ocurred, please try again later"});
  }
}



export const createTask = async (req,res) => {
 
  const {title, description , dateMax } = req.body;
    if(!(title || description   || dateMax)) return res.status(403).json({ message : " The required data  is incomplete."});
    try {
      const newTask = new Task({ title , description , dateMax, user: req.user.id });

      const savedTask = await newTask.save();

      if(!savedTask)  return res.status(500).json({message : " An unexpected error ocurred, please try again later"});

      return res.json(savedTask);

    } catch (error) {
      console.log(error);
      return res.status(500).json({message : " An unexpected error ocurred, please try again later"});
    }
}


export const deleteTask = async  (req,res) => {
  const {id} = req.params;

  try {
    const task =  await Task.findByIdAndDelete(id);
    if(!task) return res.status(404).json({message : "Task not found"})

    return res.sendStatus(204);

  } catch (error) {
    console.log(error)
    return res.status(500).json({message : " An unexpected error ocurred, please try again later"});
  }
}



export const updateTask = async (req,res) => {
  const {id} = req.params;

  try {
    
      const task = await  Task.findByIdAndUpdate(id , req.body , { new : true});

      if(!task) return res.status(404).json({message : "Task not found"});

      return res.json(task)

  } catch (error) {
    console.log(error);
    return res.status(500).json({message : " An unexpected error ocurred, please try again later " });
  }

}


