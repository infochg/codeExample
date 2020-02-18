import React from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm, Form } from 'redux-form';
import TextField from '../common/TextField';
import SelectField from '../common/SelectField';

const required = value => (value && value !== '' ? undefined : 'Required');

function MembershipForm(props) {
  const { handleSubmit, pristine, submitting, closeDialog, initialValues } = props;

  return (
    <Form onSubmit={handleSubmit} className="customForm addMembership">
      <div>
        <Field name="name" component={TextField} label="Name" placeholder="Enter Membership name" validate={required} />
      </div>
      <div>
        <Field
          name="amount"
          component={TextField}
          label="Amount"
          placeholder="Enter amount"
          type="number"
          validate={required}
        />
      </div>
      <div>
        <Field name="type" component={SelectField} label="Type" placeholder="Select Type" validate={required}>
          <option value="fixed">Fixed</option>
          <option value="recurring">Recurring</option>
        </Field>
      </div>

      <div className="text-right">
        <button type="button" onClick={closeDialog} className="submit-button cancel-button">
          Cancel
        </button>
        <button type="submit" className="submit-button" disabled={pristine || submitting}>
          {initialValues ? 'Update' : 'Add'}
        </button>
      </div>
    </Form>
  );
}

MembershipForm.propTypes = {
  initialValues: PropTypes.shape({}),
  closeDialog: PropTypes.func,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
};

MembershipForm.defaultProps = {
  initialValues: undefined,
  closeDialog: undefined,
  handleSubmit: undefined,
  pristine: undefined,
  submitting: undefined,
};

export default reduxForm({
  form: 'addMembership',
})(MembershipForm);
