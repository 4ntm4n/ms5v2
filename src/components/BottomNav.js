import React from "react";
import { faPlusSquare, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BottomNav({ openDrawer }) {
  return (
    <div className="btm-nav">
      <label onClick={openDrawer}>
      <FontAwesomeIcon icon={faUsers} /> 
          <span className="btm-nav-label">Group</span>
      </label>
      <label htmlFor="add-task-modal">
        <FontAwesomeIcon icon={faPlusSquare} /> 
          <span className="btm-nav-label">Add Task</span>
      </label>
    </div>
  );
}

export default BottomNav;
