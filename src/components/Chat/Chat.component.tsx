import React, { FormEvent, KeyboardEvent, useState, useEffect, useRef } from 'react'

import Message from './Message.component'
import './Chat.scss';

import { MessageType } from '../../models/chat.model'

interface Props {
    sendMessage: (message: String) => void,
    editMessage: (messageid: String, text: String) => void,
    deleteMessage: (messageid: String) => void,
    messages: Array<MessageType>,
    userid: String,
}

const Chat = ({ sendMessage, editMessage, messages, ...PropsFromParent }: Props) => {
    const [message, setmessage] = useState("");
    const [editmode, seteditmode] = useState(false);
    const [messageidtoedit, setmessageidtoedit] = useState("" as String);

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

    const handleSubmitEdit = (event: FormEvent | KeyboardEvent) => {
        event.preventDefault();
        if (message.length > 0) {
            editMessage(messageidtoedit, message);
            setmessage("");
        }
    }
    const typeInEditMessage = (messageid: String, messagetext: String) => {
        seteditmode(true);
        setmessageidtoedit(messageid);
        setmessage(messagetext as string);

        if (messageInput.current !== null) {
            messageInput.current.focus();           //focus on the messageInput to edit the message
        }
    }

    const cancelEditMode = () => {
        seteditmode(false);
        setmessage("");
    }


    return (
        <div className="chatWindow">
            <div ref={scrollArea} className="chatMessages">
                {
                    messages.map((message, i) => <Message key={i} message={message} typeInEditMessage={typeInEditMessage} {...PropsFromParent} />)
                }

            </div>
            <div className="chatInput">
                <form onSubmit={editmode ? handleSubmitEdit : handleSubmit}>
                    <input ref={messageInput} placeholder={"Message"} onChange={handleChange} onBlur={cancelEditMode} value={message} type="text"></input>
                </form>
            </div>
        </div>

    )
}

export default Chat
