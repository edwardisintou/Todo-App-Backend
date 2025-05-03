import express from "express";
import {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
} from "../controllers/taskController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

// Get and add task
router.route("/").get(protect, getTasks).post(protect, addTask);
// Update and delete task
router.route("/:id").put(protect, updateTask).delete(protect, deleteTask);

export default router;
