import React, { useState, useEffect, useRef } from 'react';
import { AppContext } from '../../AppContextProvider';
import { MessageType } from '../../models/chat.model';

import Message from '../Message/Message.component';
import ChatInput from '../ChatInput/ChatInput.component';

import './Chat.scss';

interface Props {
	send: (json: Object) => void;
	messages: Array<MessageType>;
	username: string;
}

const Chat = ({ send, messages, username }: Props) => {
	const { userid } = React.useContext(AppContext);
	const [message, setmessage] = useState('');
	const [editmode, seteditmode] = useState(false);
	const [messageidtoedit, setmessageidtoedit] = useState('' as string);
	const [originalmessage, setoriginalmessage] = useState('' as string);

	const messageRef = useRef<HTMLInputElement>(null); //ref for messageRef
	const scrollArea = useRef<HTMLDivElement>(null); //ref for scrollArea

	const sendMessage = (text: string) => {
		const sent = new Date();
		const messageJson = { text, username, userid, sent };
		send({ message: messageJson, type: 'newmessageevent' });
	};

	const editMessage = (messageid: string, text: string) => {
		send({ id: messageid, text: text, type: 'editmessageevent' });
	};

	const deleteMessage = (messageid: string) => {
		send({ id: messageid, type: 'deletemessageevent' });
	};

	useEffect(() => {
		if (messageRef.current !== null) {
			messageRef.current.focus(); //focus on the messageRef after messages changed
		}
		if (scrollArea.current !== null) {
			scrollArea.current.scrollTop = scrollArea.current.scrollHeight; //to scroll to the bottom after messages changed
		}
	}, [messages]);

	const switchToEditMode = (messageid: string, messagetext: string) => {
		setmessageidtoedit(messageid);
		setoriginalmessage(messagetext);
		setmessage(messagetext as string);
		seteditmode(true);
		if (messageRef.current !== null) {
			messageRef.current.focus(); //focus on the messageRef to edit the message
		}
	};

	const cancelEditMode = () => {
		seteditmode(false);
		setmessage('');
	};

	return (
		<div className='chatWindow'>
			<div ref={scrollArea} className='chatMessages'>
				{messages.map((message) => (
					<Message key={message.messageid} message={message} switchToEditMode={switchToEditMode} deleteMessage={deleteMessage} />
				))}
			</div>
			<ChatInput parentProps={{ messageRef, message, setmessage, sendMessage, editMessage, editmode, messageidtoedit, originalmessage, cancelEditMode }} />
		</div>
	);
};

export default Chat;
