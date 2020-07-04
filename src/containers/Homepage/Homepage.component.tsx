import React, { useState } from 'react'
import LogIn from '../../components/LogIn/LogIn.component';
import ChatContainer from '../ChatContainer/ChatContainer.component';
import Header from '../../components/Header/Header.component';

import './Homepage.scss';

type Props = {
    client: any
}


const Homepage = ({ client }: Props) => {
    const [loggedIn, setloggedIn] = useState(false)
    const [username, setusername] = useState("" as String);

    const logInUser = (username: String) => {
        setusername(username);
        client.send(JSON.stringify({
            username,
            type: "userevent"
        }));

        setloggedIn(true);
    };


    return (
        <div className="homepage">
            {
                !loggedIn ?
                    <LogIn logInUser={logInUser} />
                    :
                    <ChatContainer client={client} username={username} />
            }
        </div>
    )
}

export default Homepage
