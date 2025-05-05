import asyncHandler from "express-async-handler";
import Task from "../models/taskModel.js";
import User from "../models/userModel.js";

// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res, next) => {
    const tasks = await Task.find({ user: req.user.id });

    res.status(200).json(tasks);
});

// @desc    Add task
// @route   POST /api/tasks
// @access  Private
const addTask = asyncHandler(async (req, res, next) => {
    if (!req.body.title) {
        throw new Error("Please add an title field");
    }

    const task = await Task.create({
        title: req.body.title,
        user: req.user.id,
    });

    res.status(200).json(task);
});

// @desc    Update task
// @route   UPDATE /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    const user = await User.findById(req.user.id);

    // Check for task
    if (!task) {
        res.status(400);
        throw new Error("Task not found");
    }

    // Check for user
    if (!user) {
        res.status(400);
        throw new Error("User not found");
    }

    // Make sure the logged in user matches the task user
    if (task.user.toString() !== user.id) {
        res.status(400);
        throw new Error("User not authorized");
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedTask);
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    const user = await User.findById(req.user.id);

    // Check for task
    if (!task) {
        res.status(400);
        throw new Error("Task not found");
    }

    // Check for user
    if (!user) {
        res.status(400);
        throw new Error("User not found");
    }

    // Make sure the logged in user matches the task user
    if (task.user.toString() !== user.id) {
        res.status(400);
        throw new Error("User not authorized");
    }

    await task.deleteOne();

    res.status(200).json({ id: req.params.id });
});

export { getTasks, addTask, updateTask, deleteTask };
