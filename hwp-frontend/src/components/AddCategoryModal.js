import { useState } from "react";
import { createCategory } from "../services/categoryService";

export default function AddCategoryModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit вызывается, name:", name); // ⬅️ добавь это
  
    try {
      const newCategory = await createCategory({ name });
      console.log("Новая категория создана:", newCategory); // ⬅️ и это
      onAdd(newCategory);
      onClose();
    } catch (err) {
      console.error("Ошибка при создании категории:", err);
      alert("Failed to create category.");
    }
  };

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", background: "#fff" }}>
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}
