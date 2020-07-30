import React, { useState, useEffect, useRef } from 'react';
import { MessageType } from '../../models/chat.model';

import Message from '../Message/Message.component';
import ChatInput from '../ChatInput/ChatInput.component';

import './Chat.scss';

interface Props {
	messages: Array<MessageType>;
}

const Chat = ({ messages }: Props) => {
	const [message, setmessage] = useState('');
	const [editmode, seteditmode] = useState(false);
	const [messageidtoedit, setmessageidtoedit] = useState('' as string);
	const [originalmessage, setoriginalmessage] = useState('' as string);

	const messageRef = useRef<HTMLInputElement>(null); //ref for messageRef
	const scrollArea = useRef<HTMLDivElement>(null); //ref for scrollArea

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
					<Message key={message.messageid} message={message} switchToEditMode={switchToEditMode} />
				))}
			</div>
			<ChatInput parentProps={{ messageRef, message, setmessage, editmode, messageidtoedit, originalmessage, cancelEditMode }} />
		</div>
	);
};

export default Chat;
