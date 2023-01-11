import Project from '../models/projectModel.js'
import Task from '../models/taskModel.js'

export const createTask = async(req, res) => {
    const { title, plannedStart, plannedEnd, description, responsible } = req.body
    const { id } = req.params
    const projectManager = await Project.findOne({ _id: id }).select('manager')
    const newTask = await Task.create({
        title,
        plannedStart,
        plannedEnd,
        description,
        responsible,
        projectId: id,
        manager: projectManager.manager
    })
    if(newTask){
        res.json({
          title: newTask.title,
          plannedStart: newTask.plannedStart,
          plannedEnd: newTask.plannedEnd,
          description: newTask.description,
          projectId: newTask.projectId,
          manager: newTask.manager,
          _id: newTask._id
        });
    }else{
        res.status(400).send('Error creating task')
    }
}

export const getTasksByProjectId = async(req, res) => {
    const { id } = req.params
    const tasks = await Task.find({ projectId: id })
    .populate('manager', '-password')
    .populate('responsible', '-password');
    if(tasks){
        res.json(tasks)
    }
}

export const getTaskById = async(req, res) => {
    const { id } = req.params
    const task = await Task.findById(id).populate('manager', '-password').populate('responsible', '-password').populate('remarks.user', '-password')
    if(task){
        res.json(task)
    }else{
        res.status(404).send('Task not found')
    }
}

export const deleteTask = async(req, res) => {
    const { id } = req.params
    const task = await Task.findById(id)
    if(task){
        const deletedTask = await task.remove()
        res.json(deletedTask)
    }else{
        res.status(404).send('Task not found')
    }
}

export const updateTask = async(req, res) => {
    const { id } = req.params
    const { actualStart, actualEnd } = req.body
    const task = await Task.findById(id)
    if (
      (task && task.responsible.toString() === req.user._id.toString()) ||
      (task && req.user.role === '0') || (task && req.user._id.toString() === task.manager.toString())
    ) {
      task.actualStart = actualStart || task.actualStart;
      task.actualEnd = actualEnd || task.actualEnd;

      const updatedTask = await task.save();
      if (updateTask) {
        res.json(updatedTask);
      }
    }
}

export const createTaskRemark = async (req, res) => {
  const { comment } = req.body;
  const { id } = req.params;
  const task = await Task.findById(id);
  if (task) {
    const remark = {
      comment,
      user: req.user._id,
    };
    task.remarks.push(remark);

    await task.save();
    res.status(201).send(remark);
  } else {
    res.status(404).send('Task not found');
  }
};

export const getAllRemarksByTaskId = async(req, res) => {
    const { id } = req.params
    const remarkList = await Task.findById(id)
      .select('remarks')
      .populate('remarks.user', '-password');
    res.status(201).send(remarkList)
}

export const deleteTaskRemark = async(req, res) => {
    const { taskid, remarkId } = req.params
    const remark = await Task.updateOne({ _id: taskid },
        { $pull: { 'remarks': { _id: remarkId } }})
    if(remark){
        res.status(201).send('Remark deleted')
    }
}

export const updateTaskRemark = async(req, res) => {
    const { taskid, remarkId } = req.params;
    const { comment, remarkUserId } = req.body;
    if (req.user._id.toString() === remarkUserId) {
      const remark = await Task.updateOne(
        { _id: taskid },
        { $set: { "remarks.$[elem].comment": comment } },
        { arrayFilters: [{ "elem._id": remarkId }] }
      );
      res.json(remark);
    } else {
      res.status(401).send("Not allowed");
    }
}

export const getUserTasks = async(req, res) => {
  const { id } = req.params
  const userTasks = await Task.find({ responsible: id })

  if(userTasks){
    res.json(userTasks)
  }else{
    res.send('nothing')
  }
}