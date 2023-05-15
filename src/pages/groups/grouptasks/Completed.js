import { useParams } from "react-router-dom";
import GeneralTaskView from "../../../components/GeneralTaskView";

function Completed() {
  const { id } = useParams();

  return (
    <GeneralTaskView taskFilter={`/tasks/?owning_group__id=${id}&completed=true`} />
  );
}

export default Completed;

