import React, { FormEvent, KeyboardEvent, useState, useEffect, useRef } from 'react'

import Message from './Message.component'
import './Chat.scss';

interface Props {
    sendMessage: (message: String) => void,
    messages: Array<{ username: String, text: String, sent: Date }>
}

const Chat = ({ sendMessage, messages }: Props) => {
    const [message, setmessage] = useState("")
    const messageInput = useRef<HTMLInputElement>(null);        //ref for messageInput

    useEffect(() => {                          //grab all messages after render
        if (messageInput.current !== null) {
            messageInput.current.focus();           //focus on the messageInput after render
        }
    }, []);

    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        setmessage(event.currentTarget.value)
    }

    const handleSubmit = (event: FormEvent | KeyboardEvent) => {
        event.preventDefault();
        if (message.length > 0) {
            sendMessage(message);
            setmessage("");
        }
    }
    return (
        <div className="chatWindow">
            <div className="chatMessages">
                {
                    messages.map((message, i) => <Message key={i} message={message} />)
                }

            </div>
            <div className="chatBox">
                <form onSubmit={handleSubmit}>
                    <input ref={messageInput} placeholder={"Message"} onChange={handleChange} value={message} type="text"></input>
                </form>
            </div>
        </div>

    )
}

export default Chat
