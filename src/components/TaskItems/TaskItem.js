import "./TaskItem.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const TaskItem = (props) => {
    const onClickEditHandler = () => {
        props.onClickEdit(props.taskTitle,props.id);
    }
    return(
        <div className="task-item">
            <p>{props.taskTitle}</p>
            <button className="edit-button" onClick={onClickEditHandler}><FontAwesomeIcon icon={faPencil}/></button>
        </div>
    );
}
export default TaskItem;