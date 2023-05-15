import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/AxiosInterceptors";
import Task from "../../../components/Task";
import AddTaskModal from "../../../components/AddTaskModal";

function UnAssigned() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [nextTasks, setNextTasks] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [tasksChanged, setTasksChanged] = useState(false);

  const updateTasks = () => {
    setTasksChanged((prevTasksChanged) => !prevTasksChanged);
  };

  const fetchTasks = async (
    url = `/tasks/?owning_group__id=${id}&in_progress=false&completed=false`
  ) => {
    try {
      const { data } = await api.get(url);
      setNextTasks(data.results);
      setNextUrl(data.next);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMoreTasks = () => {
    if (nextUrl) {
      setTasks([...tasks, ...nextTasks]);
      fetchTasks(nextUrl);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [tasksChanged]);

  return (
    <div className="pb-[180px]">
      <div className="grid grid-cols-1 ">
        <div className="container mx-auto max-w-xl ">
          {tasks.length ? (
            tasks.map((task) => (
              <Task key={task.id} taskInfo={task} updateTasks={updateTasks} />
            ))
          ) : (
            <p className="text-center">
              there are currently no uninitiated tasks for this group.
            </p>
          )}
          {nextTasks.map((task) => (
            <Task key={task.id} taskInfo={task} updateTasks={updateTasks} />
          ))}
        </div>
        {nextUrl && (
          <button
            onClick={loadMoreTasks}
            className="btn btn-secondary max-w-xs mx-auto mt-5"
          >
            Load more tasks
          </button>
        )}
      </div>

      <AddTaskModal groupId={id} updateTasks={updateTasks} />
    </div>
  );
}

export default UnAssigned;
