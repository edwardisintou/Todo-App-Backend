import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
    {
        item: {
            type: String,
            require: [true, "Please add an item"],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Item", itemSchema);
