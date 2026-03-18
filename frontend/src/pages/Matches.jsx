import { useEffect, useState } from "react";

function Matches() {

  const [matches, setMatches] = useState([]);

  useEffect(() => {

    fetch("https://zelabria-api.onrender.com/api/match/USER_ID")
      .then(res => res.json())
      .then(data => setMatches(data.matches));

  }, []);

  return (

    <div className="container">

      <h1>Matched Internships</h1>

      {matches.map(job => (

        <div key={job._id} className="card">

          <h2>{job.title}</h2>
          <p>{job.company}</p>
          <p>{job.location}</p>

        </div>

      ))}

    </div>

  );

}

export default Matches;