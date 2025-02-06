import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slice/userSlice";
import { Link, useNavigate } from "react-router-dom";
import isEmailAndPasswordValid from "../utils/validationRegex";
import { BACKEND_URL } from "../utils/constants";
import image from "../assets/login_3.png"

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { EmailError, PasswordError } = isEmailAndPasswordValid(
      email,
      password
    );
    setErrorMsg({ EmailError, PasswordError });
    if (EmailError || PasswordError) return;

    try {
      const response = await axios.post(
        `${BACKEND_URL}/auth/signin`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success == true) {
        dispatch(addUser(response?.data));
        return navigate("/");
      }
    } catch (error) {
      if (error.response) {
        setErrorMsg({ serverError: error.response.data.message });
      } else {
        setErrorMsg({
          serverError: "Something went wrong. Please try again later.",
        });
      }
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen font-serif">
      <div className="hero-content flex-col lg:flex-row w-2/3 ">
        <div className="lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p>
          Log in now to TechTribe and stay connected with techies, share ideas, and grow together in the world of technology!
          </p>
          <img src={image} alt="image"/>
        </div>
        <div className="card bg-base-100 shrink-0 shadow-2xl max-w-lg">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            {errorMsg?.EmailError && (
              <p className="text-red-600 text-sm mx-2 font-semibold">
                {errorMsg.EmailError}
              </p>
            )}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            {errorMsg?.PasswordError && (
              <p className="text-red-600 text-sm mx-2 font-semibold w-56">
                {errorMsg.PasswordError}
              </p>
            )}
            
              <Link to='/login' className="label-text-alt link link-hover text-end">Forgot password</Link>

            {errorMsg?.serverError && (
              <p className="text-red-600 text-sm mx-2 font-semibold">
                {errorMsg.serverError}
              </p>
            )}
            <button
              type="submit"
              className="btn btn-xs mt-2 hover:bg-amber-800 hover:text-yellow-500 font-bold sm:btn-sm md:btn-md lg:btn-md"
            >
              SignIn
            </button>
            <Link to="/signup">
              <p className=" lg:font-semibold text-center">
                New to TechTribe?{" "}
                <span className="underline font-bold text-amber-700 hover:underline">
                  SignUp
                </span>
              </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
