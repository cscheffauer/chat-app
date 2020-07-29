import React from 'react';
import './Tabs.scss';

import Tab from './Tab.component';

interface Props {
	setselected: any;
	selected: Number;
	participantNumber: Number;
}

const Tabs = ({ participantNumber, ...additionalProps }: Props) => {
	return (
		<div className='tabs'>
			<Tab tabIndex={1} tabName={'Participants (' + participantNumber + ')'} {...additionalProps} />
			<Tab tabIndex={2} tabName={'Chat'} {...additionalProps} />
		</div>
	);
};

export default Tabs;
