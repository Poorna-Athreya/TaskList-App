import React, { useState } from 'react';
import './AddOrEditItemDialog.css';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../Button/Button';
import { LIST_ROUTE } from '../../constants/routes';

function AddOrEditItemDialog({
  item, itemEditOrAdd, onCreate, onEdit, getTaskById,
}) {
  const navigate = useNavigate();
  const params = useParams();
  const [newItem, setNewItem] = useState('');
  const [isTaskTitleLoaded, setIsTaskTitleLoaded] = useState(false);

  const onSubmitForm = (event) => {
    event.preventDefault();
    const { listId, taskId } = params;
    if (item === 'List') {
      onCreate(newItem);
      navigate(`${LIST_ROUTE}`);
    } else if (itemEditOrAdd === 'Add') {
      onCreate(newItem, parseInt(listId, 10));
      navigate(`${LIST_ROUTE}/${listId}`);
    } else {
      onEdit(newItem, parseInt(listId, 10), parseInt(taskId, 10));
      navigate(`${LIST_ROUTE}/${listId}`);
    }
    setNewItem('');
  };

  const onChangeItem = (event) => {
    setNewItem(event.target.value);
  };
  if (params.taskId && !newItem && !isTaskTitleLoaded) {
    const taskBeingEdited = getTaskById(parseInt(params.listId, 10), parseInt(params.taskId, 10));
    if (taskBeingEdited) setNewItem(taskBeingEdited.title);
    setIsTaskTitleLoaded(true);
  }

  return (
    <div className="add-item-dialog-container">
      <form className="add-item-form" onSubmit={onSubmitForm} onCancel={() => navigate(-1)}>
        <label htmlFor="new-item">{`${itemEditOrAdd} ${item}`}</label>
        <input id="new-item" type="text" value={newItem} onChange={onChangeItem} />
        <div className="add-form-buttons">
          <Button type="submit" content="Submit" className="submit-button" />
          <Button type="cancel" content="Cancel" onClick={() => navigate(-1)} className="cancel-button" />
        </div>
      </form>
    </div>
  );
}
AddOrEditItemDialog.propTypes = {
  item: PropTypes.string,
  itemEditOrAdd: PropTypes.string,
  onCreate: PropTypes.func,
  onEdit: PropTypes.func,
  getTaskById: PropTypes.func,
};

AddOrEditItemDialog.defaultProps = {
  item: '',
  itemEditOrAdd: 'Add',
  onCreate: () => {},
  onEdit: () => {},
  getTaskById: () => {},
};
export default AddOrEditItemDialog;
