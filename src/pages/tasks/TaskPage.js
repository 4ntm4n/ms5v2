import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import GeneralTaskView from "../../components/GeneralTaskView";

function TaskPage() {
  const {user} = useAuth();

  return (
    <GeneralTaskView taskFilter={`/tasks/?owner__owner__username=${user.username}`} />
  );
  }

export default TaskPage;


