import React from 'react';
import LoginPage from '../LoginPage/LoginPage';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import App from '../../App';
import NicknamePrompt from '../NicknamePrompt/NicknamePrompt';

const history = createBrowserHistory();

const RouterComponent = ({ isAuthenticated }) => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path='/' component={LoginPage} />
                <Route path='/nickname' component={NicknamePrompt} />
                <Route path='/chat' component={App} />
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