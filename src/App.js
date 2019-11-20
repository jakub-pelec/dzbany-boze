import React from 'react';
import MainPage from './components/MainPage/MainPage';

function App({ socket }) {
  return (
    <MainPage socket={socket} />
  );
}

export default App;
