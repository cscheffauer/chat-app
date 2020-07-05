import React, { useState, useEffect } from 'react';
import Chat from '../../components/Chat/Chat.component';
import UserList from '../../components/UserList/UserList.component';
import Tabs from '../../components/Tabs/Tabs.component'

import { MessageType } from '../../models/chat.model'

interface Props {
    username: String,
    client: any
}

const ChatContainer = ({ client, username }: Props) => {
    const [userList, setuserList] = useState({});
    const [userid, setuserid] = useState("");
    const [participantNumber, setparticipantNumber] = useState(0);
    const [messages, setmessages] = useState([] as Array<MessageType>);
    const [selected, setselected] = useState(2);        //set initial tab to be shown to Chat tab (=2)

    useEffect(() => {
        setparticipantNumber(Object.keys(userList).length)      //get keys of userList and set the length of it as the participant number, whenever userlist changes
    }, [userList])

    client.onmessage = (incomingMessage: any) => {
        const dataFromServer = JSON.parse(incomingMessage.data);
        console.log(dataFromServer);

        if (dataFromServer.type === "useridevent") {
            setuserid(dataFromServer.data.userid);      //reacting on incoming user id events and save just the userid
        }
        if (dataFromServer.type === "userevent") {
            setuserList(dataFromServer.data.users);
            setmessages(dataFromServer.data.messages);      //reacting on incoming user events and save the user & messages data
        }
        if (dataFromServer.type === "newmessageevent"
            || dataFromServer.type === "getallmessagesevent"
            || dataFromServer.type === "editmessageevent"
            || dataFromServer.type === "deletemessageevent") {
            setmessages(dataFromServer.data.messages);              //reacting on all incoming message events and save the messages data
        }
    };

    const sendMessage = (text: String) => {
        const sent = new Date();
        const messageJson = { text, username, userid, sent }
        client.send(JSON.stringify({
            message: messageJson,
            type: "newmessageevent"
        }));
    }

    const editMessage = (messageid: String, text: String) => {
        const messageJson = { messageid, text }
        client.send(JSON.stringify({
            message: messageJson,
            type: "editmessageevent"
        }));
    }

    const deleteMessage = (messageid: String) => {
        console.log(messageid);
        client.send(JSON.stringify({
            id: messageid,
            type: "deletemessageevent"
        }));
    }

    return (
        <div className="chatcontainer">
            <Tabs setselected={setselected} selected={selected} participantNumber={participantNumber} />
            {selected === 1 ?           //if tabIndex 1 (=User List) is selected
                <UserList userList={userList} />
                :                       //if tabIndex 2 (=Chat) is selected
                <Chat sendMessage={sendMessage} editMessage={editMessage} deleteMessage={deleteMessage} messages={messages} userid={userid} />
            }
        </div>
    )
}

export default ChatContainer;
