import React, { useEffect, useState } from "react";
import api from "../../api/AxiosInterceptors";
import Task from "../../components/Task";
import { useAuth } from "../../contexts/AuthContext";
import NoTasks from "../errorPages/NoTasks";

function TaskPage() {
  const {user} = useAuth();
  const [myTasks, setMyTasks] = useState([]);
  const [tasksChanged, setTasksChanged] = useState(false);
  
  const updateTasks = () => {
    setTasksChanged((prevTasksChanged) => !prevTasksChanged);
  };

  /* fetch tasks related to auth user.. */
  const fetchTasks = async () => {
    try {
      const { data } = await api.get(`/tasks/?owner__owner__username=${user.username}`);
      //console.log(data.results);
      setMyTasks(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [tasksChanged]);

  return myTasks.length ? (
    <>
     
      <h1 className="text-center text-xl m-11"> A list of all your tasks regardless of group</h1>

      <div className="grid grid-cols-1">
        <div className="container mx-auto max-w-xl">
       { myTasks.map((task) => <Task key={task.id} taskInfo={task}  updateTasks={updateTasks} />)}
        
        </div>
      </div>

    </>
  ) : (<NoTasks></NoTasks>);
}

export default TaskPage;
