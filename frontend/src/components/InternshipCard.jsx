function InternshipCard({ job }) {

  return (
    <div className="card">

      <h2>{job.title}</h2>

      <p className="company">{job.company}</p>

      <p className="location">{job.location}</p>

      <a href={job.link} target="_blank">
        <button className="apply">Apply Now</button>
      </a>

    </div>
  );

}

export default InternshipCard;