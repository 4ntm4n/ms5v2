import React, { useState } from "react";
import TaskOptions from "./TaskOptions";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Task({ taskInfo }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const {
    title,
    description,
    owner_name,
    owner_profile_image,
    owning_group,
    in_progress,
    completed,
    updated_at,
  } = taskInfo;

  return (
    <>
 <div className="w-[90%] mx-auto shadow-xl rounded-lg">
  <div className="bg-yellow-400 p-4 flex justify-between" onClick={toggleCollapse}>
    <h2>{title}</h2>
  </div>
  <div
    className={`overflow-hidden transition-all duration-500 ease-in-out overflow-y-auto ${
      isCollapsed ? "max-h-0" : "max-h-[350px]"
    }`}
  >
    <div className="p-4 opacity-100">
      <p>
        {description}
      </p>
    </div>
  </div>
</div>
      {/*  <div className="collapse w-[90%] mx-auto rounded-sm relative">
  <input type="checkbox" className="peer" />
  <div className="flex collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
    <div className="bg-yellow-500 flex w-8">
      <div className="avatar placeholder min-w-[16px] bg-yellow-200 self-center">
        <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
          <span className="text-xs">AA</span>
        </div>
      </div>
    </div>
    <div className="self-center mx-2 mr-8">{title}</div>
  </div>
  <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
    <p>{description}</p>
  </div>
  <div className="absolute top-0 right-0 z-50">
    <div className="dropdown dropdown-left btn btn-primary font-semibold px-2 py-1 rounded">
      <label tabIndex={0} className="btn m-1">
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a>Delete Task</a>
        </li>
        <li>
          <label htmlFor="edit-group-modal">Edit group info</label>
        </li>
      </ul>
    </div>
  </div>
</div> */}

      {/*  <div
        tabIndex={0}
        className="collapse rounded-xl w-[90%] bg-red-500 mx-auto p-0"
      >
        <div className="collapse-title rounded-t-xl p-3 flex justify-between items-center">
          <div className="font-medium truncate w-[75%]">{title}</div>
          <div className="flex flex-wrap justify-around w-auto bg-yellow-400">
            <button className="md:block hidden btn font-semibold text-xs px-2 py-1 rounded">
              Take Ownership
            </button>
            <button className="btn btn-primary font-semibold px-2 py-1 rounded">
              <></>
            </button>
          </div>
        </div>
        <div className="collapse-content">
          <div className="">
            <p className="">{description}</p>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Task;
