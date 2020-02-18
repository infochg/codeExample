import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';

import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import icoDelete from '../../assets/images/icons/ico-delete.svg';

function RenderFileField({ label, input, disabled, meta: { touched, error } }) {
  const [files, setFiles] = useState([]);

  const handleChange = e => {
    e.preventDefault();
    setFiles([...e.target.files]);
    input.onChange(e.target.files[0]);
  };

  const handleDelete = data => {
    const newFiles = files.filter(item => item !== data);
    setFiles(newFiles);
  };

  return (
    <div className="fileInput">
      <InputLabel>{label}</InputLabel>
      <div className="buttons-wrapper">
        <div className="select-button">Choose File</div>
        <input className="upload" disabled={disabled} type="file" onChange={e => handleChange(e)} />
      </div>
      <div className="file-label">
        {files.length > 0
          ? files.map(item => (
            <Chip
              key={item.name}
              label={item.name}
              onDelete={!disabled ? () => handleDelete(item) : null}
              deleteIcon={<img src={icoDelete} alt="" className="ico-delete" />}
            />
            ))
          : 'No File Choosen'}
      </div>

      {!!touched && !!error ? <FormHelperText>{error}</FormHelperText> : null}
    </div>
  );
}

RenderFileField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.shape({
    onChange: PropTypes.func,
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  disabled: PropTypes.bool,
};

RenderFileField.defaultProps = {
  label: undefined,
  input: undefined,
  meta: undefined,
  disabled: undefined,
};

export default RenderFileField;
