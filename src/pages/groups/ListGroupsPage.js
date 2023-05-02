import React, { useState } from "react";
import api from "../../api/AxiosInterceptors";

function ListGroupsPage() {
  const [groups, setGroups] = useState();

  // fetch groups from the db
  const fetchGroups = async () => {
    try {
        const {data} = api.get("/groups/");
        console.log(data.response);
    } catch (error) {
        console.log(error);       
    }
  };
  //  init fetch groups with useEffect on group change

  return (
    <>
      <h1>list of groups you are in</h1>
      {/* map all groups fetch from the db */}

      {/* import add group method somewhere */}
    </>
  );
}

export default ListGroupsPage;
