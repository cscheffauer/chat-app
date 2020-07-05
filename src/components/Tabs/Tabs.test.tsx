import React from 'react';
import { mount } from 'enzyme';
import Tabs from './Tabs.component';

const setselectedMock = () => { }

describe('Component / Tabs', () => {
    const TabsWrapper = mount(<Tabs setselected={setselectedMock} selected={2} participantNumber={8} />);

    it('expect to render Tabs component', () => {
        expect(TabsWrapper).toMatchSnapshot();
    })
})



