import React from 'react';
import { mount } from 'enzyme';
import UserList from './UserList.component';

describe('<UserList />', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(<UserList userList={{ 1: { username: 'Max Mustermann' }, 2: { username: 'John Doe' } }} />);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});
	it('expect to render UserList component', () => {
		expect(wrapper).toMatchSnapshot();
	});

	describe('Testing the UserList', () => {
		it('expect to have the usernames set in the userlist entry', () => {
			const firstUserListEntry = wrapper.find('UserListEntry').at(0);
			expect(firstUserListEntry.props().username).toBe('Max Mustermann');
			expect(firstUserListEntry.text()).toBe('Max Mustermann');

			const secondUserListEntry = wrapper.find('UserListEntry').at(1);
			expect(secondUserListEntry.props().username).toBe('John Doe');
			expect(secondUserListEntry.text()).toBe('John Doe');
		});
	});
});
