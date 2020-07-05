import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header.component';


describe('Component / Header', () => {
    const HeaderMock = () => { };
    const HeaderWrapper = shallow(<Header />);

    it('expect to render LogIn component', () => {
        expect(HeaderWrapper).toMatchSnapshot();
    })

})


