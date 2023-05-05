import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/AxiosInterceptors";
import Task from "../../../components/Task";


function UnAssigned() {
    const {id} = useParams();
    const [unasTasks, setUnasTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const {data} = await api.get(`/tasks/?owning_group__id=${id}`);
            console.log(data.results);
            setUnasTasks(data.results);
        } catch (error) {
            console.log(error);
        }
      };
    
    useEffect(() => {
        fetchTasks();
    }, []);
    

  return (

    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {unasTasks.length 
         ? (unasTasks.map(task => (
            <Task key={task.id} taskInfo={task} />
         )))
         : ("there are no unitiated tasks")
          }
      </div>
    </div>
  );
}

export default UnAssigned;
