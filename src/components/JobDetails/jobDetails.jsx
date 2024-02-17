import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getJobDetails } from "../../apis/job";
import styles from "./jobDetails.module.css";
function JobDetails() {
  const navigate = useNavigate();
  // we are putting this true here , can we use a empty object here ??
  const [data, setData] = useState(true);
  useEffect(() => {
    fetchJobDetailsById();
  }, []);
  const fetchJobDetailsById = async () => {
    const jobId = window.location.pathname?.split("/").slice(-1)[0];
    if (!jobId) return;
    const response = await getJobDetails(jobId);
    console.log(response);
    setData(response);
  };

  return (
    <>
      {data ? (
        <>
          <div className={styles.container}>
            <p className={styles.containerText}>{data?.companyName}</p>
          </div>
          <div className={styles.containerBottom}>
            <div className={styles.preHeading}>
              <p className={styles.lightText}>{data.type}</p>
            </div>
            <div className={styles.heading}>
              <div>
                <p className={styles.boldText}>{data.title}</p>
                <p className={styles.locationText}>{data.location}</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    navigate("/jobpost", {
                      state: {
                        id: data._id,
                        data: data,
                        edit: true,
                      },
                    });
                  }}
                  className={styles.edit}
                >
                  Edit Job
                </button>
              </div>
            </div>
            <div className={styles.perks}>
              <div>
                <p className={styles.lightText}>Stipend</p>
                <p className={styles.lightText}>{data.salary}</p>
              </div>
              <div>
                <p className={styles.lightText}>Duration</p>
                <p className={styles.lightText}>6 Months</p>
              </div>
            </div>
            <div className={styles.info}>
              <h2>About Company</h2>
              <p>{data.about}</p>
            </div>
            <div className={styles.info}>
              <h2>Skill(s) Required</h2>
              {/* It's the thing to see that we have put a key attribute here that is equal to the skill that we wish to print, as skills are unique so are their key's and it's advisable to put a key prop . */}
              {data?.skills?.map((skill) => {
                return (
                  <span className={styles.skill} key={skill}>
                    {skill}
                  </span>
                );
              })}
            </div>
            <div className={styles.info}>
              <h2>About the job/internship</h2>
              <p>{data.description}</p>
            </div>
            <div className={styles.info}>
              <h2>Additional Information</h2>
              <p>{data.info}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2>Error occured while fetching the Data</h2>
        </>
      )}
    </>
  );
}

export default JobDetails;
