import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';

function RenderTextField({ label, placeholder, input, meta: { touched, invalid, error }, ...custom }) {
  return (
    <div>
      <InputLabel>{label}</InputLabel>
      <TextField
        placeholder={placeholder}
        error={touched && invalid}
        helperText={touched && error}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...input}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...custom}
      />
    </div>
  );
}

RenderTextField.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  meta: PropTypes.shape({
    invalid: PropTypes.bool,
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

RenderTextField.defaultProps = {
  placeholder: undefined,
  label: undefined,
  input: undefined,
  meta: undefined,
};

export default RenderTextField;
