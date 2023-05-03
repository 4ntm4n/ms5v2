import React from "react";
import { Link } from "react-router-dom";

function GroupCard({ group }) {
  const { id, name, description, group_owner, members } = group;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{group.name}</h2>
        <p>{group.content}</p>
        <div className="card-actions justify-end">
        <Link to={`${id}`}>
            <button className="btn btn-primary">go to group: {id}</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GroupCard;
