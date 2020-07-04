import React from 'react'
import './Chat.scss';


interface Props {
    message: {
        sent: Date,
        username: String,
        text: String,
    }
}

const Message = ({ message }: Props) => {
    return (
        <div>
            <p>{message.sent} ... {message.username}: {message.text}</p>
        </div>
    )
}

export default Message
