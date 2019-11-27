import { combineReducers } from 'redux';
import messageReducer from './messageReducer';
import userReducer from './userReducer';
import authReducer from './authReducer';

export default combineReducers({
    messageReducer,
    userReducer,
    authReducer
});
