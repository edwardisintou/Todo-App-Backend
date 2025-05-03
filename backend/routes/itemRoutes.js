import express from "express";
import {
    getItems,
    addItem,
    updateItem,
    deleteItem,
} from "../controllers/itemController.js";
const router = express.Router();

// Get and add item
router.route("/").get(getItems).post(addItem);
// Update and delete item
router.route("/:id").put(updateItem).delete(deleteItem);

export default router;
