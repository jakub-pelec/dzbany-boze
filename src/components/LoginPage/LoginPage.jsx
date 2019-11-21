import React, { useState } from 'react';
import Header from '../Header/Header';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { authenticateUser } from '../../actions/actions';
import firebaseAuth from '../../firebase/firebaseAuth';
import './LoginPage.css';

const LoginPage = ({ authenticateUser: authenticateUserProps, errorMessage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };
    const handleClick = (type) => {
        if (password && email) {
            if (type === 'register') {
                firebaseAuth(email, password);
            } else {
                authenticateUserProps(email, password);
            }
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
        </div>
    )
};

const mapStateToProps = state => ({
    errorMessage: state.authReducer.errorMessage
});

export default connect(
    mapStateToProps,
    { authenticateUser }
)(LoginPage);