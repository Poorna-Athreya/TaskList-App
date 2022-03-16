import './Task.css';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import {
  useNavigate, useParams,
} from 'react-router-dom';
import TaskItem from '../TaskItems/TaskItem';
import { LIST_ROUTE } from '../../constants/routes';
import makeRequest from '../../utils/makeRequest';
import { BACKEND_URL } from '../../constants/apiEndpoints';

function Tasks({ getListById, onClickEdit }) {
  const [tasks, setTasks] = useState([]);
  const [isTasksLoaded, setIsTasksLoaded] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const paramsListId = parseInt(params.listId, 10);
  const listItem = getListById(paramsListId);

  // console.log('List id: ', paramsListId, ' ', listItem);
  const listName = listItem.name;
  console.log('ListName: ', listName);

  useEffect(() => {
    if (!isTasksLoaded) {
      setIsTasksLoaded(true);
      makeRequest({ method: 'get', url: `${BACKEND_URL}${LIST_ROUTE}/${paramsListId}` }).then((taskData) => {
        console.log('Tasks: ', taskData);
        setTasks(taskData);
      });
    }
  }, [tasks]);
  if (tasks.length === 0) {
    return (
      <>
        <div className="no-tasks-container">
          <h2>
            No tasks found for
            {' '}
            {listName}
            {' '}
            !
          </h2>
        </div>
        <button type="button" className="back-button" onClick={() => navigate(-1)}>Back to Lists</button>

      </>
    );
  }

  const tasksDisplay = tasks.map((eachTask) => (
    <TaskItem
      key={eachTask.id}
      id={eachTask.id}
      taskTitle={eachTask.title}
      onClickEdit={onClickEdit}
    />
  ));
  return (
    <>
      <div className="tasks-container">
        <div className="tasks-header">
          <h2>{listName}</h2>
        </div>
        <div className="tasks-content">
          {tasksDisplay}
        </div>
      </div>
      <button type="button" className="back-button" onClick={() => navigate(`${LIST_ROUTE}`)}>Back to Lists</button>
    </>
  );
}
Tasks.propTypes = {
  getListById: PropTypes.func,
  onClickEdit: PropTypes.func,
};
Tasks.defaultProps = {
  getListById: () => {},
  onClickEdit: () => {},
};
export default Tasks;
