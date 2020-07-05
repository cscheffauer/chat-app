import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header.component';


describe('Component / Header', () => {
    const HeaderWrapper = shallow(<Header />);

    it('expect to render Header component', () => {
        expect(HeaderWrapper).toMatchSnapshot();
    })

})


