import axios from "axios";
import React, { useState } from "react";
import { BACKEND_URL, demoLinks } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slice/userSlice";
import { toast } from "react-toastify";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [designation, setDesignation] = useState("");
  const [copiedText, setCopiedText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/auth/signup`,
        {
          firstName,
          lastName,
          email,
          password,
          photoURL,
          designation,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data?.user) {
        dispatch(addUser(response.data.user));
        navigate("/");
      } else {
        throw new Error("Signup failed! No user data returned.");
      }
    } catch (error) {
      const errorData = error.response?.data;      
      if (errorData?.message) {
        setErrorMsg(
          Array.isArray(errorData.message) 
            ? errorData.message.map(msg => msg.msg).join(", ")  
            : errorData.message.toString()
        );
      } else {
        setErrorMsg("Signup failed! Please try again.");
      }      
    }
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(""), 2000); 
    } catch (err) {
      toast.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 px-2 py-3 justify-center font-serif">
      <div className="min-w-min lg:w-1/3 my-5 px-2 py-2 border border-yellow-600 rounded-lg shadow-xl">
        <h1 className="font-bold">
          For demo purposes, click on a link to copy it & paste on PhotoURL
          field
        </h1>
        <ul className="flex flex-col text-gray-500 gap-4 my-5">
          {demoLinks.map((link, index) => (
            <li
              key={index}
              className="cursor-pointer hover:text-blue-500"
              onClick={() => handleCopy(link)}
            >
              {link}
            </li>
          ))}
        </ul>
        {copiedText && <p className="text-green-500 mt-3">Text Copied</p>}
      </div>
      <div className="min-w-min my-5 flex flex-col gap-5 justify-self-center px-14 py-4 border border-yellow-600 rounded-xl shadow-xl">
        <h1 className="font-bold text-center text-2xl lg:text-3xl m-2">Create your TechTribe Account !</h1>
        <form onSubmit={handleSubmit} className=" flex flex-col">
          <div className="flex flex-col lg:flex-row gap-5">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input type="text" className="grow" onChange={(e)=>setFirstName(e.target.value)} value={firstName} placeholder="First Name" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input type="text" className="grow" onChange={(e)=>setLastName(e.target.value)} value={lastName} placeholder="Last Name" />
            </label>
          </div>
          <div className="flex flex-col max-w-xs gap-5">
            <label className="input input-bordered flex items-center gap-2 mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" className="grow" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Email" />
            </label>
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
              <input type="password" className="grow" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="password" />
            </label>
            <label>
              <input type="text" onChange={(e)=>setDesignation(e.target.value)} value={designation} placeholder="Designation" className="input input-bordered w-full max-w-xs" />
            </label>
            <label>
              <input type="text" onChange={(e)=>setPhotoURL(e.target.value)} value={photoURL} placeholder="PhotoURL" className="input input-bordered w-full max-w-xs" />
            </label>
          </div>
          <button
            type="submit"
            className="hover:bg-amber-900 font-bold mt-3 btn btn-xs sm:btn-sm md:btn-sm lg:btn-md"
          >
            SignUp
          </button>
        </form>
        {errorMsg && (
            <p className="text-red-600">{errorMsg}</p>
        )}
        <Link to="/login">
          <p className=" font-semibold">
            Already have an account?{" "}
            <span className="font-bold text-amber-700 underline">SignIn</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
