import './List.css';
import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../ListItems/ListItem';

function List({ lists, onClickList }) {
  const listDisplay = lists.map((eachList) => (
    <ListItem
      id={eachList.id}
      key={eachList.id}
      listName={eachList.name}
      onClickList={onClickList}
    />
  ));
  return (
    <div className="lists-container">
      <h1> AVAILABLE LISTS</h1>
      <div className="listItems-container">
        {listDisplay}
      </div>
    </div>
  );
}
List.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    listName: PropTypes.string,
  })),
  onClickList: PropTypes.func,
};
List.defaultProps = {
  lists: [{ id: 1, listName: 'listname' }],
  onClickList: () => {},
};
export default List;
