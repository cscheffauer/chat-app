import React from 'react';

interface Props {
	tabIndex: string;
	tabName: string;
	setselected: any;
	selected: string;
}

const Tab = ({ tabIndex, tabName, setselected, selected }: Props) => {
	return (
		<div onClick={() => setselected(tabIndex)} className={`tab ${selected === tabIndex ? 'selected' : ''}`}>
			<p>{tabName}</p>
		</div>
	);
};

export default Tab;
