import { useEffect, useState } from "react";
import "./index.css";

function App() {

  const [internships, setInternships] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = "https://zelabria-api.onrender.com";

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {

      const res = await fetch(`${API_URL}/api/internships`);
      const data = await res.json();

      setInternships(data);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching internships:", error);
    }
  };

  const filteredInternships = internships.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">

      <h1 className="title">ZELABRIA Internship Alerts</h1>

      <input
        type="text"
        placeholder="Search internships..."
        className="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p className="loading">Loading internships...</p>
      ) : (
        <div className="grid">

          {filteredInternships.map((job) => (
            <div className="card" key={job._id}>

              <h2>{job.title}</h2>

              <p className="company">{job.company}</p>

              <p>{job.location}</p>

              <a
                href={job.link}
                target="_blank"
                rel="noreferrer"
                className="apply"
              >
                Apply Now
              </a>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default App;