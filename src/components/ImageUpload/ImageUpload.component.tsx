import React, { useRef, SyntheticEvent } from 'react';
import './ImageUpload.scss';

interface Props {
	openImagePreview: (e: SyntheticEvent<HTMLInputElement>) => void;
}

const ImageUpload = ({ openImagePreview }: Props) => {
	const fileUploadRef = useRef<HTMLInputElement>(null);

	return (
		<>
			<label className='imageupload' htmlFor='imageupload'>
				&#128248;
			</label>
			<input id='imageupload' accept='image/png, image/jpeg' multiple={false} onChange={openImagePreview} type='file' ref={fileUploadRef} style={{ display: 'none' }} />
		</>
	);
};

export default ImageUpload;
