import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import GoogleIcon from "../assets/icons/GoogleIcon";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn,signUpProvider,forgotPassword } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  return (
    <div className="overflow-hidden flex-1 min-h-[88vh] justify-center items-center bg-gray-200 dark:bg-gray-600">
      <div className={`form-container mt-[10vh] w-[380px] h-[500px]`}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-red-main text-2xl font-[600] text-center tracking-[0.1em] mb-3">
            Sign In
          </h2>
          <div className="relative z-0 w-full mb-6 group">
            <input
              name="floating_email"
              type="email"
              className="peer"
              placeholder=" "
              required autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floating_email">Email</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              name="floating_password"
              type="password"
              className="peer"
              placeholder=" "
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floating_password">Password</label>
          </div>
          <div className="flex justify-between">
            <span onClick={()=>forgotPassword(email)} className="py-3 font-[0.75em] cursor-pointer decoration-none text-gray-500 dark:text-white dark:hover:text-red-main hover:text-[#ff4b45]">
              Forgot Password
            </span>
            <Link
              className="py-3 font-[0.75em] cursor-pointer decoration-none text-gray-500 dark:text-white dark:hover:text-red-main hover:text-[#ff4b45]"
              to="/Movie-App/register"
            >
              Sign Up
            </Link>
          </div>
          <button className="btn-danger" type="submit">
            Login
          </button>
          <button
            className="flex justify-between text-center btn-danger"
            type="button"
            onClick={signUpProvider}
          >
            Continue with Google
            <GoogleIcon color="currentColor" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
