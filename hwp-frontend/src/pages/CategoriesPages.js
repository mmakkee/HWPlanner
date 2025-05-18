import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService";
import AddCategoryModal from "../components/AddCategoryModal";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  return (
    <div style={{ padding: "1rem" }}>
      {categories.sort((a, b) => a.name.localeCompare(b.name)).map((cat) => (
        <div key={cat.id} style={{ marginBottom: "1rem" }}>
          <h3>{cat.name}</h3>
          {(cat.assignments || []).map((a) => (
            <div key={a.id} style={{ marginLeft: "1rem" }}>
              {a.title}
            </div>
          ))}
        </div>
      ))}
      <button onClick={() => setShowModal(true)}>Add Category</button>
      {showModal && (
        <AddCategoryModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddCategory}
        />
      )}
    </div>
  );
}
