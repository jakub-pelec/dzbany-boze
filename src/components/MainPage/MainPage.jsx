import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { TextField, Button } from '@material-ui/core';
import { saveNewMessageToStore, /*saveNewMessageToDatabse*/ } from '../../actions/actions';
import Header from '../textVariant/Header';
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
            <Header id='welcome-text' text={'Have fun!'} />
            <div id="conversation-container">
                <div id='conversation'>
                    <MessagesList messages={messagesFromStore} socket={socket} />
                    <div className='message-container'>
                        <div id='end-of-conversation'></div>
                    </div>
                </div>
                <div className='input-container'>
                        <TextField 
                            style={{
                                width:'100%',
                                overflow: 'hidden',
                                padding:'4px',
                                marginTop:'-12px',
                                backgroundColor:'#252525',
                                // borderLeft:'#f50057 4px solid',
                                // borderRight:'#f50057 4px solid'
                            
                            }}
                            variant='filled'
                            label='Napisz wiadomość'
                            multiline
                            rowsMax='4'
                            color='secondary'
                            name='message'
                            id='message'
                            autoFocus
                            value={message}
                            onChange={(event) => handleChange(event)}
                            placeholder='Bez Wyzywania!'
                            onKeyDown={(event => handleEnter(event))}
                            margin='normal'
                            InputProps = {{
                                style: {
                                    fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif'",
                                    color:'white',
                                },
                            }}
                            InputLabelProps = {{
                                style: {
                                    color:'white',
                                    fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                                },
                            }}
                        />
                </div>
                        {/* <Button
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
                </Button> */}
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