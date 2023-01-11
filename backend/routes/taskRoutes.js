import express from 'express'
const router = express.Router()
import {
    projectManager,
    protect
} from '../middlewares/authMiddleware.js'
import {
    deleteTask,
    updateTask,
    getTaskById,
    createTaskRemark,
    getAllRemarksByTaskId,
    deleteTaskRemark,
    getUserTasks,
    updateTaskRemark
} from '../controllers/taskControllers.js'

router.route("/:taskid/remarks/:remarkId")
  .delete(protect, deleteTaskRemark)
  .put(protect, updateTaskRemark);

router.route('/:id/remarks')
.post(protect, createTaskRemark)
.get(protect, getAllRemarksByTaskId)

router.route('/:id')
        .get(protect, getTaskById)
        .put(protect, updateTask)
        .delete(protect, projectManager, deleteTask)

router.get('/user/:id', protect, getUserTasks)

export default router