import React from 'react';
import { shallow } from 'enzyme';
import ChatContainer from './ChatContainer.component';

import { client } from '../../App';

describe('Container / ChatContainer', () => {
    const clientMock = client;
    const ChatContainerWrapper = shallow(<ChatContainer client={clientMock} username={'John Doe'} />);

    it('expect to render ChatContainer container', () => {
        expect(ChatContainerWrapper).toMatchSnapshot();
    })
})


