import React from "react";
import { Link } from "react-router-dom";

function GroupCard({ group }) {
  const { id, name, description, group_owner, members } = group;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="avatar justify-center">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 absolute -top-6 ">
          <img src={group_owner.image} className="object-cover" />
          {/* img with source to group owner */}
        </div>
      </div>
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
