import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "User",
        },
        item: {
            type: String,
            require: [true, "Please add a task"],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Task", taskSchema);
