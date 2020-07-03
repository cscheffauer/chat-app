import React, { useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

import './App.css';
import Homepage from './containers/Homepage.component';


const client = new W3CWebSocket('ws://127.0.0.1:8001');


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
        return <div className="errorboundary">< h3 >The Pexip Chat is currently unavailable!</h3 > <p>Pls contact support.</p></div >
      default:
        return <div />
    }
  }

  return (
    <div>
      {
        renderConnectionSwitch()
      }
    </div >
  );


}

export default App;