import React from "react";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../api/AxiosInterceptors";
import UpdateTaskModal from "./UpdateTaskModal";
function TaskOptions({taskInfo, updateTasks}) {
   const {id, name, description} = taskInfo;

  /* const handleDelete = async () => {
        try {
           await api.delete(`groups/${id}/`);
           refreshGroupsList();
        } catch (error) {
            console.log(error);
        }
      }; */

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

  return (
    <>
      <div className="dropdown dropdown-left">
        <label tabIndex={0} className="btn btn-primary m-1 w-12">
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
            <label htmlFor="edit-group-modal">Edit task info</label>
          </li>
        </ul>
      </div>
      <UpdateTaskModal taskInfo={taskInfo} handleUpdate={handleUpdate}/>
    </>
  );
}

export default TaskOptions;
