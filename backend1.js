const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); 

const assignmentDao = require("./dao/assignment-dao");
const categoryDao = require("./dao/category-dao");


const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Создание задания
app.post("/assignment/create", (req, res) => {
  const { title, description, dueDate, categoryId } = req.body;

  const errors = [];
  if (!title || typeof title !== "string") errors.push("Invalid title");
  if (!dueDate || !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) errors.push("Invalid dueDate format");
  if (!categoryDao.get(categoryId)) errors.push("Category does not exist");

  const today = new Date().toISOString().split("T")[0];
  if (dueDate < today) errors.push("dueDate must be today or in the future");

  if (errors.length) {
    return res.status(400).json({ error: "invalidDtoIn", details: errors });
  }

  const assignment = assignmentDao.create({
    title,
    description: description || "",
    dueDate,
    status: "inProgress",
    categoryId,
  });

  res.json(assignment);
});

// Изменение статуса задания
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

// Получение списка заданий с фильтрами
app.get("/assignment/list", (req, res) => {
  const { categoryId, dueDate } = req.query;
  const filter = {};

  if (categoryId) filter.categoryId = categoryId;
  if (dueDate) filter.dueDate = dueDate;

  const itemList = assignmentDao.list(filter);
  res.json({ itemList });
});

// Создание категории
app.post("/category/create", (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "invalidDtoIn" });
  }

  const category = categoryDao.create({ name });
  res.json(category);
});

// Получение списка категорий
app.get("/category/list", (req, res) => {
  const itemList = categoryDao.list();
  res.json({ itemList });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
