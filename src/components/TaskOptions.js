import React from "react";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../api/AxiosInterceptors";
import UpdateTaskModal from "./UpdateTaskModal";
function TaskOptions({ taskInfo, updateTasks }) {
  const { id, title, description, in_progress, completed, owner } = taskInfo;

  const handleDelete = async () => {
    try {
      await api.delete(`tasks/${id}/`);
      updateTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateInfo = {
      title: e.target.title.value,
      description: e.target.description.value,
    };

    try {
      await api.patch(`tasks/${id}/`, updateInfo);
      updateTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClaim = async () => {
    try {
      await api.patch(`tasks/${id}/`, { in_progress: true });
      updateTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleComplete = async () => {
    try {
      await api.patch(`tasks/${id}/`, { completed: true });
      updateTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="dropdown dropdown-left ">
        <label tabIndex={0} className="btn btn-primary m-1 w-12">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            {in_progress ? (
              <a
                className="bg-primary
                text-white hover:bg-base-300 
                hover:text-black"
                onClick={handleComplete}
              >
                Mark as complete
              </a>
            ) : (
              <a
                className="bg-primary
                text-white hover:bg-base-300 
                hover:text-black"
                onClick={handleClaim}
              >
                Take ownership
              </a>
            )}
          </li>

          <li>
          </li>

        

          <li>
            <a className="text-error" onClick={handleDelete}>
              Delete Task
            </a>
          </li>
        </ul>
      </div>
      <UpdateTaskModal taskInfo={taskInfo} handleUpdate={handleUpdate} />
    </>
  );
}

export default TaskOptions;
