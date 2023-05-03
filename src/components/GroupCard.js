import React from "react";

function GroupCard({ group }) {
    const { id, name, description, group_owner, members } = group;
  return(
    <div>
        <h1>this card will display group information</h1>
    </div>
  );
}

export default GroupCard;
