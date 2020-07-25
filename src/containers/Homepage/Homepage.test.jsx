import React from 'react';
import { mount } from 'enzyme';
import Homepage from './Homepage.component';

describe('<Homepage />', () => {
	let wrapper;

	const clientMock = jest.fn();

	beforeEach(() => {
		wrapper = mount(<Homepage client={clientMock} />);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});
	it('expect to render Homepage component', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
