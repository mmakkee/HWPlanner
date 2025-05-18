export async function getAssignments() {
  const res = await fetch("http://localhost:3000/assignment/list");
  return res.json();
}

export async function createAssignment(data) {
  const res = await fetch("http://localhost:3000/assignment/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create assignment");
  }

  return res.json();
}
