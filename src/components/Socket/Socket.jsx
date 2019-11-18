import openSocket from 'socket.io-client';
import { saveNewMessage } from '../../actions/actions';
import { connect } from 'react-redux';

const socket = openSocket('localhost:5000');

const Socket = ({ children, saveNewMessage: saveNewMessageProps }) => {
    socket.on('new-message', message => {
        const { id } = socket;
        saveNewMessageProps(message, id);
    });
    return [children];
};

const mapDispatchToProps = dispatch => ({
    saveNewMessage: (message, id) => dispatch(saveNewMessage(message, id))
});

export default connect(
    null,
    mapDispatchToProps
)(Socket);
export const sendMessage = (message) => {
    socket.emit('send-message', message);
}    



