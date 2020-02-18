import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';

import dropdownIco from '../../assets/images/icons/ico-dropdown.svg';

function RenderSelectField({ name, input, label, placeholder, meta: { touched, error }, children, ...custom }) {
  return (
    <FormControl error={!!touched && !!error} className="select-form">
      <InputLabel>{label}</InputLabel>
      {input.value === '' ? <div className="select-placeholder">{placeholder}</div> : null}
      <Select
        native
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...input}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...custom}
        inputProps={{
          name,
          id: name,
        }}
        IconComponent={() => <img src={dropdownIco} className="select-arrow" alt="" />}
      >
        <option defaultValue hidden>
          &nbsp;
        </option>
        {children}
      </Select>

      {!!touched && !!error ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );
}

RenderSelectField.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  children: PropTypes.arrayOf(PropTypes.shape({})),
};

RenderSelectField.defaultProps = {
  name: undefined,
  placeholder: undefined,
  label: undefined,
  input: undefined,
  meta: undefined,
  children: undefined,
};

export default RenderSelectField;
