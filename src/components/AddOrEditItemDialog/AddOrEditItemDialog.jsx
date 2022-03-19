import React, { useState } from 'react';
import './AddOrEditItemDialog.css';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../Button/Button';
import { LIST_ROUTE } from '../../constants/routes';
import makeRequest from '../../utils/makeRequest';

function AddOrEditItemDialog({
  item, itemEditOrAdd, onCreate, getTaskById, setTasks, tasks,
}) {
  const navigate = useNavigate();
  const params = useParams();
  const [newItem, setNewItem] = useState('');
  const [isTaskTitleLoaded, setIsTaskTitleLoaded] = useState(false);

  // const validateInput = (event) => {
  //   event.preventDefault();
  //   const errors = [];
  //   if (newItem.trim().length === 0) errors.push('Input must contain at least 1 character!');
  //   if (errors.length > 0) {
  //     const errorMessage = document.getElementsByClassName('input-errors');
  //     errorMessage.style.display = 'block';
  //   }
  // };

  const onSubmitForm = (event) => {
    event.preventDefault();
    const { listId, taskId } = params;
    if (item === 'List') {
      onCreate(newItem);
      navigate(`${LIST_ROUTE}`);
    } else if (itemEditOrAdd === 'Add') {
      const newTaskItem = {
        title: newItem,
        listId: parseInt(listId, 10),
      };
      makeRequest({ method: 'post', url: `${LIST_ROUTE}/task` }, { data: newTaskItem }).then((newTaskResponse) => {
        console.log(newTaskResponse);
        setTasks(() => [...tasks, newTaskResponse]);
      });
      navigate(`${LIST_ROUTE}/${listId}`);
    } else {
      const modifiedTaskDetails = {
        title: newItem,
        listId: parseInt(listId, 10),
        id: parseInt(taskId, 10),
      };
      makeRequest({ method: 'put', url: `${LIST_ROUTE}/task` }, { data: modifiedTaskDetails }).then((modifiedTask) => {
        const modifiedTasks = tasks.map((eachTask) => {
          if (eachTask.id === modifiedTask[0].id) return modifiedTask[0];
          return eachTask;
        });
        setTasks(modifiedTasks);
      });
      navigate(`${LIST_ROUTE}/${listId}`);
    }
    setNewItem('');
  };

  const onChangeItem = (event) => {
    setNewItem(event.target.value);
  };
  if (params.taskId && !newItem && !isTaskTitleLoaded) {
    setIsTaskTitleLoaded(true);
    const taskBeingEdited = getTaskById(parseInt(params.listId, 10), parseInt(params.taskId, 10));
    if (taskBeingEdited) setNewItem(taskBeingEdited.title);
  }

  return (
    <div className="add-item-dialog-container">
      <form data-testid="AddOrEditItemForm" className="add-item-form" onSubmit={onSubmitForm} onCancel={() => navigate(-1)}>
        <label htmlFor="new-item">{`${itemEditOrAdd} ${item}`}</label>
        <p className="input-error" value="" />
        <input id="new-item" type="text" value={newItem} onChange={onChangeItem} data-testid="testId-inputText" />
        <div className="add-form-buttons">
          <Button type="submit" content="Submit" className="submit-button" />
          {' '}
          {/* onClick={validateInput} */}
          <Button type="cancel" content="Cancel" onClick={() => navigate(-1)} className="cancel-button" />
        </div>
      </form>
    </div>
  );
}
AddOrEditItemDialog.propTypes = {
  item: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    listId: PropTypes.number,
    title: PropTypes.string,
  })),
  itemEditOrAdd: PropTypes.string,
  onCreate: PropTypes.func,
  getTaskById: PropTypes.func,
  setTasks: PropTypes.func,
};

AddOrEditItemDialog.defaultProps = {
  item: '',
  tasks: [],
  itemEditOrAdd: 'Add',
  onCreate: () => {},
  getTaskById: () => {},
  setTasks: () => {},
};
export default AddOrEditItemDialog;
