import React from "react";

function NavUserMenu({ image }) {
  return (
    <div className="dropdown dropdown-end">
    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        <img src={image}/>
      </div>
    </label>
    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
      <li>
        <div > upload profile pic </div> 
     </li>
    </ul>
  </div>

  );
}

export default NavUserMenu;
