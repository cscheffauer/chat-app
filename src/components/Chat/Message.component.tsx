import React from 'react';
import Linkify from 'react-linkify';
import './Chat.scss';

interface Props {
    editMessage: (id: String) => void,
    deleteMessage: (id: String) => void,
    message: {
        sent: Date,
        username: String,
        userid: String,
        text: String,
        messageid: String,
    },
    userid: String
}




const Message = ({ editMessage, deleteMessage, message, userid }: Props) => {
    const sentDate = new Date(message.sent);
    const minutes = sentDate.getMinutes() < 10 ? "0" + sentDate.getMinutes() : sentDate.getMinutes()
    const hours = sentDate.getHours() < 10 ? "0" + sentDate.getHours() : sentDate.getHours()
    const sent = hours + ":" + minutes;

    return (
        <div className="message">
            <p>
                <span style={{ color: "#00002c", fontWeight: 500 }}>{message.username}</span><span style={{ color: "#9da2aa", marginLeft: 10 }}>{sent}</span>
                {
                    (message.username !== "Meetingbot" && message.userid === userid) ?      //display edit and delete if message is not from the bot and the username is the same
                        <>
                            <span onClick={() => editMessage(message.messageid)} style={{ color: "#9da2aa", float: 'right', marginRight: 20, cursor: 'pointer' }}>×</span>
                            <span onClick={() => deleteMessage(message.messageid)} style={{ color: "#9da2aa", float: 'right', marginRight: 10, cursor: 'pointer' }}>edit</span>
                        </>
                        :
                        <></>
                }

            </p>
            <Linkify>
                <p style={{ lineHeight: '150%', color: message.username === "Meetingbot" ? 'grey' : 'black' }}>{message.text}</p>
            </Linkify>
        </div >
    )
}

export default Message
