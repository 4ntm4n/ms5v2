import React from "react";
import { useAuth } from "../contexts/AuthContext";

function UserOptions() {
  const { user } = useAuth();
  return (
    <div className="avatar">
      <div className="w-10 rounded-full">
        <img src={user.image} />
      </div>
    </div>
  );
}

export default UserOptions;
