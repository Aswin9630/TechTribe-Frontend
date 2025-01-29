import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useFetchUser from "../hooks/useFetchUser";
import { useState } from "react";
import { PREMIUM_HEADER_LOGO } from "../utils/constants";

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
    <>

    <div className="drawer">
  <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col">
    <div className="navbar  w-full">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
      </div>
      <div className="mx-2 flex-1 px-2">
        <div> 
          <Link to="/" className=" font-extrabold text-2xl  p-1 rounded-xl">
            TECHTRIBE</Link>
        </div>
      </div>
      <div className="hidden flex-none lg:block ">
        <div className="menu menu-horizontal">
          <div className="flex gap-5 mx-3">
            <ul className="flex gap-11 font-bold tracking-tight items-center text-lg">
              { user?.user &&  <Link to="/" ><li className="hover:text-yellow-700 hover:bg-white p-1  rounded-xl">CONNECT</li></Link>}
                <Link to="/connections" className="hover:text-yellow-700 hover:bg-white p-1 rounded-xl"><li>CONNECTIONS</li></Link>
                <Link to="/requests" className="hover:text-yellow-700 hover:bg-white p-1 rounded-xl"><li>REQUEST RECEIVED</li></Link>
              { user?.user && <Link to="/premium" className="hover:text-yellow-700 hover:bg-white p-1 rounded-xl">
                  <label className="cursor-pointer">
                    <img src={PREMIUM_HEADER_LOGO} alt="logo" className="w-5 absolute rounded-full -m-4 mx-1 z-10"/>
                <li>
                  PREMIUM
                </li>
                  </label>
                </Link>}
            </ul>
          </div>            
        </div>
      </div>
        <div>
              {user?.user && (
                  <div className="dropdown dropdown-end">
                    <p className=" font-bold tracking-tight">
                      {user.user?.firstName || user.userInfo?.firstName}
                    </p>
                    <div
                      tabIndex={0}
                      role="button"
                      onClick={toggleDropDown}
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-10 rounded-full border border-amber-600 shadow-inner">
                        <img
                          alt="user-icon"
                          src={user.user?.photoURL || user.userInfo?.photoURL}
                        />
                      </div>
                    </div>
                  { dropDown &&  <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-black rounded-box z-[1] mt-3 w-52 p-2 shadow-lg font-bold"
                    >
                      <li className="justify-between hover:text-amber-600 hover:bg-white rounded-lg" onClick={closeDropDown}>
                        <Link to="/profile" >
                          PROFILE
                        </Link>
                      </li>
                    
                      <li className="hover:text-amber-600 hover:bg-white rounded-lg" onClick={closeDropDown}>
                        <button onClick={logout}>LOGOUT</button>
                      </li>
                    </ul>}
                  </div>
                )}
      </div>
    </div>   
  </div>

  <div className="drawer-side absolute z-10">
    <label htmlFor="my-drawer-3" aria-label="close sidebar"  className="drawer-overlay"></label>
    <ul className="menu bg-black min-h-full w-full flex flex-col gap-3 p-4 ">
          <Link to="/" onClick={() => document.getElementById('my-drawer-3').checked = false}  className="hover:text-amber-600 hover:bg-white p-2  rounded-xl font-semibold"><li>CONNECT</li></Link>
          <Link to="/connections" onClick={() => document.getElementById('my-drawer-3').checked = false}  className="hover:text-amber-600 hover:bg-white p-2  rounded-xl font-semibold"><li>CONNECTIONS</li></Link>
          <Link to="/requests" onClick={() => document.getElementById('my-drawer-3').checked = false}  className="hover:text-amber-600 hover:bg-white p-2  rounded-xl font-semibold"><li>REQUEST RECEIVED</li></Link>
          <Link to="/premium" onClick={() => document.getElementById('my-drawer-3').checked = false}  className="hover:text-amber-600 hover:bg-white p-2  rounded-xl font-semibold">
            <label className="cursor-pointer">
                <img src={PREMIUM_HEADER_LOGO} alt="logo" className="w-5 absolute rounded-full -m-4 mx-1 z-10"/>
                <li>
                  PREMIUM
                </li>
            </label>
          </Link>
          <Link to="/about" onClick={() => document.getElementById('my-drawer-3').checked = false}  className="hover:text-amber-600 hover:bg-white p-2  rounded-xl font-semibold"><li>ABOUT</li></Link>
          <Link to="/contact" onClick={() => document.getElementById('my-drawer-3').checked = false}  className="hover:text-amber-600 hover:bg-white p-2  rounded-xl font-semibold"><li>CONTACT</li></Link>
    </ul>
  </div>
</div>
    </>
  );
};

export default Navbar;
