import React, { FormEvent, KeyboardEvent, useState, useEffect, useRef } from 'react'

import Message from './Message.component'
import './Chat.scss';

interface Props {
    sendMessage: (message: String) => void,
    editMessage: any,
    deleteMessage: any,
    messages: Array<{ username: String, userid: String, text: String, sent: Date, messageid: String }>,
    userid: String
}

const Chat = ({ sendMessage, messages, ...PropsFromParent }: Props) => {
    const [message, setmessage] = useState("")
    const messageInput = useRef<HTMLInputElement>(null);        //ref for messageInput
    const scrollArea = useRef<HTMLDivElement>(null);        //ref for scrollArea

    useEffect(() => {
        if (messageInput.current !== null) {
            messageInput.current.focus();           //focus on the messageInput after messages changed
        }
        if (scrollArea.current !== null) {
            scrollArea.current.scrollTop = scrollArea.current.scrollHeight;     //to scroll to the bottom after messages changed
        }
    }, [messages]);

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
            <div ref={scrollArea} className="chatMessages">
                {
                    messages.map((message, i) => <Message key={i} message={message} {...PropsFromParent} />)
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
