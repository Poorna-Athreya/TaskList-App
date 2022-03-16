import './ListItem.css';
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { LIST_ROUTE } from '../../constants/routes';

function ListItem({ listName, id }) {
  const navigate = useNavigate();
  const onClickListItem = (clickedListId) => {
    navigate(`${LIST_ROUTE}/${clickedListId}`);
  };
  return (
    <button type="button" className="list-items" onClick={() => onClickListItem(id)}>
      {listName}
    </button>
  );
}
ListItem.propTypes = {
  id: PropTypes.number,
  listName: PropTypes.string,
};
ListItem.defaultProps = {
  id: 0,
  listName: 'Grocery list',
};
export default ListItem;
