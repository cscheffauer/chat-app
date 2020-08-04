import React from 'react';
import './ImagePreview.scss';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';

interface Props {
	base64string: string;
	deleteImage: () => void;
}

const ImagePreview = ({ base64string, deleteImage }: Props) => {
	return (
		<div className='imagepreview'>
			{base64string === '' ? (
				<LoadingSpinner />
			) : (
				<>
					<img alt='preview' src={base64string} />
					<span className='deleteimage' onClick={deleteImage}>
						×
					</span>
				</>
			)}
		</div>
	);
};

export default ImagePreview;
