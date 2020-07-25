import React from 'react';
import { mount } from 'enzyme';
import UserListEntry from './UserListEntry.component';

const username = 'Max Mustermann';

describe('<UserListEntry />', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(<UserListEntry key={'1'} username={username} />);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});
	it('expect to render UserListEntry component', () => {
		expect(wrapper).toMatchSnapshot();
	});

	describe('Testing the UserListEntry', () => {
		it('expect to have the username set as a text in the entry', () => {
			expect(wrapper.text()).toBe(username);
		});
	});
});
