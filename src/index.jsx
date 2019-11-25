import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import * as serviceWorker from './serviceWorker';
import RouterComponent from './components/RouterComponent/RouterComponent';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <RouterComponent />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
