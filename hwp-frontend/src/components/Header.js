import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <h1>HWP</h1>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/" style={{ fontWeight: pathname === "/" ? "bold" : "normal" }}>Task List</Link>
        <Link to="/categoryList" style={{ fontWeight: pathname === "/categoryList" ? "bold" : "normal" }}>Categories</Link>
      </nav>
    </header>
  );
}