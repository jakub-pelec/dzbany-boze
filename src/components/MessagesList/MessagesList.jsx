import React from 'react';
import Message from '../Message/Message';
import PropTypes from 'prop-types';

const MessagesList = ({ messages, socket }) => {
    return (
        messages.map((message, index) => (
            <Message body={message} id={index} socket={socket} />
        ))
    )
}

MessagesList.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        message: PropTypes.string
    })),
    socket: PropTypes.object
}

export default MessagesList;