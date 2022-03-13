import "./TaskItem.css";
const TaskItem = (props) => {
    return(
        <div className="task-item">
            <p>{props.taskTitle}</p>
            <button>Edit</button>
        </div>
    );
}
export default TaskItem;