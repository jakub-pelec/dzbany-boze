import React from 'react';
import './Message.css';

const Message = ({ body }) => {
    return (
        <div className='message'>{`${body.id}: ${body.message}`}</div>
    )
};

export default Message;