import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/AxiosInterceptors";
import Task from "../../../components/Task";
import AddTaskModal from "../../../components/AddTaskModal";
import GeneralTaskView from "./GeneralTaskView";

function InProgress() {
  const { id } = useParams();

  return (
    <GeneralTaskView taskFilter={`/tasks/?owning_group__id=${id}&in_progress=true`} />
  );
}

export default InProgress;

/* `/tasks/?owning_group__id=${id}&in_progress=true` */
