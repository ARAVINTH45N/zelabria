import { useEffect, useState } from "react";

const API = "https://zelabria-api.onrender.com";

function Dashboard() {

  const [matches, setMatches] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchMatches = async () => {

      try {

        const userId = localStorage.getItem("userId");

        const res = await fetch(`${API}/api/match/${userId}`);

        const data = await res.json();

        console.log("MATCH RESPONSE:", data);

        // FIX HERE
        setMatches(data.matches || []);
        setUserSkills(data.userSkills || []);

        setLoading(false);

      } catch (error) {

        console.log(error);
        setLoading(false);

      }

    };

    fetchMatches();

  }, []);

  if (loading) {
    return (
      <h2 style={{textAlign:"center",marginTop:"120px"}}>
        Loading matches...
      </h2>
    );
  }

  if (matches.length === 0) {
    return (
      <div style={{textAlign:"center",marginTop:"120px"}}>
        <h2>No internships match your skills yet</h2>
        <p>Add more skills in your profile.</p>
      </div>
    );
  }

  return (

    <div style={{maxWidth:"900px",margin:"50px auto"}}>

      <h2 style={{textAlign:"center",marginBottom:"10px"}}>
        Matched Internships
      </h2>

      <p style={{textAlign:"center",marginBottom:"40px"}}>
        Your Skills: {userSkills.join(", ")}
      </p>

      {matches.map((job,index)=>(
        
        <div key={index} style={{
          background:"#f5f5f5",
          padding:"20px",
          marginBottom:"20px",
          borderRadius:"10px"
        }}>

          <h3>{job.title}</h3>

          <p><b>{job.company}</b></p>

          <p>{job.location}</p>

          {job.skills && (
            <p>
              <b>Required Skills:</b> {job.skills.join(", ")}
            </p>
          )}

          <a href={job.link} target="_blank" rel="noreferrer">
            <button style={{
              padding:"8px 16px",
              background:"#1976d2",
              color:"white",
              border:"none",
              borderRadius:"6px"
            }}>
              Apply Now
            </button>
          </a>

        </div>

      ))}

    </div>

  );

}

export default Dashboard;