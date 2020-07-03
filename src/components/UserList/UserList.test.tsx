import React from 'react';
import { shallow } from 'enzyme';
import UserList from './UserList.component';

it('expect to render UserList component', () => {
    const userListWrapper = shallow(<UserList userList={{ abcd: { username: 'Max Mustermann' } }} />);
    expect(userListWrapper).toMatchSnapshot();
})
