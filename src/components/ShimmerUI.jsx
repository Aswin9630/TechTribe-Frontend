import React, { useState, useEffect } from "react";

const ShimmerUI = () => {
  const [seconds, setSeconds] = useState(5); 
  const [showRefreshMessage, setShowRefreshMessage] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer); 
          setShowRefreshMessage(true); 
        }
        return prev - 1;
      });
    }, 1000); 

    return () => clearInterval(timer); 
  }, []);

  return (
    <div className="flex w-52 flex-col gap-4 mx-auto my-20">
      <span className="loading loading-spinner loading-lg text-gray-400 mx-auto"></span>
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>

      {!showRefreshMessage && (
        <div className="text-center mt-2 text-gray-500">
          <p>Loading... {seconds} seconds left</p>
        </div>
      )}

      {showRefreshMessage && (
        <div className="text-center mt-2 text-red-600 font-semibold">
          <p className="text-blue-500 cursor-pointer" onClick={()=>window.location.reload()}>Click Here</p>
        </div>
      )}
    </div>
  );
};

export default ShimmerUI;
