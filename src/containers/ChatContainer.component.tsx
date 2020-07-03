import React, { useState } from 'react';
import Chat from '../components/Chat.component';
import UserList from '../components/UserList.component';

interface Props {
    username: String,
    client: any
}

const ChatContainer = ({ client, username }: Props) => {
    const [userList, setuserList] = useState([]);

    client.onmessage = (message: any) => {
        const dataFromServer = JSON.parse(message.data);
        setuserList(dataFromServer.data.users);
    };
    return (
        <div>
            <UserList userList={userList} />
            <Chat />
        </div>
    )
}

export default ChatContainer;
