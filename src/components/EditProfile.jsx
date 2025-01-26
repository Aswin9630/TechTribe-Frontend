import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slice/userSlice";
import { toast } from "react-toastify";
import UserCard from "../components/UserCard";
import ShimmerUI from "./ShimmerUI";
import { BACKEND_URL } from "../utils/constants";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [designation, setDesignation] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user?.firstName || "");
      setLastName(user?.lastName || "");
      setDesignation(user?.designation || "");
      setLoading(false);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/profile/update`,
        {
          firstName,
          lastName,
          designation,
        },
        { withCredentials: true }
      );
      dispatch(addUser(response.data?.data));
      toast.success(response.data?.message);
      setLoading(false);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <ShimmerUI />;
  }

  return (
    <div className="flex flex-row justify-center gap-2">
      <form
        onSubmit={handleSubmit}
        className="w-3/12 flex flex-col my-10 p-5 gap-5 border rounded-lg shadow-lg "
      >
        <h1 className="text-center text-gray-500 font-bold text-2xl tracking-tight">
          Edit Profile
        </h1>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow text-gray-500"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
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
          <input
            type="text"
            className="grow text-gray-500"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow text-gray-500"
            placeholder="Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
        </label>

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
            className="grow"
            placeholder="Email"
            value={user?.email}
            disabled
          />
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
          <input type="password" className="grow" value="password" disabled />
        </label>
        <button
          type="submit"
          className="text-white bg-purple-600 p-2 m-2 font-semibold rounded-lg hover:bg-purple-800"
        >
          Update Profile
        </button>
      </form>
      <div className="my-10">
        <UserCard user={user} />
      </div>
    </div>
  );
};

export default EditProfile;
