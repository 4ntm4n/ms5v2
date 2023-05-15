import { useParams } from "react-router-dom";
import GeneralTaskView from "./GeneralTaskView";

function UnAssigned() {
  const { id } = useParams();

  return (
    <GeneralTaskView taskFilter={`/tasks/?owning_group__id=${id}&in_progress=false&completed=false`} />
  );
}


export default UnAssigned;


