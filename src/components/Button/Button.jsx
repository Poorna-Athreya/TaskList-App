import './Button.css';
import PropTypes from 'prop-types';
import React from 'react';

function Button({ type, onClick, content }) {
  if (type === 'submit') return (<button className="submit-button" type="submit">{content}</button>);
  return (<button type="button" onClick={onClick} className="cancel-button">{content}</button>);
}
Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  content: PropTypes.string,
};
Button.defaultProps = {
  type: 'submit',
  onClick: () => {},
  content: 'Submit',
};
export default Button;
