import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';

function RenderTextareaField({ label, placeholder, input, maxLength, meta: { touched, invalid, error }, ...custom }) {
  const [lettersCount, setLettersCount] = useState(input.value ? input.value.length : 0);
  const [currentValue, setCurrentValue] = useState(input.value || '');

  const change = e => {
    setLettersCount(e.target.value.length);
    setCurrentValue(e.target.value);
  };

  return (
    <div className="textarea-multiline">
      <InputLabel>{label}</InputLabel>
      <TextField
        placeholder={placeholder}
        error={touched && invalid}
        helperText={touched && error}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...input}
        value={currentValue}
        onChange={e => change(e)}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...custom}
      />
      <div className="letters-count">{`${lettersCount}/${maxLength}`}</div>
    </div>
  );
}

RenderTextareaField.propTypes = {
  maxLength: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.string,
  }),
  meta: PropTypes.shape({
    invalid: PropTypes.bool,
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

RenderTextareaField.defaultProps = {
  maxLength: undefined,
  placeholder: undefined,
  label: undefined,
  input: undefined,
  meta: undefined,
};

export default RenderTextareaField;
