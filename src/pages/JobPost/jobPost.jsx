import React from "react";
import Jobform from "../../components/JobPost/jobform";
import jobImage from "../../assets/images/job.png";

function JobPost() {
  return (
    <div style={{ display: "flex", position: "relative" }}>
      <Jobform />
      <div
        style={{
          backgroundImage: `url(${jobImage})`,
          height: "100vh",
          width: "40vw",
          margin: "0px",
          color: "white",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            margin: "4rem",
            fontSize: "2.5rem",
            fontFamily: "DM Sans",
            fontWeight: "500",
            lineHeight: "3.5rem",
          }}
        >
          Recruiter add job details here
        </p>
      </div>
    </div>
  );
}

export default JobPost;
