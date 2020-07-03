import React, { useState } from 'react';
import Chat from '../components/Chat.component';
import UserList from '../components/UserList.component';

interface Props {
    username: String,
    client: any
}

const ChatContainer = ({ client, username }: Props) => {
    const [userList, setuserList] = useState({});
    const [messages, setmessages] = useState([]);

    client.onmessage = (incomingMessage: any) => {
        const dataFromServer = JSON.parse(incomingMessage.data);
        if (dataFromServer.type === "userevent") {
            setuserList(dataFromServer.data.users);
        }

        console.log(dataFromServer.data);
        if (dataFromServer.type === "newmessageevent") {
            setmessages(dataFromServer.data.messages);
        }
    };

    const sendMessage = (text: String) => {
        const sent = new Date();
        const messageJson = { text, username, sent }
        client.send(JSON.stringify({
            message: messageJson,
            type: "newmessageevent"
        }));
    }

    return (
        <div className="chatcontainer">
            <UserList userList={userList} />
            <Chat sendMessage={sendMessage} messages={messages} />
        </div>
    )
}

export default ChatContainer;
