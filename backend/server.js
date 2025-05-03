import express from "express";
import colors from "colors";
import path from "path";
import { fileURLToPath } from "url";
import users from "./routes/userRoutes.js";
const PORT = process.env.PORT || 8000;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initial the app
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route
app.use("/api/users", users);

// Listen to port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
