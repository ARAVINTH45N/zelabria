import { useState } from "react";
import axios from "axios";

function App() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [user,setUser] = useState(null);
  const [internships,setInternships] = useState([]);
  const [recommended,setRecommended] = useState([]);

  // SIGNUP
  const signup = async () => {

    try{

      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {name,email,password}
      );

      alert(res.data.message);

    }catch(err){

      alert("Signup failed");

    }

  };


  // LOGIN
  const login = async () => {

    try{

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {email,password}
      );

      setUser(res.data.user);

      alert("Login successful");

    }catch(err){

      alert("Login failed");

    }

  };


  // LOAD ALL INTERNSHIPS
  const loadInternships = async () => {

    try{

      const res = await axios.get(
        "http://localhost:5000/api/internships/all"
      );

      setInternships(res.data);

    }catch(err){

      alert("Failed to load internships");

    }

  };


  // LOAD RECOMMENDED INTERNSHIPS
  const loadRecommended = async () => {

    try{

      const res = await axios.get(
        `http://localhost:5000/api/match/user/${user.id}`
      );

      setRecommended(res.data.matches);

    }catch(err){

      alert("Failed to load recommendations");

    }

  };


  return (

    <div style={{padding:"40px",fontFamily:"Arial"}}>

      <h1>ZELABRIA Internship Platform</h1>


      {!user && (

        <div>

          <h2>Signup</h2>

          <input
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <br/><br/>

          <input
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <br/><br/>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <br/><br/>

          <button onClick={signup}>
            Signup
          </button>

          <br/><br/>

          <h2>Login</h2>

          <button onClick={login}>
            Login
          </button>

        </div>

      )}


      {user && (

        <div>

          <h2>Welcome {user.name}</h2>

          <button onClick={loadInternships}>
            Load All Internships
          </button>

          <button onClick={loadRecommended} style={{marginLeft:"10px"}}>
            Recommended for You
          </button>


          <h3>Recommended Internships</h3>

          {recommended.map((job,index)=>(
            <div
              key={index}
              style={{
                border:"1px solid green",
                padding:"10px",
                margin:"10px"
              }}
            >

              <h4>{job.title}</h4>
              <p>Company: {job.company}</p>
              <p>Location: {job.location}</p>
              <p>Stipend: {job.stipend}</p>

              <a href={job.applyLink} target="_blank">
                Apply
              </a>

            </div>
          ))}


          <h3>All Internships</h3>

          {internships.map((job,index)=>(
            <div
              key={index}
              style={{
                border:"1px solid gray",
                padding:"10px",
                margin:"10px"
              }}
            >

              <h4>{job.title}</h4>
              <p>Company: {job.company}</p>
              <p>Location: {job.location}</p>
              <p>Stipend: {job.stipend}</p>

              <a href={job.applyLink} target="_blank">
                Apply
              </a>

            </div>
          ))}

        </div>

      )}

    </div>

  );

}

export default App;