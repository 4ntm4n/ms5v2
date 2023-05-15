import { useParams } from "react-router-dom";
import GeneralTaskView from "../../../components/GeneralTaskView";

function InProgress() {
  const { id } = useParams();

  return (
    <GeneralTaskView taskFilter={`/tasks/?owning_group__id=${id}&in_progress=true`} />
  );
}

export default InProgress;

