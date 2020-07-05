import React from 'react';
import Linkify from 'react-linkify';
import './Chat.scss';
import { MessageType } from '../../models/chat.model'

interface Props {
    typeInEditMessage: (messageid: String, messagetext: String) => void,
    deleteMessage: (messageid: String) => void,
    message: MessageType
    userid: String
}


const Message = ({ typeInEditMessage, deleteMessage, message, userid }: Props) => {
    const sentDate = new Date(message.sent);
    const minutes = sentDate.getMinutes() < 10 ? "0" + sentDate.getMinutes() : sentDate.getMinutes()
    const hours = sentDate.getHours() < 10 ? "0" + sentDate.getHours() : sentDate.getHours()
    const sent = hours + ":" + minutes;

    return (
        <div className="message">

            {
                message.state === "DELETED" ?   //display "Message has been deleted" if message state == DELETED
                    <p>
                        <span style={{ color: "#9da2aa", fontWeight: 500 }}>Message has been deleted by {message.username}</span>
                    </p>
                    :
                    <>
                        <p>
                            <span style={{ color: "#00002c", fontWeight: 500 }}>{message.username}</span><span style={{ color: "#9da2aa", marginLeft: 10 }}>{sent}</span>

                            {
                                (message.username !== "Meetingbot" && message.userid === userid) ?      //display edit and delete if message is not from the bot and the username is the same
                                    <>
                                        <span onClick={() => deleteMessage(message.messageid)} style={{ color: "#9da2aa", float: 'right', marginRight: 20, cursor: 'pointer' }}>×</span>
                                        <span onClick={() => typeInEditMessage(message.messageid, message.text)} style={{ color: "#9da2aa", float: 'right', marginRight: 10, cursor: 'pointer' }}>edit</span>
                                    </>
                                    :
                                    <></>
                            }

                        </p>
                        <Linkify>
                            <p style={{ lineHeight: '150%', color: message.username === "Meetingbot" ? 'grey' : 'black' }}>{message.text}</p>
                        </Linkify>
                    </>
            }
        </div >
    )
}

export default Message
