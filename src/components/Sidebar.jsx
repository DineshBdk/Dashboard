export const Sidebar = () => {
  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        backgroundColor: "#212529",
        color: "white",
        padding: "20px 15px",
        position: "sticky",
        top: 0,
      }} >
      <h5>Menu</h5>
      <ul className="list-unstyled mt-3">
        <li className="mb-3">🏠 Dashboard</li>
        <li className="mb-3">📦 Assets</li>
        <li>⚙️ Settings</li>
      </ul>
    </div>
  );
};
