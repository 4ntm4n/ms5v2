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
      <div className="card-body mt-20">
        <h2 className="card-title">{group.name}</h2>
        <p>{group.content}</p>
        <div className="card-actions justify-between mt-10">
          <div className="avatar-group -space-x-6">
            <div className="avatar">
              <div className="w-12">
                <img src="https://via.placeholder.com/150x150?text=Your+Text" />
              </div>
            </div>
            <div className="avatar">
              <div className="w-12">
                <img src="https://via.placeholder.com/150x150?text=Your+Text" />
              </div>
            </div>
            <div className="avatar">
              <div className="w-12">
                <img src="https://via.placeholder.com/150x150?text=Your+Text" />
              </div>
            </div>
            <div className="avatar placeholder">
              <div className="w-12 bg-neutral-focus text-neutral-content">
                <span>+99</span>
              </div>
            </div>
          </div>

          <Link to={`${id}`}>
            <button className="btn btn-primary">go to group: {id}</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GroupCard;
