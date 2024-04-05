import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./jobform.module.css";
import { createJobPost, updateJobPost } from "../../apis/job";

function Jobform() {
  // **note--> This takes the state object that , jobDetails page send in the navigate section//
  const { state } = useLocation();
  const navigate = useNavigate();
  // **note--> This optional chaining checks if the state variable is filled or not , (it's undefined or not) if it's undefined then it doesn't go further, it jumps to the other statement that is "false" in this case, if it is there then it goes further to edit portion , this practice prevents the error to come when it tries to access a undefined.edit .//
  const [isEditExistingJobPost] = useState(false || state?.edit);
  const [noError, setNoError] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "" || state?.data?.companyName,
    logoUrl: "" || state?.data?.logoUrl,
    title: "" || state?.data?.title,
    salary: "" || state?.data?.salary,
    type: "",
    place: "",
    location: "" || state?.data?.location,
    description: "" || state?.data?.description,
    about: "" || state?.data?.about,
    skills: "" || state?.data?.skills.join(","),
    info: "" || state?.data?.info,
  });
  console.log(state?.data?.skills.join(","));
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //**Doubt--> what this below??//
    for (let key in formData) {
      if (formData[key] === "") {
        setNoError(true);
        return;
      }
    }
    if (isEditExistingJobPost) {
      if (!state.id) {
        alert("provide the jobId");
        return;
      }
      await updateJobPost(state.id, {
        ...formData,
        skills: formData.skills.split(","),
      });
    } else {
      await createJobPost({ ...formData, skills: formData.skills.split(",") });
    }
    // navigate("/");
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>
        {isEditExistingJobPost ? <>Edit</> : <>Add</>} job description
      </h1>
      <div className={styles.jobForm}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="companyName">
            Company Name:
          </label>
          <input
            className={styles.input}
            type={"text"}
            name="companyName"
            value={formData?.companyName}
            onChange={handleChange}
            placeholder="Enter Company Name"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="logUrl">
            Logo Url:
          </label>
          <input
            className={styles.input}
            type={"text"}
            name="logoUrl"
            value={formData?.logoUrl}
            onChange={handleChange}
            placeholder="Enter Logo Url"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="title">
            Job Position:
          </label>
          <input
            className={styles.input}
            type={"text"}
            name="title"
            value={formData?.title}
            onChange={handleChange}
            placeholder="Enter Job Position"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="salary">
            Monthly salary:
          </label>
          <input
            className={styles.input}
            type={"text"}
            name="salary"
            value={formData?.salary}
            onChange={handleChange}
            placeholder="Enter Amount in rupees"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="type">
            Job Type:
          </label>
          <select name="type" className={styles.input} onChange={handleChange}>
            <option selected disabled>
              Select
            </option>
            <option>Internship</option>
            <option>Full Time</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="place">
            Remote/office:
          </label>
          <select className={styles.input} name="place" onChange={handleChange}>
            <option selected disabled>
              Select
            </option>
            <option>Remote</option>
            <option>Office</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="location">
            Location:
          </label>
          <input
            className={styles.input}
            type={"text"}
            name="location"
            value={formData?.location}
            onChange={handleChange}
            placeholder="Enter Location "
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="description">
            Job Description:
          </label>
          <textarea
            className={`${styles.input} ${styles.big}`}
            type={"text"}
            name="description"
            value={formData?.description}
            onChange={handleChange}
            placeholder="Enter Job Description"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="about">
            About Company:
          </label>
          <textarea
            className={`${styles.input} ${styles.big}`}
            type={"text"}
            name="about"
            value={formData?.about}
            onChange={handleChange}
            placeholder="Type About your Company"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="skills">
            Skills:
          </label>
          <input
            className={styles.input}
            type={"text"}
            name="skills"
            //value=formData.skills
            onChange={handleChange}
            placeholder="Enter skills "
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="info">
            Information:
          </label>
          <textarea
            className={`${styles.input} ${styles.big}`}
            type={"text"}
            name="info"
            value={formData?.info}
            onChange={handleChange}
            placeholder="Enter Additional Information"
          />
        </div>
      </div>
      <button className={styles.cancel}>Cancel</button>
      {isEditExistingJobPost ? (
        <button onClick={handleSubmit} className={styles.add}>
          Edit Job
        </button>
      ) : (
        <button onClick={handleSubmit} className={styles.add}>
          +Add Job
        </button>
      )}
      {noError ? (
        <span
          style={{
            color: "red",
            size: ".8rem",
            weight: "700",
            padding: "1rem",
          }}
        >
          All the Fields are Required !!
        </span>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Jobform;
