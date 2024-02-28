import { Link, useNavigate } from "react-router-dom";
import { ColorModeIcon } from ".";
import useUser from "../hooks/useUser";
import useUserLogout from "../hooks/useUserLogout";


const NavBar = () => {
  const navigate = useNavigate()
  const userLogout = useUserLogout()
  const { data: user } = useUser();

  const Logout = () => {
    if (user?.username === undefined) {
      navigate('login')
    }
    else {
      userLogout.mutate()
          navigate('/');
    }
  }

  return (
    <>
    {
      <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          {(user?.username === undefined) && <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={"/"}>Homepage</Link>
            </li>
            <li><Link to={"login"}>Login</Link></li>
            <li><Link to={"register"}>Register</Link></li>
            <li><Link to={"contact"}>For Service Providers</Link></li>
            <li><Link to={"consultants"}>Consultants</Link></li>
          </ul>}
          {(user?.username !== undefined) &&
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li><Link to={""}>Homepage</Link></li>
              <li><Link to={"consultants"}>All Consultants</Link></li>
            </ul>}
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">Welcome {user?.username  &&  user?.first_name + " " + user?.last_name}</a>
      </div>
      <div className="navbar-end">
        <ColorModeIcon />
        <button onClick={Logout} className="btn btn-ghost btn-square w-24">
          <div className="indicator">
            {(user?.username === undefined) ?
              <span className="badge badge-xs badge-ghost indicator-item h-4 w-24">login/register</span> :
              <span className="badge badge-xs badge-ghost indicator-item h-5 w-12">logout</span>}
          </div>
        </button>
      </div>
    </div>}
  </>
  );
};

export default NavBar;
