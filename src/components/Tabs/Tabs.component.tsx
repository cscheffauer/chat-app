import React from 'react';
import './Tabs.scss';

import Tab from './Tab.component';

interface Props {
	setselected: any;
	selected: string;
	participantNumber: Number;
}

const Tabs = ({ participantNumber, ...additionalProps }: Props) => {
	return (
		<div className='tabs'>
			<Tab tabIndex={'Userlist'} tabName={'Participants (' + participantNumber + ')'} {...additionalProps} />
			<Tab tabIndex={'Chat'} tabName={'Chat'} {...additionalProps} />
		</div>
	);
};

export default Tabs;
