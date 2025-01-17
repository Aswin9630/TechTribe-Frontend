import { USER_ICON } from "../utils/constants"

const Navbar = () => {
  return (
    <div className="navbar bg-purple-500 rounded-b-2xl">
  <div className="flex-1">
    <a className="btn btn-ghost text-white font-extrabold text-2xl">TECHTRIBE</a>
  </div>
  <div className="flex-none gap-2 mx-3">
    
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={USER_ICON} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default Navbar