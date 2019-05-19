import React from 'react';
import { CSSTransition } from 'react-transition-group';
import propTypes from 'prop-types';

const DisplayMessage = ({
  error, message, onClick, successClass,
}) => (
  <CSSTransition
    in={error}
    timeout={5000}
    classNames="alert"
    unmountOnExit
  >
    <div className={`error-cont ${successClass}`}>
      <p className="error">{message}</p>
      <span className="exit-error" role="presentation" onClick={onClick}>X</span>
    </div>
  </CSSTransition>
);


DisplayMessage.defaultProps = {
  successClass: '',
  message: null,
  error: false,
};

DisplayMessage.propTypes = {
  error: propTypes.bool,
  message: propTypes.string,
  onClick: propTypes.func.isRequired,
  successClass: propTypes.string,
};

export default DisplayMessage;
