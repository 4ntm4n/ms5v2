import React from "react";

function GroupInfo({ group }) {
  return (
    <div className="text-center flex flex-col gap-2 mt-5">
      <h1 className="text-xl">{group.name}</h1>
      <p>{group.description}</p>
    </div>
  );
}

export default GroupInfo;
