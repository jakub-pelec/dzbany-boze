import React, { useEffect } from 'react';
import openSocket from 'socket.io-client';
import MainPage from './components/MainPage/MainPage';

function App() {
  const socket = openSocket('https://dzbany-server.herokuapp.com/');
  useEffect(() => {
    socket.on('connect', () => {
      // eslint-disable-next-line no-console
      console.log('User connected');
    });
  }, [socket]);
  return (
    <MainPage socket={socket} />
  );
}

export default App;
