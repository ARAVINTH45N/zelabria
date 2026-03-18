import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://zelabria-api.onrender.com";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    try {

      const res = await fetch(`${API}/api/auth/register`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name,
          email,
          phone,
          password
        })

      });

      const data = await res.json();

      console.log(data);

      if (data.userId) {

        alert("Registration successful");

        localStorage.setItem("userId", data.userId);

        navigate("/profile");

      } else {

        alert(data.message || "Registration failed");

      }

    } catch (error) {

      console.log(error);

      alert("Server error");

    }

  };

  return (

    <div style={{ textAlign: "center", marginTop: "120px" }}>

      <h2>Register</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}
      />

      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}
      />

      <button
        onClick={handleRegister}
        style={{
          padding: "10px 20px",
          marginTop: "10px",
          background: "#1976d2",
          color: "white",
          border: "none",
          borderRadius: "6px"
        }}
      >
        Register
      </button>

    </div>

  );

}

export default Register;