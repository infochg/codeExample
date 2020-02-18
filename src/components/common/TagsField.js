import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import ChipInput from 'material-ui-chip-input';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = () => ({
  underline: {
    '&:before': {
      borderBottom: 'none !important',
    },
    '&:hover': {
      '&:before': {
        borderBottom: 'none !important',
      },
    },
  },
  focused: {
    '&:before': {
      borderBottom: 'none',
    },
    '&:after': {
      borderColor: '#FF9000 !important',
    },
  },
  disabled: {
    '& svg.MuiChip-deleteIcon': {
      display: 'none',
    },
    '& .MuiChip-root::before': {
      display: 'none',
    },
  },
});

function RenderTagsField({ label, placeholder, input, disabled, meta: { touched, error }, classes }) {
  const [chips, setChips] = useState(input.value || []);

  const handleAddChip = chip => {
    const newChips = chips.map(item => item);
    newChips.push(`${chip}`);
    setChips(newChips);
    input.onChange(newChips);
  };

  const handleDeleteChip = (chip, index) => {
    const newChips = chips.filter((item, itemIndex) => itemIndex !== index);
    setChips(newChips);
    input.onChange(newChips);
  };

  return (
    <div className="tags-input">
      <InputLabel>{label}</InputLabel>
      <ChipInput
        classes={{ underline: classes.underline, focused: classes.focused, disabled: classes.disabled }}
        error={!!touched && !!error}
        placeholder={placeholder}
        disabled={disabled}
        value={chips}
        onAdd={chip => handleAddChip(chip)}
        onDelete={(chip, index) => handleDeleteChip(chip, index)}
      />
      {!!touched && !!error ? <FormHelperText>{error}</FormHelperText> : null}
    </div>
  );
}

RenderTagsField.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.any,
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  classes: PropTypes.shape({
    underline: PropTypes.string,
    focused: PropTypes.string,
    disabled: PropTypes.string,
  }),
};

RenderTagsField.defaultProps = {
  placeholder: undefined,
  label: undefined,
  disabled: undefined,
  input: undefined,
  meta: undefined,
  classes: undefined,
};

export default withStyles(styles)(RenderTagsField);
