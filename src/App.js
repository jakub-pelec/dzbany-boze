import React, { useEffect } from 'react';
import MainPage from './components/MainPage/MainPage';
import openSocket from 'socket.io-client';

function App() {
  const socket = openSocket('https://dzbany-server.herokuapp.com/');
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
