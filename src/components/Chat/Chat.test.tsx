import React from 'react';
import { shallow, mount } from 'enzyme';
import Chat from './Chat.component';
import { MessageType } from '../../models/chat.model';

describe('Component / Chat', () => {
    const useridMock = "1234"
    const messagesMock = [
        { username: 'Max', text: 'Hallo', sent: new Date('2020-01-01'), userid: "1", messageid: "1", state: "" } as MessageType,
        { username: 'John', text: 'Hi', sent: new Date('2020-01-01'), userid: "2", messageid: "2", state: "DELETED" } as MessageType,
        { username: 'Jeffrey', text: "What's up?", sent: new Date('2020-01-01'), userid: "3", messageid: "3", state: "EDITED" } as MessageType];

    const sendMessageMock = () => { };
    const editMessage = () => { };
    const deleteMessage = () => { };
    const preventDefault = jest.fn();

    const ChatWrapper = shallow(<Chat sendMessage={sendMessageMock} editMessage={editMessage} deleteMessage={deleteMessage} userid={useridMock} messages={messagesMock} />);

    it('expect to render Chat component', () => {
        expect(ChatWrapper).toMatchSnapshot();
    })

    it('should set the message value on change event of the input', () => {
        ChatWrapper.find('input').simulate('change', {
            currentTarget: {
                value: 'New message',
            },
            preventDefault
        });
        expect(ChatWrapper.find('input').prop('value')).toEqual(
            'New message',
        );
    });

    it('should set editmode to true and focus on input when switchToEditMode is called', () => {
        //TODO call switchToEditMode of mock and check if editmode state has changed & input has been focussed
    });
})


