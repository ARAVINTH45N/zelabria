import { useEffect, useState } from "react";

const API = "https://zelabria-api.onrender.com";

function Home() {

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    const fetchJobs = async () => {

      try {

        const res = await fetch(`${API}/api/internships`);

        const data = await res.json();

        setJobs(data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchJobs();

  }, []);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div style={{maxWidth:"900px",margin:"50px auto"}}>

      <h1 style={{textAlign:"center",marginBottom:"30px"}}>
        ZELABRIA Internship Alerts
      </h1>

      <input
        style={{
          width:"100%",
          padding:"10px",
          marginBottom:"25px",
          borderRadius:"6px",
          border:"1px solid #ccc"
        }}
        placeholder="Search internships..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />

      {filteredJobs.map((job,index)=>(
        
        <div key={index} style={{
          background:"#f5f5f5",
          padding:"20px",
          marginBottom:"20px",
          borderRadius:"10px"
        }}>

          <h3>{job.title}</h3>

          <p><b>{job.company}</b></p>

          <p>{job.location}</p>

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

export default Home;