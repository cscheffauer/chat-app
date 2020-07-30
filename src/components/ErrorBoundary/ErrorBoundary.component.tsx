import React from 'react';
import './ErrorBoundary.scss';

interface Props {
	errormessage: string;
	errorsubline: string;
}

const ErrorBoundary = ({ errormessage, errorsubline }: Props) => {
	return (
		<div className='errorboundary'>
			<h3>{errormessage}</h3> <p>{errorsubline}</p>
		</div>
	);
};

export default ErrorBoundary;
