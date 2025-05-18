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
