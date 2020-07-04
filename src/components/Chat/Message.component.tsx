import React from 'react';
import Linkify from 'react-linkify';
import './Chat.scss';

interface Props {
    message: {
        sent: Date,
        username: String,
        text: String,
    }
}

const Message = ({ message }: Props) => {
    const sentDate = new Date(message.sent);
    const sent = sentDate.getHours() + ":" + sentDate.getMinutes();
    return (
        <div className="message">
            <p><span style={{ color: "#00002c", fontWeight: 500 }}>{message.username}</span><span style={{ color: "#9da2aa", marginLeft: 10 }}>{sent}</span> </p>
            <Linkify>
                <p style={{ lineHeight: '150%', color: message.username === "Meetingbot" ? 'grey' : 'black' }}>{message.text}</p>
            </Linkify>
        </div >
    )
}

export default Message
