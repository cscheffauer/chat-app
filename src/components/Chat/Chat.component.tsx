import React, { FormEvent, KeyboardEvent, useState } from 'react'

interface Props {
    sendMessage: (message: String) => void,
    messages: Array<{ username: String, text: String, sent: Date }>
}

const Chat = ({ sendMessage, messages }: Props) => {
    const [message, setmessage] = useState("")

    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        setmessage(event.currentTarget.value)
    }

    const handleSubmit = (event: FormEvent | KeyboardEvent) => {
        event.preventDefault();
        sendMessage(message);
        setmessage("");
    }
    return (
        <div className="chatWindow">
            <div className="chatMessages">
                {
                    messages.map((message, i) => <p key={i}>{message.sent} ... {message.username}: {message.text}</p>)
                }

            </div>
            <div className="chatBox">
                <form onSubmit={handleSubmit}>
                    <input onChange={handleChange} value={message} type="text"></input>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>

    )
}

export default Chat
