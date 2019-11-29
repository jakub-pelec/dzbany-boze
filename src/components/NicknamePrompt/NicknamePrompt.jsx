import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { saveNicknameToStore, changeNicknameInDb, checkIfUserHasNickname } from '../../actions/actions';
import './NicknamePrompt.css';

const NicknamePrompt = ({ history, saveNicknameToStore: saveNicknameToStoreProps, email }) => {
    if (checkIfUserHasNickname(email)) {
        console.log('invoked');
        history.push('/chat');
    }
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
        <div className='nicknameprompt-container'>
            <div className='container'>
                <div className='nicknameprompt-input'>
                    <TextField
                        variant="outlined"
                        color="secondary"
                        fullWidth={true}
                        type="text"
                        placeholder="Set your nickname"
                        autoFocus
                        onChange={(event) => handleChange(event)}
                        onKeyUp={handleKeyUp}
                        InputProps={{
                            style: {
                                color: 'white'
                            }
                        }}
                    />
                </div>
                <div className='nicknameprompt-button'>
                    <Button
                        style={{ width: '100%' }}
                        variant="contained"
                        color="secondary"
                        onClick={handleClick}
                    >Save nickname
                    </Button>
                </div>
                {error && <div className='nicknameprompt-error'>Nickname must be between 6 and 15 characters long!</div>}
            </div>
        </div>

    );
};

NicknamePrompt.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func
    }),
    saveNicknameToStore: PropTypes.func
};

const mapStateToProps = (state) => ({
    email: state.userReducer.email
});

export default connect(
    mapStateToProps,
    { saveNicknameToStore }
)(NicknamePrompt);
