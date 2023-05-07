import React from "react";
import { Link } from "react-router-dom";
import GroupCardOptions from "./GroupCardOptions";

function GroupCard({ group, refreshGroupsList }) {
  const { id, name, description, group_owner, members } = group;

  const groupSize = members.length;

  return (
    <div className="card w-96 bg-base-100 shadow-xl mt-20">
      <div className="avatar justify-center">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 absolute -top-6 ">
          <img src={group_owner.image} className="object-cover" />
          {/* img with source to group owner */}
        </div>
      </div>
      <div className="flex justify-end">
        <GroupCardOptions groupId={id}  refreshGroupsList={refreshGroupsList} />
      </div>
      <div className="card-body mt-20">
        <h2 className="card-title">{group.name}</h2>
        <p>{group.description}</p>
        <div className="card-actions justify-between mt-10">
          <div className="avatar-group -space-x-6">
            {groupSize < 3
              ? members.map((member, idx) => (
                  <div key={idx} className="avatar">
                    <div className="w-12">
                      <img src={member.image} />
                    </div>
                  </div>
                ))
              : members.map((member, idx) => {
                  if (idx <= 2) {
                    return (
                      <div key={idx} className="avatar">
                        <div className="w-12">
                          <img src={member.image} />
                        </div>
                      </div>
                    );
                  }
                })}
            {groupSize > 3 && (
              <div className="avatar placeholder">
                <div className="w-12 bg-neutral-focus text-neutral-content">
                  <span>+{groupSize - 3}</span>
                </div>
              </div>
            )}
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
