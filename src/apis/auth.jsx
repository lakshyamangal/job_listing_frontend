import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const registerUser = async ({ name, email, mobile, password }) => {
  try {
    const reqUrl = `${backendUrl}/auth/register`;
    const reqPayload = { name, email, mobile, password };
    const response = await axios.post(reqUrl, reqPayload);
    return response;
  } catch (error) {
    console.log(error);
    //toast with custom message
  }
};
export const loginUser = async ({ email, password }) => {
  try {
    const reqUrl = `${backendUrl}/auth/login`;
    const reqPayload = { email, password };
    const response = await axios.post(reqUrl, reqPayload);
    return response;
  } catch (error) {
    console.log(error);
    //toast with custom message
  }
};
