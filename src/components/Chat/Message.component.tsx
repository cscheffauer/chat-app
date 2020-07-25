import React from 'react';
import Linkify from 'react-linkify';
import './Chat.scss';
import { MessageType } from '../../models/chat.model';

interface Props {
	switchToEditMode: (messageid: String, messagetext: String) => void;
	deleteMessage: (messageid: String) => void;
	message: MessageType;
	userid: String;
}

const Message = ({ switchToEditMode, deleteMessage, message, userid }: Props) => {
	const sentDate = new Date(message.sent);
	const minutes = sentDate.getMinutes() < 10 ? '0' + sentDate.getMinutes() : sentDate.getMinutes();
	const hours = sentDate.getHours() < 10 ? '0' + sentDate.getHours() : sentDate.getHours();
	const sent = hours + ':' + minutes;

	return (
		<div className='message'>
			{message.state === 'DELETED' ? ( //display "Message has been deleted" if message state == DELETED
				<p className='deleted'>Message has been deleted by {message.username}</p>
			) : (
				<>
					<p>
						<span className='sender'>{message.username}</span>
						<span className='info'>{sent}</span>
						{message.state === 'EDITED' && <span className='info'>| edited</span>}
						{message.username !== 'Meetingbot' &&
						message.userid === userid && ( //display edit and delete if message is not from the bot and the username is the same
								<>
									<span className='option' onClick={() => deleteMessage(message.messageid)}>
										×
									</span>
									<span className='option' onClick={() => switchToEditMode(message.messageid, message.text)}>
										✎
									</span>
								</>
							)}
					</p>
					<Linkify>
						<p
							style={{
								lineHeight: '150%',
								color: message.username === 'Meetingbot' ? '#a3a3a3' : 'black',
							}}
						>
							{message.text}
						</p>
					</Linkify>
				</>
			)}
		</div>
	);
};

export default Message;
