import React, { useState } from 'react';
import Header from '../Header/Header';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { authenticateUser } from '../../actions/actions';
import './LoginPage.css';

const LoginPage = ({ authenticateUser: authenticateUserProps }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };
    const handleClick = () => {
        authenticateUserProps({ username, password });
    };
    return (
        <div className='login-page'>
            <div className='header-container'>
                <Header text={'Login Page'} />
            </div>
            <div className='input-container'>
                <div className='username-container'>
                    <TextField
                        variant='outlined'
                        color='primary'
                        placeholder='username'
                        name='username'
                        onChange={(event) => handleChange(event)}
                    />
                </div>
                <div className='password-container'>
                    <TextField
                        variant='outlined'
                        color='primary'
                        placeholder='password'
                        name='password'
                        onChange={(event) => handleChange(event)}
                    />
                </div>
            </div>
            <div className='button-container'>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={handleClick}
                >
                    Login
                </Button>
            </div>
        </div>
    )
};

export default connect(
    null,
    { authenticateUser }
)(LoginPage);