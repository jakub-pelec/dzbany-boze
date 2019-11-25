import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { TextField, Button } from '@material-ui/core';
import { saveNewMessageToStore, /*saveNewMessageToDatabse*/ } from '../../actions/actions';
import Header from '../Header/Header';
import MessagesList from '../MessagesList/MessagesList';
import './MainPage.css';

const MainPage = ({ messagesFromStore, socket, saveNewMessageToStore: saveNewMessageProps, nickname }) => {
    const input = document.querySelector('#message');
    const [message, setMessage] = useState('');
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
    const isMessageNotEmpty = () => {
        return !!message;
    }
    /**
     * Setting focus on input after each render.
     */
    input && input.focus();

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
            //saveNewMessageToDatabse(data);
            saveNewMessageProps(data);
            socket.emit('new-message-from-client', data)
            clearMessage();
        }
    };

    const handleEnter = (event) => {
        if (event.keyCode === 13) {
            handleClick(event);
        }
    }

    return (
        <div className='main-page'>
            <Header text={'Chat'} />
            <div id='conversation'>
                <MessagesList messages={messagesFromStore} socket={socket} />
                <div className='message-container'>
                    <div id='end-of-conversation'></div>
                </div>
            </div>
            <div className='input-container'>
                <TextField
                    style={{
                        width: '55%',
                        backgroundColor: 'white',
                        borderRadius: 'none',
                        overflow: 'hidden',
                        marginTop: '-2px',
                    }}
                    variant='outlined'
                    color='primary'
                    name='message'
                    id='message'
                    autoFocus
                    value={message}
                    onChange={(event) => handleChange(event)}
                    placeholder='Start typing...'
                    onKeyDown={(event => handleEnter(event))}
                />
                <Button
                    style={{
                        height: '57px',
                        marginTop: '-2px',
                        backgroundColor: 'white',
                        borderRadius: 'none'
                    }}
                    variant='outlined'
                    color='primary'
                    name='send'
                    id='send-message'
                    onClick={(event) => handleClick(event)}
                >
                    Send message
                </Button>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    messagesFromStore: state.messageReducer.messages,
    nickname: state.userReducer.nickname
})

MainPage.propTypes = {
    messagesFromStore: PropTypes.array,
    socket: PropTypes.object,
    saveNewMessage: PropTypes.func
}

export default connect(
    mapStateToProps,
    { saveNewMessageToStore }
)(MainPage);