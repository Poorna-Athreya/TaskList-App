import React, { useState } from 'react';
import './AddOrEditItemDialog.css';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

function AddOrEditItemDialog({
  item, itemValue, onCreate, returnToPrev, onEdit,
}) {
  const [newItem, setNewItem] = useState(itemValue.title);

  const submitHandler = (event) => {
    event.preventDefault();
    if (item === 'List') {
      onCreate(newItem);
    } else if (itemValue.title === '') onCreate(newItem);
    else onEdit(newItem);
    setNewItem('');
  };

  const onChangeItem = (event) => {
    setNewItem(event.target.value);
  };

  return (
    <div className="add-item-dialog-container">
      <form className="add-item-form" onSubmit={submitHandler} onCancel={returnToPrev}>
        <label htmlFor="new-item">
          {' '}
          Add
          {' '}
          {item}
          {' '}
        </label>
        <input id="new-item" type="text" value={newItem} onChange={onChangeItem} />
        <div className="add-form-buttons">
          <Button type="submit" content="Submit" className="submit-button" />
          <Button type="cancel" content="Cancel" onClick={returnToPrev} className="cancel-button" />
        </div>
      </form>
    </div>
  );
}
AddOrEditItemDialog.propTypes = {
  item: PropTypes.string,
  itemValue: PropTypes.string,
  onCreate: PropTypes.func,
  onEdit: PropTypes.func,
  returnToPrev: PropTypes.func,
};

AddOrEditItemDialog.defaultProps = {
  item: '',
  itemValue: '',
  onCreate: () => {},
  onEdit: () => {},
  returnToPrev: () => {},
};
export default AddOrEditItemDialog;
