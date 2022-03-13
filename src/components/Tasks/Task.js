import "./Task.css";
import TaskItem from "../TaskItems/TaskItem";
const Tasks = (props) => {
    if(props.list.tasks.length === 0) return (<h2>No tasks found!</h2>);
    else{
        const tasks = props.list.tasks.map((eachTask) => {
        return <TaskItem taskTitle = {eachTask}></TaskItem>
        });
        return(
            <div className="tasks">
                {tasks}
            </div>
        );
    }
}
export default Tasks;