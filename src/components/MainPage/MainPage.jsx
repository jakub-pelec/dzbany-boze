import React, { useState, useEffect } from 'react';
import Message from '../Message/Message';
import { connect } from 'react-redux';
import './MainPage.css';
import { sendMessage } from '../Socket/Socket';

const MainPage = ({ messagesFromStore }) => {
    const input = document.querySelector('#message');
    const [messages, setMessages] = useState(messagesFromStore);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setMessages(messagesFromStore);
    }, [messagesFromStore])

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
            setMessages([...messages, message]);
            sendMessage(message);
            clearMessage();
        }
    };

    return (
        <>
            <h1>DZBANY BOZE OFFICIAL CHAT</h1>
            <div id='conversation'>
                {  messages.map((message, index) => (
                    <Message body={message} key={index} />
                ))}
            </div>
            <input type='text' name='message' id='message' autoFocus={true} value={message} onChange={(event) => handleChange(event)}/>
            <button name='send' id='send-message' onClick={(event) => handleClick(event)}>Send message</button>
        </>
    );
}

const mapStateToProps = state => ({
    messagesFromStore: state.messageReducer.messages
})

export default connect(
    mapStateToProps,
    null
)(MainPage);