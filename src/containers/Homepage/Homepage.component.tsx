import React, { useState } from 'react';
import { AppContext } from '../../AppContextProvider';

import LogIn from '../../components/LogIn/LogIn.component';
import ChatContainer from '../ChatContainer/ChatContainer.component';

import './Homepage.scss';

const Homepage = () => {
	const { client } = React.useContext(AppContext);

	const [loggedIn, setloggedIn] = useState(false);
	const [username, setusername] = useState('' as string);

	const logInUser = (username: string) => {
		if (client !== null) {
			setusername(username);
			client.send(
				JSON.stringify({
					user: {
						username,
					},
					type: 'userevent',
				})
			);
			setloggedIn(true);
		}
	};

	return <div className='homepage'>{!loggedIn ? <LogIn logInUser={logInUser} /> : <ChatContainer username={username} />}</div>;
};

export default Homepage;
