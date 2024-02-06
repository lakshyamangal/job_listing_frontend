import React from "react";
import Register from "../../components/Register/register";
import loginImage from "../../assets/images/login.png";

function RegisterPage() {
  return (
    <div style={{ display: "flex" }}>
      <Register />
      <img
        style={{ maxHeight: "100vh", width: "50vw" }}
        src={loginImage}
        alt="Login cover"
      />
    </div>
  );
}

export default RegisterPage;
