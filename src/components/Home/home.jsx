import styles from "./home.module.css";
import { useEffect, useState } from "react";
import { DEFAULT_SKILLS } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { getAllJobs } from "../../apis/job";
import { FaLocationDot } from "react-icons/fa6";
import { RiTeamFill } from "react-icons/ri";
import { MdCurrencyRupee } from "react-icons/md";
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
  const clearHandler = () => {
    setSkills([]);
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
      <div className={styles.page}>
        <div className={styles.nav}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#a2d9ff"
              fill-opacity="1"
              d="M0,64L40,58.7C80,53,160,43,240,42.7C320,43,400,53,480,96C560,139,640,213,720,208C800,203,880,117,960,96C1040,75,1120,117,1200,133.3C1280,149,1360,139,1400,133.3L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
            ></path>
          </svg>
        </div>
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
            <div className={styles.chipContainer}>
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
            </div>
            <div className={styles.btns}>
              <button onClick={clearHandler} className={styles.clear}>
                Clear
              </button>
              <button
                onClick={() => navigate("/jobPost")}
                className={styles.add}
              >
                + Add Job
              </button>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.scroll}>
            {jobs?.map((data) => {
              return (
                <div key={data._id} className={styles.card}>
                  <div className={styles.cardLeft}>
                    <div className={styles.cardImage}>
                      <img src={data.logoURL} alt="hello" />
                    </div>
                    <div className={styles.infoLeft}>
                      <p className={styles.title}>{data.title}</p>
                      <p className={styles.extraInfo}>
                        <span className={styles.greyText}>
                          <RiTeamFill /> 11-50
                        </span>
                        <span className={styles.greyText}>
                          <MdCurrencyRupee />
                          {data.salary}
                        </span>
                        <span className={styles.greyText}>
                          <FaLocationDot /> {data.location}
                        </span>
                      </p>
                      <p className={styles.extraInfo}>
                        <span className={styles.redText}>{data.place}</span>
                        <span className={styles.redText}>{data.type}</span>
                      </p>
                    </div>
                  </div>
                  <div className={styles.cardRight}>
                    <div className={styles.skillContainer}>
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
                          navigate("/jobDetails", {
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
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
