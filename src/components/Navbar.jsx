import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  
  const logout =  useLogout();

  return (
    <div className="navbar bg-purple-500 rounded-b-2xl">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost text-white font-extrabold text-2xl"
        >
          TECHTRIBE
        </Link>
      </div>
      <div className="flex-none gap-2 mx-3">
        {user?.user && (
          <div className="dropdown dropdown-end">
            <p className="text-white font-semibold tracking-tight">
              {user.user?.firstName || user.userInfo?.firstName}
            </p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="user-icon"
                  src={user.user?.photoURL || user.userInfo?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content text-purple-700  rounded-box z-[1] mt-3 w-52 p-2 shadow-lg font-semibold"
            >
              <li>
                <Link to="/profile" className="justify-between hover:text-white hover:bg-purple-500">
                  Profile
                  <span className="text-purple-700  badge">New</span>
                </Link>
              </li>
              <li className="hover:text-white hover:bg-purple-500 rounded-lg">
                <Link>Settings</Link>
              </li>
              <li className="hover:text-white hover:bg-purple-500 rounded-lg">
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
