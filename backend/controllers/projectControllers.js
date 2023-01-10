import Project from '../models/projectModel.js'
import mongoose from 'mongoose'
import Task from '../models/taskModel.js'

export const createProject = async(req, res) => {
    const { title, plannedStart, plannedEnd, description, manager } = req.body
    const newProject = await Project.create({
        title,
        plannedStart,
        plannedEnd,
        description,
        manager
    })
    res.json({
        title: newProject.title,
        plannedStart: newProject.plannedStart,
        plannedEnd: newProject.plannedEnd,
        description: newProject.description,
        manager: newProject.manager,
        _id: newProject._id
    })
}

export const getAllProjects = async(req, res) => {
    const userId = req.user._id
    let projectList
    if(req.user.role === '0'){
        projectList = await Project.find({}).populate('manager', '-password')
    } else if(req.user.role === '1'){
        projectList = await Project.find({ manager: userId }).populate('manager', '-password')
    } else if(req.user.role === '2'){
        projectList = await Project.find({
          developers: { $in: [mongoose.Types.ObjectId(userId)] },
        }).populate("manager", "-password");
    }
    if(projectList){
    res.json(projectList)
    }
}

export const getProjectById = async(req, res) => {
    const { id } = req.params
    const project = await Project.findById(id).populate('developers', '-password').populate('manager', '-password').populate('remarks.user', '-password')
    if(!project){
        res.status(404).send('Error finding project')
    } else{
        res.status(201).json(project);
    }
}

export const deleteProject = async(req, res) => {
    const { id } = req.params
    const project = await Project.findById(id)
    if(project){
        await Task.deleteMany({ projectId: id })
        await project.remove()
        res.send('Removed')
    } else{
        res.status(404).send('Project not found')
    }
}

export const updateProject = async(req, res) => {
    const { id } = req.params
    const {
        title,
        developers,
        actualStart,
        actualEnd,
        description
    } = req.body;
    const project = await Project.findById(id)
    if(project){
        project.title = title || project.title
        project.description = description || project.description
        project.actualStart = actualStart || project.actualStart
        project.actualEnd = actualEnd || project.actualEnd
        if(developers){
        project.developers = developers
        }
        const updatedProject = await project.save()
        if(updatedProject){
            res.json(updatedProject)
        }else{
            res.status(400).send('An error occured while updating')
        }
    }else{
        res.status(404).send('Project not found')
    }
}

export const createProjectRemark = async(req, res) => {
    const { comment } = req.body
    const { id } = req.params
    const project = await Project.findById(id)
    if(project){
        const remark = {
            comment,
            user: req.user._id
        }
        project.remarks.push(remark)

        await project.save()
        res.status(201).json(remark)
    }else{
        res.status(404).send('Project not found')
    }
}

export const getAllRemarksByProjectId = async(req, res) => {
    const { id } = req.params
    const remarkList = await Project.findById(id)
    .select('remarks')
    .populate('remarks.user', '-password')
    res.status(201).send(remarkList)
}

export const deleteProjectRemark = async(req, res) => {
    const { id, remarkId } = req.params
    const remark = await Project.updateOne(
        { _id: id }, { $pull: { 'remarks': { _id: remarkId } } })
    if (remark) {
        res.status(201).send("Remark deleted");
    }else{
        res.status(404).send('Not authorized')
    }
}

//fix
export const updateProjectRemark = async(req, res) => {
    const { id, remarkId } = req.params;
    const { comment } = req.body;
    const remark = await Project.updateOne(
   { _id: id },
   { $set: { "remarks.$[remark].comment" : comment } },
   { arrayFilters: [ { "remark._id": remarkId } ] })
    res.json(remark)
}