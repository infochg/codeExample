import React from 'react';
import { Route, Switch } from 'react-router-dom';
import cookie from 'react-cookies';
import { NotificationContainer } from 'react-notifications';
import history from '../history';

/* eslint-disable */
import Layout from './Layout';
import Login from '../components/Login/';
import Memberships from '../components/Memberships/';
import ErrorPage from '../components/ErrorPage';
/* eslint-enable */

import 'react-notifications/lib/notifications.css';

function App() {
  if (!cookie.load('token')) {
    if (history.location.pathname !== '/registration' && history.location.pathname !== '/remind-password') {
      history.push('/login');
    }
  }

  return (
    <>
      <Switch>
        <Route path="/login" render={() => <Login />} />
        <Route path="/memberships/" render={() => <Layout component={<Memberships />} />} />
        <Route exact path="/" render={() => <Layout component={<Memberships />} />} />
        <Route component={ErrorPage} />
      </Switch>
      <NotificationContainer />
    </>
  );
}

export default App;
