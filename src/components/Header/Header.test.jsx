import React from 'react';
import { mount } from 'enzyme';
import Header from './Header.component';


describe('<Header />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<Header />)
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    it('expect to render Header component', () => {
        expect(wrapper).toMatchSnapshot();
    })

});