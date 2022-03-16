import './List.css';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ListItem from '../ListItems/ListItem';
import makeRequest from '../../utils/makeRequest/makeRequest';
import { getMatchEndpoint, agentsEndpoint } from '../../constants/apiEndpoints';

function List({ lists, onClickList }) {
  const [responseData, setResponseData] = useState(null);
  const [isInitialised, setIsInitialised] = useState(false);
  useEffect(() => {
    if (!isInitialised) {
      setIsInitialised(true);
      makeRequest(agentsEndpoint).then((response) => {
        console.log(response);
        setResponseData(response);
      });
      makeRequest(getMatchEndpoint('12c3se4')).then((response) => console.log(response));
    }
  });

  useEffect(() => {
    console.log('RESPONSE DATA: ', responseData);
  }, [responseData]);

  const listDisplay = lists.map((eachList) => (
    <ListItem
      id={eachList.id}
      key={eachList.id}
      listName={responseData.agents[0].name}
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
    tasks: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    })),
  })),
  onClickList: PropTypes.func,
};
List.defaultProps = {
  lists: [{ id: 1, listName: 'listname', tasks: [{ id: 1, title: '' }] }],
  onClickList: () => {},
};
export default List;
