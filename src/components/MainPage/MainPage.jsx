import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { saveNewMessageToStore, getNicknameOfUserFromDB } from '../../actions/actions';
import MessagesList from '../MessagesList/MessagesList';
import './MainPage.css';

const MainPage = ({
    messagesFromStore, socket, saveNewMessageToStore: saveNewMessageProps, nickname, getNicknameOfUserFromDB: getNicknameOfUserFromDBProps, email
}) => {
    const input = document.querySelector('#message');
    const [message, setMessage] = useState('');

    useEffect(() => {
        getNicknameOfUserFromDBProps(email);
    }, [getNicknameOfUserFromDBProps, email]);

    /**
     * Listens to event from server and saves received message to store.
     */
    useEffect(() => {
        socket.on('new-message-from-server', (data) => {
            saveNewMessageProps(data);
        });
    }, [socket, saveNewMessageProps]);

    /**
     * Handles scrolling to bottom when messages extend outside div.
     */
    useEffect(() => {
        const conversationEnd = document.querySelector('#end-of-conversation');
        conversationEnd.scrollIntoView({ behavior: 'smooth' });
    }, [messagesFromStore]);

    /**
     * Checks if the message is empty.
     */
    const isMessageNotEmpty = () => Boolean(message);

    /**
     * Setting focus on input after each render.
     */
    if (input) {
        input.focus();
    }

    /**
     * Clearing state.message after submitting.
     */
    const clearMessage = () => {
        setMessage('');
    };

    /**
     * Handles onChange events.
     * @param {Object} event HTML event object.
     */
    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    /**
     * Handles onClick events.
     * @param {Object} event HTML event object.
     */
    const handleClick = (event) => {
        event.preventDefault();
        if (isMessageNotEmpty()) {
            const { id } = socket;
            const data = { message, id, nickname };
            // SaveNewMessageToDatabse(data);
            saveNewMessageProps(data);
            socket.emit('new-message-from-client', data);
            clearMessage();
        }
    };

    const handleEnter = (event) => {
        // eslint-disable-next-line no-magic-numbers
        if (event.keyCode === 13) {
            handleClick(event);
        }
    };

    return (
        <>
            <Button
                variant='contained'
                color='secondary'
            >
                Change Nickname
                </Button>
            <div className="main-page">
                <div id="conversation-container">
                    <div id="conversation">
                        <MessagesList messages={messagesFromStore} socket={socket} />
                        <div className="message-container">
                            <div id="end-of-conversation" />
                        </div>
                    </div>
                    <div className="input-container">
                        <TextField
                            style={{
                                width: '100%',
                                overflow: 'hidden',
                                backgroundColor: '#252525'
                            }}
                            variant="filled"
                            label="Napisz wiadomość"
                            multiline
                            rowsMax="4"
                            color="secondary"
                            name="message"
                            id="message"
                            autoFocus
                            value={message}
                            onChange={(event) => handleChange(event)}
                            placeholder="Bez Wyzywania!"
                            onKeyDown={((event) => handleEnter(event))}
                            margin="normal"
                            InputProps={{
                                style: {
                                    fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, Ubuntu, Cantarell, \'Open Sans\', \'Helvetica Neue\', sans-serif\'',
                                    color: 'white'
                                }
                            }}
                            InputLabelProps={{
                                style: {
                                    color: 'white',
                                    fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, Ubuntu, Cantarell, \'Open Sans\', \'Helvetica Neue\', sans-serif'
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    messagesFromStore: state.messageReducer.messages,
    nickname: state.userReducer.nickname,
    email: state.userReducer.email
});

MainPage.propTypes = {
    messagesFromStore: PropTypes.array,
    socket: PropTypes.object,
    saveNewMessageToStore: PropTypes.func,
    nickname: PropTypes.string
};

export default connect(
    mapStateToProps,
    {
        saveNewMessageToStore,
        getNicknameOfUserFromDB
    }
)(MainPage);
