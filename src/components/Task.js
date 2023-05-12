import React, { useState } from "react";
import TaskOptions from "./TaskOptions";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../contexts/AuthContext";

function Task({ taskInfo, updateTasks }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { user } = useAuth();

  const {
    id,
    title,
    description,
    owner,
    owner_profile_image,
    group_name,
    owning_group,
    in_progress,
    completed,
    updated_at,
  } = taskInfo;

  console.log(taskInfo);

  const owningUser = user.userId === owner ? true : false;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div className="w-[90%] mx-auto shadow-xl rounded-lg">
        <div className="flex justify-around rounded-lg">
          <div className="w-1/6 flex items-center">
            {in_progress ? (
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={owner_profile_image} />
                </div>
              </div>
            ) : null}
          </div>
          <div className=" p-4 w-4/6 cursor-pointer" onClick={toggleCollapse}>
            <h2 className="text-lg text-center">{title}</h2>
          </div>
          <div className="mt-2 justify-self-end">
            <div className={owner === null || owningUser ? "" : "invisible"}>
              <TaskOptions taskInfo={taskInfo} updateTasks={updateTasks} />
            </div>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out overflow-y-auto ${
            isCollapsed ? "max-h-0" : "max-h-[350px]"
          }`}
        >
          <div className="p-4 opacity-100 flex flex-col items-center">
            <p className=" w-[80%]">
              {description.length ? description : "no description added."}
            </p>
            <div className=" h-10 w-full mt-4 flex gap-5 items-center text-xs justify-center">
              <span className=" badge-ghost opacity-50 rounded-full px-2">
                {" "}
                group name: {`${group_name}`}{" "}
              </span>{" "}
              <span className=" badge-ghost opacity-50 rounded-full px-2">
                {" "}
                {`group id:  ${owning_group}`}{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Task;
