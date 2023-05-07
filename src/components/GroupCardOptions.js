import React from "react";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../api/AxiosInterceptors";
import UpdateGroupModal from "./UpdateGroupModal";

function GroupCardOptions({groupInfo, refreshGroupsList}) {

    const {id, name, description} = groupInfo;


    const handleDelete = async () => {
        try {
           await api.delete(`groups/${id}/`);
           refreshGroupsList();
        } catch (error) {
            console.log(error);
        }
      };

      const handleUpdate = async (e) => {
        e.preventDefault();
        const updateInfo = {
            name: e.target.name.value,
            description: e.target.description.value,
        };

        try {
           await api.put(`groups/${id}/`, updateInfo);
           refreshGroupsList();
        } catch (error) {
            console.log(error);
        }
      };

  return (
    <>
    <div className="dropdown dropdown-left">
      <label tabIndex={0} className="btn m-1">
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a onClick={handleDelete}>Delete group</a>
        </li>
        <li>
        <label htmlFor="edit-group-modal">
        Edit group info
      </label>
        </li>
      </ul>
    </div>
    <UpdateGroupModal groupInfo={groupInfo} handleUpdate={handleUpdate}/>
    </>
  );
}

export default GroupCardOptions;
