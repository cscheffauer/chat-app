import React, { useState, useEffect, Suspense, lazy } from 'react';
import { MessageType } from '../../models/chat.model'
import UserList from '../../components/UserList/UserList.component';

const AsyncChat = lazy(() => import('../../components/Chat/Chat.component'));
const AsyncUserList = lazy(() => import('../../components/UserList/UserList.component'));
const AsyncTabs = lazy(() => import('../../components/Tabs/Tabs.component'));

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

    useEffect(() => {           //TODO: might not be needed because userlist length can be set directly
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
        console.log(messageid, text);
        client.send(JSON.stringify({
            id: messageid,
            text: text,
            type: "editmessageevent"
        }));
    }

    const deleteMessage = (messageid: String) => {
        client.send(JSON.stringify({
            id: messageid,
            type: "deletemessageevent"
        }));
    }

    return (
        <div className="chatcontainer">
            <Suspense fallback={< div style={{ textAlign: 'center' }} > Loading...</div >}>
                <AsyncTabs setselected={setselected} selected={selected} participantNumber={Object.keys(userList).length} />
                {selected === 1 ?           //if tabIndex 1 (=User List) is selected
                    <AsyncUserList userList={userList} />
                    :                       //if tabIndex 2 (=Chat) is selected
                    <AsyncChat sendMessage={sendMessage} editMessage={editMessage} deleteMessage={deleteMessage} messages={messages} userid={userid} />
                }
            </Suspense>
        </div>
    )
}

export default ChatContainer;
