import './AddItem.css';
import React from 'react';
import PropTypes from 'prop-types';

function AddItem({ item, onClickAdd }) {
  return (
    <div className="add-new-item">
      <button type="button" className="add-item-button" onClick={onClickAdd}> +</button>
      <h3>
        Create
        {item}
      </h3>
    </div>
  );
}
AddItem.propTypes = {
  item: PropTypes.string,
  onClickAdd: PropTypes.func,
};
AddItem.defaultProps = {
  item: '',
  onClickAdd: () => {},
};
export default AddItem;
