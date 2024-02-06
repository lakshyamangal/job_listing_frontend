import React from "react";
import Login from "../../components/Login/login";
import loginImage from "../../assets/images/login.png";

function loginPage() {
  return (
    <div style={{ display: "flex" }}>
      <Login />
      <img
        style={{ maxHeight: "100vh", width: "50vw" }}
        src={loginImage}
        alt="Login cover"
      />
    </div>
  );
}

export default loginPage;
