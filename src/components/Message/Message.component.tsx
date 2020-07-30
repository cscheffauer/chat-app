import React from 'react';
import { AppContext } from '../../AppContextProvider';

import Linkify from 'react-linkify';
import './Message.scss';
import { MessageType } from '../../models/chat.model';

interface Props {
	switchToEditMode: (messageid: string, messagetext: string) => void;
	message: MessageType;
}

const Message = ({ switchToEditMode, message }: Props) => {
	const { send, userid } = React.useContext(AppContext);
	const sentDate = new Date(message.sent);
	const minutes = sentDate.getMinutes() < 10 ? '0' + sentDate.getMinutes() : sentDate.getMinutes();
	const hours = sentDate.getHours() < 10 ? '0' + sentDate.getHours() : sentDate.getHours();
	const sent = hours + ':' + minutes;

	const deleteMessage = (messageid: string) => {
		send({ id: messageid, type: 'deletemessageevent' });
	};

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
