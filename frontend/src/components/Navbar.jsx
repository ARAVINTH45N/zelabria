import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px 40px",
      background: "#111",
      color: "white"
    }}>
      <h2>ZELABRIA</h2>

      <div style={{display:"flex", gap:"20px"}}>
        <Link style={{color:"white"}} to="/">Home</Link>
        <Link style={{color:"white"}} to="/dashboard">Dashboard</Link>
        <Link style={{color:"white"}} to="/profile">Profile</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;