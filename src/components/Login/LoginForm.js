import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '../common/TextField';

const required = value => (value && value !== '' ? undefined : 'Required');

function LoginForm(props) {
  const { handleSubmit, pristine, submitting, loading } = props;

  return (
    <form onSubmit={handleSubmit} className="customForm login-form">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field name="email" component={TextField} label="Email" placeholder="Enter your email" validate={required} />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="password"
            component={TextField}
            label="Password"
            placeholder="Enter your password"
            type="password"
            validate={required}
          />
        </Grid>
      </Grid>
      {loading ? (
        <CircularProgress className="form-spinner" />
      ) : (
        <button type="submit" className="submit-button" disabled={pristine || submitting}>
          Login
        </button>
      )}
    </form>
  );
}

LoginForm.propTypes = {
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
};

LoginForm.defaultProps = {
  loading: undefined,
  handleSubmit: undefined,
  pristine: undefined,
  submitting: undefined,
};

export default reduxForm({
  form: 'LoginForm',
})(LoginForm);
