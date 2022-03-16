import './TaskItem.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LIST_ROUTE, TASK_ROUTE } from '../../constants/routes';

function TaskItem({ taskTitle, id }) {
  const params = useParams();
  const navigate = useNavigate();
  const onClickEdit = () => {
    const { listId } = params;
    navigate(`${LIST_ROUTE}/${listId}${TASK_ROUTE}/${id}/edit`);
  };
  return (
    <div className="task-item">
      <p>{taskTitle}</p>
      <button type="button" aria-label="edit-button" className="edit-button" onClick={onClickEdit}><FontAwesomeIcon icon={faPencil} /></button>
    </div>
  );
}
TaskItem.propTypes = {
  id: PropTypes.number,
  taskTitle: PropTypes.string,
};
TaskItem.defaultProps = {
  id: 0,
  taskTitle: ' ',
};
export default TaskItem;
