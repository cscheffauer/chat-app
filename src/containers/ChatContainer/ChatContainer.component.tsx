import React, { useState, Suspense, lazy } from 'react';
import { AppContext } from '../../AppContextProvider';
import { MessageType } from '../../models/chat.model';

const AsyncChat = lazy(() => import('../../components/Chat/Chat.component'));
const AsyncUserList = lazy(() => import('../../components/UserList/UserList.component'));
const AsyncTabs = lazy(() => import('../../components/Tabs/Tabs.component'));

const ChatContainer = () => {
	const { client, setUserid } = React.useContext(AppContext);
	const [userList, setuserList] = useState({});
	const [messages, setmessages] = useState([] as Array<MessageType>);
	const [selected, setselected] = useState('Chat'); //set initial tab to be shown to Chat tab (=2)

	if (client !== null) {
		client.onmessage = (incomingMessage: any) => {
			const newData = JSON.parse(incomingMessage.data);
			console.log(newData);
			switch (newData.type) {
				case 'useridevent':
					setUserid(newData.data.userid); //reacting on incoming user id events and save just the userid
					break;
				case 'userevent':
					setuserList(newData.data.users);
					setmessages(newData.data.messages); //reacting on incoming user events and save the user & messages data
					break;
				default:
					setmessages(newData.data.messages); //reacting on all incoming message events and save the messages data
					break;
			}
		};
	}

	return (
		<Suspense fallback={<div style={{ textAlign: 'center' }}> Loading...</div>}>
			<AsyncTabs setselected={setselected} selected={selected} participantNumber={Object.keys(userList).length} />
			{selected === 'Userlist' ? <AsyncUserList userList={userList} /> : <AsyncChat messages={messages} />}
		</Suspense>
	);
};

export default ChatContainer;
