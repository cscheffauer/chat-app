import React from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

type AppContextInterface = {
	client: W3CWebSocket | null;
	userid: string;
	setUserid: (arg0: string) => void;
};

const initialAppState = {
	client: null,
	userid: '',
	setUserid: () => {},
};

export const AppContext = React.createContext<AppContextInterface>(initialAppState);

const AppContextProvider = ({ children }: any) => {
	const state = {
		client: new W3CWebSocket('ws://localhost:8001'),
		userid: '',
		setUserid: (newuserid: string) => {
			state.userid = newuserid;
		},
	};

	return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
