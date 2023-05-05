import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function GroupTabs() {
  const [activeTab, setActiveTab] = useState("");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <nav className="flex justify-center bg-primary-500 py-2 mt-2">
      <NavLink
        to=""
        className={`tab tab-lg tab-bordered mx-2 ${
          activeTab === "" ? "tab-active" : ""
        }`}
        onClick={() => handleTabClick("")}
      >
        Unassigned
      </NavLink>
      <NavLink
        to="active"
        className={`tab tab-lg tab-bordered mx-2 ${
          activeTab === "active" ? "tab-active" : ""
        }`}
        onClick={() => handleTabClick("active")}
      >
        Active
      </NavLink>
      <NavLink
        to="completed"
        className={`tab tab-lg tab-bordered mx-2 ${
          activeTab === "completed" ? "tab-active" : ""
        }`}
        onClick={() => handleTabClick("completed")}
      >
        Completed
      </NavLink>
    </nav>
  );
}

export default GroupTabs;
