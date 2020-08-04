import React from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

type AppContextInterface = {
	client: W3CWebSocket | null;
	sendNewMessage: (json: Object) => void;
	editMessage: (json: Object) => void;
	deleteMessage: (json: Object) => void;
	send: (json: Object) => void;
	userid: string;
	setUserid: (arg0: string) => void;
	username: string;
	setUsername: (arg0: string) => void;
};

const initialAppState = {
	client: null,
	sendNewMessage: () => {},
	editMessage: () => {},
	deleteMessage: () => {},
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
		sendNewMessage: (jsonToAdd: Object) => {
			const sent = new Date();
			const json = { message: { username: state.username, userid: state.userid, sent, ...jsonToAdd }, type: 'newmessageevent' };
			state.send(json);
		},
		editMessage: (jsonToAdd: Object) => {
			state.send({ ...jsonToAdd, type: 'editmessageevent' });
		},
		deleteMessage: (jsonToAdd: Object) => {
			state.send({ ...jsonToAdd, type: 'deletemessageevent' });
		},
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
