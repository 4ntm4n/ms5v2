import React from "react";

function Task({ taskInfo }) {
  const {
    title,
    description,
    owner_name,
    owner_profile_image,
    owning_group,
    in_progress,
    completed,
    updated_at,
  } = taskInfo;

  return (
    <div tabIndex={0} className="collapse rounded-xl w-[90%] bg-red-500 mx-auto p-0">
  <div className="collapse-title rounded-t-xl p-3 flex justify-between items-center">
    <div className="font-medium truncate w-[75%]">{title}</div>
    <div className="flex flex-wrap justify-around w-auto bg-yellow-400">
    <button className="md:block hidden btn font-semibold text-xs px-2 py-1 rounded">
        Take Ownership
      </button>
      <button className="btn btn-primary font-semibold px-2 py-1 rounded">
        ...
      </button>
    </div>
  </div>
  <div className="collapse-content">
    <div className="">
      <p className="">{description}</p>
    </div>
  </div>
</div>
  );
}

export default Task;