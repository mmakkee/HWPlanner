import { useEffect, useState } from "react";
import { createAssignment } from "../services/assignmentService";
import { getCategories } from "../services/categoryService";

export default function AddAssignmentModal({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const assignment = await createAssignment({
        title,
        description,
        dueDate,
        categoryId,
      });
      onAdd(assignment);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create assignment.");
    }
  };

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", background: "#fff" }}>
      <h2>Add Assignment</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <br />
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}
