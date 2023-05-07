import React from "react";
import { faPlusSquare, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BottomNav({ openDrawer }) {
  return (
    <div className="btm-nav">
      <label>
      <FontAwesomeIcon icon={faUsers} /> 
        <button onClick={openDrawer}>
          <span className="btm-nav-label">Group</span>
        </button>
      </label>
      <label htmlFor="add-task-modal">
      <FontAwesomeIcon icon={faPlusSquare} /> 
        <button htmlFor="add-task-modal">
          <span className="btm-nav-label">Add Task</span>
        </button>
      </label>
    </div>
  );
}

export default BottomNav;
