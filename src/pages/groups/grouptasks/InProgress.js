import React from "react";
import Task from "../../../components/Task";

function InProgress() {
  const { id } = useParams();
  const [activeTasks, setactiveTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const { data } = await api.get(`/tasks/?owning_group__id=${id}`);
      console.log(data.results);
      setactiveTasks(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      {activeTasks.length
        ? activeTasks.map((task) => <Task key={task.id} taskInfo={task} />)
        : "there are no unitiated tasks"}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 "></div>
      <div className="container mx-auto"></div>
    </>
  );
}
export default InProgress;
