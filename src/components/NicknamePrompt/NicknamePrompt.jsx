import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { saveNicknameToStore } from '../../actions/actions';
import { changeNicknameInDb } from '../../actions/actions';
import Header from '../textVariant/Header';

const NicknamePrompt = ({ history, saveNicknameToStore: saveNicknameToStoreProps }) => {
    const [nickname, setNickname] = useState('');
    const handleChange = (event) => {
        const { value } = event.target;
        setNickname(value);
    };
    const handleClick = () => {
        const email = firebase.auth().currentUser.email;
        changeNicknameInDb(email, nickname);
        saveNicknameToStoreProps(nickname);
        history.push('/chat');
    }
    return(
        <div>
            <Header text='Nickname:' />
            <TextField
                variant='outlined'
                color='primary'
                type='text'
                placeholder='Type your nickname'
                autoFocus
                onChange={(event) => handleChange(event)}
            />
            <Button
                variant='outlined'
                color='primary'
                onClick={handleClick}
            >
                Save nickname
            </Button>
        </div>
    )
};

export default connect(
    null,
    { saveNicknameToStore }
)(NicknamePrompt);