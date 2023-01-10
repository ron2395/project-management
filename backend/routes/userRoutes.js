import express from 'express'
import joi from 'joi';
import { admin, projectManager, protect } from '../middlewares/authMiddleware.js'
import { getUserByRole, registerUser, getAllUsers, getUserById, authUser, deleteUser, updateUser, updateUserProfile, userProfile } from '../controllers/userControllers.js';
import { createValidator } from 'express-joi-validation';

const router = express.Router()

const validator = createValidator({})
const registerSchema = joi.object({
  firstName: joi.string().min(3).max(12).required(),
  lastName: joi.string().min(3).max(12).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(20).required(),
  role: joi.string().length(1).pattern(/^[0-2]+$/).required()
});

const updateSchema = joi.object({
  firstName: joi.string().min(3).max(12),
  lastName: joi.string().min(3).max(12),
  email: joi.string().email(),
  password: joi.string().min(6).max(20),
  role: joi.string().length(1).pattern(/^[0-2]+$/),
});

const loginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().min(6).max(20).required()
});

router.route('/profile').get(protect, userProfile).put(protect, updateUserProfile)

router.route("/:id")
  .get(protect, admin, getUserById)
  .put(validator.body(updateSchema), protect, admin, updateUser)
  .delete(protect, admin, deleteUser)

router.get("/role/:role", protect, projectManager, getUserByRole);

router.route('/')
.get(protect, admin, getAllUsers)
.post(validator.body(registerSchema), protect, admin, registerUser)

router.post("/login", validator.body(loginSchema), authUser)

export default router