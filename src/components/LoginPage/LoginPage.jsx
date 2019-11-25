import React, { useState } from 'react';
import Header from '../Header/Header';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { authenticateUser, showInformationAboutRegister, createDocumentInDb } from '../../actions/actions';
import firebaseAuth from '../../firebase/firebaseAuth';
import './LoginPage.css';

const LoginPage = ({
    authenticateUser: authenticateUserProps,
    errorMessage, showInformationAboutRegister: showInformationAboutRegisterProps,
    registerMessage,
    history
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emptyFields, setEmptyFields] = useState(false);

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
                authenticateUserProps(email, password);
                history.push('/nickname');
            }
        } else {
            setEmptyFields(true);
        }
    };
    return (
        <div className='login-page'>
            <div className='header-container'>
                <Header text={'Login Page'} />
            </div>
            <div className='input-container'>
                <span className='email-container'>
                    <TextField
                        style={{
                            width: '30%'
                        }}
                        variant='outlined'
                        color='primary'
                        placeholder='email'
                        name='email'
                        type='email'
                        onChange={(event) => handleChange(event)}
                    />
                </span>
                <span className='password-container'>
                    <TextField
                        style={{
                            width: '30%'
                        }}
                        variant='outlined'
                        color='primary'
                        placeholder='password'
                        name='password'
                        type='password'
                        onChange={(event) => handleChange(event)}
                    />
                </span>
            </div>
            <div className='button-container'>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => handleClick('login')}
                >
                    Login
                </Button>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => handleClick('register')}
                >
                    Register
                </Button>
            </div>
            {errorMessage && <div className='error-message'>{errorMessage}</div>}
            {registerMessage && <div className='error-message'>Registered succesfully</div>}
            {emptyFields && <div className='error-message'>Register first!</div>}
        </div>
    )
};

const mapStateToProps = state => ({
    errorMessage: state.authReducer.errorMessage,
    registerMessage: state.authReducer.userRegisteredMessage
});

export default withRouter(connect(
    mapStateToProps,
    { authenticateUser, showInformationAboutRegister }
)(LoginPage));