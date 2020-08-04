import React, { useState, SyntheticEvent, FormEvent, KeyboardEvent } from 'react';

import './ChatInput.scss';
import { AppContext } from '../../utils/AppContextProvider';
import ImageUpload from '../ImageUpload/ImageUpload.component';
import ImagePreview from '../ImagePreview/ImagePreview.component';
import { convertImageToBase64 } from '../../utils/helperFunctions';

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
	const { sendNewMessage, editMessage } = React.useContext(AppContext);
	const { editmode, messageidtoedit, originalmessage, cancelEditMode } = parentProps;
	const { messageRef, message, setmessage } = parentProps;
	const [imagepreviewopen, setimagepreviewopen] = useState(false);
	const [imagestring, setimagestring] = useState('');

	const openImagePreview = async (e: SyntheticEvent<HTMLInputElement>) => {
		if (e.currentTarget.files !== null) {
			var file = e.currentTarget.files[0];
			setimagestring(await convertImageToBase64(file));
			setimagepreviewopen(true);
			messageRef.current !== null && messageRef.current.focus(); //focus on the messageRef after ImagePreview has been opened
		}
	};

	const closeImagePreview = () => {
		setimagepreviewopen(false);
	};

	const handleChange = (event: FormEvent<HTMLInputElement>) => {
		event.preventDefault();
		setmessage(event.currentTarget.value);
	};

	const handleSubmit = (event: FormEvent | KeyboardEvent) => {
		event.preventDefault();
		if (message.length > 0) {
			if (editmode) {
				if (originalmessage !== message) {
					editMessage({ id: messageidtoedit, text: message }); //send editmessageevent to backend
					cancelEditMode();
				}
			} else {
				closeImagePreview();
				setmessage('');
				if (messageRef.current !== null && imagepreviewopen) messageRef.current.placeholder = 'Message';
				const messageJson = imagepreviewopen ? { text: message, image: imagestring } : { text: message };
				sendNewMessage(messageJson); //send newmessageevent to backend
			}
		} else {
			if (messageRef.current !== null && imagepreviewopen) messageRef.current.placeholder = 'Type in a description to send the picture';
		}
	};

	return (
		<div className='chatInput'>
			{imagepreviewopen && <ImagePreview base64string={imagestring} deleteImage={closeImagePreview} />}
			<form onSubmit={handleSubmit}>
				<ImageUpload openImagePreview={openImagePreview} />
				<input ref={messageRef} placeholder={'Message'} onChange={handleChange} onBlur={cancelEditMode} value={message} type='text'></input>
				{editmode && <span>✎</span>}
			</form>
		</div>
	);
};

export default ChatInput;
