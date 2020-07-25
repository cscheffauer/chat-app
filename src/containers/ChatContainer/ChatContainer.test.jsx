import React from 'react';
import { mount } from 'enzyme';
import ChatContainer from './ChatContainer.component';

describe('<ChatContainer />', () => {
	let wrapper;

	const clientMock = jest.fn();

	beforeEach(() => {
		wrapper = mount(<ChatContainer client={clientMock} username={'John Doe'} />);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});
	it('expect to render ChatContainer component', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
