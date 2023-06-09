import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function GroupTabs() {
  const [activeTab, setActiveTab] = useState("");
  const location = useLocation();

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const lastSegment = pathSegments.pop();

    if (isNaN(lastSegment)) {
      setActiveTab(lastSegment);
    } else {
      setActiveTab("");
    }
  }, [location]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <nav className="flex justify-center bg-primary-500 py-2 mt-2">
      <NavLink
        to=""
        replace
        className={`tab tab-lg tab-bordered mx-2 ${
          activeTab === "" ? "tab-active" : ""
        }`}
        onClick={() => handleTabClick("")}
      >
        Unassigned
      </NavLink>
      <NavLink
        to="active"
        replace
        className={`tab tab-lg tab-bordered mx-2 ${
          activeTab === "active" ? "tab-active" : ""
        }`}
        onClick={() => handleTabClick("active")}
      >
        Active
      </NavLink>
      <NavLink
        to="completed"
        replace
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