import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { userBaseUrl } from "../axiosInstance";

const Login = () => {
  const [loginData, setLoginData] = useState({
    Email: "",
    Password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userAuth = localStorage.getItem("userAuth");
    const authUser = userAuth ? JSON.parse(userAuth) : null;

    if (authUser?.isLogin) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await userBaseUrl.post("/login", loginData);

      if (data?.success) {
        const authData = {
          isLogin: true,
          token: data?.token,
        };
        localStorage.setItem("userAuth", JSON.stringify(authData));
        toast.success(data?.Message);
        navigate("/");
      } else {
        toast.error(data?.Message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.Message || "Something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster />
      <nav className="h-[118px] bg-slate-500 flex items-center justify-between px-10">
        <h1 className="text-2xl font-bold text-black">logo</h1>
        <div className="flex gap-10 text-xl font-semibold">
          <Link to="/" className="hover:text-white">
            home
          </Link>
          <Link to="/about" className="hover:text-white">
            about
          </Link>
          <Link to="/contact" className="hover:text-white">
            contact
          </Link>
        </div>
      </nav>

      <div className="flex justify-center items-center mt-16 px-4">
        <div className="w-full max-w-md border border-gray-300 rounded-lg p-8 shadow-md">
          <h2 className="text-3xl font-bold text-center mb-2">Login</h2>
          <p className="text-center text-gray-500 mb-8">
            Login to your account
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-lg font-semibold mb-2">Email</label>
              <input
                type="email"
                name="Email"
                value={loginData.Email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full h-11 border border-gray-400 rounded-md px-3 outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                name="Password"
                value={loginData.Password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full h-11 border border-gray-400 rounded-md px-3 outline-none focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-400 hover:bg-blue-500 border border-gray-500 rounded-md py-2.5 text-lg font-medium cursor-pointer"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
