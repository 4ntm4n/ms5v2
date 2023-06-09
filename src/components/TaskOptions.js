import React, { useState } from "react";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateTaskModal from "./UpdateTaskModal";
import api from "../api/AxiosInterceptors";
import { useNavigate } from "react-router-dom";

function TaskOptions({ taskInfo, updateTasks }) {
  const { id, in_progress, completed, owner, owning_group} = taskInfo;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
      setErrors({});
    } catch (error) {
      if (error.response.data) {
        setErrors(error.response.data);
      }
    }
  };

  const handleClaim = async () => {
    try {
      await api.patch(`tasks/${id}/`, { in_progress: true });
      updateTasks();
      navigate(`/groups/${owning_group}/active`);
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

  const handleRelease = async () => {
    try {
      await api.patch(`tasks/${id}/`, {
        completed: false,
        in_progress: false,
        owner: null,
      });
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
            {completed ? null : in_progress ? (
              <a
                className="bg-primary text-white hover:bg-base-300 hover:text-black"
                onClick={handleComplete}
              >
                Mark as complete
              </a>
            ) : (
              <a
                className="bg-primary text-white hover:bg-base-300 hover:text-black"
                onClick={handleClaim}
              >
                Take ownership
              </a>
            )}
          </li>

          {completed ? (
            <li>
              <a className="text-error" onClick={handleRelease}>
                re-open
              </a>
            </li>
          ) : (
            <li>
              <label htmlFor={`edit-task-modal${id}`}>Edit task info</label>
            </li>
          )}

          {in_progress && !completed && (
            <li>
              <a className="text-error" onClick={handleRelease}>
                release to group
              </a>
            </li>
          )}

          <li>
            <a className="text-error" onClick={handleDelete}>
              Delete Task
            </a>
          </li>
        </ul>
      </div>
      <UpdateTaskModal
        taskInfo={taskInfo}
        handleUpdate={handleUpdate}
        errors={errors}
        setErrors={setErrors}
      />
    </>
  );
}

export default TaskOptions;
