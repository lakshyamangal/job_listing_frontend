import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "../src/pages/RegisterPage/registerPage";
import LoginPage from "../src/pages/LoginPage/loginPage";
import HomePage from "../src/pages/HomePage/homePage";
import JobPost from "../src/pages/JobPost/jobPost";
import JobDetails from "../src/pages/JobDetails/jobDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobpost" element={<JobPost />} />
        {/* You have to put this /:anyname here to use that window.location.pathname?thing here */}
        <Route path="/jobDetails/:jobid" element={<JobDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
