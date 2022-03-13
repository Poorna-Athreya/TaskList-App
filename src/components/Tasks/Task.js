import "./Task.css";
import TaskItem from "../TaskItems/TaskItem";
const Tasks = (props) => {
    const tasks = props.list.tasks.map((eachTask) => {
        return <TaskItem taskTitle = {eachTask}></TaskItem>
    });
    return(
        <div className="tasks">
            {tasks}
        </div>
    )
}
export default Tasks;