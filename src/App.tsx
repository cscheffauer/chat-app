import React, { useState } from 'react';
import { AppContext } from './AppContextProvider';

import './index.scss';
import Homepage from './containers/Homepage/Homepage.component';
import Header from './components/Header/Header.component';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.component';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner.component';

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
				return <LoadingSpinner />;
			case 'established':
				return <Homepage />;
			case 'error':
				return <ErrorBoundary errormessage={'Chat is currently unavailable!'} errorsubline={'Pls contact support!'} />;
			default:
				return <div />;
		}
	};

	return (
		<>
			<Header title={'Status Meeting Standup'} />
			{renderConnectionSwitch()}
		</>
	);
};

export default App;
