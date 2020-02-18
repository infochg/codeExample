import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

import PropTypes from 'prop-types';
import sortIco from '../../assets/images/icons/ico-sort.svg';

function RenderReverseField({ label, placeholder, input, reverse, ...custom }) {
  const handleReverse = bool => {
    reverse(bool);
    input.onChange(bool);
  };

  return (
    <div>
      <Checkbox
        icon={<img src={sortIco} className="sorting-ico sort-btn" alt="" />}
        checkedIcon={<img src={sortIco} className="sorting-ico sort-btn reversed" alt="" />}
        checked={!!input.value}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...input}
        onChange={e => handleReverse(e.target.checked)}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...custom}
      />
    </div>
  );
}

RenderReverseField.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  reverse: PropTypes.func,
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func,
  }),
};

RenderReverseField.defaultProps = {
  placeholder: undefined,
  label: undefined,
  reverse: undefined,
  input: undefined,
};

export default RenderReverseField;
