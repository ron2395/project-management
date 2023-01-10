import express from 'express'
const router = express.Router()
import { admin, protect, projectManager } from '../middlewares/authMiddleware.js'
import {
  getAllProjects,
  deleteProject,
  createProject,
  getProjectById,
  createProjectRemark,
  updateProject,
  getAllRemarksByProjectId,
  deleteProjectRemark,
  updateProjectRemark
} from '../controllers/projectControllers.js';
import { createTask, getTasksByProjectId } from '../controllers/taskControllers.js';

router.route('/:id/tasks')
  .get(protect, projectManager, getTasksByProjectId)
  .post(protect, projectManager, createTask);

router.route('/:id/remarks/:remarkId')
      .delete(protect, deleteProjectRemark)
      .put(protect, updateProjectRemark)

router.route('/:id/remarks')
      .post(protect, createProjectRemark)
      .get(protect, getAllRemarksByProjectId)

router.route('/:id')
      .get(protect, getProjectById)
      .delete(protect, admin, deleteProject)
      .put(protect, projectManager, updateProject)

router.route('/').get(protect, getAllProjects).post(protect, admin, createProject)

export default router;