import React, { useEffect, useState } from "react";
import api from "../../api/AxiosInterceptors";
import Task from "../../components/Task";
import { useAuth } from "../../contexts/AuthContext";
import NoTasks from "../errorPages/NoTasks";
import GeneralTaskView from "../../components/GeneralTaskView";

function TaskPage() {
  const {user} = useAuth();

  return (
    <GeneralTaskView taskFilter={`/tasks/?owner__owner__username=${user.username}`} />
  );
  }

export default TaskPage;


