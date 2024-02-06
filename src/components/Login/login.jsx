import React, { useState } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../apis/auth";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!data.email || !data.password) {
      alert("Fill in all the information");
      return;
    }
    const response = await loginUser({ ...data });
    if (response) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userName", response.data.name);
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Already have an Account ?</h1>
      <h2 className={styles.h2}>Your Personal job finder is here</h2>
      <input
        className={styles.input}
        name="email"
        value={data.email}
        onChange={handleChange}
        placeholder="Email"
        type={"email"}
      ></input>
      <input
        className={styles.input}
        name="password"
        value={data.password}
        onChange={handleChange}
        placeholder="Password"
        type={"password"}
      ></input>
      <button onClick={handleSubmit} className={styles.button}>
        Sign In
      </button>
      <p className={styles.footer}>
        Don't have an Account ?
        <span
          onClick={() => navigate("/register")}
          className={styles.underline}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
}

export default Login;
