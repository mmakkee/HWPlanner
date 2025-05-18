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
