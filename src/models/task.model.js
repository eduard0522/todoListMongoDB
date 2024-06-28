import mongoose from "mongoose";

const taskSchema = new mongoose.Schema ({
  title : {
    type: String,
    required: true
  },
  description : {
    type: String,
    required :true,
  },
  completed : {
    type : Boolean,
    default : false
  },
  dateMax : {
    type : Date,
    default : Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required : true,
  },
  stateTask:{
    type: String,
    default: "to-do"
  }
}, {
  timestamps : true
});


export default mongoose.model("Task" , taskSchema);