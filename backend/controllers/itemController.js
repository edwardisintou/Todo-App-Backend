import asyncHandler from "express-async-handler";

const getItems = (req, res, next) => {
    res.json("Get items");
};

const addItem = (req, res, next) => {
    res.json("Add item");
};

const updateItem = (req, res, next) => {
    res.json("Update item");
};

const deleteItem = (req, res, next) => {
    res.json("Delete item");
};

export { getItems, addItem, updateItem, deleteItem };
