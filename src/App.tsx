import React, { useState } from 'react';
import { AppContext } from './AppContextProvider';

import './index.scss';
import Homepage from './containers/Homepage/Homepage.component';
import Header from './components/Header/Header.component';

type connectionType = 'loading' | 'error' | 'established';

const App = () => {
	const { client } = React.useContext(AppContext);
	const [connection, setconnection] = useState<connectionType>('loading');

	if (client !== null) {
		client.onopen = () => {
			setconnection('established');
			console.log('WebSocket Client Connected');
		};

		client.onerror = () => {
			setconnection('error');
			console.log("Can't connect to Websocket Server.");
		};
	}

	const renderConnectionSwitch = () => {
		switch (connection) {
			case 'loading':
				return <p>Loading...</p>;
			case 'established':
				return <Homepage />;
			case 'error':
				return (
					<div className='errorboundary'>
						<h3>Chat is currently unavailable!</h3> <p>Pls contact support.</p>
					</div>
				);
			default:
				return <div />;
		}
	};

	return (
		<>
			<Header />
			{renderConnectionSwitch()}
		</>
	);
};

export default App;
