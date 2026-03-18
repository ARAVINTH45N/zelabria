import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://zelabria-api.onrender.com";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    const res = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await res.json();

    console.log("LOGIN RESPONSE:", data);

    if (data.user) {

      localStorage.setItem("userId", data.user._id);

      navigate("/dashboard");

    } else {

      alert("Login failed");

    }

  };

  return (

    <div style={{ textAlign: "center", marginTop: "100px" }}>

      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>

    </div>

  );

}

export default Login;