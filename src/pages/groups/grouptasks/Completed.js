import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/AxiosInterceptors";
import Task from "../../../components/Task";
import AddTaskModal from "../../../components/AddTaskModal";


function Completed() {
  const { id } = useParams();
  const [completedTasks, setCompletedTasks] = useState([]);
  const [tasksChanged, setTasksChanged] = useState(false);
  
  const updateTasks = () => {
    setTasksChanged((prevTasksChanged) => !prevTasksChanged);
  };

  const fetchTasks = async () => {
    try {
      const { data } = await api.get(`/tasks/?owning_group__id=${id}&completed=true`);
      //console.log(data.results);
      setCompletedTasks(data.results);
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
        {completedTasks.length
        ? completedTasks.map((task) => <Task key={task.id} taskInfo={task}  updateTasks={updateTasks} />)
        : "There are completed tasks for this group. you can complete a task that you own from the 'active' tab."}
        </div>
      </div>

      <AddTaskModal groupId={id} updateTasks={updateTasks}/>
    </>
  );
}

export default Completed;
