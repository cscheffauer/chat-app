import React from 'react';

import './UserListEntry.scss';

interface Props {
	key: String;
	username: String;
}

const UserListEntry: React.FunctionComponent<Props> = ({ username }) => {
	return (
		<div className='userlistentry'>
			<p className='username'>{username}</p>
		</div>
	);
};

export default UserListEntry;
