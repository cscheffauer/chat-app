import React from 'react';
import { shallow } from 'enzyme';
import Chat from './Chat.component';

describe('Component / Chat', () => {
    const sendMessageMock = () => { };
    const messagesMock = [{ username: 'Max', text: 'Hallo', sent: new Date() }, { username: 'John', text: 'Hi', sent: new Date() }, { username: 'Jeffrey', text: "What's up?", sent: new Date() }];
    const ChatWrapper = shallow(<Chat sendMessage={sendMessageMock} messages={messagesMock} />);

    it('expect to render Chat component', () => {
        expect(ChatWrapper).toMatchSnapshot();
    })
})


