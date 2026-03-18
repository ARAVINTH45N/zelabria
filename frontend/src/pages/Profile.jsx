import { useState } from "react";

const API = "http://localhost:5000";

function Profile() {

  const [skills,setSkills] = useState("");
  const [resume,setResume] = useState(null);

  /* SAVE SKILLS MANUALLY */

  const saveSkills = async () => {

    try {

      const userId = localStorage.getItem("userId");

      const skillsArray = skills
        .split(",")
        .map(skill => skill.trim());

      const res = await fetch(`${API}/api/user/skills`,{

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          userId,
          skills:skillsArray
        })

      });

      const data = await res.json();

      console.log(data);

      alert("Skills saved successfully");

    } catch(error) {

      console.log(error);

    }

  };

  /* HANDLE FILE SELECT */

  const handleFileChange = (e) => {

    setResume(e.target.files[0]);

  };

  /* UPLOAD RESUME */

const uploadResume = async () => {

  try {

    const userId = localStorage.getItem("userId");

    const formData = new FormData();
    formData.append("resume", resume);

    const res = await fetch(`${API}/api/resume/upload/${userId}`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    console.log("UPLOAD RESPONSE:", data);

    if (!res.ok) {
      alert(data.message || "Upload failed");
      return;
    }

    alert("Skills extracted: " + data.skills.join(", "));

  } catch(error) {

    console.log("UPLOAD ERROR:", error);
    alert("Upload crashed");

  }

};

  return (

    <div style={{textAlign:"center",marginTop:"120px"}}>

      <h2>Add Skills</h2>

      <p>Enter skills separated by comma</p>

      <input

        style={{
          width:"350px",
          padding:"10px",
          borderRadius:"6px",
          border:"1px solid #ccc"
        }}

        placeholder="Example: React, Node, MongoDB"

        value={skills}

        onChange={(e)=>setSkills(e.target.value)}

      />

      <button

        style={{
          marginLeft:"10px",
          padding:"10px 16px"
        }}

        onClick={saveSkills}

      >

        Save Skills

      </button>


      {/* RESUME UPLOAD SECTION */}

      <div style={{marginTop:"50px"}}>

        <h2>Upload Resume</h2>

        <p>Upload your resume to automatically extract skills</p>

        <input

          type="file"

          onChange={handleFileChange}

        />

        <button

          style={{
            marginLeft:"10px",
            padding:"10px 16px"
          }}

          onClick={uploadResume}

        >

          Upload Resume

        </button>

      </div>

    </div>

  );

}

export default Profile;