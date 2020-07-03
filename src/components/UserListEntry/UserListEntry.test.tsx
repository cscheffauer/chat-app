import React from 'react';
import { shallow } from 'enzyme';
import UserListEntry from './UserListEntry.component';

it('expect to render UserListEntry component', () => {
    const userListEntryWrapper = shallow(<UserListEntry key={'1'} username={'Max Mustermann'} />);
    expect(userListEntryWrapper).toMatchSnapshot();
})
