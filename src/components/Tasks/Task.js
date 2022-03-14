import "./Task.css";
import TaskItem from "../TaskItems/TaskItem";
const Tasks = (props) => {
    if(props.list.tasks.length === 0) return (<h2>No tasks found!</h2>);
    else{
        const tasks = props.list.tasks.map((eachTask) => {
        return <TaskItem key={eachTask.id} id={eachTask.id} taskTitle = {eachTask.title} onClickEdit = {props.onClickEdit}></TaskItem>
        });
        return(
            <div className="tasks-container">
                <div className="tasks-header">
                    <h2>{props.list.listName}</h2>
                </div>
                <div className="tasks-content">
                    {tasks}
                </div>
            </div>
        );
    }
}
export default Tasks;