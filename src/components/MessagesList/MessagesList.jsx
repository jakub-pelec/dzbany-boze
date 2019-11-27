import React from 'react';
import PropTypes from 'prop-types';
import Message from '../Message/Message';

// eslint-disable-next-line max-len
const MessagesList = ({ messages, socket }) => messages.map((message, index) => <Message body={message} key={index} socket={socket} />);

MessagesList.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        message: PropTypes.string
    })),
    socket: PropTypes.object
};

export default MessagesList;
