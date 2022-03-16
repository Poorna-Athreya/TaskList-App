import './AddItem.css';
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { LIST_ROUTE, TASK_ROUTE } from '../../constants/routes';

function AddItem({ item }) {
  const params = useParams();
  const navigate = useNavigate();
  const onClickAddList = () => {
    navigate(`${LIST_ROUTE}/add`);
  };
  const onClickAddTask = () => {
    const { listId } = params;
    navigate(`${LIST_ROUTE}/${listId}${TASK_ROUTE}/add`);
  };
  const onClickAddItem = () => {
    if (item === 'List') onClickAddList();
    else onClickAddTask();
  };
  return (
    <div className="add-new-item">
      <button type="button" className="add-item-button" onClick={onClickAddItem}> +</button>
      <h3>
        CREATE
        {` ${item.toUpperCase()}`}
      </h3>
    </div>
  );
}
AddItem.propTypes = {
  item: PropTypes.string,
};
AddItem.defaultProps = {
  item: '',
};
export default AddItem;
