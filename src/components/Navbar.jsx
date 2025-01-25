import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useFetchUser from "../hooks/useFetchUser";
import { useState } from "react";

const Navbar = () => {
  const [dropDown,setDropDown] = useState(false)
  useFetchUser()
  const user = useSelector((store) => store.user);
  const logout =  useLogout();

  const closeDropDown = ()=>{
   setDropDown(false)
  }

  const toggleDropDown = ()=>{
    setDropDown(!dropDown)
  }

  return (
    <div className="navbar bg-purple-500 rounded-b-2xl flex flex-row justify-between">
      <div className=""> 
        <Link
          to="/"
          className="text-white font-extrabold text-2xl  hover:text-purple-600 hover:bg-white p-1 rounded-xl"
        >
          TECHTRIBE
        </Link>
      </div>
      <div className="flex-none gap-2 mx-3">
        <ul className="flex gap-11 mr-16 text-white font-bold tracking-tight">
            <Link to="/" className="hover:text-purple-600 hover:bg-white p-1 rounded-xl"><li>HOME</li></Link>
            <Link to="/about" className="hover:text-purple-600 hover:bg-white p-1 rounded-xl"><li>ABOUT</li></Link>
            <Link to="/contact" className="hover:text-purple-600 hover:bg-white p-1 rounded-xl"><li>CONTACT</li></Link>
          </ul>
        {user?.user && (
          <div className="dropdown dropdown-end">
            <p className="text-white font-semibold tracking-tight">
              {user.user?.firstName || user.userInfo?.firstName}
            </p>
            <div
              tabIndex={0}
              role="button"
              onClick={toggleDropDown}
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="user-icon"
                  src={user.user?.photoURL || user.userInfo?.photoURL}
                />
              </div>
            </div>
          { dropDown &&  <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white text-purple-700  rounded-box z-[1] mt-3 w-52 p-2 shadow-lg font-semibold"
            >
              <li className="justify-between hover:text-white hover:bg-purple-500" onClick={closeDropDown}>
                <Link to="/profile" >
                  Profile
                  <span className="text-purple-700  badge">New</span>
                </Link>
              </li>
              <li className="hover:text-white hover:bg-purple-500 rounded-lg" onClick={closeDropDown}>
                <Link to="/connections">Connections</Link>
              </li>
              <li className="hover:text-white hover:bg-purple-500 rounded-lg" onClick={closeDropDown}>
                <Link to="/requests">Request Received</Link>
              </li>
              <li className="hover:text-white hover:bg-purple-500 rounded-lg" onClick={closeDropDown}>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
