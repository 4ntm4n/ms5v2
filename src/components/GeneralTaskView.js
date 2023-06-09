import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/AxiosInterceptors";
import Task from "./Task";
import AddTaskModal from "./AddTaskModal";

function GeneralTaskView({ taskFilter }) {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [tasksChanged, setTasksChanged] = useState(false);

  const updateTasks = () => {
    setTasksChanged((prevTasksChanged) => !prevTasksChanged);
  };

  const fetchTasks = async (url = `${taskFilter}`) => {
    try {
      const { data } = await api.get(url);
      setTasks(data.results);
      setNextUrl(data.next);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMoreTasks = async () => {
    if (nextUrl) {
      try {
        const { data } = await api.get(nextUrl);
        setTasks((prevTasks) => [...prevTasks, ...data.results]);
        setNextUrl(data.next);
      } catch (error) {
        console.log(error);
      }
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
              there are currently no tasks for this view.
            </p>
          )}
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

export default GeneralTaskView;
