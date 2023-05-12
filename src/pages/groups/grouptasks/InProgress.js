import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/AxiosInterceptors";
import Task from "../../../components/Task";
import AddTaskModal from "../../../components/AddTaskModal";

function InProgress() {
  const { id } = useParams();
  const [activeTasks, setActiveTasks] = useState([]);
  const [tasksChanged, setTasksChanged] = useState(false);

  const updateTasks = () => {
    setTasksChanged((prevTasksChanged) => !prevTasksChanged);
  };

  const fetchTasks = async () => {
    try {
      const { data } = await api.get(
        `/tasks/?owning_group__id=${id}&in_progress=true`
      );
      //console.log(data.results);
      setActiveTasks(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [tasksChanged]);

  return (
    <>
      <div className="grid grid-cols-1">
        <div className="container mx-auto max-w-xl">
          {activeTasks.length
            ? activeTasks.map((task) => (
                <Task key={task.id} taskInfo={task} updateTasks={updateTasks} />
              ))
            : "There are no current tasks in progress, take ownership of an unassigned task to view them here"}
        </div>
      </div>

      <AddTaskModal groupId={id} updateTasks={updateTasks} />
    </>
  );
}
export default InProgress;
