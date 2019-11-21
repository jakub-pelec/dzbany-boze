import React from 'react';
import LoginPage from '../LoginPage/LoginPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import PropTypes from 'prop-types';
import App from '../../App';

const socket = openSocket('https://dzbany-server.herokuapp.com/');

const RouterComponent = ({ isAuthenticated }) => {
    return (
        <Router>
            <Switch>
                {isAuthenticated ?
                    <Route path='*' component={() => <App socket={socket} />} />
                    :
                    <Route path='*' component={LoginPage} />
                }
            </Switch>
        </Router>
    )
};

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
});

RouterComponent.propTypes = {
    isAuthenticated: PropTypes.bool
};

export default connect(
    mapStateToProps,
    null
)(RouterComponent);