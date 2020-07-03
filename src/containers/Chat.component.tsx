import React from 'react'
import { client } from 'websocket';

interface Props {
    username: String,
    client: any
}

const Chat = ({ client, username }: Props) => {

    client.onmessage = (message: any) => {
        const dataFromServer = JSON.parse(message.data);
        console.log(dataFromServer);
    };
    return (
        <div>

        </div>
    )
}

export default Chat;
