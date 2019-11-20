import PropTypes from 'prop-types';

const Socket = ({ children, socket }) => {
    socket.on('connect', () => {
        console.log('Socket connected');
    });
    return [children];
};

Socket.propTypes = {
    children: PropTypes.object,
    socket: PropTypes.object
}

export default Socket;

