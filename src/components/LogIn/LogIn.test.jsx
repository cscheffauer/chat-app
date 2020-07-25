import React from 'react';
import { mount } from 'enzyme';
import LogIn from './LogIn.component';

describe('<LogIn />', () => {
	let wrapper;
	const logInUserMock = jest.fn();

	beforeEach(() => {
		wrapper = mount(<LogIn logInUser={logInUserMock} />);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('expect to render LogIn component', () => {
		expect(wrapper).toMatchSnapshot();
	});

	describe('Testing the Login Form', () => {
		it('expect to call LogIn fn with typed in username', () => {
			const usernameInput = wrapper.find('input');
			usernameInput.instance().value = 'Christoph';
			usernameInput.simulate('change');

			wrapper
				.find('form')
				.props()
				.onSubmit({ preventDefault() {} }); //submit form
			expect(logInUserMock).toHaveBeenCalledWith('Christoph'); //Christoph should have been passed to loginUserMock
		});

		it('expect to not call LogIn fn with nothing typed in', () => {
			const usernameInput = wrapper.find('input');
			usernameInput.instance().value = '';
			usernameInput.simulate('change');

			wrapper
				.find('form')
				.props()
				.onSubmit({ preventDefault() {} }); //submit form
			expect(logInUserMock).toHaveBeenCalledTimes(0); //logInUserMock should not have been called
		});
	});
});
