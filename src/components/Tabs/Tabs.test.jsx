import React from 'react';
import { mount } from 'enzyme';
import Tabs from './Tabs.component';

describe('<Tabs />', () => {
    let wrapper;
    const setselectedMock = jest.fn();

    beforeEach(() => {
        wrapper = mount(<Tabs setselected={setselectedMock} selected={2} participantNumber={8} />)
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    it('expect to render Tabs component', () => {
        expect(wrapper).toMatchSnapshot();
    })

    describe('Testing the Tabs', () => {
        it('expect to have the 2nd tab selected initially', () => {
            const secondTab = wrapper.find({ tabIndex: 2 })
            expect(secondTab.children().at(0).hasClass('selected')).toBe(true);
        })

        it('expect to set the selected to 1', () => {
            const firstTab = wrapper.find({ tabIndex: 1 })
            firstTab.children().at(0).props().onClick({ preventDefault() { } });

            expect(setselectedMock).toHaveBeenCalledWith(1);            //tab index 1 should be passed to the setselectedMock fn

        })

    });

})


