import React, { useEffect, useState, memo } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import UserOptions from "./UserOptions";
import UserOptionsModal from "./UserOptionsModal";

function Navbar({ children }) {
  const { loading, tokens, user, logout} = useAuth();
  const [login, setLogin] = useState(false);

  useEffect(() => {
    tokens ? setLogin(true) : setLogin(false);
  }, [tokens]);

  const handleLogout = () => {
    logout();
  };

  const authNav = (
    <>
      <li></li>
      <li>
        <NavLink to="/groups">Groups</NavLink>
      </li>
      <li>
        <NavLink to="/tasks">Tasks</NavLink>
      </li>
      <li>
        <a onClick={handleLogout}>Log out</a>
      </li>
    </>
  );
  const unAuthNav = (
    <>
      <li>
        <NavLink to="/login">Log in</NavLink>
      </li>
      <li>
        <NavLink to="/signup">Sign up</NavLink>
      </li>
    </>
  );


  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">GroupTask</div>
          <div className="flex-2 px-2 mx-2">{user &&  <label htmlFor="my-modal-6" className="cursor-pointer"  > <UserOptions user={user} /> </label> }</div>
          
          <div className="flex-none hidden lg:block">
          
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              {login ? authNav : unAuthNav}
            </ul>
          </div>
        </div>
        {/* Page content here */}
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          
        <ul className="menu p-4 w-80 bg-base-100">
          {/* Sidebar content here */}
          
          {login ? authNav : unAuthNav}
        </ul>
      </div>


      <UserOptionsModal user={user} /> 
    </div>
  );
}

export default Navbar;
