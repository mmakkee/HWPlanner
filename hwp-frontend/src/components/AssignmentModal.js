export default function AssignmentModal({ assignment, onClose }) {
    return (
      <div style={{ border: "1px solid #000", padding: "1rem", background: "#eee" }}>
        <h2>{assignment.title}</h2>
        <p>{assignment.description}</p>
        <p>Due: {new Date(assignment.dueDate).toLocaleDateString("cs-CZ")}</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }
  