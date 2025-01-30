import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addrequests, removeRequest } from "../redux/slice/requestReceived";
import useFetchUser from "../hooks/useFetchUser";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../utils/constants";

const RequestReceived = () => {
  const dispatch = useDispatch();
  const { requests } = useSelector((store) => store.requests);
  useFetchUser();

  const fetchRequest = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/user/request/received`,
        { withCredentials: true }
      );
      dispatch(addrequests(response.data.data));
    } catch (error) {
      toast.error(error);
    }
  };

  const reviewRequest = async (status, id) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests || requests.length === 0) {
    return (
      <div className="text-4xl font-semibold text-center my-5">
        No pending requests
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-9">
        Connection Requests
      </h1>
      {requests.map((request) => {
        const { firstName, photoURL, _id } = request.fromUserId;
        return (
          <div
            key={_id}
            className="shadow-lg flex flex-col lg:flex-row  justify-around mx-auto w-1/3  items-center border border-gray-300 m-2 p-2 rounded-lg"
          >
            <div>
              <img
                src={photoURL}
                className="w-auto h-11 lg:w-10 lg:h-14 rounded-full"
                alt="img"
              />
            </div>

            <div>
              <h1 className="font-semibold">
                {firstName} is{" "}
                <span className="font-bold">
                  {request.status}
                </span>{" "}
                in you.
              </h1>
            </div>

            <div className="flex flex-row gap-4 my-1">
              <button
                onClick={() => reviewRequest("rejected", request._id)}
                className="btn glass tooltip tooltip-error btn-circle  bg-yellow-400 hover:bg-red-600 hover:text-white text-white hover:scale-110 transition-all duration-300"
                data-tip="reject"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 tooltip"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <button
                onClick={() => reviewRequest("accepted", request._id)}
                className="btn tooltip tooltip-success  glass btn-circle bg-orange-500  hover:bg-green-700 hover:text-white text-white hover:scale-110 transition-all duration-300"
                data-tip="accept"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 tooltip"
                  data-tip="accept"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RequestReceived;
