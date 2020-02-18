import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import { Multiselect } from 'multiselect-react-dropdown';
import { getMembershipData } from '../../utils/helpers';

function RenderMultiselectField({
  input,
  label,
  placeholder,
  disabled,
  meta: { touched, error },
  children,
  dataArray,
}) {
  const selectedVals = [];
  if (Array.isArray(input.value)) {
    input.value.map(item => {
      selectedVals.push(getMembershipData(dataArray, item));
      return null;
    });
  }
  const [selected, setSelected] = useState({ options: selectedVals });

  const onSelect = optionsList => {
    setSelected({ options: optionsList });
    input.onChange(optionsList.map(item => item.id).join());
  };

  const onRemove = optionsList => {
    setSelected({ options: optionsList });
    input.onChange(optionsList.map(item => item.id).join());
  };

  return (
    <FormControl error={!!touched && !!error} className={disabled ? 'disabled select-form' : 'select-form'}>
      <InputLabel>{label}</InputLabel>

      <Multiselect
        options={children || []}
        selectedValues={selected.options}
        onSelect={onSelect}
        onRemove={onRemove}
        displayValue="name"
        placeholder={placeholder}
        closeIcon="cancel"
        style={{
          searchBox: {
            border: '1px solid #D8E0E7',
            padding: '10px 10px',
            borderRadius: '2px',
          },
        }}
      />

      {!!touched && !!error ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );
}

RenderMultiselectField.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.any,
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  children: PropTypes.arrayOf(PropTypes.shape({})),
  disabled: PropTypes.bool,
  dataArray: PropTypes.arrayOf(PropTypes.any),
};

RenderMultiselectField.defaultProps = {
  placeholder: undefined,
  label: undefined,
  input: undefined,
  meta: undefined,
  children: undefined,
  disabled: undefined,
  dataArray: undefined,
};

export default RenderMultiselectField;
