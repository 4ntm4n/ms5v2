import React, { useEffect, useState } from "react";
import api from "../../api/AxiosInterceptors";
import GroupCard from "../../components/GroupCard";
import AddGroupModal from "../../components/AddGroupModal";

function ListGroupsPage() {
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
  }, [updateGroups]);
  return (
    <>
      <AddGroupModal refreshGroupsList={refreshGroupsList} />

    <div className="bg-base-200 min-h-full">
    {groups.length ? (
      <div className="container mx-auto">
        <ul className="flex flex-col lg:flex-row flex-wrap justify-center gap-1">
          {groups.map((group) => (
            <div key={group.id} className="grid place-items-center">
              <GroupCard key={group.id} group={group} />
            </div>
          ))}
        </ul>
      
      </div>
    ) : (
      <p>no groups yet...</p>
    )}
  </div>

  </>
  );
}

export default ListGroupsPage;

/* 
    group object looks like :
created_at
: 
"02 Mar 2023"
description
: 
"sdfsdf"
group_owner
: 
{id: 1, owner: 'admin', created_at: '23 Feb 2023', updated_at: '2023-02-24', image: 'https://res.cloudinary.com/dgnutwnef/image/upload/v1/media/images/jimtape_qpmi6i', …}
id
: 
8
members
: 
(2) [{…}, {…}]
name
: 
"sfsdf"
updated_at
: 
"02 Mar 2023" */
