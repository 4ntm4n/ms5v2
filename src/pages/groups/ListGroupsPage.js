import React, { useEffect, useState } from "react";
import api from "../../api/AxiosInterceptors";

function ListGroupsPage() {
  const [groups, setGroups] = useState([]);

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
  }, []);
  return (
    <>
      <h1>list of groups you are in</h1>
      {/* map all groups fetch from the db */}
        {groups.length 
            ? (groups.map(group => (
                <h1 key ={group.id}>{group.name}</h1>
            ))) 
            : ("loading")}
      {/* import add group method somewhere */}
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