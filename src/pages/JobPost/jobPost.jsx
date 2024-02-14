import React from "react";
import Jobform from "../../components/JobPost/jobform";
import jobImage from "../../assets/images/job.png";

function JobPost() {
  return (
    <div style={{ display: "flex" }}>
      <Jobform />
      <img
        src={jobImage}
        style={{ maxHeight: "100vh", width: "50vw" }}
        alt="job form image"
      />
    </div>
  );
}

export default JobPost;
