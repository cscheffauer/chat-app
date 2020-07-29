import React, { FormEvent, KeyboardEvent } from 'react';

import './ChatInput.scss';

interface Props {
	parentProps: {
		messageRef: React.RefObject<HTMLInputElement>;
		message: string;
		setmessage: any;
		sendMessage: (arg0: string) => void;
		editMessage: (messageid: string, text: string) => void;
		editmode: boolean;
		messageidtoedit: string;
		originalmessage: string;
		cancelEditMode: () => void;
	};
}

const ChatInput = ({ parentProps }: Props) => {
	const { editmode, messageidtoedit, originalmessage, cancelEditMode } = parentProps;
	const { messageRef, message, setmessage, sendMessage, editMessage } = parentProps;
	const handleChange = (event: FormEvent<HTMLInputElement>) => {
		event.preventDefault();
		setmessage(event.currentTarget.value);
	};

	const handleSubmit = (event: FormEvent | KeyboardEvent) => {
		event.preventDefault();
		if (message.length > 0) {
			if (editmode) {
				if (originalmessage !== message) {
					editMessage(messageidtoedit, message);
					cancelEditMode();
				}
			} else {
				sendMessage(message);
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
