import React, { useEffect } from 'react';
import MainPage from './components/MainPage/MainPage';

function App({ socket }) {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('User Connected');
    });
  }, [socket]);
  return (
    <MainPage socket={socket} />
  );
}

export default App;
