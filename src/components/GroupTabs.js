import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function GroupTabs({ id }) {
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
        Tab 1
      </NavLink>
      <NavLink
        to="active"
        className={`tab tab-lg tab-bordered mx-2 ${
          activeTab === "active" ? "tab-active" : ""
        }`}
        onClick={() => handleTabClick("active")}
      >
        Tab 2
      </NavLink>
      <NavLink
        to="completed"
        className={`tab tab-lg tab-bordered mx-2 ${
          activeTab === "completed" ? "tab-active" : ""
        }`}
        onClick={() => handleTabClick("completed")}
      >
        Tab 3
      </NavLink>
    </nav>
  );
}

export default GroupTabs;
