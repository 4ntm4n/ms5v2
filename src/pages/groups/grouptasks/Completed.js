import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/AxiosInterceptors";
import Task from "../../../components/Task";
import AddTaskModal from "../../../components/AddTaskModal";


function Completed() {
  const { id } = useParams();
  const [completedTasks, setcompletedTasks] = useState([]);
  const [tasksChanged, setTasksChanged] = useState(false);
  
  const updateTasks = () => {
    setTasksChanged((prevTasksChanged) => !prevTasksChanged);
  };


  const fetchTasks = async () => {
    try {
      const { data } = await api.get(`/tasks/?owning_group__id=${id}`);
      console.log(data.results);
      setcompletedTasks(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [tasksChanged]);

  return (
    <>
    {completedTasks.length
      ? completedTasks.map((task) => <Task key={task.id} taskInfo={task} />)
      : "there are no unitiated tasks"}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 "></div>
    <div className="container mx-auto"></div>

    <AddTaskModal groupId={id} updateTasks={updateTasks}/>
  </>
  );
}

export default Completed;
