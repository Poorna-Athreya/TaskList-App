import "./TaskItem.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const TaskItem = (props) => {
    return(
        <div className="task-item">
            <p>{props.taskTitle}</p>
            <button><FontAwesomeIcon icon={faPencil}/></button>
        </div>
    );
}
export default TaskItem;