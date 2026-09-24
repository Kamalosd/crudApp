import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const userAuth = localStorage.getItem("userAuth");
    const authUser = userAuth ? JSON.parse(userAuth) : null;

    if (!authUser?.isLogin) {
      navigate("/login");
    }
  }, []);

  return children;
};

export default ProtectedRoute;
