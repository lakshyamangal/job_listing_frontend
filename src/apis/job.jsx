import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getAllJobs = async ({ skills, title }) => {
  try {
    const NewURL = new URL("/api/v1/job/all", backendUrl);
    if (skills) {
      NewURL.searchParams.set("skills", skills);
    } else {
      NewURL.searchParams.delete("skills");
    }
    if (title) {
      NewURL.searchParams.set("title", title);
    } else {
      NewURL.searchParams.delete("title");
    }
    // ** Notes-->//
    // const reqUrl = `${backendUrl}/job/all?skills=${skills}&title=${title}`;
    const response = await axios.get(NewURL.toString());
    return response;
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
    //return Promise.reject(error);
    //toast with custom message
  }
};

export const createJobPost = async ({
  companyName,
  logoUrl,
  title,
  salary,
  type,
  place,
  location,
  description,
  about,
  skills,
  info,
}) => {
  try {
    const reqUrl = `${backendUrl}/job/create`;
    const payload = {
      companyName,
      logoUrl,
      title,
      salary,
      type,
      place,
      location,
      description,
      about,
      skills,
      info,
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
  {
    companyName,
    logoUrl,
    title,
    salary,
    type,
    place,
    location,
    description,
    about,
    skills,
    info,
  }
) => {
  try {
    // ** notes--> here you only put ${jobId} not :${jobId} as you put in routes jobDetails/:jobId and just put jobId after -> "/".     //
    const reqUrl = `${backendUrl}/job/edit/${jobId}`;
    const payload = {
      companyName,
      logoUrl,
      title,
      salary,
      type,
      place,
      location,
      description,
      about,
      skills,
      info,
    };
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.put(reqUrl, payload);
    return response;
  } catch (error) {
    console.log(error);
  }
};
