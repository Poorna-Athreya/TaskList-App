/* eslint-disable react/forbid-prop-types */
import './Task.css';
import PropTypes from 'prop-types';
import React from 'react';
import TaskItem from '../TaskItems/TaskItem';

function Tasks({ list, onClickEdit }) {
  if (list.tasks.length === 0) return (<h2>No tasks found!</h2>);

  const tasks = list.tasks.map((eachTask) => (
    <TaskItem
      key={eachTask.id}
      id={eachTask.id}
      taskTitle={eachTask.title}
      onClickEdit={onClickEdit}
    />
  ));
  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h2>{list.listName}</h2>
      </div>
      <div className="tasks-content">
        {tasks}
      </div>
    </div>
  );
}
Tasks.propTypes = {
  list: PropTypes.object,
  onClickEdit: PropTypes.func,
};
Tasks.defaultProps = {
  list: { tasks: [] },
  onClickEdit: () => {},
};
export default Tasks;
