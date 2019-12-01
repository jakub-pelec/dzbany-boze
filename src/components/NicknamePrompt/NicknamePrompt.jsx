import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { saveNicknameToStore, changeNicknameInDb } from '../../actions/actions';
import './nickname-page-style.css'
import nicknamePageWave from '../../assets/nickname-page-wave.svg'

const NicknamePrompt = ({ history, saveNicknameToStore: saveNicknameToStoreProps }) => {
  const minNicknameLength = 6;
  const maxNicknameLength = 15;
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState(false);
  const handleChange = (event) => {
    const { value } = event.target;
    setNickname(value.trim());
  };
  const handleClick = () => {
    if (nickname.length >= minNicknameLength && nickname.length <= maxNicknameLength) {
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
    <div className='container'>
      <p className="nickp">set your nickname</p>
      <div className='input-container'>
        <ul>
          <TextField
            style={{
              width: '80%',
            }}
            variant="outlined"
            color="secondary"
            type="text"
            placeholder="Set your nickname"
            autoFocus
            onChange={(event) => handleChange(event)}
            onKeyUp={handleKeyUp}
            InputProps={{
              style: {
                color: 'white',
              }
            }}
          />
          <button onClick={(handleClick)}>GO CHAT</button>
          {error && <div className='nicknameprompt-error'>Nickname must be between 6 and 15 characters long!</div>}
        </ul>
      </div>
      <img src={nicknamePageWave} alt="nickname-page-wave" className='nickname-page-wave'></img>
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
