import './Task.css';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import {
  useNavigate, useParams,
} from 'react-router-dom';
import TaskItem from '../TaskItems/TaskItem';
import { LIST_ROUTE } from '../../constants/routes';
import makeRequest from '../../utils/makeRequest';
import BackToListsButton from '../BackToListsButton/BackToListsButton';

function Tasks({
  getListById, onClickEdit, tasks, setTasks,
}) {
  const [isTasksLoaded, setIsTasksLoaded] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const paramsListId = parseInt(params.listId, 10);
  const listItem = getListById(paramsListId);

  useEffect(() => {
    if (!isTasksLoaded) {
      setIsTasksLoaded(true);
      makeRequest({ method: 'get', url: `${LIST_ROUTE}/${paramsListId}` }, {}, navigate).then((taskData) => {
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
            {listItem.name}
            {' '}
            !
          </h2>
        </div>
        <BackToListsButton onClickAddition={setTasks} />

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
          <h2>{listItem.name}</h2>
        </div>
        <div className="tasks-content">
          {tasksDisplay}
        </div>
      </div>
      <BackToListsButton onClickAddition={setTasks} />
    </>
  );
}
Tasks.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    listId: PropTypes.number,
    title: PropTypes.string,
  })).isRequired,
  getListById: PropTypes.func,
  onClickEdit: PropTypes.func,
  setTasks: PropTypes.func.isRequired,
};
Tasks.defaultProps = {
  getListById: () => {},
  onClickEdit: () => {},
};
export default Tasks;
