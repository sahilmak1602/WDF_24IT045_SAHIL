const express = require("express");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

const PORT = 5000;

// Parse JSON request body
app.use(express.json());

// Request logging middleware
app.use(logger);

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Task Management API is running"
    });
});

// Task routes
app.use("/api/tasks", taskRoutes);

// Global error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});