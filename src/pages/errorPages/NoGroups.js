import React from "react";

function NoGroups() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen">
      <h1 className="text-2xl text-center">
        Looks like you are not in a group yet! 
      </h1>
      <p className="text-sm">
        Click the large button at the top to get started.
      </p>
    </div>
  );
}

export default NoGroups;
