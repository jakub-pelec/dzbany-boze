import React from 'react';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginPage from '../LoginPage/LoginPage';
import App from '../../App';
import NicknamePrompt from '../NicknamePrompt/NicknamePrompt';

const history = createBrowserHistory();

const RouterComponent = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route path="/nickname" component={NicknamePrompt} />
      <Route path="/chat" component={App} />
    </Switch>
  </Router>
);
const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(
    mapStateToProps,
    null
)(RouterComponent);
