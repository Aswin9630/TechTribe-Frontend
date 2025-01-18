import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import isEmailAndPasswordValid from "../utils/validationRegex";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [email, setEmail] = useState("aswin@123.com");
  const [password, setPassword] = useState("Aswin@123");
  const [errorMsg, setErrorMsg] = useState(null);

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { EmailError, PasswordError } = isEmailAndPasswordValid(email,password);
    setErrorMsg({ EmailError, PasswordError });
    if( EmailError || PasswordError ) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signin`,
        {
          email,
          password,
        },
        {
          withCredentials:true
        }
      );
      if(response.data.success==true){
        dispatch(addUser(response.data));
        return navigate("/");
      }
    } catch (error) {
      setErrorMsg({serverError:error.response.data.message})
    }
  };

  return (
    <div className="flex justify-center m-5">
      <div className="mockup-phone border-purple-900">
        <div className="camera"></div>
        <div className="display">
          <form onSubmit={handleSubmit} className="py-14 flex flex-col gap-5">
            <h1 className="text-white font-bold text-2xl text-center">
              Login!{" "}
            </h1>
            <div className="flex flex-col gap-5">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
              {errorMsg?.EmailError && <p className="text-red-600 text-sm mx-2 font-semibold">{errorMsg.EmailError}</p>}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
              {errorMsg?.PasswordError && <p className="text-red-600 text-sm mx-2 font-semibold w-56">{errorMsg.PasswordError}</p>}
            </div>
           
          {errorMsg?.serverError &&(
              <p className="text-red-600 text-sm mx-2 font-semibold">{errorMsg.serverError}</p>
            )}
            <button
              type="submit"
              className="btn btn-xs text-white font-bold sm:btn-sm md:btn-md lg:btn-md"
            >
              SignIn
            </button>
          </form>
        </div>
        <button
          className="rounded-full border text-black border-gray-600 p-3 flex justify-center mx-28 "
          disabled
        >
          o
        </button>
      </div>
    </div>
  );
};

export default Login;
