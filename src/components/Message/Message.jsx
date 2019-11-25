import React from 'react';
import './Message.css';

const Message = ({ body, socket }) => {
    const styleX = body.id === socket.id ? 'own' : '';
    return (
        <div className='message-wrapper'>
            <div className={`message ${styleX}`}>{`${body.nickname}: ${body.message}`}</div>
        </div>
    )
};

export default Message;