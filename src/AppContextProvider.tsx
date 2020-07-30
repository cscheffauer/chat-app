import React from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

type AppContextInterface = {
	client: W3CWebSocket | null;
	send: (json: Object) => void;
	userid: string;
	setUserid: (arg0: string) => void;
	username: string;
	setUsername: (arg0: string) => void;
};

const initialAppState = {
	client: null,
	send: () => {},
	userid: '',
	setUserid: () => {},
	username: '',
	setUsername: () => {},
};

export const AppContext = React.createContext<AppContextInterface>(initialAppState);

const AppContextProvider = ({ children }: any) => {
	const state = {
		client: new W3CWebSocket('ws://localhost:8001'),
		send: (json: Object) => {
			if (state.client !== null) {
				state.client.send(JSON.stringify(json));
			}
		},
		userid: '',
		setUserid: (newuserid: string) => {
			state.userid = newuserid;
		},
		username: '',
		setUsername: (newusername: string) => {
			state.username = newusername;
		},
	};

	return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
