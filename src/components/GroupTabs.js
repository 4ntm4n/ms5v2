import React from "react";
import { NavLink, useParams } from "react-router-dom";

function GroupTabs() {
  return (
    <nav className="flex justify-center bg-primary-500 py-2 mt-2">
      <NavLink to=""  className="tab tab-lg tab-lifted mx-2">Tab 1</NavLink>
      <NavLink to="active" className="tab tab-lg tab-lifted mx-2 tab-active">Tab 2</NavLink>
      <NavLink to="completed" className="tab tab-lg tab-lifted mx-2">Tab 3</NavLink>
    </nav>
  );
}

export default GroupTabs;