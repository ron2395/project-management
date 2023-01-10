import mongoose from "mongoose";
import { remarkSchema } from "./projectModel.js";

const taskSchema = mongoose.Schema({
  title: {
    type: mongoose.Schema.Types.String,
  },
  remarks: [remarkSchema],
  plannedStart: {
    type: Date,
    required: true,
  },
  plannedEnd: {
    type: Date,
    required: true,
  },
  actualStart: {
    type: Date,
  },
  actualEnd: {
    type: Date,
  },
  description: {
    type: String,
    required: true,
  },
  responsible: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Task = mongoose.model('Task', taskSchema)

export default Task