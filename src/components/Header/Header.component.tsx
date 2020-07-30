import React from 'react';
import './Header.scss';
interface Props {
	title: string;
}

const Header = ({ title }: Props) => {
	return (
		<div className='header'>
			<p>{title}</p>
		</div>
	);
};

export default Header;
