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
        <div className="flex justify-around rounded-lg">
          <div className="w-1/6 flex items-center">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src="https://picsum.photos/200/200" />
              </div>
            </div>
          </div>
          <div className=" p-4 w-4/6 cursor-pointer" onClick={toggleCollapse}>
            <h2 className="text-lg text-center">{title}</h2>
          </div>
          <div className="mt-2 ">
            <TaskOptions />
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out overflow-y-auto ${
            isCollapsed ? "max-h-0" : "max-h-[350px]"
          }`}
        >
          <div className="p-4 opacity-100">
            <p>{description.length ? description : "no description added."}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Task;
