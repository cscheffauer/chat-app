import React, { MouseEvent, useState } from 'react'
import LogIn from '../components/LogIn.component';
import Chat from './Chat.component';

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
        <div>
            {
                !loggedIn ?
                    <LogIn logInUser={logInUser} />
                    :
                    <Chat client={client} username={username} />
            }

        </div>
    )
}

export default Homepage
