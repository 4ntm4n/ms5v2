import React from "react";
import { useNavigate } from "react-router-dom";

function NoTasks() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen">
      <h1 className="text-2xl text-center">
        You need to own a task before they show up here!
      </h1>
      <p className="text-sm">go to a group and take ownership of an unassigned task before you come back here.</p>
      <button onClick={() => navigate(-1)} className="btn btn-outline">
        to the groups page
      </button>
    </div>
  );
}

export default NoTasks;
