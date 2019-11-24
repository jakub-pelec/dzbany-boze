import React from 'react';
import './Message.css';

const Message = ({ body, socket }) => {
    const styleX = body.id === socket.id ? 'own' : '';
    return (
        <div className='content-wrapper'>  
            <div className={`justify-content-wrapper ${styleX}`}>    
                <div className={`message-wrapper ${styleX}`}>
                    <div className={`message-id ${styleX}`}>{body.id}</div>
                    <div className={`message ${styleX}`}>{body.message}</div>
                </div>
            </div>  
        </div>
    )
};

export default Message;