import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import PropTypes from 'prop-types';

import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import LoginForm from './LoginForm';
import history from '../../history';

import logo from '../../assets/images/logo.png';

import { LOGIN_REQUEST } from '../../redux/actions/actionTypes';

function Login(props) {
  const { loading } = props;

  useEffect(() => {
    if (cookie.load('token')) {
      history.push('/');
    }
  });

  const submit = values => {
    const { fetchLogin } = props;
    fetchLogin(values);
  };

  return (
    <div className="login-page">
      <div>
        <img src={logo} alt="" className="login-logo" />

        <Paper className="paper">
          <LoginForm onSubmit={submit} loading={loading} />
          <Grid item xs={12} className="remind-text" style={{ display: 'none' }}>
            <Link to="/remind-password">Forgot password</Link> or you need to <Link to="/registration">register</Link>?
          </Grid>
        </Paper>
      </div>
    </div>
  );
}

Login.defaultProps = {
  loading: undefined,
  fetchLogin: undefined,
};

Login.propTypes = {
  loading: PropTypes.bool,
  fetchLogin: PropTypes.func,
};

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  loading: state.loading,
});

const actionsStateToProps = {
  fetchLogin: data => ({ type: LOGIN_REQUEST, data }),
};

export default connect(mapStateToProps, actionsStateToProps)(Login);
