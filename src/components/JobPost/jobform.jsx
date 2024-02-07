import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./jobform.module.css";
import { createJobPost, updateJobPost } from "../../apis/job";

function Jobform() {
  // **note--> This takes the state object that , jobDetails page send in the navigate section//
  const { state } = useLocation();
  // **note--> This optional chaining checks if the state variable is filled or not , (it's undefined or not) if it's undefined then it doesn't go further, it jumps to the other statement that is "false" in this case, if it is there then it goes further to edit portion , this practice prevents the error to come when it tries to access a undefined.edit .//
  const [isEditExistingJobPost] = useState(false || state?.edit);
  const [formData, setFormData] = useState({
    companyName: "" || state?.data?.companyName,
    logoUrl: "" || state?.data?.logoUrl,
    title: "" || state?.data?.title,
    description: "" || state?.data?.description,
    skills: "",
  });
  console.log(formData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditExistingJobPost) {
      if (!state.id) return;
      await updateJobPost(state.id, {
        ...formData,
        skills: formData.skills.split(","),
      });
    } else {
      await createJobPost({ ...formData, skills: formData.skills.split(",") });
    }
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
            Title:
          </label>
          <input
            className={styles.input}
            type={"text"}
            name="title"
            value={formData?.title}
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
            value={formData?.description}
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
            //value=formData.skills
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
