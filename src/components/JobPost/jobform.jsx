import React, { useState, useEffect } from "react";
import styles from "./jobform.module.css";
import { createJobPost } from "../../apis/job";

function Jobform() {
  const [isEditExistingJobPost] = useState(false);
  const [formData, setFormData] = useState({
    companyName: " ",
    logoUrl: "",
    title: "",
    description: "",
    skills: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createJobPost({ ...formData, skills: formData.skills.split(",") });
  };
  return (
    <div className={styles.contianer}>
      <h1 className={styles.h1}>
        {isEditExistingJobPost ? <>Edit</> : <>Add</>}
        job description
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
            onChange={handleChange}
            placeholder="Enter Logo Url"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="title">
            Title:
          </label>
          <input
            className={styles.input}
            type={"text"}
            name="title"
            onChange={handleChange}
            placeholder="Enter Title"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="description">
            Description:
          </label>
          <input
            className={styles.input}
            type={"text"}
            name="description"
            onChange={handleChange}
            placeholder="Enter Description"
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
            onChange={handleChange}
            placeholder="Enter skills "
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
    </div>
  );
}

export default Jobform;
