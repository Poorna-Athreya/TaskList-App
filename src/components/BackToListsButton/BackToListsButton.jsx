import React from 'react';
import './BackToListsButton.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { LIST_ROUTE } from '../../constants/routes';

function BackToListsButton({ onClickAddition }) {
  const navigate = useNavigate();
  return (
    <div className="back-button-container">
      <button
        type="button"
        className="back-to-lists-button"
        onClick={() => {
          navigate(`${LIST_ROUTE}`);
          onClickAddition([]);
        }}
      >
        {' '}
        Back to Lists
        {' '}

      </button>
    </div>
  );
}
BackToListsButton.propTypes = {
  onClickAddition: PropTypes.func,
};
BackToListsButton.defaultProps = {
  onClickAddition: () => {},
};
export default BackToListsButton;
