import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function UserOptions() {
  const [userImage, setUserImage] = useState();
  const { user } = useAuth();

  useEffect(() => {
    setUserImage(user.image);
  }, [user]);

  return (
    <div className="avatar">
      <div className="w-10 rounded-full">
        <img src={userImage} />
      </div>
    </div>
  );
}

export default UserOptions;
