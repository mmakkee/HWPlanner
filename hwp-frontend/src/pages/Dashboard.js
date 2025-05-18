import { useEffect, useState } from "react";
import { getAssignments } from "../services/assignmentService";
import AddAssignmentModal from "../components/AddAssignmentModal";
import AssignmentModal from "../components/AssignmentModal";


export default function Dashboard() {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    getAssignments().then(setAssignments);
  }, []);

  const handleAddAssignment = (newAssignment) => {
    setAssignments([...assignments, newAssignment]);
  };

  return (
    <div style={{ padding: "1rem" }}>
      {assignments.map((a) => (
        <div
          key={a.id}
          onClick={() => setSelectedAssignment(a)}
          style={{
            display: "flex",
            borderBottom: "1px solid #ccc",
            padding: "0.5rem 0",
            cursor: "pointer",
          }}
        >
          <div style={{ width: "100px", fontWeight: "bold" }}>
            {new Date(a.dueDate).toLocaleDateString("cs-CZ")}
          </div>
          <div>{a.title}</div>
        </div>
      ))}
      <button onClick={() => setShowAddModal(true)}>Add Assignment</button>

      {showAddModal && (
        <AddAssignmentModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddAssignment}
        />
      )}
      {selectedAssignment && (
        <AssignmentModal
          assignment={selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
        />
      )}
    </div>
  );
}