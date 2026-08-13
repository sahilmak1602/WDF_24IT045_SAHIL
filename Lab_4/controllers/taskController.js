let tasks = [
    {
        id: 1,
        title: "Learn React",
        description: "Complete React practical",
        completed: false
    },
    {
        id: 2,
        title: "Learn Node.js",
        description: "Complete Express API",
        completed: false
    }
];

// GET all tasks
const getTasks = (req, res) => {
    res.status(200).json(tasks);
};

// GET task by ID
const getTaskById = (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find((task) => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json(task);
};

// CREATE task
const createTask = (req, res) => {
    const { title, description, completed } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    const newTask = {
        id: tasks.length > 0
            ? tasks[tasks.length - 1].id + 1
            : 1,

        title: title,
        description: description || "",
        completed: completed || false
    };

    tasks.push(newTask);

    res.status(201).json({
        message: "Task created successfully",
        task: newTask
    });
};

// UPDATE task
const updateTask = (req, res) => {
    const id = parseInt(req.params.id);

    const taskIndex = tasks.findIndex(
        (task) => task.id === id
    );

    if (taskIndex === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const { title, description, completed } = req.body;

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: title || tasks[taskIndex].title,
        description:
            description !== undefined
                ? description
                : tasks[taskIndex].description,

        completed:
            completed !== undefined
                ? completed
                : tasks[taskIndex].completed
    };

    res.status(200).json({
        message: "Task updated successfully",
        task: tasks[taskIndex]
    });
};

// DELETE task
const deleteTask = (req, res) => {
    const id = parseInt(req.params.id);

    const taskIndex = tasks.findIndex(
        (task) => task.id === id
    );

    if (taskIndex === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const deletedTask = tasks.splice(taskIndex, 1);

    res.status(200).json({
        message: "Task deleted successfully",
        task: deletedTask[0]
    });
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};