import React, { useEffect, useState } from "react";
import api from "../../api/AxiosInterceptors";
import GroupCard from "../../components/GroupCard";
import AddGroupModal from "../../components/AddGroupModal";
import { useAuth } from "../../contexts/AuthContext";
import NoGroups from "../errorPages/NoGroups";

function ListGroupsPage() {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [updateGroups, setUpdateGroups] = useState(false);

  const refreshGroupsList = () => {
    setUpdateGroups(!updateGroups);
  };

  // fetch groups from the db
  const fetchGroups = async () => {
    try {
      const { data } = await api.get("/groups/");
      setGroups(data.results);
    } catch (error) {
      console.log(error);
    }
  };
  //  init fetch groups with useEffect on group change
  useEffect(() => {
    fetchGroups();
  }, [updateGroups, user]);
  return (
    <>
      <AddGroupModal refreshGroupsList={refreshGroupsList} />

      <div className="bg-base-200">
        {groups.length ? (
          <div className="container mx-auto mb-11">
            <ul className="flex flex-col gap-x-6 sm:flex-col md:flex-row flex-wrap justify-center gap-1">
              {groups.map((group) => (
                <li key={group.id} className="grid place-items-center">
                  <GroupCard
                    key={group.id}
                    group={group}
                    refreshGroupsList={refreshGroupsList}
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <NoGroups />
        )}
      </div>
    </>
  );
}

export default ListGroupsPage;
