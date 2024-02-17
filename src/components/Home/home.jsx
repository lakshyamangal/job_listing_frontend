import styles from "./home.module.css";
import { useEffect, useState } from "react";
import { DEFAULT_SKILLS } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { getAllJobs } from "../../apis/job";

function Home() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");

  const handleSkill = (event) => {
    // to prevent "skills" in the dropdown menu get selected
    if (!event.target.value) return;
    const newArr = skills.filter((skill) => skill === event.target.value);
    if (!newArr.length) {
      setSkills([...skills, event.target.value]);
    }
  };

  const removeSkill = (selectedSkill) => {
    const newArr = skills.filter((skill) => skill !== selectedSkill);
    setSkills([...newArr]);
  };

  const fetchAllJobs = async () => {
    const reqPayload = {
      skills: skills?.join(","),
      title: search?.trim(),
    };
    // console.log("line no 36", typeof sea);
    const jobList = await getAllJobs(reqPayload);
    setJobs(jobList.data.jobList);
  };

  const handleKeyDown = (event) => {
    if (!search?.trim()) return;
    if (event.keyCode === 13) fetchAllJobs();
  };

  //Notes//Doubt--> we used useffect and put fetchAlljobs inside it  to prevent firing useEffect in case of lazyloading , But We need to make sure that we don't make a infinite loop in doing so . then we should not write them in dependency array . //
  // Now it is having a infinte loop in itself .

  useEffect(() => {
    fetchAllJobs();
  }, [skills]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerTop}>
          <input
            className={styles.inputTop}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            name="search"
            placeholder="Type any job title"
          />
        </div>
        <div className={styles.containerBottom}>
          <select
            onChange={handleSkill}
            className={styles.inputSelect}
            name="remote"
          >
            <option value="">Skills</option>
            {DEFAULT_SKILLS.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
          {skills.map((skill) => {
            return (
              <span className={styles.chip} key={skill}>
                {skill}
                <span
                  onClick={() => removeSkill(skill)}
                  className={styles.cross}
                >
                  X
                </span>
              </span>
            );
          })}
          <button onClick={() => navigate("/jobPost")} className={styles.edit}>
            Add Job
          </button>
        </div>
      </div>
      <div className={styles.bottom}>
        {/* {jobs?.map((data) => {
          return (
            <div key={data._id} className={styles.list}>
              <div className={styles.listLeft}>
                <div>
                  <img src={data.logoURL} />
                </div>
                <div className={styles.infoLeft}>
                  <p className={styles.position}>{data.position}</p>
                  <p className={styles.extraInfo}>
                    <span className={styles.greyText}>11-50</span>
                    <span className={styles.greyText}>{data.salary}</span>
                    <span className={styles.greyText}>{data.location}</span>
                  </p>
                  <p className={styles.extraInfo}>
                    <span className={styles.redText}>{data.remote}</span>
                    <span className={styles.redText}>{data.jobType}</span>
                  </p>
                </div>
              </div>
              <div>
                <div>
                  {data.skills.map((skill) => {
                    return (
                      <span className={styles.skill} key={skill}>
                        {skill}
                      </span>
                    );
                  })}
                </div>
                <div className={styles.btnGroup}>
                  <button
                    onClick={() =>
                      navigate("/addJob", {
                        state: { id: data._id, edit: true },
                      })
                    }
                    className={styles.edit}
                  >
                    Edit job
                  </button>
                  <button
                    onClick={() =>
                      navigate("/detail", {
                        state: { id: data._id },
                      })
                    }
                    className={styles.view}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })} */}
      </div>
    </>
  );
}

export default Home;
