import React from 'react';
import { shallow } from 'enzyme';
import LogIn from './LogIn.component';


describe('Component / LogIn', () => {
    const logInUserMock = () => { };
    const LogInWrapper = shallow(<LogIn logInUser={logInUserMock} />);

    it('expect to render LogIn component', () => {
        expect(LogInWrapper).toMatchSnapshot();
    })

})


