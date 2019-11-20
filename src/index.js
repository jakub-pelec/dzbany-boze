import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './App';
import rootReducer from './reducers/rootReducer';
import * as serviceWorker from './serviceWorker';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import openSocket from 'socket.io-client';
import Socket from './components/Socket/Socket';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
const socket = openSocket('localhost:5000');

ReactDOM.render(
    <Provider store={store} >
        <Socket socket={socket}>
            <App socket={socket} />
        </Socket>
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
