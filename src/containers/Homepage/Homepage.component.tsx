import React, { useState } from 'react';
import { AppContext } from '../../AppContextProvider';

import LogIn from '../../components/LogIn/LogIn.component';
import ChatContainer from '../ChatContainer/ChatContainer.component';

import './Homepage.scss';

const Homepage = () => {
	const { client, send, setUsername } = React.useContext(AppContext);

	const [loggedIn, setloggedIn] = useState(false);

	const logInUser = (username: string) => {
		if (client !== null) {
			setUsername(username);
			send({
				user: { username },
				type: 'userevent',
			});
			setloggedIn(true);
		}
	};

	return <div className='homepage'>{!loggedIn ? <LogIn logInUser={logInUser} /> : <ChatContainer />}</div>;
};

export default Homepage;
