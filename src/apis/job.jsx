import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getAllJobs = ({ skills, title }) => {
  try {
    const reqUrl = `${backendUrl}/job/all?skills=${skills}&title=${title}`;
    const response = axios.get(reqUrl);
    console.log(response);
  } catch (error) {
    console.log(error);
    //toast with custom message
  }
};
export const getJobDetails = async (jobId) => {
  try {
    // remember this ${jobId} syntax
    const reqUrl = `${backendUrl}/job/job-description/${jobId}`;
    const response = await axios.get(reqUrl);
    return response?.data?.data;
  } catch (error) {
    console.log(error);
    //toast with custom message
  }
};

export const createJobPost = async ({
  companyName,
  logoUrl,
  title,
  description,
  skills,
}) => {
  try {
    const reqUrl = `${backendUrl}/job/create`;
    const payload = {
      companyName,
      logoUrl,
      title,
      description,
      skills,
    };
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.post(reqUrl, payload);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const updateJobPost = async (
  jobId,
  { companyName, logoUrl, title, description, skills }
) => {
  try {
    // ** notes--> here you only put ${jobId} not :${jobId} as you put in routes jobDetails/:jobId and just put jobId after -> "/".     //
    const reqUrl = `${backendUrl}/job/edit/${jobId}`;
    const payload = {
      companyName,
      logoUrl,
      title,
      description,
      skills,
    };
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.put(reqUrl, payload);
    return response;
  } catch (error) {
    console.log(error);
  }
};
