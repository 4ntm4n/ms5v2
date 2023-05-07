import React from "react";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../api/AxiosInterceptors";

function GroupCardOptions({groupId, refreshGroupsList}) {

    const handleDelete = async (id) => {
        try {
           await api.delete(`groups/${id}/`);
           refreshGroupsList();
        } catch (error) {
            console.log(error);
        }
      };


  return (
    <div className="dropdown dropdown-left">
      <label tabIndex={0} className="btn m-1">
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a onClick={() => handleDelete(groupId)}>Delete group</a>
        </li>
        <li>
          <a>Edit group info</a>
        </li>
      </ul>
    </div>
  );
}

export default GroupCardOptions;
