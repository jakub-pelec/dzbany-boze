import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { saveNicknameToStore, changeNicknameInDb } from '../../actions/actions';

import Header from '../textVariant/Header';

const NicknamePrompt = ({ history, saveNicknameToStore: saveNicknameToStoreProps }) => {
    const minNicknameLength = 6;
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState(false);
    const handleChange = (event) => {
        const { value } = event.target;
        setNickname(value);
    };
    const handleClick = () => {
      if (nickname.length >= minNicknameLength) {
        const { email } = firebase.auth().currentUser;
        changeNicknameInDb(email, nickname);
        saveNicknameToStoreProps(nickname);
        history.push('/chat');
      } else {
        setError(true);
      }
    };
    const handleKeyUp = () => {
      if (error) {
        setError(false);
      }
    };

return (
  <div>
    <Header text="Nickname:" />
    <TextField
      variant="outlined"
      color="primary"
      type="text"
      placeholder="Type your nickname"
      autoFocus
      onChange={(event) => handleChange(event)}
      onKeyUp={handleKeyUp}
    />
    <Button
      variant="outlined"
      color="primary"
      onClick={handleClick}
    >
                Save nickname
    </Button>
    { error && <div>Nickname must be atleast 6 characters long!</div>}
  </div>
    );
};

NicknamePrompt.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  saveNicknameToStore: PropTypes.func
};

export default connect(
    null,
    { saveNicknameToStore }
)(NicknamePrompt);
