import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import Paragraph from '../textVariant/Paragraph';
import Header from '../textVariant/Header';
import { authenticateUser, showInformationAboutRegister, createDocumentInDb, saveEmailToStore } from '../../actions/actions';
import firebaseAuth from '../../firebase/firebaseAuth';
import './LoginPage.css';

// eslint-disable-next-line max-lines-per-function
const LoginPage = ({
    authenticateUser: authenticateUserProps,
    errorMessage, showInformationAboutRegister: showInformationAboutRegisterProps,
    registerMessage,
    history,
    saveEmailToStore: saveEmailToStoreProps
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emptyFields, setEmptyFields] = useState(false);
    useEffect(() => {
        if (localStorage.email) {
            saveEmailToStoreProps(localStorage.email);
            history.push('/nickname');
        }
    }, [history, saveEmailToStoreProps]);

    /**
     * Handle user input.
     * @param {event} event - html5 event
     */
    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'email':
                setEmail(value);
                if (emptyFields) {
                    setEmptyFields(false);
                }
                break;
            case 'password':
                setPassword(value);
                if (emptyFields) {
                    setEmptyFields(false);
                }
                break;
            default:
                break;
        }
    };

    /**
     * Handles login and registration.
     * @param {string} type - determines if user wants to register or login.
     */
    const handleClick = (type) => {
        if (password && email) {
            if (type === 'register') {
                firebaseAuth(email, password);
                createDocumentInDb(email);
                showInformationAboutRegisterProps(true);
            } else {
                authenticateUserProps(email, password, history);
            }
        } else {
            setEmptyFields(true);
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-page">
                <div className="header-container">
                    <Header text="Welcome" />
                </div>
                <div className="paragraph-container">
                    <Paragraph text="please log in" />
                </div>
                <div className="input-container-login-page">
                    <div className="email-container">
                        <TextField
                            style={{
                                width: '100%'
                            }}
                            variant="outlined"
                            color="secondary"
                            placeholder="email"
                            name="email"
                            type="email"
                            onChange={(event) => handleChange(event)}
                            InputProps={{
                                style: {
                                    color: 'white',
                                }
                            }}
                        />
                    </div>
                    <div className="password-container">
                        <TextField
                            style={{
                                width: '100%'
                            }}
                            variant="outlined"
                            color="secondary"
                            placeholder="password"
                            name="password"
                            type="password"
                            onChange={(event) => handleChange(event)}
                            InputProps={{
                                style: {
                                    color: 'white',
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="button-container">
                    <div className="justify-button-container">
                        <span className="button-sign-in">
                            <Button
                                id="button"
                                variant="contained"
                                color="secondary"
                                onClick={() => handleClick('login')}
                            >
                                ZALOGUJ
                </Button>
                        </span>
                        <span className="button-register">
                            <Button
                                id="button"
                                variant="contained"
                                color="secondary"
                                onClick={() => handleClick('register')}
                            >
                                ZAREJESTRUJ
                </Button>
                        </span>
                    </div>
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {registerMessage && <div className="error-message">Registered succesfully</div>}
                {emptyFields && <div className="error-message">Register first!</div>}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    errorMessage: state.authReducer.errorMessage,
    registerMessage: state.authReducer.userRegisteredMessage
});

LoginPage.propTypes = {
    authenticateUser: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    showInformationAboutRegister: PropTypes.func,
    registerMessage: PropTypes.func,
    history: PropTypes.shape({
        push: PropTypes.func
    })
};

export default withRouter(connect(
    mapStateToProps,
    {
        authenticateUser,
        showInformationAboutRegister,
        saveEmailToStore
    }
)(LoginPage));
