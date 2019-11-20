import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Message from '../Message/Message';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { saveNewMessage } from '../../actions/actions';
import './MainPage.css';

const MainPage = ({ messagesFromStore, socket, saveNewMessage: saveNewMessageProps }) => {
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
            saveNewMessageProps({ message, id });
            socket.emit('new-message-from-client', { message, id })
            clearMessage();
        }
    };

    return (
        <div className='main-page'>
            <h1>Chat</h1>
            <div id='conversation'>
                {messagesFromStore.map((messageFromHook, index) => (
                    <Message body={messageFromHook} key={index} />
                ))}
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
    messagesFromStore: state.messageReducer.messages
})

MainPage.propTypes = {
    messagesFromStore: PropTypes.array,
    socket: PropTypes.object,
    saveNewMessage: PropTypes.func
}

export default connect(
    mapStateToProps,
    { saveNewMessage }
)(MainPage);