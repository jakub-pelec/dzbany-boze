import React from 'react';
import PropTypes from 'prop-types';
import './Message.css';

const Message = ({ body, socket }) => {
    const styleX = body.id === socket.id ? 'own' : '';

return (
  <div className="content-wrapper">
    <div className={`justify-content-wrapper ${styleX}`}>
      <div className={`message-wrapper ${styleX}`}>
        <div className={`message-id ${styleX}`}>{body.nickname}</div>
        <div className={`message ${styleX}`}>{body.message}</div>
      </div>
    </div>
  </div>
    );
};

Message.propTypes = {
  body: PropTypes.shape({
    id: PropTypes.number,
    nickname: PropTypes.string,
    message: PropTypes.string
  }),
  socket: PropTypes.object
};

export default Message;
