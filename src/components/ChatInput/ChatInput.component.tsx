import React, { FormEvent, KeyboardEvent } from 'react';

import './ChatInput.scss';
import { AppContext } from '../../AppContextProvider';

interface Props {
	parentProps: {
		messageRef: React.RefObject<HTMLInputElement>;
		message: string;
		setmessage: any;
		editmode: boolean;
		messageidtoedit: string;
		originalmessage: string;
		cancelEditMode: () => void;
	};
}

const ChatInput = ({ parentProps }: Props) => {
	const { send, userid, username } = React.useContext(AppContext);
	const { editmode, messageidtoedit, originalmessage, cancelEditMode } = parentProps;
	const { messageRef, message, setmessage } = parentProps;

	const handleChange = (event: FormEvent<HTMLInputElement>) => {
		event.preventDefault();
		setmessage(event.currentTarget.value);
	};

	const handleSubmit = (event: FormEvent | KeyboardEvent) => {
		event.preventDefault();
		if (message.length > 0) {
			if (editmode) {
				if (originalmessage !== message) {
					send({ id: messageidtoedit, text: message, type: 'editmessageevent' }); //send editmessageevent to backend
					cancelEditMode();
				}
			} else {
				const sent = new Date();
				const messageJson = { message, username, userid, sent };
				send({ message: messageJson, type: 'newmessageevent' }); //send newmessageevent to backend
				setmessage('');
			}
		}
	};

	return (
		<div className='chatInput'>
			<form onSubmit={handleSubmit}>
				<input ref={messageRef} placeholder={'Message'} onChange={handleChange} onBlur={cancelEditMode} value={message} type='text'></input>
				{editmode && <span>✎</span>}
			</form>
		</div>
	);
};

export default ChatInput;
