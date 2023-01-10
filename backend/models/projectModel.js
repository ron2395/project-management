import mongoose from "mongoose";

export const remarkSchema = mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const projectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  plannedStart: {
    type: Date,
    required: true
  },
  plannedEnd: {
    type: Date,
    required: true
  },
  actualStart: {
      type: Date
  },
  actualEnd: {
      type: Date
  },
  description: {
    type: String,
    required: true,
  },
  remarks: [remarkSchema],
  developers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
