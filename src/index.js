import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { store } from './redux/store/configureStore';
import history from './history';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'),
);

serviceWorker.unregister();
