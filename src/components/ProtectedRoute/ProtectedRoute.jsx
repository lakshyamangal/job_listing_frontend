import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  const { Component } = props;
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(token);
    setIsActive(token);
  }, []);
  return <div>{isActive ? <Component /> : <Navigate to="/register" />}</div>;
}

export default ProtectedRoute;
