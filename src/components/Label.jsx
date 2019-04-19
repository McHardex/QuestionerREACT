import React from 'react';
import propTypes from 'prop-types';

const Label = (props) => {
  const {
    htmlFor,
    ...otherProps
  } = props;

  return <label htmlFor={htmlFor} {...otherProps} />;
};

Label.propTypes = {
  htmlFor: propTypes.string,
};

Label.defaultProps = {
  htmlFor: propTypes.string,
};
export default Label;
