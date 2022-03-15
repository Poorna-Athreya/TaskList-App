import './TaskItem.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

function TaskItem({ onClickEdit, taskTitle, id }) {
  const onClickEditHandler = () => {
    onClickEdit(taskTitle, id);
  };
  return (
    <div className="task-item">
      <p>{taskTitle}</p>
      <button type="button" aria-label="edit-button" className="edit-button" onClick={onClickEditHandler}><FontAwesomeIcon icon={faPencil} /></button>
    </div>
  );
}
TaskItem.propTypes = {
  id: PropTypes.number,
  taskTitle: PropTypes.string,
  onClickEdit: PropTypes.func,
};
TaskItem.defaultProps = {
  id: 0,
  taskTitle: ' ',
  onClickEdit: () => {},
};
export default TaskItem;
