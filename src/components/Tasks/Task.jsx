import './Task.css';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskItem from '../TaskItems/TaskItem';
import { LIST_ROUTE } from '../../constants/routes';

function Tasks({ getListById, onClickEdit }) {
  const navigate = useNavigate();
  const params = useParams();
  const paramsListId = parseInt(params.listId, 10);
  const listItem = getListById(paramsListId);
  if (listItem.tasks.length === 0) {
    return (
      <>
        <div className="no-tasks-container">
          <h2>
            No tasks found for
            {' '}
            {listItem.listName}
            {' '}
            !
          </h2>
        </div>
        <button type="button" className="back-button" onClick={() => navigate(-1)}>Back to Lists</button>

      </>
    );
  }

  const tasks = listItem.tasks.map((eachTask) => (
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
          <h2>{listItem.listName}</h2>
        </div>
        <div className="tasks-content">
          {tasks}
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
