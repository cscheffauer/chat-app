import React, { useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

import './index.scss';
import Homepage from './containers/Homepage/Homepage.component';
import Header from './components/Header/Header.component';


export const client = new W3CWebSocket('ws://localhost:8001');


const App = () => {
  const [connection, setconnection] = useState('loading');

  client.onopen = () => {
    setconnection('established');
    console.log('WebSocket Client Connected');
  };

  client.onerror = () => {
    setconnection('error');
    console.log("Can't connect to Websocket Server.")
  }

  const renderConnectionSwitch = () => {
    switch (connection) {
      case 'loading':
        return <p>Loading...</p>
      case 'established':
        return <Homepage client={client} />
      case 'error':
        return <div className="errorboundary">< h3 >Chat is currently unavailable!</h3 > <p>Pls contact support.</p></div >
      default:
        return <div />
    }
  }

  return (
    <>
      <Header />
      {
        renderConnectionSwitch()
      }
    </>
  );

}

export default App;