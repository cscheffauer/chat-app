import React, { FormEvent, KeyboardEvent, useState, useEffect, useRef } from 'react'

import Message from '../Message/Message.component'
import './Chat.scss';

import { MessageType } from '../../models/chat.model'
import TypeAheadMenu from '../TypeAheadMenu/TypeAheadMenu.component';

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
    const [originalmessage, setoriginalmessage] = useState('' as String);

    const [typeAheadOpen, settypeAheadOpen] = useState(false);
    const [selectedCommand, setSelectedCommand] = useState('');

    const openGiphyDialog = () => {
        alert('hi');
    }
    const menuItems = [{ label: 'Insert a cool giphy', selected: false, command: '/giphy', onExecute: openGiphyDialog }, { label: 'Share a great picture', selected: false, command: '/picture', onExecute: openGiphyDialog }];

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
        if (event.currentTarget.value.startsWith('/', 0)) {
            settypeAheadOpen(true);
        } else {
            settypeAheadOpen(false);
        }
        setmessage(event.currentTarget.value)
    }

    const handleSubmit = (event: FormEvent | KeyboardEvent) => {
        event.preventDefault();
        settypeAheadOpen(false);
        if (message.length > 0) {
            if (editmode) {
                if (originalmessage !== message) {
                    editMessage(messageidtoedit, message);
                    cancelEditMode();
                }
            } else {
                sendMessage(message);
                setmessage("");
            }
        }
    }

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            if (typeAheadOpen && selectedCommand !== '') {
                event.preventDefault();
                setmessage(selectedCommand);
                settypeAheadOpen(false);
            }
        }
    }

    const switchToEditMode = (messageid: String, messagetext: String) => {
        setmessageidtoedit(messageid);
        setoriginalmessage(messagetext);
        setmessage(messagetext as string);
        seteditmode(true);
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
                    messages.map((message, i) => <Message key={i} message={message} switchToEditMode={switchToEditMode} {...PropsFromParent} />)
                }
            </div>
            <div className="chatInput">
                {typeAheadOpen && <TypeAheadMenu message={message} menuItems={menuItems} setCommand={(command) => { setSelectedCommand(command) }} />}
                <form onSubmit={handleSubmit}>
                    <input ref={messageInput} placeholder={"Message"} onChange={handleChange} onKeyPress={handleKeyPress} onBlur={cancelEditMode} value={message} type="text"></input>
                    {editmode && <span>✎</span>}
                </form>
            </div>
        </div>

    )
}

export default Chat
