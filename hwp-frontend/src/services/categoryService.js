export async function getCategories() {
  const res = await fetch("http://localhost:3000/category/list");

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json(); // { itemList: [...] }
}

export async function createCategory(data) {
  const res = await fetch("http://localhost:3000/category/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || "Failed to create category");
  }

  return res.json(); // { id, name }
}
