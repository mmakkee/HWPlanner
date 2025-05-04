
const express = require("express");
const bodyParser = require("body-parser");
const assignmentDao = require("./dao/assignment-dao");
const categoryDao = require("./dao/category-dao");
const app = express();

app.use(bodyParser.json());


// Create assignment
app.post("/assignment/create", (req, res) => {
  const dtoIn = req.body;
  const { id, title, description, dueDate, categoryId } = dtoIn;

  const errors = [];
  if (!title || typeof title !== "string") errors.push("Invalid title");
  if (!dueDate || !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) errors.push("Invalid dueDate format");
  if (!categoryDao.get(categoryId)) errors.push("Category does not exist");

  const today = new Date().toISOString().split("T")[0];
  if (dueDate < today) errors.push("dueDate must be today or in the future");

  if (errors.length) return res.status(400).json({ error: "invalidDtoIn", details: errors });

  const assignment = assignmentDao.create({
    title,
    description: description || "",
    dueDate,
    status: "inProgress",
    categoryId,
  });

  res.json(assignment);
});

// Set assignment status
app.post("/assignment/setStatus", (req, res) => {
  const { id, status } = req.body;
  if (!id || !["inProgress", "completed"].includes(status)) {
    return res.status(400).json({ error: "invalidDtoIn" });
  }

  const assignment = assignmentDao.get(id);
  if (!assignment) {
    return res.status(404).json({ error: "assignmentDoesNotExist", id });
  }

  assignment.status = status;
  assignmentDao.update(assignment);
  res.json(assignment);
});

// List assignments with optional filters
app.get("/assignment/list", (req, res) => {
  const { categoryId, dueDate } = req.query;
  const filter = {};
  if (categoryId) filter.categoryId = categoryId;
  if (dueDate) filter.dueDate = dueDate;
  const itemList = assignmentDao.list(filter);
  res.json({ itemList });
});


// Create category
app.post("/category/create", (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== "string") return res.status(400).json({ error: "invalidDtoIn" });
  const category = categoryDao.create({ name });
  res.json(category);
});

// List categories
app.get("/category/list", (req, res) => {
  const itemList = categoryDao.list();
  res.json({ itemList });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const { v4: uuidv4 } = require("uuid");
let assignments = [];

module.exports = {
  create(assignment) {
    const newAssignment = { id: uuidv4(), ...assignment };
    assignments.push(newAssignment);
    return newAssignment;
  },
  get(id) {
    return assignments.find((a) => a.id === id);
  },
  list(filter = {}) {
    return assignments.filter((a) => {
      return (
        (!filter.categoryId || a.categoryId === filter.categoryId) &&
        (!filter.dueDate || a.dueDate === filter.dueDate)
      );
    });
  },
  update(assignment) {
    const index = assignments.findIndex((a) => a.id === assignment.id);
    if (index > -1) assignments[index] = assignment;
    return assignment;
  },
};


const { v4: uuidv4 } = require("uuid");
let categories = [];

module.exports = {
  create(category) {
    const newCategory = { id: uuidv4(), ...category };
    categories.push(newCategory);
    return newCategory;
  },
  get(id) {
    return categories.find((c) => c.id === id);
  },
  list() {
    return categories;
  },
};
